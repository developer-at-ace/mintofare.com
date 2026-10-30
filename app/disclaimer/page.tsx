import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer | Mintofare",
  description:
    "Read important information about Mintofare’s independent travel resources, third-party links, and limits of travel information.",
};

const sections = [
  {
    title: "Independent travel information platform",
    paragraphs: [
      "Mintofare is an independent travel information and planning platform. We provide general information about flight routes, destinations, airports, travel planning, and related topics.",
      "We are not an airline, airport operator, government authority, or aviation organization. Unless expressly stated otherwise, Mintofare is not affiliated with, owned by, sponsored by, or officially endorsed by an airline or travel provider.",
    ],
  },
  {
    title: "No direct airline operations",
    paragraphs: [
      "Mintofare does not operate aircraft, manage airline schedules, control airport operations, or provide transportation services. We do not represent ourselves as an official airline customer service department.",
      "Any airline-related information on this website is provided for general informational and research purposes.",
    ],
  },
  {
    title: "Accuracy of information",
    paragraphs: [
      "We aim to provide useful and relevant general information. Flight schedules, routes, fares, taxes, baggage conditions, travel requirements, and other travel details may change without notice. We do not guarantee that all information will always be accurate, complete, or current.",
      "Independently verify important information with the relevant airline, travel provider, or official government authority before making travel decisions.",
    ],
  },
  {
    title: "No booking or ticketing guarantee",
    paragraphs: [
      "Mintofare does not issue airline tickets, process airline reservations, collect payments for flight bookings, or manage existing airline reservations through this website. Flight-search results are provided for research, may change, and do not create a reservation. Complete bookings directly with the relevant provider.",
      "Any booking or transaction completed with an external provider is governed by that provider's terms and conditions. The provider is responsible for its booking, payment, ticketing, cancellation, and refund services.",
    ],
  },
  {
    title: "Airline trademarks and brand references",
    paragraphs: [
      "Airline names, logos, trademarks, service marks, and other brand elements belong to their respective owners. They may be referenced for identification and informational purposes. Their appearance on this website does not necessarily indicate partnership, sponsorship, affiliation, or endorsement.",
    ],
  },
  {
    title: "Third-party websites and links",
    paragraphs: [
      "This website may include links to external websites, airline resources, travel platforms, and other third-party services. These websites operate independently. Mintofare does not control or guarantee their content, accuracy, availability, security, or privacy practices.",
      "Visitors access external websites at their own discretion and should review the applicable terms and privacy policies.",
    ],
  },
  {
    title: "Travel decisions and responsibilities",
    paragraphs: [
      "Travelers are responsible for evaluating their travel arrangements and verifying relevant details before departure. This includes checking:",
    ],
    bullets: [
      "Passenger information.",
      "Flight schedules and airports.",
      "Passport, visa, and entry requirements.",
      "Baggage allowances and fare conditions.",
      "Cancellation and refund policies.",
      "Applicable taxes, charges, and provider terms.",
    ],
  },
  {
    title: "Advertising and affiliate relationships",
    paragraphs: [
      "Mintofare does not currently configure advertising or affiliate services on this website. If this changes, we will update this disclaimer to explain any applicable advertising, affiliate, or referral relationships. Any future promotional placement would not guarantee or, by itself, constitute an endorsement of a third-party service.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by applicable law, Mintofare is not responsible for losses or damages arising from reliance on general website information, third-party services or information, airline schedule changes, cancellations, delays, or website interruptions.",
      "Nothing in this disclaimer excludes or limits liability where that exclusion or limitation is prohibited by applicable law.",
    ],
  },
  {
    title: "Changes to this disclaimer",
    paragraphs: [
      "We may update this disclaimer periodically to reflect changes to the website, its operations, or applicable requirements. Updates will be published on this page with a revised effective date.",
    ],
  },
  {
    title: "Contact information",
    paragraphs: [
      "For questions about this disclaimer, contact Mintofare at support@mintofare.com or +1-877-851-6024.",
      "Business address: 1098 S Milwaukee Ave, Suite 200, Wheeling, IL 60090.",
    ],
  },
] satisfies LegalSection[];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Important information about Mintofare’s independent travel resources and their limitations."
      updated="October 30, 2026"
      sections={sections}
    />
  );
}
