"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Overlay wipe
      if (overlayRef.current) {
        tl.to(overlayRef.current, { scaleY: 0, duration: 1.1, ease: "power4.inOut" }, 0);
      }

      // Status line
      tl.fromTo(
        "[data-status]",
        { width: 0, opacity: 0 },
        { width: "auto", opacity: 1, duration: 0.6 },
        0.5
      );

      // Name — each line
      tl.fromTo(
        "[data-name-line]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
        0.6
      );

      // Role
      tl.fromTo(
        "[data-role]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.1
      );

      // Line
      tl.fromTo(
        "[data-line]",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6 },
        1.2
      );

      // Bio
      tl.fromTo(
        "[data-bio]",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.35
      );

      // CTAs
      tl.fromTo(
        "[data-cta]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        1.5
      );

      // Socials
      tl.fromTo(
        "[data-social]",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        1.7
      );

      // Meta
      tl.fromTo(
        "[data-meta]",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-end overflow-hidden pb-16 md:pb-20 lg:pb-24"
    >
      {/* Opening overlay wipe */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-background origin-bottom pointer-events-none"
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left: Name + Headline */}
          <div className="lg:col-span-8">
            {/* Status */}
            <div
              data-status
              className="inline-flex items-center gap-3 mb-8 opacity-0"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Available for work
              </span>
            </div>

            {/* Name — split lines */}
            <h1 className="mb-6">
              <span className="block overflow-hidden">
                <span
                  data-name-line
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] opacity-0"
                >
                  Mohammed
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-name-line
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] opacity-0"
                >
                  <span className="text-gradient">Akbar K</span>
                </span>
              </span>
            </h1>

            {/* Role */}
            <p
              data-role
              className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide mb-8 opacity-0"
            >
              Software Engineer &mdash; Mobile &amp; Full-Stack
            </p>

            {/* Line */}
            <div
              data-line
              className="h-px w-24 bg-accent/50 origin-left mb-8"
              style={{ transform: "scaleX(0)" }}
            />

            {/* Bio */}
            <p
              data-bio
              className="max-w-xl text-[#999] text-base md:text-lg leading-relaxed mb-10 opacity-0"
            >
              I build high-performance mobile apps and scalable backends.
              Flutter, React, Node.js — from concept to deployment on both
              stores. 2+ years shipping production code across fintech,
              automotive, ecommerce, and logistics.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                data-cta
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white uppercase tracking-widest transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(107,91,149,0.3)] opacity-0"
              >
                View Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                data-cta
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white uppercase tracking-widest transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 opacity-0"
              >
                Get in Touch
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Socials + Meta */}
          <div className="lg:col-span-4 flex lg:flex-col items-end lg:items-end justify-between lg:justify-end gap-8">
            {/* Socials — vertical on desktop */}
            <div className="flex lg:flex-col gap-4">
              <a
                href="https://github.com/mohammedakbark"
                target="_blank"
                rel="noopener noreferrer"
                data-social
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-accent/10 opacity-0"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-akbar-k/"
                target="_blank"
                rel="noopener noreferrer"
                data-social
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-accent/10 opacity-0"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/akbarr.k_?igsh=MTM1aG05andubzVheQ=="
                target="_blank"
                rel="noopener noreferrer"
                data-social
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-accent/10 opacity-0"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href="mailto:makbarkozhikkal@gmail.com"
                data-social
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-accent/10 opacity-0"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
            </div>

            {/* Meta */}
            <div data-meta className="text-right opacity-0">
              <p className="text-xs text-[#555] tracking-wider uppercase mb-1">
                Based in
              </p>
              <p className="text-sm text-[#999] font-medium">
                Malappuram, Kerala
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
