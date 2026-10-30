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
          <Link href="/#routes">Route research</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a className="legal-header-phone" href="tel:+1-877-851-6024">+1-877-851-6024</a>
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
              <h2>We’re here for general travel questions.</h2>
              <p>For a reservation you already made, contact the airline or booking provider shown on your confirmation.</p>
            </div>
            <div className="legal-contact-links">
              <a href="mailto:support@mintofare.com">support@mintofare.com</a>
              <a href="tel:+1-877-851-6024">+1-877-851-6024</a>
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
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/cancellation-refund">Cancellation &amp; Refund</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
        <span>© 2026 Mintofare</span>
      </footer>
    </>
  );
}
