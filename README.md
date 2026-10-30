This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Flight search API

The flight search form navigates to `/flight-results` with the selected search criteria. That dedicated results page calls the server-side `GET /api/flights/search` route. Copy `.env.example` to `.env.local` and fill in the credentials and site values issued by the flight-search provider. Keep these values on the server; do not use `NEXT_PUBLIC_` variables for credentials. The password query parameter defaults to `password` and can be changed with `FLIGHT_API_PASSWORD_PARAM` to match the provider's API specification.

Airport fields search the bundled popular-airport directory by city, airport name, or code and submit the selected IATA codes. The endpoint accepts `tripType` (`oneway` or `roundtrip`), `origin`, `destination`, `departureDate` (`YYYY-MM-DD`), `returnDate` for round trips, `adults` (1-9), `children`, `infants` (maximum 9 travelers total; each infant must travel with an adult), and `cabin` (`ECONOMY`, `PREMIUM_ECONOMY`, `BUSINESS`, or `FIRST`). Results can be sorted by price or departure time and filtered to nonstop itineraries. The API returns provider flight offers; this site does not book flights or process payments.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
