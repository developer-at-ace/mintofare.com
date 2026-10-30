import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Mintofare",
  description:
    "Learn how cancellations, booking changes, and refunds work for travel bookings made with airlines and third-party providers.",
};

const sections = [
  {
    title: "General information",
    paragraphs: [
      "Mintofare is an independent travel information platform. We do not issue airline tickets, collect payments for airline reservations, or directly manage travel bookings through this website.",
      "Cancellation and refund requests for bookings completed with an airline or third-party travel provider are subject to that provider's applicable policies and conditions. This policy explains where to direct requests; it does not create a right to cancel or receive a refund from Mintofare.",
    ],
  },
  {
    title: "Cancellation requests",
    paragraphs: [
      "If you have an existing airline reservation that you wish to cancel, contact the airline or travel provider responsible for your booking. Use the official contact channel shown on your booking confirmation.",
      "Before submitting a cancellation request, have your booking reference and passenger details available, confirm the scheduled travel dates, and review the fare conditions, cancellation deadlines, and any applicable fees or deductions.",
      "A cancellation request does not automatically guarantee a refund. The provider will determine the available options under your booking terms and applicable law.",
    ],
  },
  {
    title: "Refund eligibility",
    paragraphs: [
      "Refund eligibility is determined by the applicable booking terms, provider policies, and relevant law. Factors may include the fare type and ticket conditions, when the cancellation is requested, whether the ticket has been partly or fully used, airline rules, taxes and government charges, service or processing charges, and other third-party terms.",
      "For a booking made with another company, only that provider can confirm the amount, form, and eligibility of a refund for that transaction.",
    ],
  },
  {
    title: "Non-refundable reservations",
    paragraphs: [
      "Some fares and travel services may be non-refundable or subject to restrictions. If a booking is non-refundable, the responsible provider's terms determine whether any taxes, charges, or other amounts may be returned.",
    ],
  },
  {
    title: "Airline-initiated cancellations",
    paragraphs: [
      "If an airline cancels or significantly changes a flight, available options depend on the airline's policies, your ticket terms, and applicable regulations. Options may include rebooking, alternative travel arrangements, travel credit, or a refund where applicable.",
      "Mintofare does not control airline operational decisions. Contact the airline or provider responsible for the reservation to learn what options apply.",
    ],
  },
  {
    title: "Refund processing time",
    paragraphs: [
      "If a refund is approved by the responsible provider, processing times may vary. Timing can depend on the airline, travel provider, payment processor, and financial institution. Mintofare cannot guarantee processing times established by external organizations.",
    ],
  },
  {
    title: "Service and processing fees",
    paragraphs: [
      "Any service, administrative, or processing charges applicable to a third-party transaction are governed by that provider's terms. Mintofare does not currently charge booking, cancellation, or processing fees through this website.",
      "If Mintofare offers a separately defined paid service in the future, applicable charges and refund conditions will be disclosed before purchase.",
    ],
  },
  {
    title: "Booking changes",
    paragraphs: [
      "Date, route, passenger, or other booking changes are subject to the conditions of the airline or provider responsible for the reservation. Changes may involve additional charges or fare differences. Contact the relevant provider before changing an existing booking.",
    ],
  },
  {
    title: "Missed departures",
    paragraphs: [
      "If a passenger does not appear for a scheduled departure, the provider may treat the reservation as a no-show under its policies. Refund eligibility or any remaining ticket value depends on the applicable fare conditions. Contact the airline or provider directly.",
    ],
  },
  {
    title: "Duplicate or incorrect bookings",
    paragraphs: [
      "If you identify a duplicate reservation or incorrect booking details, contact the responsible airline or booking provider immediately. Do not assume a duplicate booking will be automatically cancelled or refunded.",
    ],
  },
  {
    title: "Payment disputes",
    paragraphs: [
      "For a payment concern relating to a third-party booking, contact the provider that processed the transaction. You may also contact your payment provider where appropriate.",
      "If you believe a charge was made by Mintofare, contact us at support@mintofare.com with the date, amount, and a description of the charge. Do not send full card numbers or security codes.",
    ],
  },
  {
    title: "Third-party policies",
    paragraphs: [
      "Airlines, travel agencies, booking platforms, and payment providers maintain their own cancellation, refund, and payment procedures. Their applicable terms govern transactions completed through their services. Mintofare does not control those terms or procedures.",
    ],
  },
  {
    title: "Policy updates",
    paragraphs: [
      "We may update this policy when necessary to reflect changes in website operations, services, or applicable requirements. Updated versions will be published on this page with a revised effective date.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      "For general questions about this policy or Mintofare's travel information resources, contact support@mintofare.com or +1-877-851-6024.",
      "Business address: 1098 S Milwaukee Ave, Suite 200, Wheeling, IL 60090.",
      "Important: For cancellation or refund requests involving an existing airline ticket, contact the airline or travel provider responsible for your reservation.",
    ],
  },
] satisfies LegalSection[];

export default function CancellationRefundPage() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      description="General information about cancellations, booking changes, and refunds for travel arranged with an airline or third-party provider."
      updated="October 30, 2026"
      sections={sections}
    />
  );
}
