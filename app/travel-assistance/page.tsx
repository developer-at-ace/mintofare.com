import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Travel Assistance | Mintofare",
  description:
    "Learn about Mintofare's independent travel information, route research, and where to get help with an airline booking.",
};

const sections = [
  {
    title: "How we help you plan your journey",
    paragraphs: [
      "Mintofare is an independent online platform for general travel information, airport and route research, and planning resources. Our content is intended to help visitors prepare and make informed decisions; it is not a booking or customer-support service.",
    ],
  },
  {
    title: "Travel information",
    paragraphs: [
      "Our website may provide general information to help travelers research a trip, including:",
    ],
    bullets: [
      "Airport and destination information.",
      "Flight route information.",
      "General travel-planning guidance.",
      "Information about airline baggage policies.",
      "General information about travel documentation.",
    ],
  },
  {
    title: "Flight search and third-party providers",
    paragraphs: [
      "Any flight options, schedules, fares, or availability shown through a search tool or third-party service are subject to change and should be confirmed with the responsible provider.",
      "If a search or link directs you to an external booking provider, that provider's terms and booking process apply. Review the provider's identity, total price, and conditions before completing a purchase.",
    ],
  },
  {
    title: "Bookings, changes, and refunds",
    paragraphs: [
      "Mintofare is not an airline and does not issue tickets, process booking payments, or manage reservations. The airline or booking provider that issued a ticket is responsible for ticketing, payment, booking modifications, cancellations, and refund requests, as applicable.",
      "For an existing booking, use the contact information on your confirmation. Refund eligibility and processing are determined by the airline and booking provider under the applicable terms.",
    ],
  },
  {
    title: "Independent platform",
    paragraphs: [
      "Mintofare does not represent itself as an airline or an official airline customer-service department. Unless expressly disclosed, Mintofare is not affiliated with or endorsed by an airline.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      "For questions about this website or its published information, contact support@mintofare.com or use our Contact Us page. We cannot access or assist with an individual airline reservation.",
    ],
  },
] satisfies LegalSection[];

export default function TravelAssistancePage() {
  return (
    <LegalPage
      title="Travel Assistance"
      description="Independent travel information and practical guidance for researching your journey."
      updated="November 2, 2026"
      sections={sections}
    />
  );
}
