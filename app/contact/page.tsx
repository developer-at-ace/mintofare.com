import type { Metadata } from "next";
import Image from "next/image";
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
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <Link className="legal-header-contact" href="/contact">Contact</Link>
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
                <span className="contact-detail-icon" aria-hidden="true">⌖</span>
                <div>
                  <h3>Business address</h3>
                  <p>
                    Office 5-57, Workspace Downtown
                    <br />
                    Sheikh Zayed Road, Next to the Burj Khalifa Metro Station
                    <br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </article>
            </div>

            <aside className="contact-booking-note">
              <h3>For an existing booking</h3>
              <p>Mintofare cannot access reservations or handle tickets, payments, changes, cancellations, or refunds. Contact the airline or booking provider named on your confirmation.</p>
            </aside>
          </section>

          <ContactForm />
        </div>

        <p className="contact-privacy-note">
          Please do not include sensitive personal information, full payment card details, passwords, or other confidential financial information in your message. Submitting this form opens your email application; your message is not sent to or stored by this website.
        </p>
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
        <nav aria-label="Website policies">
          <Link href="/about">About us</Link>
          <Link href="/faqs">FAQs</Link>
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
