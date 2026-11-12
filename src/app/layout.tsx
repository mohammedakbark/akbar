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

const title = "Mohammed Akbar K · Software Engineer";
const description =
  "Software Engineer from Kerala shipping Flutter apps to the Play Store and App Store. Mobile, real-time systems, Node.js and React.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Mohammed Akbar K",
    "Flutter Developer",
    "Software Engineer",
    "Mobile App Developer Kerala",
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
