import type { Metadata, Viewport } from "next";
import { Onest, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Onest({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Mohammed Akbar K · Software Engineer: Mobile Apps & End-to-End Delivery";
const description =
  "Software engineer from Kerala who turns business problems into simple software: mobile apps first, delivered end to end with backend, web and automation.";

// Absolute base for share-card URLs. Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain;
// until then Vercel's production URL is used automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Mohammed Akbar K",
    "Software Engineer",
    "Mobile App Developer Kerala",
    "Flutter Developer",
    "Mobile App Developer",
    "Business Automation",
    "Node.js",
    "React",
  ],
  authors: [{ name: "Mohammed Akbar K" }],
  openGraph: { type: "website", locale: "en_US", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
