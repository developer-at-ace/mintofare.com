import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Mintofare",
  description:
    "Learn how flight cancellations, ticket changes, and refunds are handled by airlines and third-party booking providers.",
};

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "This Cancellation & Refund Policy explains how cancellations, ticket modifications, and refund requests are handled when using the Mintofare website.",
      "Mintofare operates as an independent travel information and flight-search platform. We are not an airline and do not claim to be an official representative of any airline.",
    ],
  },
  {
    title: "Flight search and bookings",
    paragraphs: [
      "Visitors can use the flight-search functionality to explore available flight options.",
      "Where flight searches connect users to third-party booking providers, any resulting reservation is subject to that provider's terms, conditions, and policies.",
      "The identity of the booking provider and the applicable booking process should be disclosed before a customer completes a purchase.",
    ],
  },
  {
    title: "Flight cancellation",
    paragraphs: [
      "If you purchased an airline ticket through an external booking provider, contact the provider that issued your ticket to request cancellation.",
      "Mintofare does not guarantee that a flight ticket can be cancelled.",
    ],
    bullets: [
      "The airline's cancellation rules.",
      "The fare type and ticket conditions.",
      "The time remaining before departure.",
      "The booking provider's applicable terms and conditions.",
    ],
  },
  {
    title: "Refund policy",
    paragraphs: [
      "Refund eligibility is determined by the airline and the applicable booking provider. Depending on the ticket conditions, a refund may be:",
      "Any approved refund will be processed by the responsible airline or booking provider according to its applicable procedures.",
      "Mintofare does not promise or independently authorize refunds for tickets purchased through third-party providers.",
    ],
    bullets: [
      "Fully refundable.",
      "Partially refundable.",
      "Subject to cancellation charges.",
      "Non-refundable.",
    ],
  },
  {
    title: "Flight changes and modifications",
    paragraphs: [
      "Requests to change travel dates, passenger information, routes, or other ticket details must be directed to the airline or booking provider responsible for the reservation.",
      "Additional charges may apply depending on the airline's fare rules and the booking provider's terms.",
    ],
  },
  {
    title: "Refund processing time",
    paragraphs: [
      "Refund processing times are determined by the airline, payment provider, and booking provider. Contact the responsible provider for information about refund status and expected processing times.",
    ],
  },
  {
    title: "Third-party booking providers",
    paragraphs: [
      "When users access external booking websites through links or flight-search results on Mintofare, those websites operate under their own privacy policies, payment procedures, and booking conditions.",
      "Review all applicable terms before completing a reservation.",
    ],
  },
  {
    title: "Contact information",
    paragraphs: [
      "For questions regarding Mintofare's website, flight-search functionality, or general travel information, use the contact information published on our Contact Us page.",
      "For ticket cancellations, booking changes, or refund requests, contact the airline or booking provider that issued your ticket.",
    ],
  },
  {
    title: "Policy updates",
    paragraphs: [
      "Mintofare may update this policy when necessary. Revisions will be published on this page with an updated effective date.",
    ],
  },
] satisfies LegalSection[];

export default function CancellationRefundPage() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      description="Information about cancellations, ticket modifications, and refund requests with airlines and third-party booking providers."
      updated="November 2, 2026"
      sections={sections}
    />
  );
}
