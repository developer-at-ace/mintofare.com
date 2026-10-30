const CABIN_CODES: Record<string, string> = {
  ECONOMY: "Y",
  PREMIUM_ECONOMY: "W",
  BUSINESS: "C",
  FIRST: "F",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function formatProviderDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${MONTHS[Number(month) - 1]}-${day}-${year}`;
}

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const origin = params.get("origin")?.trim().toUpperCase() ?? "";
  const destination = params.get("destination")?.trim().toUpperCase() ?? "";
  const tripType = params.get("tripType") ?? "oneway";
  const departureDate = params.get("departureDate") ?? "";
  const returnDate = params.get("returnDate") ?? "";
  const adultsValue = params.get("adults") ?? "1";
  const childrenValue = params.get("children") ?? "0";
  const infantsValue = params.get("infants") ?? "0";
  const adults = Number(adultsValue);
  const children = Number(childrenValue);
  const infants = Number(infantsValue);
  const cabin = params.get("cabin")?.trim().toUpperCase().replaceAll(" ", "_") ?? "ECONOMY";

  if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
    return jsonError("Enter valid three-letter airport codes, such as JFK or LAX.", 400);
  }
  if (origin === destination) {
    return jsonError("Departure and destination airports must be different.", 400);
  }
  if (tripType !== "oneway" && tripType !== "roundtrip") {
    return jsonError("Trip type must be one-way or round-trip.", 400);
  }
  if (!isValidDate(departureDate)) {
    return jsonError("Enter a valid departure date.", 400);
  }
  if (departureDate < new Date().toISOString().slice(0, 10)) {
    return jsonError("Departure date must be today or later.", 400);
  }
  if (tripType === "roundtrip" && (!isValidDate(returnDate) || returnDate < departureDate)) {
    return jsonError("Enter a valid return date on or after the departure date.", 400);
  }
  if (!/^[1-9]$/.test(adultsValue) || !Number.isInteger(adults) || adults > 9) {
    return jsonError("Traveler count must be between 1 and 9.", 400);
  }
  if (!/^\d$/.test(childrenValue) || !Number.isInteger(children) || children > 9) {
    return jsonError("Child count must be between 0 and 9.", 400);
  }
  if (!/^\d$/.test(infantsValue) || !Number.isInteger(infants) || infants > 9) {
    return jsonError("Infant count must be between 0 and 9.", 400);
  }
  if (adults + children + infants > 9) {
    return jsonError("A flight search can include at most 9 travelers.", 400);
  }
  if (infants > adults) {
    return jsonError("Each infant must travel with an adult.", 400);
  }
  if (!CABIN_CODES[cabin]) {
    return jsonError("Choose a supported cabin class.", 400);
  }

  const apiUser = process.env.FLIGHT_API_USER;
  const apiPassword = process.env.FLIGHT_API_PASSWORD;
  const metaId = process.env.FLIGHT_API_META_ID;
  const website = process.env.FLIGHT_API_WEBSITE;

  if (!apiUser || !apiPassword || !metaId || !website) {
    return jsonError("Flight search is not configured. Add the provider credentials to the server environment.", 503);
  }

  let apiUrl: URL;
  try {
    apiUrl = new URL(process.env.FLIGHT_API_URL || "https://agency.wikiproject.in/");
  } catch {
    return jsonError("The flight search API endpoint must be a valid HTTPS URL.", 500);
  }
  if (apiUrl.protocol !== "https:") {
    return jsonError("The flight search API endpoint must be a valid HTTPS URL.", 500);
  }
  const query = apiUrl.searchParams;
  query.set("JType", tripType);
  query.set("org", origin);
  query.set("dest", destination);
  query.set("depDt", formatProviderDate(departureDate));
  if (tripType === "roundtrip") {
    query.set("retDt", formatProviderDate(returnDate));
  }
  query.set("adt", String(adults));
  query.set("chd", String(children));
  query.set("inf", String(infants));
  query.set("ct", CABIN_CODES[cabin]);
  query.set("userid", apiUser);
  query.set(process.env.FLIGHT_API_PASSWORD_PARAM || "password", apiPassword);
  query.set("metaId", metaId);
  query.set("website", website);
  query.set("currency", "USD");

  let upstream: Response;
  try {
    upstream = await fetch(apiUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "TimeoutError";
    console.error("Flight search provider request failed.", error instanceof Error ? error.name : "Unknown error");
    return jsonError(
      isTimeout ? "The flight search provider took too long to respond. Please try again." : "The flight search provider could not be reached. Please try again.",
      isTimeout ? 504 : 502,
    );
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return jsonError("The flight search provider returned an invalid response.", 502);
  }

  if (!upstream.ok) {
    return jsonError("The flight search provider could not complete this search.", 502);
  }
  if (!data || typeof data !== "object" || !Array.isArray((data as { data?: unknown }).data)) {
    return jsonError("The flight search provider returned an unexpected response.", 502);
  }

  return Response.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
