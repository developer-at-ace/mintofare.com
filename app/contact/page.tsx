import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Mintofare",
  description:
    "Contact Mintofare with questions or feedback about our independent travel information and planning resources.",
};

export default function ContactPage() {
  return (
    <>
      <header className="legal-header">
        <Link className="legal-brand" href="/" aria-label="Mintofare home">
          <span className="legal-brand-mark" aria-hidden="true">F</span>
          <span>Mintofare</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#routes">Route research</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </nav>
        <a className="legal-header-phone" href="tel:+1-877-851-6024">+1-877-851-6024</a>
      </header>

      <main className="contact-main">
        <section className="contact-hero">
          <p className="legal-eyebrow">MINTOFARE · WE’RE HERE TO HELP</p>
          <h1>We’d love to<br /><span>hear from you.</span></h1>
          <p>Have a question about our travel information resources or general trip-planning guidance? Send us a note or reach out using the contact details below.</p>
        </section>

        <div className="contact-layout">
          <section className="contact-details" aria-labelledby="contact-details-title">
            <p className="legal-eyebrow">GET IN TOUCH</p>
            <h2 id="contact-details-title">General inquiries</h2>
            <p>We welcome questions and feedback about this website, our destination information, flight route resources, and general travel-planning content.</p>

            <div className="contact-detail-list">
              <article className="contact-detail">
                <span className="contact-detail-icon" aria-hidden="true">@</span>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:support@mintofare.com">support@mintofare.com</a>
                </div>
              </article>
              <article className="contact-detail">
                <span className="contact-detail-icon" aria-hidden="true">☎</span>
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+1-877-851-6024">+1-877-851-6024</a>
                  <p>For general travel information</p>
                </div>
              </article>
              <article className="contact-detail">
                <span className="contact-detail-icon" aria-hidden="true">⌖</span>
                <div>
                  <h3>Business address</h3>
                  <p>1098 S Milwaukee Ave, Suite 200<br />Wheeling, IL 60090</p>
                </div>
              </article>
            </div>

            <aside className="contact-booking-note">
              <h3>Need help with an existing booking?</h3>
              <p>Mintofare does not manage airline reservations. For tickets, payments, cancellations, refunds, or flight changes, contact the airline or booking provider responsible for your reservation.</p>
            </aside>
          </section>

          <ContactForm />
        </div>

        <p className="contact-privacy-note">
          Please do not include sensitive personal information, full payment card details, passwords, or other confidential financial information in your message. Submitting this form opens your email application; your message is not sent to or stored by this website.
        </p>
      </main>

      <footer className="legal-footer">
        <Link className="legal-footer-brand" href="/">Mintofare</Link>
        <p>Independent travel information. We do not operate flights, sell tickets, or manage reservations.</p>
        <nav aria-label="Website policies">
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
