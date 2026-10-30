import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mintofare | Independent Travel Research",
  description:
    "Explore flight routes, discover destinations, and find independent travel-planning information with Mintofare.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
