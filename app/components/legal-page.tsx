import Image from "next/image";
import Link from "next/link";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalPage({
  title,
  description,
  updated,
  sections,
}: LegalPageProps) {
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
          <Link href="/">Home</Link>
          <Link href="/about">About us</Link>
          <Link href="/#routes">Route research</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <Link className="legal-header-contact" href="/contact">Contact</Link>
      </header>

      <main className="legal-main">
        <div className="legal-hero">
          <p className="legal-eyebrow">MINTOFARE · TRAVEL INFORMATION</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <p className="legal-updated">Last updated: {updated}</p>
        </div>
        <div className="legal-sections">
          {sections.map((section, index) => (
            <section className="legal-section" key={section.title}>
              <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
          <aside className="legal-contact-card">
            <div>
              <p className="legal-eyebrow">NEED TO GET IN TOUCH?</p>
              <h2>Questions about this website?</h2>
              <p>Mintofare publishes general travel information. We cannot access reservations or provide booking, change, cancellation, or refund support.</p>
            </div>
            <div className="legal-contact-links">
              <a href="mailto:support@mintofare.com">support@mintofare.com</a>
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
        <p>Independent travel information. We do not operate flights, sell tickets, or manage reservations.</p>
        <nav aria-label="Legal pages">
          <Link href="/faqs">FAQs</Link>
          <Link href="/travel-assistance">Travel assistance</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/cancellation-refund">Booking changes &amp; refunds</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
        <span>© 2026 Mintofare</span>
      </footer>
    </>
  );
}
