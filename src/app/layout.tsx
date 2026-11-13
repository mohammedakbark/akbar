import type { Metadata, Viewport } from "next";
import { Onest, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";
import { siteUrl } from "@/data/site";
import JsonLd from "@/components/site/JsonLd";

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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// siteUrl (from content.ts) is the absolute base for canonical and share-card URLs.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Mohammed Akbar K",
    "Software Engineer",
    "Mobile App Developer Kerala",
    "Flutter Developer",
    "Flutter Developer Kerala",
    "Flutter Developer Malappuram",
    "Mobile App Developer",
    "Freelance Mobile App Developer India",
    "Hire Flutter Developer",
    "Business Automation",
    "Node.js",
    "React",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", url: "/", siteName: profile.name, title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
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
        <JsonLd />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
