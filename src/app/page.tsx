"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type LenisType from "lenis";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Intro from "@/components/site/Intro";
import Work from "@/components/site/Work";
import About from "@/components/site/About";
import Experience from "@/components/site/Experience";
import Expertise from "@/components/site/Expertise";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import { ReadyContext } from "@/components/ui/ready";

export default function Home() {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<LenisType | null>(null);
  const onLoaded = useCallback(() => setReady(true), []);

  // Lenis smooth scrolling + smooth anchor links.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = 0;
    let alive = true;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      const lenis = lenisRef.current;
      if (!a || !lenis) return;
      const target = document.querySelector(a.getAttribute("href")!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 1.4 });
    };

    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      lenisRef.current = lenis;
      const raf = (t: number) => {
        lenis.raf(t);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      document.addEventListener("click", onClick);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scrolling while the preloader is on screen.
  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (ready) lenisRef.current?.start();
    else lenisRef.current?.stop();
  }, [ready]);

  return (
    <ReadyContext.Provider value={ready}>
      <Preloader onDone={onLoaded} />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <About />
        <Experience />
        <Expertise />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </ReadyContext.Provider>
  );
}
