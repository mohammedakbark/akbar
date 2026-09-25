"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { prefersReducedMotion, scrollToId } from "@/lib/scroll";
import { socials } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Intro
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      // fromTo (not from) so end values never depend on mid-transition computed styles
      tl.fromTo("[data-status]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo("[data-name-line]", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.1 }, 0.1)
        .fromTo("[data-intro]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.45)
        .fromTo("[data-social]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, clearProps: "transform" }, 0.8)
        .fromTo("[data-scroll-cue]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1);

      // Parallax out: content lifts and fades as the hero scrolls away
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-[72px]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-[10%] top-1/4 h-[520px] w-[520px] rounded-full bg-accent/[0.08] blur-[130px]" />
      {/* Fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div ref={contentRef} className="container-x relative z-10 py-16">
        {/* Status */}
        <div
          data-status
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Available for freelance &amp; full-time work
          </span>
        </div>

        {/* Name */}
        <h1 className="mb-6 text-[2.75rem] leading-[1] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-1">
            <span data-name-line className="block text-foreground">
              Mohammed
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-name-line className="block text-gradient">
              Akbar K
            </span>
          </span>
        </h1>

        <p
          data-intro
          className="mb-4 text-lg font-medium text-foreground/90 md:text-2xl"
        >
          Software Engineer — Mobile &amp; Full-Stack
        </p>

        <p
          data-intro
          className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          I build high-performance mobile apps and scalable backends with
          Flutter, React and Node.js — from concept to launch on both stores.
          2+ years shipping production code across fintech, automotive,
          ecommerce and logistics.
        </p>

        <div data-intro className="mb-12 flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToId("projects")} className="btn-primary group">
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button type="button" onClick={() => scrollToId("contact")} className="btn-ghost">
            Get in touch
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              data-social
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="icon-btn"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
          <span data-social className="ml-2 text-sm text-muted">
            Based in Malappuram, Kerala
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        data-scroll-cue
        onClick={() => scrollToId("about")}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-foreground md:flex"
        aria-label="Scroll to About"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
