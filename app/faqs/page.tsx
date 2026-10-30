import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Mintofare",
  description:
    "Find answers about Mintofare, our independent travel information, routes, bookings, cancellations, privacy, and how to contact us.",
};

const sections = [
  {
    title: "What is Mintofare?",
    paragraphs: [
      "Mintofare is an independent online travel information platform with general resources about flight routes, destinations, airports, and trip planning.",
    ],
  },
  {
    title: "Is Mintofare an airline?",
    paragraphs: [
      "No. Mintofare is not an airline, airport operator, or aircraft company. We operate independently as a travel information platform.",
    ],
  },
  {
    title: "Is Mintofare affiliated with any airline?",
    paragraphs: [
      "Unless expressly stated otherwise, Mintofare is not affiliated with, owned by, or officially endorsed by an airline or travel provider.",
    ],
  },
  {
    title: "What services does Mintofare provide?",
    paragraphs: [
      "We provide general flight route information, destination resources, airport information, travel-planning guidance, and general assistance with locating relevant travel information.",
    ],
  },
  {
    title: "Can I research flight routes through Mintofare?",
    paragraphs: [
      "Yes. Our website provides route-related information to help visitors research possible travel options and understand general journey details. Confirm current schedules and availability with an airline or travel provider.",
    ],
  },
  {
    title: "Can I book airline tickets directly through Mintofare?",
    paragraphs: [
      "No. Mintofare currently provides independent travel information and planning resources; it does not sell or issue airline tickets, accept booking payments, or manage reservations. Complete bookings directly with the relevant airline or travel provider.",
    ],
  },
  {
    title: "Are flight prices displayed on the website guaranteed?",
    paragraphs: [
      "Search results may include live fares and availability supplied by our flight-search provider, but they are not guaranteed and can change. Confirm the final price, taxes, fees, and conditions with the provider before booking.",
    ],
  },
  {
    title: "Can Mintofare help me find airline contact information?",
    paragraphs: [
      "We can offer general guidance about where to look for airline or travel-provider information. For current contact details and booking support, use the airline's or provider's official website or the information shown on your booking confirmation.",
    ],
  },
  {
    title: "Can I contact Mintofare for travel assistance?",
    paragraphs: [
      "Yes. You can contact us with general website inquiries, route research questions, destination information, or questions about our travel-planning resources. Our contact details and contact form are available on the Contact Us page.",
    ],
  },
  {
    title: "Can Mintofare change my flight reservation?",
    paragraphs: [
      "No. Mintofare does not manage airline reservations. Contact the airline or travel provider responsible for your booking to request changes.",
    ],
  },
  {
    title: "How can I cancel an airline ticket?",
    paragraphs: [
      "Cancellation procedures depend on the airline and the conditions of your ticket. Contact the airline or booking provider directly and review the applicable cancellation terms.",
    ],
  },
  {
    title: "How do airline refunds work?",
    paragraphs: [
      "Refund eligibility depends on the ticket type, airline rules, applicable regulations, and booking conditions. The airline or booking provider responsible for the reservation determines the refund process.",
    ],
  },
  {
    title: "What should I check before booking a flight?",
    paragraphs: [
      "Check passenger names, departure and arrival airports, travel dates, baggage allowances, fare conditions, taxes, cancellation policies, and any additional charges before completing a booking.",
    ],
  },
  {
    title: "Can flight schedules change after booking?",
    paragraphs: [
      "Yes. Airlines may modify schedules due to operational requirements, weather, airport conditions, or other circumstances. Check your booking and airline notifications regularly.",
    ],
  },
  {
    title: "Does Mintofare provide visa information?",
    paragraphs: [
      "We may provide general travel-planning information about passports, visas, and entry requirements. Travelers should verify current requirements with official government sources.",
    ],
  },
  {
    title: "Can I use Mintofare for business travel?",
    paragraphs: [
      "Yes. Our general travel information may be useful for business travelers, leisure travelers, families, and others researching their journeys.",
    ],
  },
  {
    title: "Why are airline names and logos displayed on the website?",
    paragraphs: [
      "Airline names or trademarks may be referenced to identify routes, destinations, or travel-related information. They remain the property of their respective owners and do not automatically indicate affiliation or endorsement.",
    ],
  },
  {
    title: "Does Mintofare charge users to view travel information?",
    paragraphs: [
      "There is no browsing or information-access fee for the general travel information currently available on this website. Mintofare does not currently offer paid booking services.",
    ],
  },
  {
    title: "How does Mintofare protect my personal information?",
    paragraphs: [
      "Our Privacy Policy explains how information may be handled when you browse the site or contact us. Review that policy before sharing personal information. The contact form opens your email application; it does not send or store your message on this website.",
    ],
  },
  {
    title: "How can I contact Mintofare?",
    paragraphs: [
      "Use the Contact Us page, email support@mintofare.com, or call +1-877-851-6024 for general inquiries. The business address is Office 5-57, Workspace Downtown, Sheikh Zayed Road, Next to the Burj Khalifa Metro Station, Dubai, United Arab Emirates.",
    ],
  },
  {
    title: "Where can I find your website policies?",
    paragraphs: [
      "Our website footer links to the Privacy Policy, Terms & Conditions, Disclaimer, and Cancellation & Refund Policy.",
    ],
  },
  {
    title: "How can I provide feedback?",
    paragraphs: [
      "You can share questions, suggestions, or feedback through the contact form on our Contact Us page. Submitting the form opens your email application so you can review and send the message.",
    ],
  },
] satisfies LegalSection[];

export default function FAQsPage() {
  return (
    <LegalPage
      title="Frequently Asked Questions"
      description="Answers about Mintofare, our travel information resources, and general trip-planning assistance."
      updated="October 30, 2026"
      sections={sections}
    />
  );
}
