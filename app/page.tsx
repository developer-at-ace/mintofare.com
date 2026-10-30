"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AirportCombobox from "@/app/components/airport-combobox";
import { airports, type Airport } from "@/app/data/airports";

const routes = [
  {
    from: "Dallas",
    to: "New York",
    fromCode: "DFW",
    toCode: "JFK",
    fromAirport: "Dallas Fort Worth",
    toAirport: "John F. Kennedy",
    detail: "Review airport details for a trip between North Texas and New York.",
  },
  {
    from: "Los Angeles",
    to: "New York",
    fromCode: "LAX",
    toCode: "JFK",
    fromAirport: "Los Angeles Intl.",
    toAirport: "John F. Kennedy",
    detail: "Explore airport information for this popular coast-to-coast city pair.",
  },
  {
    from: "Chicago",
    to: "Miami",
    fromCode: "ORD",
    toCode: "MIA",
    fromAirport: "O'Hare Intl.",
    toAirport: "Miami Intl.",
    detail: "Compare airport details when planning a trip from Chicago to South Florida.",
  },
  {
    from: "Miami",
    to: "New York",
    fromCode: "MIA",
    toCode: "LGA",
    fromAirport: "Miami Intl.",
    toAirport: "LaGuardia",
    detail: "Get familiar with the airports serving this busy East Coast connection.",
  },
  {
    from: "Atlanta",
    to: "Orlando",
    fromCode: "ATL",
    toCode: "MCO",
    fromAirport: "Hartsfield-Jackson",
    toAirport: "Orlando Intl.",
    detail: "Find airport information for travel between Atlanta and Central Florida.",
  },
  {
    from: "Los Angeles",
    to: "Las Vegas",
    fromCode: "LAX",
    toCode: "LAS",
    fromAirport: "Los Angeles Intl.",
    toAirport: "Harry Reid Intl.",
    detail: "Check airport details before planning a visit to Las Vegas from Los Angeles.",
  },
];

const faqs = [
  {
    question: "What is Mintofare?",
    answer:
      "Mintofare is an independent platform offering general travel information, flight route research, and destination resources.",
  },
  {
    question: "Can I book a flight on Mintofare?",
    answer:
      "Mintofare provides independent travel information. Bookings are completed directly through the relevant airline or travel provider.",
  },
  {
    question: "Is Mintofare affiliated with airlines?",
    answer:
      "No. Mintofare operates independently and is not officially affiliated with an airline unless expressly stated.",
  },
  {
    question: "How can I contact Mintofare?",
    answer:
      "Visit our Contact Us page for general inquiries and website assistance. We cannot access or change airline reservations.",
  },
];

const services = [
  {
    icon: "route",
    title: "Flight route research",
    description:
      "Explore popular routes, airport information, and general journey details.",
  },
  {
    icon: "globe",
    title: "Destination guides",
    description:
      "Discover useful destination information and general travel considerations.",
  },
  {
    icon: "compass",
    title: "Travel planning",
    description:
      "Find resources to prepare for your journey and know what to verify.",
  },
  {
    icon: "headset",
    title: "Travel information assistance",
    description:
      "Find general guidance and relevant resources for travel-related questions.",
  },
];

const airportsByCode = new Map(airports.map((airport) => [airport.code, airport]));

function ServiceIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    route: (
      <>
        <path d="M5 18.5c2-7.5 5.2-11 9.5-10.3 4.1.7 5.4 7.7 9.5 7.7 2 0 3.7-1.4 5-4" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="29" cy="11" r="2" />
      </>
    ),
    globe: (
      <>
        <circle cx="17" cy="16" r="12" />
        <path d="M5 16h24M17 4c3 3.3 4.5 7.3 4.5 12S20 24.7 17 28c-3-3.3-4.5-7.3-4.5-12S14 7.3 17 4Z" />
      </>
    ),
    compass: (
      <>
        <circle cx="17" cy="16" r="12" />
        <path d="m21.8 11.2-3.1 7.5-7.5 3.1 3.1-7.5 7.5-3.1Z" />
      </>
    ),
    headset: (
      <>
        <path d="M5 17v-2a12 12 0 0 1 24 0v2" />
        <path d="M5 17h5v9H8a3 3 0 0 1-3-3v-6Zm24 0h-5v9h2a3 3 0 0 0 3-3v-6ZM17 28h3" />
      </>
    ),
  };
  return (
    <svg
      className="service-icon"
      viewBox="0 0 34 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function getLocalDateString() {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function Home() {
  const router = useRouter();
  const [from, setFrom] = useState<Airport | null>(null);
  const [to, setTo] = useState<Airport | null>(null);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState("Economy");
  const [passengerMenuOpen, setPassengerMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchError, setSearchError] = useState("");
  const [isNavigatingToResults, setIsNavigatingToResults] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [minimumDate, setMinimumDate] = useState("");
  const departureInputRef = useRef<HTMLInputElement>(null);
  const totalTravelers = adults + children + infants;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchError("");
    if (!from || !to) {
      setSearchError("Choose an airport from the dropdown for both departure and destination.");
      return;
    }
    if (from.code === to.code) {
      setSearchError("Choose two different airports.");
      return;
    }

    const params = new URLSearchParams({
      tripType: tripType === "round-trip" ? "roundtrip" : "oneway",
      origin: from.code,
      destination: to.code,
      departureDate,
      returnDate,
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      cabin: cabin.toUpperCase().replaceAll(" ", "_"),
    });

    setIsNavigatingToResults(true);
    router.push(`/flight-results?${params.toString()}`);
  }

  function changeTravelerCount(type: "adults" | "children" | "infants", amount: number) {
    const current = type === "adults" ? adults : type === "children" ? children : infants;
    const next = current + amount;
    const minimum = type === "adults" ? 1 : 0;
    if (next < minimum || totalTravelers + amount > 9) {
      return;
    }
    if ((type === "adults" && next < infants) || (type === "infants" && next > adults)) {
      return;
    }
    if (type === "adults") setAdults(next);
    if (type === "children") setChildren(next);
    if (type === "infants") setInfants(next);
  }

  function selectRoute(originCode: string, destinationCode: string) {
    const origin = airportsByCode.get(originCode);
    const destination = airportsByCode.get(destinationCode);
    if (!origin || !destination) {
      return;
    }
    setFrom(origin);
    setTo(destination);
    document.querySelector("#flight-search")?.scrollIntoView({ behavior: "smooth" });
    requestAnimationFrame(() => departureInputRef.current?.focus({ preventScroll: true }));
  }

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  function handleDepartureDateChange(value: string) {
    setDepartureDate(value);
    if (returnDate && value > returnDate) {
      setReturnDate("");
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Mintofare home">
            <Image
              className="brand-logo"
              src="/Mintofare.png"
              alt=""
              width={2172}
              height={724}
            />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#routes">Flight guides</a>
            <a href="#services">Travel planning</a>
            <Link href="/about">About us</Link>
            <Link href="/faqs">FAQs</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
          <div className="header-actions">
            <a className="phone-pill" href="tel:+1-877-851-6024">
              <span className="phone-icon" aria-hidden="true">☎</span>
              <span>+1-877-851-6024</span>
            </a>
            <button
              className={`menu-toggle${navOpen ? " is-open" : ""}`}
              type="button"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          {navOpen && (
            <nav className="nav-popover" aria-label="Main navigation">
              <a href="#services" onClick={() => setNavOpen(false)}>What we offer</a>
              <a href="#routes" onClick={() => setNavOpen(false)}>Route research</a>
              <Link href="/about" onClick={() => setNavOpen(false)}>About us</Link>
              <Link href="/faqs" onClick={() => setNavOpen(false)}>FAQs</Link>
              <Link href="/contact" onClick={() => setNavOpen(false)}>Contact Us</Link>
            </nav>
          )}
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="sky-art" aria-hidden="true">
            <svg className="route-map-art" viewBox="0 0 1440 680" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M48 0H0V48" fill="none" stroke="#D8EEF0" strokeOpacity=".12" />
                </pattern>
              </defs>
              <rect width="1440" height="680" fill="url(#map-grid)" />
              <path d="M830 460C870 380 921 320 1004 337c81 17 95 92 166 62 57-24 63-104 143-132" fill="none" stroke="#B8DCE2" strokeOpacity=".3" strokeWidth="1.5" />
              <path d="M915 560c61-94 114-154 191-141 74 13 83 65 144 47 42-13 73-58 110-113" fill="none" stroke="#B8DCE2" strokeOpacity=".19" strokeWidth="1.5" />
              <path d="M815 465c132-154 252-139 337-63s143 78 250-92" fill="none" stroke="#F2C28E" strokeDasharray="5 9" strokeOpacity=".83" strokeWidth="2" />
              <circle cx="815" cy="465" r="5" fill="#F2C28E" />
              <circle cx="815" cy="465" r="12" fill="none" stroke="#F2C28E" strokeOpacity=".34" />
              <circle cx="1402" cy="310" r="5" fill="#F2C28E" />
              <circle cx="1402" cy="310" r="12" fill="none" stroke="#F2C28E" strokeOpacity=".34" />
              <g transform="translate(1139 369) rotate(34)">
                <path d="m0-12 3.2 9.2 10.1 3.2v2.2l-9.4-1.1 1.8 7-3.1-1.8-2.6-5.7-2.6 5.7-3.1 1.8 1.8-7-9.4 1.1v-2.2l10.1-3.2L0-12Z" fill="#F7FBFA" />
              </g>
            </svg>
          </div>

          <div className="hero-content">
            <div className="hero-lead">
              <div className="hero-copy">
                <h1 id="hero-title">
                  Your journey starts<br /><em>with better information.</em>
                </h1>
               <b> 
                <p className="hero-intro">
                  Explore flight routes, discover destinations, and access helpful travel-planning resources—all in one place to help you prepare for your next journey.
                </p>
                </b>
              </div>
            </div>

            <form className="search-card" id="flight-search" onSubmit={handleSearch}>
              <div className="trip-tabs" role="group" aria-label="Trip type">
                <button
                  type="button"
                  className={tripType === "one-way" ? "active" : ""}
                  aria-pressed={tripType === "one-way"}
                  onClick={() => setTripType("one-way")}
                >
                  One way
                </button>
                <button
                  type="button"
                  className={tripType === "round-trip" ? "active" : ""}
                  aria-pressed={tripType === "round-trip"}
                  onClick={() => setTripType("round-trip")}
                >
                  Round trip
                </button>
              </div>

              <div className="search-fields">
                <AirportCombobox
                  inputRef={departureInputRef}
                  id="departure-city"
                  label="From"
                  value={from}
                  onChange={setFrom}
                />
                <button
                  className="swap-mark"
                  type="button"
                  aria-label="Swap departure and destination"
                  title="Swap departure and destination"
                  onClick={swapAirports}
                >
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 6h11m0 0-3-3m3 3-3 3M16 14H5m0 0 3 3m-3-3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AirportCombobox
                  id="destination-city"
                  label="To"
                  value={to}
                  onChange={setTo}
                />
                <label className="field">
                  <span>Depart</span>
                  <input
                    name="departure"
                    type="date"
                    aria-label="Departure date"
                    min={minimumDate || undefined}
                    value={departureDate}
                    onFocus={() => setMinimumDate((current) => current || getLocalDateString())}
                    onChange={(event) => handleDepartureDateChange(event.target.value)}
                    required
                  />
                </label>
                <label className={`field${tripType === "one-way" ? " field-disabled" : ""}`}>
                  <span>Return</span>
                  <input
                    name="return"
                    type="date"
                    aria-label="Return date"
                    min={departureDate || minimumDate || undefined}
                    value={returnDate}
                    onFocus={() => setMinimumDate((current) => current || getLocalDateString())}
                    onChange={(event) => setReturnDate(event.target.value)}
                    disabled={tripType === "one-way"}
                    required={tripType === "round-trip"}
                  />
                </label>
                <div className="field passenger-field">
                  <span>Travelers &amp; cabin</span>
                  <button
                    className="passenger-trigger"
                    type="button"
                    aria-expanded={passengerMenuOpen}
                    onClick={() => setPassengerMenuOpen((open) => !open)}
                  >
                    <span>{totalTravelers} {totalTravelers === 1 ? "traveler" : "travelers"} · {cabin}</span>
                    <span className="chevron" aria-hidden="true" />
                  </button>
                  {passengerMenuOpen && (
                    <div className="passenger-popover">
                      {([
                        { type: "adults", title: "Adults", detail: "Age 12+", count: adults, minimum: 1 },
                        { type: "children", title: "Children", detail: "Ages 2–11", count: children, minimum: 0 },
                        { type: "infants", title: "Infants", detail: "Under age 2 · one per adult", count: infants, minimum: 0 },
                      ] as const).map((traveler) => (
                        <div className="passenger-row" key={traveler.type}>
                          <div>
                            <strong>{traveler.title}</strong>
                            <small>{traveler.detail}</small>
                          </div>
                          <div className="stepper">
                            <button
                              type="button"
                              aria-label={`Remove one ${traveler.title.toLowerCase()}`}
                              disabled={traveler.count <= traveler.minimum}
                              onClick={() => changeTravelerCount(traveler.type, -1)}
                            >−</button>
                            <span>{traveler.count}</span>
                            <button
                              type="button"
                              aria-label={`Add one ${traveler.title.toLowerCase()}`}
                              disabled={totalTravelers >= 9 || (traveler.type === "infants" && infants >= adults)}
                              onClick={() => changeTravelerCount(traveler.type, 1)}
                            >+</button>
                          </div>
                        </div>
                      ))}
                      <label className="cabin-select">
                        <span>Cabin class</span>
                        <select value={cabin} onChange={(event) => setCabin(event.target.value)}>
                          <option>Economy</option>
                          <option>Premium economy</option>
                          <option>Business</option>
                          <option>First</option>
                        </select>
                      </label>
                      <button
                        className="popover-done"
                        type="button"
                        onClick={() => setPassengerMenuOpen(false)}
                      >Done</button>
                    </div>
                  )}
                </div>
              </div>

              <button className="search-submit" type="submit" disabled={isNavigatingToResults} aria-busy={isNavigatingToResults}>
                <span>{isNavigatingToResults ? "Opening flight results..." : "Search flights"}</span>
                <span className="submit-arrow" aria-hidden="true">↗</span>
              </button>
              <p className="search-disclaimer">
                Live search results are informational; prices and availability can change. Bookings are not made here.
              </p>
              {searchError && <p className="search-notice search-error" role="alert">{searchError}</p>}
            </form>

            <div className="trust-note">
              <span className="trust-check" aria-hidden="true">✓</span>
              <span>Free to explore <i /> Independent information <i /> No booking pressure</span>
            </div>
          </div>
        </section>

        <section className="route-ribbon" aria-label="Sample routes to research">
          <div className="route-ribbon-inner">
            <div className="route-ribbon-intro">
              <span className="route-ribbon-label">ROUTE IDEAS</span>
              <span>A few airport pairs to explore</span>
            </div>
            <div className="route-ribbon-links">
              {routes.slice(0, 4).map((route) => (
                <button
                  type="button"
                  key={`${route.fromCode}-${route.toCode}`}
                  onClick={() => selectRoute(route.fromCode, route.toCode)}
                  aria-label={`Research route from ${route.from} to ${route.to}`}
                >
                  <span>{route.fromCode}</span>
                  <span className="route-ribbon-arrow" aria-hidden="true">→</span>
                  <span>{route.toCode}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="inspiration-section" aria-labelledby="inspiration-title">
          <div className="inspiration-heading">
            <div>
              <p className="eyebrow">A LITTLE TRAVEL INSPIRATION</p>
              <h2 id="inspiration-title">The world is <em>wide open.</em></h2>
            </div>
            <p>Wherever you’re headed, start with the details that make a trip feel like yours.</p>
          </div>
          <div className="inspiration-grid">
            <a className="inspiration-card" href="#routes">
              <Image
                src="/travel/city-break.jpg"
                alt="City skyline glowing in the late afternoon"
                width={900}
                height={600}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <span className="inspiration-shade" aria-hidden="true" />
              <span className="inspiration-copy">
                <small>URBAN EXPLORING</small>
                <strong>Find your city rhythm</strong>
                <span>Explore route guides <span aria-hidden="true">↗</span></span>
              </span>
            </a>
            <a className="inspiration-card" href="#routes">
              <Image
                src="/travel/mountain-escape.jpg"
                alt="Mountain lake surrounded by forest and peaks"
                width={900}
                height={600}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <span className="inspiration-shade" aria-hidden="true" />
              <span className="inspiration-copy">
                <small>OUTDOOR GETAWAYS</small>
                <strong>Make room for wonder</strong>
                <span>Explore route guides <span aria-hidden="true">↗</span></span>
              </span>
            </a>
            <a className="inspiration-card" href="#flight-search">
              <Image
                src="/travel/traveler-view.jpg"
                alt="Travelers taking in a mountain landscape"
                width={900}
                height={600}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <span className="inspiration-shade" aria-hidden="true" />
              <span className="inspiration-copy">
                <small>YOUR NEXT ADVENTURE</small>
                <strong>Go where curiosity leads</strong>
                <span>Start planning <span aria-hidden="true">↗</span></span>
              </span>
            </a>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <p className="eyebrow">YOUR TRIP, BETTER INFORMED</p>
            <h2>Helpful information for <em>your journey.</em></h2>
            <p>
            We bring together useful travel information to help you research routes, discover destinations, and prepare for your next journey.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className={`service-icon-wrap service-tone-${index + 1}`}>
                  <ServiceIcon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="card-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section routes-section" id="routes">
          <div className="section-heading routes-heading">
            <div>
              <p className="eyebrow">AIRPORT-TO-AIRPORT GUIDES</p>
              <h2>Start with a <em>route.</em></h2>
              <p>Explore airport pairs and the practical details worth checking before booking.</p>
            </div>
            <a className="text-link" href="#flight-search">
              Plan a different route <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="route-grid">
            {routes.map((route, index) => (
              <article className="route-card" key={`${route.from}-${route.to}`}>
                <div className="route-card-top">
                  <span className="route-kicker"><span /> ROUTE GUIDE</span>
                  <span className="route-number">0{index + 1}</span>
                </div>
                <div className="airport-pair" aria-label={`${route.fromAirport} airport ${route.fromCode} to ${route.toAirport} airport ${route.toCode}`}>
                  <div className="airport-stop">
                    <span className="airport-code">{route.fromCode}</span>
                    <span className="airport-name">{route.fromAirport}</span>
                  </div>
                  <div className="route-track" aria-hidden="true">
                    <span className="route-endpoint" />
                    <span className="route-dashed-line" />
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="m2 10 16-6-5 12-3-5-8-1Z" fill="currentColor" />
                    </svg>
                    <span className="route-dashed-line" />
                    <span className="route-endpoint" />
                  </div>
                  <div className="airport-stop airport-arrival">
                    <span className="airport-code">{route.toCode}</span>
                    <span className="airport-name">{route.toAirport}</span>
                  </div>
                </div>
                <h3>{route.from} <span>to</span> {route.to}</h3>
                <p>{route.detail}</p>
                <div className="route-card-bottom">
                  <span className="route-guide-label">AIRPORT INFORMATION</span>
                  <button
                    className="route-link"
                    type="button"
                    aria-label={`Research flights from ${route.from} to ${route.to}`}
                    onClick={() => selectRoute(route.from, route.to)}
                  >
                    Explore <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-wrap" id="about">
          <div className="about-section">
            <div className="about-copy">
                <p className="eyebrow">INDEPENDENT TRAVEL INFORMATION</p>
                <h2>Explore. Research. Plan.<br /><em>Travel with confidence.</em></h2>
              <p className="about-description">
                  Mintofare is an independent travel information platform designed to help visitors research routes, destinations, and travel-planning topics. Whether you are preparing for a business trip, family vacation, or leisure journey, our resources can support your research and help you make informed decisions.
              </p>
                <a className="about-link" href="#flight-search">Plan your next journey <span aria-hidden="true">↗</span></a>
            </div>
            <div className="about-points">
              <article>
                <span className="about-point-icon" aria-hidden="true">01</span>
                <div>
                  <h3>Routes, airports &amp; destinations</h3>
                  <p>Explore route information, airport details, destination context, and general journey considerations.</p>
                </div>
              </article>
              <article>
                <span className="about-point-icon" aria-hidden="true">02</span>
                <div>
                  <h3>Practical planning resources</h3>
                  <p>Access useful resources for travel preparation and understand which details to verify before departure.</p>
                </div>
              </article>
              <article>
                <span className="about-point-icon" aria-hidden="true">03</span>
                <div>
                  <h3>Independent by design</h3>
                  <p>We are not an airline, airport, or government organization, and are not officially endorsed by an airline. Airline names and trademarks belong to their respective owners.</p>
                </div>
              </article>
            </div>
            <span className="about-orbit orbit-one" aria-hidden="true" />
            <span className="about-orbit orbit-two" aria-hidden="true" />
          </div>
          <p className="operator-disclosure">
            Mintofare.com is operated by{" "}
            <strong>BURJ ALSAHRAA FOR PROJECT MANAGEMENT SERVICES CO.</strong>
          </p>
        </section>

        <section className="section faq-section" id="faq">
          <div className="faq-intro">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Good to know<br /><em>before you go.</em></h2>
            <p>
              Find quick answers about our website, travel information, and planning resources.
            </p>
            <a className="faq-contact" href="/faqs">
              Browse all FAQs <span aria-hidden="true">↗</span>
            </a>
            <a className="faq-contact" href="/contact">
              Still have questions? Contact us <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faq-item${isOpen ? " faq-open" : ""}`} key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
                      <span>{faq.question}</span>
                      <span className="faq-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                  </h3>
                  {isOpen && <p className="faq-answer">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#top" aria-label="Mintofare home">
              <Image
                className="brand-logo"
                src="/Mintofare.png"
                alt=""
                width={2172}
                height={724}
              />
            </a>
            <p>Independent flight route research, destination information, and general travel-planning resources to help you make informed decisions.</p>
            <a className="footer-phone" href="tel:+1-877-851-6024">
              <span aria-hidden="true">☎</span> +1-877-851-6024
            </a>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <Link href="/about">About us</Link>
            <a href="#services">Travel assistance</a>
            <Link href="/contact">Contact us</Link>
            <Link href="/faqs">Frequently asked questions</Link>
          </div>
          <div className="footer-column">
            <h3>Get in touch</h3>
            <a href="/contact">Contact us</a>
            <a href="tel:+1-877-851-6024">+1-877-851-6024</a>
            <a href="mailto:support@mintofare.com">support@mintofare.com</a>
            <p>1098 S Milwaukee Ave, Suite 200<br />Wheeling, IL 60090</p>
          </div>
          <div className="footer-column">
            <h3>Policies</h3>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/cancellation-refund">Cancellation &amp; Refund</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/faqs">Frequently Asked Questions</a>
          </div>
          <a className="back-top" href="#top" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-disclaimer">
          <strong>A note on independent travel information</strong>
          <p>
            Mintofare provides general travel research and planning information. We do not operate flights, issue tickets, manage bookings, or provide official support for any airline. Always confirm current travel details with your chosen provider.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Mintofare. All rights reserved.</span>
          <span>Independent information for curious travelers.</span>
        </div>
      </footer>
    </>
  );
}
