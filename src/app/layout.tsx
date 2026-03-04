import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Akbar K - Software Engineer",
  description:
    "Premium, interactive portfolio of Mohammed Akbar K, Software Engineer from Malappuram, Kerala. Showcasing 2+ years of full-stack development expertise in mobile applications, Flutter, Node.js, and more.",
  keywords: [
    "Software Developer",
    "Flutter Developer",
    "Full Stack Engineer",
    "Mobile Apps",
    "React",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Akbar K", url: "https://akbarportfolio.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akbarportfolio.com",
    title: "Mohammed Akbar K - Software Engineer",
    description:
      "Passionate software developer specializing in cross-platform mobile applications and full-stack development",
    images: [
      {
        url: "https://akbarportfolio.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Akbar K - Software Engineer",
    description:
      "Passionate software developer specializing in cross-platform mobile applications",
  },
  alternates: {
    canonical: "https://akbarportfolio.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
