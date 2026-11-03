import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mintofare | Independent Travel Research",
  description:
    "Explore flight routes, discover destinations, and find independent travel-planning information with Mintofare.",
  icons: {
    icon: "/Mintofare.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script id="google-ads-gtag-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18527164363');
gtag('config', 'AW-18527164363/y9vGCKm5tLEdEMuvuIJF', {
  'phone_conversion_number': '(866) 622-2001'
});`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18527164363"
        strategy="beforeInteractive"
        async
      />
    </html>
  );
}
