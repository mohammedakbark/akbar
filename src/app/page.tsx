"use client";

import { useEffect, Suspense } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Achievements from "@/components/sections/Achievements";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

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
 * - Handles smooth scrolling (Lenis) and GSAP ScrollTrigger integration
 */
export default function Home() {
  useEffect(() => {
    let lenis: { on: (e: string, fn: () => void) => void; raf: (t: number) => void; destroy: () => void };
    let rafId: number;

    const initLenisAndScrollTrigger = async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      });

      lenis.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    initLenisAndScrollTrigger();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, []);

  return (
    <>
      {/* Enhanced 3D Background with Three.js */}
      <Suspense fallback={null}>
        <EnhancedBackground />
      </Suspense>

      {/* Fixed Navigation Component */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="bg-background text-foreground">
        {/* Hero Section with 3D Background */}
        <section id="hero" className="relative w-full">
          <Hero />
        </section>

        {/* About & Skills Section */}
        <section id="about" className="relative w-full bg-background">
          <About />
        </section>

        {/* Services Section */}
        <section id="services" className="relative w-full">
          <Services />
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="relative w-full bg-background">
          <Achievements />
        </section>

        {/* Experience Timeline Section */}
        <section id="experience" className="relative w-full">
          <Experience />
        </section>

        {/* Projects Showcase Section */}
        <section id="projects" className="relative w-full">
          <Projects />
        </section>

        {/* Testimonials Section
        <section id="testimonials" className="relative w-full bg-background">
          <Testimonials />
        </section> */}

        {/* Contact Section */}
        <section id="contact" className="relative w-full">
          <Contact />
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
