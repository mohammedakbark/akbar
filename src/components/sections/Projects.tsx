"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "F9 Cars",
    category: "Car Service App",
    description:
      "Premium car wash booking platform with seamless booking experience and real-time slot management.",
    tags: ["Flutter", "Firebase", "REST API", "Payment Gateway"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.f9cars&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/f9-cars/id6738093040",
  },
  {
    id: 2,
    title: "Wheelskart",
    category: "Used Car Auction App",
    description:
      "Second-hand car auction platform with live bidding, real-time updates, and instant notifications.",
    tags: ["Flutter", "WebSocket", "REST API", "Firebase"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.wheelskart&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/wheels-kart/id6749476545",
  },
  {
    id: 3,
    title: "Animaline.in",
    category: "Animal Trading App",
    description:
      "Comprehensive marketplace for animal trading with live chat support and location-based listings.",
    tags: ["Flutter", "Firebase", "REST API", "WebSocket", "Google Maps Services", "Chats", "Google Ads", "Payment Gateway"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.animaline.in&pcampaignid=web_share",
    ios: "https://apps.apple.com/app/animaline/id0000000000",
  },
  {
    id: 4,
    title: "Dazzles App",
    category: "Produts Management App",
    description:
      "Logistics app with real-time tracking, parking management, and end-to-end workflow automation.",
    tags: ["Flutter", "Google Maps Services", "REST API"],
    android: "https://play.google.com/store/apps/details?id=com.dazzles.app&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/dazzles/id6746066647",
  },
  {
    id: 5,
    title: "Bhasha Sagar",
    category: "Education",
    description:
      "Educational app for students to learn and practice the Indian languages.",
    tags: ["Flutter", "Firebase", "REST API", "Hive Database"],
    android: "https://play.google.com/store/apps/details?id=com.ciil.bhashasagarapp&pcampaignid=web_share",
    ios: null,
  },
  {
    id: 6,
    title: "Crisant HRMS",
    category: "HRMS",
    description:
      "HRMS app for managing employees and their data.",
    tags: ["Flutter", "Firebase", "REST API", ],
    android: "https://play.google.com/store/apps/details?id=com.crisant.app&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/crisant-hrms/id6749476600",
  },
];

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.7.4.7 1.08 0 1.48l-2.302 1.302-2.532-2.532 2.532-2.552zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(
          headerRef.current.querySelectorAll("[data-reveal]"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
      }

      const cards = track.querySelectorAll("[data-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const getScrollDistance = () => {
        if (!track) return 0;
        return Math.max(track.scrollWidth - window.innerWidth, 0);
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px]">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-accent/60"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Header */}
        <div ref={headerRef} className="flex-shrink-0 px-8 pt-12 pb-8 md:px-16 lg:px-24 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span
                data-reveal
                className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-4 opacity-0"
              >
                Selected Work
              </span>
              <h2
                data-reveal
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white opacity-0"
              >
                Case <span className="text-gradient">Studies</span>
              </h2>
            </div>
            <p
              data-reveal
              className="text-[#777] text-sm md:text-base max-w-sm opacity-0"
            >
              Projects shipped across fintech, automotive, ecommerce, and logistics
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 will-change-transform pl-8 pr-8 md:pl-16 md:pr-16 lg:pl-24 lg:pr-24"
            style={{ width: "max-content" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-card
                className="group relative flex w-[340px] flex-shrink-0 flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_8px_40px_-12px_rgba(107,91,149,0.12)] md:w-[420px] opacity-0"
              >
                {/* Number + Category */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {project.category}
                  </span>
                  <span className="text-5xl font-bold tabular-nums text-white/[0.04]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#888] text-sm md:text-base leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[#777] text-xs font-medium transition-colors duration-300 group-hover:border-accent/20 group-hover:text-[#aaa]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Store links */}
                <div className="flex items-center gap-3">
                  {project.android && (
                    <a
                      href={project.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#aaa] transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PlayStoreIcon className="w-4 h-4" />
                      Play Store
                    </a>
                  )}
                  {project.ios && (
                    <a
                      href={project.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#aaa] transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AppStoreIcon className="w-4 h-4" />
                      App Store
                    </a>
                  )}
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(107,91,149,0.15)" }} />
              </div>
            ))}

            {/* End card */}
            <a
              href="#contact"
              data-card
              className="flex w-[280px] flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] p-8 transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.03] md:w-[320px] opacity-0"
            >
              <span className="text-[#666] text-sm mb-2">Have a project?</span>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold">
                Let&apos;s talk
              </span>
            </a>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex-shrink-0 px-8 pb-8 md:px-16 lg:px-24 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#444]">
            {projects.length} Projects
          </span>
        </div>
      </div>
    </section>
  );
}
