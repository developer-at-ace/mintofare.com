"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type Ref } from "react";
import { airports, type Airport } from "@/app/data/airports";

type AirportComboboxProps = {
  id: string;
  label: string;
  value: Airport | null;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (airport: Airport | null) => void;
};

function airportLabel(airport: Airport): string {
  return `${airport.code} · ${airport.city}`;
}

export default function AirportCombobox({
  id,
  label,
  value,
  inputRef,
  onChange,
}: AirportComboboxProps) {
  const [query, setQuery] = useState(value ? airportLabel(value) : "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastValueCode = useRef(value?.code ?? null);
  const listId = `${id}-airport-options`;

  useEffect(() => {
    const nextCode = value?.code ?? null;
    if (lastValueCode.current !== nextCode) {
      lastValueCode.current = nextCode;
      setQuery(value ? airportLabel(value) : "");
    }
  }, [value]);

  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    const results = term
      ? airports.filter((airport) =>
          `${airport.code} ${airport.city} ${airport.name} ${airport.country}`
            .toLocaleLowerCase()
            .includes(term),
        )
      : airports.filter((airport) =>
          ["JFK", "LAX", "DFW", "ORD", "ATL", "MIA", "LHR", "YYZ"].includes(airport.code),
        );
    return results.slice(0, 8);
  }, [query]);

  function chooseAirport(airport: Airport) {
    lastValueCode.current = airport.code;
    setQuery(airportLabel(airport));
    setIsOpen(false);
    onChange(airport);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => matches.length ? (index + 1) % matches.length : -1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => matches.length ? (index <= 0 ? matches.length - 1 : index - 1) : -1);
    } else if (event.key === "Enter" && isOpen && matches[activeIndex]) {
      event.preventDefault();
      chooseAirport(matches[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="field airport-field">
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen && matches[activeIndex] ? `${listId}-${matches[activeIndex].code}` : undefined}
        autoComplete="off"
        value={query}
        placeholder="Search city or airport"
        onFocus={() => {
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          lastValueCode.current = null;
          setQuery(event.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
          onChange(null);
        }}
        required
      />
      {isOpen && (
        <ul className="airport-options" id={listId} role="listbox" aria-label={`${label} airport options`}>
          {matches.length > 0 ? (
            matches.map((airport, index) => (
              <li
                id={`${listId}-${airport.code}`}
                key={airport.code}
                role="option"
                aria-selected={value?.code === airport.code}
                className={index === activeIndex ? "airport-option-active" : ""}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => chooseAirport(airport)}
              >
                <span className="airport-option-code">{airport.code}</span>
                <span className="airport-option-copy">
                  <strong>{airport.name}</strong>
                  <small>{airport.city} · {airport.country}</small>
                </span>
              </li>
            ))
          ) : (
            <li className="airport-no-results" role="presentation">
              No airports found. Try a city name or three-letter airport code.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
