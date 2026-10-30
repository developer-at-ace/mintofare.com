"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:support@mintofare.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with your message. Review and send it there; if it does not open, email support@mintofare.com.");
  }

  return (
    <section className="contact-form-card" aria-labelledby="contact-form-title">
      <div className="contact-form-heading">
        <p className="legal-eyebrow">SEND A MESSAGE</p>
        <h2 id="contact-form-title">How can we help?</h2>
        <p>Share a few details and we’ll prepare an email for you to review and send.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          <span>Subject</span>
          <input name="subject" type="text" maxLength={150} required />
        </label>
        <label>
          <span>Your message</span>
          <textarea name="message" rows={5} maxLength={3000} required />
        </label>
        <button type="submit">Continue to email <span aria-hidden="true">↗</span></button>
        {status && <p className="contact-form-status" role="status">{status}</p>}
      </form>
    </section>
  );
}
