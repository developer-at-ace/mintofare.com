import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Mintofare",
  description:
    "Learn about Mintofare, an independent platform for flight route research, destination information, and travel-planning resources.",
};

const aboutSections = [
  {
    title: "Routes, airports & destinations",
    paragraphs: [
      "Explore route information, airport details, destination context, and general journey considerations to help you prepare for a trip.",
    ],
  },
  {
    title: "Practical planning resources",
    paragraphs: [
      "Find useful resources for travel preparation and understand which details to verify with airlines or travel providers before departure.",
    ],
  },
  {
    title: "Independent by design",
    paragraphs: [
      "Mintofare is not an airline, airport, or government organization, and is not officially endorsed by an airline. Airline names and trademarks belong to their respective owners.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="legal-header">
        <Link className="legal-brand" href="/" aria-label="Mintofare home">
          <Image
            className="legal-brand-logo"
            src="/Mintofare.png"
            alt=""
            width={2172}
            height={724}
          />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/about">About us</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <Link className="legal-header-contact" href="/contact">Contact</Link>
      </header>

      <main className="legal-main">
        <div className="legal-hero">
          <p className="legal-eyebrow">INDEPENDENT TRAVEL INFORMATION</p>
          <h1>About Mintofare</h1>
          <p>
            Mintofare is an independent travel information platform designed to
            help visitors research routes, destinations, and travel-planning
            topics. Our resources can support your research and help you make
            informed decisions as you prepare for a journey.
          </p>
        </div>
        <div className="legal-sections">
          {aboutSections.map((section, index) => (
            <section className="legal-section" key={section.title}>
              <span className="legal-section-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          <aside className="legal-contact-card">
            <div>
              <p className="legal-eyebrow">READY TO PLAN?</p>
              <h2>Explore travel information for your next journey.</h2>
              <p>
                Browse route guides or contact us with general questions about
                our travel information resources.
              </p>
            </div>
            <div className="legal-contact-links">
              <Link href="/#routes">Explore route guides</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </aside>
        </div>
      </main>

      <footer className="legal-footer">
        <Link className="legal-footer-brand" href="/" aria-label="Mintofare home">
          <Image
            className="legal-footer-logo"
            src="/Mintofare.png"
            alt=""
            width={2172}
            height={724}
          />
        </Link>
        <p>
          Independent travel information. We do not operate flights, sell
          tickets, or manage reservations.
        </p>
        <nav aria-label="Website policies">
          <Link href="/about">About us</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>
        <span>© 2026 Mintofare</span>
      </footer>
    </>
  );
}
