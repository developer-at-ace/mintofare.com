import type { Metadata } from "next";
import type { LegalSection } from "../components/legal-page";
import LegalPage from "../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Mintofare",
  description:
    "Learn what information Mintofare may handle, how our travel research and contact tools work, and what privacy choices may be available to you.",
};

const sections = [
  {
    title: "Information we collect",
    paragraphs: [
      "Mintofare (\"Mintofare,\" \"we,\" \"us,\" or \"our\") respects your privacy and is committed to handling personal information responsibly. This Privacy Policy explains what information may be processed when you use this independent travel information website, how it may be used or shared, and the choices available to you.",
      "Information you provide: If you contact us by email or phone, we receive the contact information and message details you choose to share. The contact form on this website prepares a message in your own email application; it does not transmit form entries to or store them on this website. We receive the message only if you choose to send it from your email application.",
      "When you search for flights, the airport codes, travel dates, traveler count, and cabin class you enter are sent through this website's server to our flight-search provider to retrieve results. Do not include names, payment details, passport information, or other sensitive data in a flight search. This website does not currently offer accounts, newsletters, surveys, or ticket checkout.",
      "Technical information: The website and its hosting infrastructure may process basic technical information needed to deliver and protect the site, such as IP address, browser or device characteristics, pages requested, access times, and referring page. What is recorded depends on the hosting provider and its configuration.",
      "Please do not send payment card details, passwords, passport information, or other sensitive information in a general inquiry.",
    ],
  },
  {
    title: "How information may be used",
    paragraphs: [
      "Information you send to us may be used to respond to your inquiry, provide general travel information, maintain communications, and address website or security issues. Technical information processed by hosting infrastructure may be used to deliver the site, diagnose errors, and help protect its availability and security.",
      "Search details are used to request flight results from the search provider; they do not make a reservation or contact an airline to change an existing booking. The provider may process the search details under its own terms and privacy policy. We do not sell personal information submitted to us. We do not use information for purposes unrelated to the reason it was provided except where permitted or required by law.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    paragraphs: [
      "The website does not currently configure advertising pixels or analytics cookies. Hosting or other technical providers may use essential technologies or process technical request data to deliver and secure the website; their practices depend on their services and configuration.",
      "You can manage or disable cookies through your browser settings. Disabling certain technologies may affect how websites function. If Mintofare adds optional cookies or similar technologies, this policy should be updated to explain their purpose and any available choices.",
    ],
  },
  {
    title: "Analytics, advertising, and marketing",
    paragraphs: [
      "Mintofare does not currently configure third-party website analytics or advertising services on this website, and does not currently offer newsletter subscriptions. If these practices change, we will update this policy to describe the relevant providers, information use, and available choices before relying on them.",
    ],
  },
  {
    title: "How information may be shared",
    paragraphs: [
      "We may rely on providers such as website hosting, email, or telephone services to deliver their respective infrastructure and communications. Those providers may process information as needed to provide their services and under their own terms and privacy notices.",
      "We may also disclose information when required by law or valid legal process, to protect rights and safety, or as part of a business reorganization or transfer, subject to applicable law. We do not sell personal information submitted to us.",
    ],
  },
  {
    title: "Third-party websites",
    paragraphs: [
      "This website may link to airline, airport, travel-provider, or other external websites. When you visit an external site, its own privacy policy and practices apply. Mintofare does not control how third parties collect, secure, or use information. Review their policies before sharing personal information.",
    ],
  },
  {
    title: "Data security",
    paragraphs: [
      "We take reasonable steps appropriate to the website and information we handle to help protect it. Information sent through the internet or by email cannot be guaranteed completely secure. The contact form opens your email application, and any message you choose to send is then handled by your email provider and ours.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "We retain correspondence you send for as long as reasonably needed to respond, maintain relevant records, resolve issues, and meet legal obligations. Technical logs, if retained by hosting providers, are subject to those providers' configurations and retention practices. Retention periods may differ by information type and provider.",
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      "This website is intended for a general audience and is not designed to knowingly collect personal information directly from children where collection is prohibited by applicable law. If you believe a child has sent personal information to us, please contact us so we can review the matter and take appropriate steps.",
    ],
  },
  {
    title: "Your privacy choices and rights",
    paragraphs: [
      "Depending on your location and applicable privacy law, you may have rights to request access to, correction of, or deletion of personal information, object to or restrict certain processing, or withdraw consent where processing is based on consent. These rights may be subject to exceptions and legal requirements, and a request may require reasonable identity verification.",
      "To make a privacy request, contact support@mintofare.com. You can also choose not to contact us or provide personal information through email or phone. For browser cookie choices, use your browser settings.",
    ],
  },
  {
    title: "International visitors",
    paragraphs: [
      "Visitors may access this website from different countries. Website hosting and communications providers may process technical or correspondence information in locations where they or their infrastructure operate. Where required by applicable law, relevant safeguards for international transfers will be considered.",
    ],
  },
  {
    title: "Changes to this Privacy Policy",
    paragraphs: [
      "We may update this policy if the website, information practices, technology, or applicable legal requirements change. Updated versions will be published on this page with a revised effective date. We encourage visitors to review the policy periodically. Any changes apply as permitted by applicable law.",
    ],
  },
  {
    title: "Contact us",
    paragraphs: [
      "For questions about this Privacy Policy or our information-handling practices, contact Mintofare at support@mintofare.com or +1-877-851-6024.",
      "Business address: 1098 S Milwaukee Ave, Suite 200, Wheeling, IL 60090.",
    ],
  },
] satisfies LegalSection[];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Mintofare handles information when you browse our independent travel resources or contact us."
      updated="October 30, 2026"
      sections={sections}
    />
  );
}
