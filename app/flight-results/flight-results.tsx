"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { airports } from "@/app/data/airports";

type FlightSegment = {
  departure?: { iataCode?: string; at?: string };
  arrival?: { iataCode?: string; at?: string };
  carrierCode?: string;
  duration?: string;
};

type FlightOffer = {
  id?: string;
  itineraries?: { duration?: string; segments?: FlightSegment[] }[];
  price?: { currency?: string; total?: string | number; grandTotal?: string | number };
};

type FlightSearchResponse = {
  data?: FlightOffer[];
  dictionaries?: { carriers?: Record<string, string> };
  error?: string;
};

type FlightSearch = {
  origin: string;
  destination: string;
  tripType: string;
  departureDate: string;
  returnDate: string;
  adults: string;
  children: string;
  infants: string;
  cabin: string;
};

const airportsByCode = new Map(airports.map((airport) => [airport.code, airport]));

function formatFlightTime(value?: string): string {
  if (!value) {
    return "Time not listed";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Time not listed"
    : date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDuration(value?: string): string {
  const match = value?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!match) {
    return "";
  }
  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? `${match[2]}m` : "";
  return [hours, minutes].filter(Boolean).join(" ");
}

function offerPrice(offer: FlightOffer): number {
  const price = Number(offer.price?.grandTotal ?? offer.price?.total);
  return Number.isFinite(price) ? price : Number.POSITIVE_INFINITY;
}

function displayDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value || "Date not selected";
  }
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
}

function travelerSummary(search: FlightSearch): string {
  const adults = Number(search.adults) || 0;
  const children = Number(search.children) || 0;
  const infants = Number(search.infants) || 0;
  const total = adults + children + infants;
  return `${total} ${total === 1 ? "traveler" : "travelers"}`;
}

export default function FlightResults() {
  const searchParams = useSearchParams();
  const search: FlightSearch = {
    origin: searchParams.get("origin") ?? "",
    destination: searchParams.get("destination") ?? "",
    tripType: searchParams.get("tripType") ?? "",
    departureDate: searchParams.get("departureDate") ?? "",
    returnDate: searchParams.get("returnDate") ?? "",
    adults: searchParams.get("adults") ?? "1",
    children: searchParams.get("children") ?? "0",
    infants: searchParams.get("infants") ?? "0",
    cabin: searchParams.get("cabin") ?? "ECONOMY",
  };
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [carriers, setCarriers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"price" | "departure">("price");
  const [nonstopOnly, setNonstopOnly] = useState(false);
  const origin = search.origin.toUpperCase();
  const destination = search.destination.toUpperCase();
  const originAirport = airportsByCode.get(origin);
  const destinationAirport = airportsByCode.get(destination);
  const cabin = search.cabin.replaceAll("_", " ").toLowerCase();
  const tripType = search.tripType === "roundtrip" ? "Round trip" : "One way";

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      tripType: search.tripType,
      origin: search.origin,
      destination: search.destination,
      departureDate: search.departureDate,
      returnDate: search.returnDate,
      adults: search.adults,
      children: search.children,
      infants: search.infants,
      cabin: search.cabin,
    });

    async function loadResults() {
      setIsLoading(true);
      setError("");
      setOffers([]);
      setCarriers({});

      try {
        const response = await fetch(`/api/flights/search?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as FlightSearchResponse;
        if (!response.ok) {
          throw new Error(result.error || "Flight search failed. Please try again.");
        }
        if (!Array.isArray(result.data)) {
          throw new Error("The flight search provider returned an unexpected response.");
        }
        setOffers(result.data);
        setCarriers(result.dictionaries?.carriers ?? {});
        if (result.data.length === 0) {
          setError("No flights were found for those dates. Try different dates or airports.");
        }
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === "AbortError") {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Flight search failed. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadResults();
    return () => controller.abort();
  }, [
    search.adults,
    search.cabin,
    search.children,
    search.departureDate,
    search.destination,
    search.infants,
    search.origin,
    search.returnDate,
    search.tripType,
  ]);

  const visibleOffers = offers
    .filter((offer) => !nonstopOnly || (offer.itineraries ?? []).every(
      (itinerary) => (itinerary.segments?.length ?? 0) <= 1,
    ))
    .slice()
    .sort((first, second) => {
      if (sortBy === "price") {
        return offerPrice(first) - offerPrice(second);
      }
      const firstDeparture = first.itineraries?.[0]?.segments?.[0]?.departure?.at ?? "";
      const secondDeparture = second.itineraries?.[0]?.segments?.[0]?.departure?.at ?? "";
      return firstDeparture.localeCompare(secondDeparture);
    });

  return (
    <div className="flight-results-page">
      <header className="site-header results-site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Mintofare home">
            <Image
              className="brand-logo"
              src="/Mintofare.png"
              alt=""
              width={2172}
              height={724}
            />
          </Link>
          <nav className="results-header-nav" aria-label="Results navigation">
            <Link href="/#flight-search">New search</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flight-results-main">
        <div className="flight-results-layout">
          <Link className="results-back-link" href="/#flight-search">← Change search</Link>
          <section className="flight-search-summary" aria-label="Your flight search">
            <div className="results-summary-heading">
              <div>
                <p className="results-eyebrow">YOUR SEARCH</p>
                <h1>Flight results</h1>
              </div>
              <span className="results-trip-badge">{tripType}</span>
            </div>
            <div className="results-summary-route">
              <div>
                <span>FROM</span>
                <strong>{origin}</strong>
                <small>{originAirport?.city ?? "Departure airport"}</small>
              </div>
              <span className="results-route-arrow" aria-hidden="true">→</span>
              <div>
                <span>TO</span>
                <strong>{destination}</strong>
                <small>{destinationAirport?.city ?? "Destination airport"}</small>
              </div>
            </div>
            <div className="results-summary-details">
              <span><strong>Depart</strong>{displayDate(search.departureDate)}</span>
              {search.tripType === "roundtrip" && (
                <span><strong>Return</strong>{displayDate(search.returnDate)}</span>
              )}
              <span><strong>Travelers</strong>{travelerSummary(search)}</span>
              <span><strong>Cabin</strong>{cabin || "economy"}</span>
            </div>
          </section>

          <section className="flight-results" aria-live="polite" aria-label="Flight search results">
            {isLoading ? (
              <div className="results-loading" role="status">
                <span className="results-spinner" aria-hidden="true" />
                <div>
                  <strong>Searching available flights</strong>
                  <p>Comparing itineraries for your selected route and dates.</p>
                </div>
              </div>
            ) : error ? (
              <div className={`results-message${offers.length === 0 && error.startsWith("No flights") ? " results-empty" : " search-error"}`} role="alert">
                <strong>{error.startsWith("No flights") ? "No flights found" : "We couldn’t complete your search"}</strong>
                <p>{error}</p>
                {!error.startsWith("No flights") && (
                  <Link className="results-retry-link" href="/#flight-search">Update search details</Link>
                )}
              </div>
            ) : (
              <>
                <div className="flight-results-toolbar">
                  <div>
                    <p className="results-eyebrow">AVAILABLE ITINERARIES</p>
                    <h2>{visibleOffers.length} of {offers.length} flight{offers.length === 1 ? "" : "s"}</h2>
                  </div>
                  <div className="flight-result-controls">
                    <label>
                      <span>Sort by</span>
                      <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "price" | "departure")}>
                        <option value="price">Lowest price</option>
                        <option value="departure">Earliest departure</option>
                      </select>
                    </label>
                    <label className="nonstop-filter">
                      <input type="checkbox" checked={nonstopOnly} onChange={(event) => setNonstopOnly(event.target.checked)} />
                      Nonstop only
                    </label>
                  </div>
                </div>
                {visibleOffers.length === 0 && (
                  <p className="flight-empty-state">No nonstop flights were found. Turn off the nonstop filter to see all results.</p>
                )}
                {visibleOffers.map((offer, offerIndex) => {
                  const itineraries = offer.itineraries ?? [];
                  const amount = offer.price?.grandTotal ?? offer.price?.total;
                  const price = amount === undefined
                    ? "Price unavailable"
                    : `${offer.price?.currency ?? ""} ${amount}`.trim();

                  return (
                    <article className="flight-offer" key={`${offer.id ?? "offer"}-${offerIndex}`}>
                      <div className="flight-offer-heading">
                        <strong>{price}</strong>
                        <span>Listed by provider · confirm final fare before booking</span>
                      </div>
                      {itineraries.map((itinerary, itineraryIndex) => {
                        const segments = itinerary.segments ?? [];
                        const first = segments[0];
                        const fallbackOrigin = itineraryIndex === 0 ? origin : destination;
                        const fallbackDestination = itineraryIndex === 0 ? destination : origin;
                        const last = segments[segments.length - 1];
                        const stopCount = Math.max(segments.length - 1, 0);

                        return (
                          <div className="flight-itinerary" key={`${offer.id ?? "offer"}-${offerIndex}-itinerary-${itineraryIndex}`}>
                            <div className="flight-itinerary-summary">
                              <span className="flight-direction">{itineraryIndex === 0 ? "Outbound" : "Return"}</span>
                              <strong>
                                {first?.departure?.iataCode ?? fallbackOrigin} {formatFlightTime(first?.departure?.at)}
                                {" → "}
                                {last?.arrival?.iataCode ?? fallbackDestination} {formatFlightTime(last?.arrival?.at)}
                              </strong>
                              <span>
                                {formatDuration(itinerary.duration)}
                                {itinerary.duration ? " · " : ""}
                                {stopCount === 0 ? "Nonstop" : `${stopCount} stop${stopCount === 1 ? "" : "s"}`}
                              </span>
                            </div>
                            <div className="flight-segments">
                              {segments.map((segment, segmentIndex) => {
                                const carrierCode = segment.carrierCode;
                                const carrierName = carrierCode ? carriers[carrierCode] ?? carrierCode : "Airline not listed";
                                const departureCode = segment.departure?.iataCode ?? "";
                                const arrivalCode = segment.arrival?.iataCode ?? "";
                                const departureAirport = airportsByCode.get(departureCode);
                                const arrivalAirport = airportsByCode.get(arrivalCode);
                                return (
                                  <div className="flight-segment" key={`${offer.id ?? "offer"}-${offerIndex}-${itineraryIndex}-${segmentIndex}`}>
                                    <span>{carrierName}{carrierCode ? ` (${carrierCode})` : ""}</span>
                                    <strong>{departureCode} {formatFlightTime(segment.departure?.at)} → {arrivalCode} {formatFlightTime(segment.arrival?.at)}</strong>
                                    <small>
                                      {departureAirport?.name ?? departureCode}
                                      {" → "}
                                      {arrivalAirport?.name ?? arrivalCode}
                                      {formatDuration(segment.duration) ? ` · ${formatDuration(segment.duration)}` : ""}
                                    </small>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </article>
                  );
                })}
              </>
            )}
          </section>
          <p className="results-disclaimer">
            Results and fares are supplied for informational purposes and may change. Mintofare does not book tickets or process payments.
          </p>
        </div>
      </main>
    </div>
  );
}
