import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mintofare",
  description:
    "Review the terms for using Mintofare, an independent website for general travel information and trip-planning research.",
};

const sections = [
  {
    title: "About Mintofare",
    paragraphs: [
      "Mintofare is an independent online travel information and planning platform. This website provides general information about flight routes, destinations, airports, and related travel topics.",
      "Mintofare is not an airline, airport operator, government agency, or aviation authority. Unless expressly stated otherwise, we are not affiliated with, owned by, or officially endorsed by an airline or travel provider.",
    ],
  },
  {
    title: "Acceptance of terms",
    paragraphs: [
      "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please discontinue using the website.",
      "By using the website, you confirm that:",
    ],
    bullets: [
      "You have the legal capacity to use the website.",
      "Information you provide is accurate and current.",
      "You will use the website for lawful purposes and comply with applicable laws.",
      "You will not interfere with the website's security or functionality.",
      "If acting for another person or organization, you have authority to do so.",
    ],
  },
  {
    title: "Website information",
    paragraphs: [
      "We aim to provide useful general travel information. Travel details can change, including schedules, routes, airport information, fares, baggage allowances, travel requirements, provider policies, and service availability.",
      "Information on this website is for general informational and trip-planning purposes. Verify important details with the relevant airline, travel provider, or official government authority before making decisions or traveling. We do not promise that information is complete, current, or suitable for every itinerary.",
    ],
  },
  {
    title: "Independent travel information platform",
    paragraphs: [
      "Mintofare provides general travel research resources and informational content. We do not operate aircraft, control airline schedules, manage airport facilities, or provide government travel services.",
      "References to airlines, travel providers, or other organizations are for informational purposes and do not establish affiliation, partnership, or endorsement.",
    ],
  },
  {
    title: "Third-party websites and services",
    paragraphs: [
      "This website may refer or link to airline, airport, travel-provider, or other third-party websites. These services operate independently and may have their own terms, privacy policies, payment conditions, and service requirements.",
      "Mintofare does not control or guarantee third-party websites or services. Review the applicable terms and privacy information before using an external service or sharing information with it.",
    ],
  },
  {
    title: "Bookings and transactions",
    paragraphs: [
      "Mintofare does not directly issue airline tickets, collect payment for airline reservations, or manage bookings through this website. The flight-search form sends airport codes, dates, traveler count, and cabin selection to our search provider to retrieve results; it does not create a reservation or submit payment.",
      "If you complete a booking or transaction with a third-party provider, that transaction is governed by the provider's terms. The provider is responsible for its booking services, payment processing, ticket issuance, cancellations, refunds, and related obligations. Contact the provider shown on your confirmation for help with an existing booking.",
    ],
  },
  {
    title: "Prices, taxes, and availability",
    paragraphs: [
      "Flight-search results may display fares and availability returned by a third-party provider. They can change or become unavailable, and may not include every tax, fee, or restriction. Confirm the final price and conditions with the provider before a transaction.",
      "A provider determines the final price and applicable conditions at the time of purchase.",
    ],
  },
  {
    title: "User responsibilities",
    paragraphs: [
      "You agree not to:",
    ],
    bullets: [
      "Use the website for unlawful or fraudulent activity or submit false or misleading information.",
      "Attempt unauthorized access to website systems or interfere with their security or functionality.",
      "Upload malicious software or harmful material.",
      "Collect website information through unauthorized automated methods.",
      "Copy or commercially exploit website content without permission, except as permitted by law.",
      "Violate the rights of other individuals or organizations.",
    ],
  },
  {
    title: "Travel documents and entry requirements",
    paragraphs: [
      "Travelers are responsible for obtaining the documents required for their journeys. These may include passports, visas, transit permits, identification, and other travel documentation.",
      "Requirements may depend on nationality, destination, transit country, and travel date. Verify current requirements through official government sources before departure.",
    ],
  },
  {
    title: "Flight changes and disruptions",
    paragraphs: [
      "Airlines and travel providers may change, delay, cancel, or reroute flights due to operational, weather-related, regulatory, or other circumstances. Mintofare does not control airline operations or scheduling decisions.",
      "For an existing reservation or flight disruption, contact the airline or booking provider responsible for your booking.",
    ],
  },
  {
    title: "Cancellations and refunds",
    paragraphs: [
      "Cancellation and refund conditions depend on the airline or travel provider, fare rules, booking terms, and applicable law. Where a transaction is completed through a third party, its cancellation and refund policy governs that transaction.",
      "Mintofare does not sell tickets, accept booking payments, or manage reservations through this website. See our Cancellation & Refund Policy and the provider's booking conditions for more information.",
    ],
  },
  {
    title: "Website availability",
    paragraphs: [
      "We aim to maintain reliable website access but cannot guarantee uninterrupted or error-free operation. Access may be temporarily restricted due to maintenance, updates, technical issues, security concerns, or circumstances beyond our reasonable control.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "Unless otherwise stated, original website content, including text, graphics, logos, designs, layouts, and other materials, is owned by or licensed to Mintofare. You may access and use this content for personal, lawful purposes.",
      "You may not reproduce, modify, distribute, publish, sell, or commercially exploit website content without prior written permission, except where permitted by applicable law. Airline names and trademarks belong to their respective owners.",
    ],
  },
  {
    title: "Privacy",
    paragraphs: [
      "Your use of Mintofare is also subject to our Privacy Policy, which explains how information may be handled when you browse the website or contact us. Please review it before providing personal information.",
    ],
  },
  {
    title: "Disclaimer of warranties",
    paragraphs: [
      "To the extent permitted by applicable law, the website and its content are provided on an \"as available\" basis. We do not guarantee that all information will always be accurate or complete, that schedules or prices will remain unchanged, that website functions will always be available, that external websites will remain accessible, or that third-party information will be current.",
      "Independently verify important travel information with the relevant provider or official source.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, Mintofare is not liable for indirect, incidental, special, or consequential losses arising from use of the website or reliance on its general information. This includes losses related to airline delays, cancellations, missed connections, denied boarding, changes in travel requirements, third-party services, or website interruptions.",
      "Nothing in these terms excludes or limits liability where that exclusion or limitation is prohibited by applicable law.",
    ],
  },
  {
    title: "Indemnification",
    paragraphs: [
      "To the extent permitted by applicable law, you agree to hold Mintofare and its relevant representatives harmless from claims, losses, liabilities, and expenses arising from your unlawful use of the website, violation of these terms, or infringement of third-party rights.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "We may revise these Terms & Conditions periodically to reflect changes to the website, our practices, or applicable requirements. Updated terms will be published on this page with a revised effective date. Your use of the website after an update is subject to the revised terms to the extent permitted by applicable law.",
    ],
  },
  {
    title: "Suspension or termination",
    paragraphs: [
      "We may restrict or terminate access to the website where reasonably necessary due to violations of these terms, security concerns, unlawful activity, or operational requirements.",
    ],
  },
  {
    title: "Governing law",
    paragraphs: [
      "These terms are subject to applicable law and any mandatory consumer protections that apply to you. Nothing in this section is intended to remove a protection that cannot lawfully be waived.",
    ],
  },
  {
    title: "Severability",
    paragraphs: [
      "If any provision of these terms is found unenforceable, the remaining provisions will continue to apply to the extent permitted by law.",
    ],
  },
  {
    title: "Entire agreement",
    paragraphs: [
      "These Terms & Conditions, together with the applicable policies published on this website, govern your use of Mintofare, subject to any rights that cannot be limited by agreement.",
    ],
  },
  {
    title: "Contact information",
    paragraphs: [
      "For questions about these terms, contact Mintofare at support@mintofare.com or +1-877-851-6024.",
      "Business address: Office 5-57, Workspace Downtown, Sheikh Zayed Road, Next to the Burj Khalifa Metro Station, Dubai, United Arab Emirates.",
    ],
  },
] satisfies LegalSection[];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms govern access to and use of Mintofare’s independent travel information website."
      updated="October 30, 2026"
      sections={sections}
    />
  );
}
