import type { Metadata } from "next";
import { Suspense } from "react";
import FlightResults from "./flight-results";

export const metadata: Metadata = {
  title: "Flight Results | Mintofare",
  description: "Review flight search results and itinerary details with Mintofare.",
};

function ResultsFallback() {
  return (
    <main className="results-loading-shell" role="status">
      <span className="results-spinner" aria-hidden="true" />
      <span>Loading your flight search…</span>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <FlightResults />
    </Suspense>
  );
}
