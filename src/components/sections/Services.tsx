"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Mobile App\nDevelopment",
    description:
      "Android & iOS apps with Flutter — one codebase, both platforms. High-performance mobile experiences, clean architecture, from UI/UX to Play Store and App Store deployment.",
    accent: "#6B5B95",
  },
  {
    number: "02",
    title: "Web\nDevelopment",
    description:
      "Responsive websites and web apps that convert. React, Next.js, fast and SEO-friendly, mobile-first so your product works everywhere.",
    accent: "#7B6BA5",
  },
  {
    number: "03",
    title: "Backend / API\nDevelopment",
    description:
      "APIs and server logic that scale. Node.js, Firebase, REST APIs, database design, authentication and security — the foundation your app needs.",
    accent: "#8B7BB5",
  },
  {
    number: "04",
    title: "App\nPublishing",
    description:
      "Get your app on Play Store & App Store. Submission, store assets, listing copy and guidelines so you can go live without the hassle.",
    accent: "#5B4B85",
  },
  {
    number: "05",
    title: "Maintenance\n& Support",
    description:
      "Ongoing updates, bug fixes and feature additions. Long-term support so your app stays fast, secure and aligned with your business.",
    accent: "#9B8BC5",
  },
];

const TOTAL_PANELS = 7; // heading + 5 services + CTA

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animatedPanels = useRef<Set<number>>(new Set());

  const setPanelRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      panelsRef.current[idx] = el;
    },
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    animatedPanels.current.clear();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        y: () => `-${(TOTAL_PANELS - 1) * 100}vh`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.set(progress, { scaleX: self.progress });
            }

            const panelIndex = Math.round(
              self.progress * (TOTAL_PANELS - 1)
            );

            if (!animatedPanels.current.has(panelIndex)) {
              animatedPanels.current.add(panelIndex);
              const panel = panelsRef.current[panelIndex];
              if (!panel) return;

              const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

              const number = panel.querySelector("[data-number]");
              const titleLines = panel.querySelectorAll("[data-title-line]");
              const desc = panel.querySelector("[data-desc]");
              const line = panel.querySelector("[data-line]");
              const meta = panel.querySelector("[data-meta]");
              const cta = panel.querySelector("[data-cta]");

              if (number)
                tl.fromTo(
                  number,
                  { yPercent: 60, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.8 },
                  0
                );
              if (titleLines.length)
                tl.fromTo(
                  titleLines,
                  { yPercent: 110, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.12,
                  },
                  0.1
                );
              if (line)
                tl.fromTo(
                  line,
                  { scaleX: 0 },
                  { scaleX: 1, duration: 0.7 },
                  0.3
                );
              if (desc)
                tl.fromTo(
                  desc,
                  { y: 30, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.7 },
                  0.45
                );
              if (meta)
                tl.fromTo(
                  meta,
                  { y: 20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.5 },
                  0.55
                );
              if (cta)
                tl.fromTo(
                  cta,
                  { y: 20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.5 },
                  0.5
                );
            }
          },
        },
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-background">
      {/* Scroll progress bar — visible only while pinned */}
      <div
        ref={(el) => {
          if (el) {
            const obs = new IntersectionObserver(
              ([e]) => {
                el.style.opacity = e.isIntersecting ? "1" : "0";
              },
              { threshold: 0.01 }
            );
            obs.observe(el.closest("section")!);
          }
        }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0 }}
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="relative h-screen w-full overflow-hidden">
        <div
          ref={trackRef}
          className="relative w-full will-change-transform"
          style={{ height: `${TOTAL_PANELS * 100}vh` }}
        >
          {/* ── Panel 0: Heading ── */}
          <div
            ref={(el) => setPanelRef(el, 0)}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(107,91,149,0.12) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #0d0b12 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

            <span
              data-number
              className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-accent/30 text-accent bg-accent/10 mb-8"
            >
              Services
            </span>
            <h2
              data-title-line
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white text-center leading-[0.95]"
            >
              What I Offer
            </h2>

            <div data-line className="mt-10 h-px w-16 bg-accent/60 origin-left" />
          </div>

          {/* ── Panels 1-5: Services ── */}
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => setPanelRef(el, index + 1)}
              className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-8 py-14 md:px-16 md:py-20 lg:px-24"
              style={{
                background: `radial-gradient(ellipse at 30% 70%, ${service.accent}15 0%, transparent 50%), linear-gradient(180deg, #0a0a0a, #0d0b12)`,
              }}
            >
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

              {/* Number — top right */}
              <div className="flex justify-end overflow-hidden">
                <span
                  data-number
                  className="text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold leading-none tabular-nums opacity-0"
                  style={{ color: `${service.accent}25`, WebkitTextStroke: `1px ${service.accent}35` }}
                >
                  {service.number}
                </span>
              </div>

              {/* Title + description — bottom left */}
              <div className="max-w-3xl">
                <div className="overflow-hidden">
                  {service.title.split("\n").map((line, li) => (
                    <div key={li} className="overflow-hidden">
                      <h3
                        data-title-line
                        className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05] opacity-0"
                      >
                        {line}
                      </h3>
                    </div>
                  ))}
                </div>

                <div
                  data-line
                  className="mt-6 h-px w-20 origin-left"
                  style={{ background: service.accent }}
                />

                <p
                  data-desc
                  className="mt-6 max-w-xl text-[#999] text-base md:text-lg leading-relaxed opacity-0"
                >
                  {service.description}
                </p>
              </div>

              {/* Meta — bottom */}
              <div
                data-meta
                className="flex items-end justify-between pt-6 opacity-0"
              >
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: `${service.accent}80` }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
                <span />
              </div>
            </div>
          ))}

          {/* ── Panel 6: CTA ── */}
          <div
            ref={(el) => setPanelRef(el, 6)}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-8 text-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(107,91,149,0.1) 0%, transparent 60%), linear-gradient(180deg, #0d0b12, #0a0a0a)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

            <p
              data-title-line
              className="text-2xl md:text-3xl font-bold text-white opacity-0"
            >
              Ready to build something?
            </p>
            <p
              data-desc
              className="mt-3 max-w-md text-[#999] opacity-0"
            >
              Let&apos;s discuss your project — mobile, web, or full-stack.
            </p>
            <Link
              href="#contact"
              data-cta
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-8 py-4 text-sm font-semibold text-white uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:border-accent opacity-0"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
