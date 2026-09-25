"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { prefersReducedMotion, setLenis } from "@/lib/scroll";

/**
 * Dynamically import 3D components to avoid SSR issues
 */
const EnhancedBackground = dynamic(
  () => import("@/components/3d/EnhancedBackground"),
  { ssr: false, loading: () => null }
);

/**
 * Main Page Component
 * - Orchestrates all major sections of the portfolio
 * - Drives Lenis smooth scrolling from the GSAP ticker so ScrollTrigger stays in sync
 */
export default function Home() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <>
      <EnhancedBackground />
      <ScrollProgress />
      <Navigation />

      <main className="text-foreground">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
