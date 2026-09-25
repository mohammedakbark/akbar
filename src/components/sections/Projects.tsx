"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { scrollToId } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/** Must match the `hscroll` screen in tailwind.config.ts */
const HSCROLL_QUERY = "(min-width: 1024px) and (min-height: 700px)";

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
    tags: ["Flutter", "Firebase", "REST API", "WebSocket", "Google Maps", "Chat", "Google Ads", "Payment Gateway"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.animaline.in&pcampaignid=web_share",
    // App Store listing id not available yet
    ios: null,
  },
  {
    id: 4,
    title: "Dazzles App",
    category: "Products Management App",
    description:
      "Logistics app with real-time tracking, parking management, and end-to-end workflow automation.",
    tags: ["Flutter", "Google Maps", "REST API"],
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
    description: "HRMS app for managing employees and their data.",
    tags: ["Flutter", "Firebase", "REST API"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.app&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/crisant-hrms/id6749476600",
  },
];

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.7.4.7 1.08 0 1.48l-2.302 1.302-2.532-2.532 2.532-2.552zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const storeLinkClass =
  "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-foreground";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Large screens: pin the section and scroll the cards horizontally.
  // Smaller screens get a normal grid with no scroll hijacking.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(HSCROLL_QUERY, () => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    });

    // Re-measure once fonts/images have settled
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-y relative w-full overflow-hidden border-t border-line hscroll:flex hscroll:h-screen hscroll:flex-col hscroll:justify-center hscroll:py-0"
    >
      <Reveal className="container-x">
        <SectionHeader
          index="04"
          label="Selected work"
          title={
            <>
              Apps shipped to <span className="text-gradient">real users</span>
            </>
          }
          subtitle="Live on the Play Store and App Store across automotive, education, marketplaces and logistics."
          className="hscroll:!mb-10"
        />
      </Reveal>

      <Reveal>
        <div
          ref={trackRef}
          className="container-x grid grid-cols-1 gap-5 sm:grid-cols-2 hscroll:mx-0 hscroll:flex hscroll:w-max hscroll:max-w-none hscroll:gap-6 hscroll:pl-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] hscroll:pr-10"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-reveal
              className="card card-hover group flex flex-col p-7 hscroll:h-[400px] hscroll:w-[380px] hscroll:shrink-0"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {project.category}
                </span>
                <span className="text-sm font-semibold tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mb-3 text-2xl text-foreground">{project.title}</h3>
              <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="chip" title={project.tags.slice(5).join(", ")}>
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {project.android && (
                  <a href={project.android} target="_blank" rel="noopener noreferrer" className={storeLinkClass}>
                    <PlayStoreIcon className="h-4 w-4" />
                    Play Store
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                )}
                {project.ios && (
                  <a href={project.ios} target="_blank" rel="noopener noreferrer" className={storeLinkClass}>
                    <AppStoreIcon className="h-4 w-4" />
                    App Store
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                )}
              </div>
            </article>
          ))}

          {/* End card */}
          <button
            type="button"
            data-reveal
            onClick={() => scrollToId("contact")}
            className="group flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-8 text-center transition-all duration-300 hover:border-accent/60 hover:bg-accent/[0.04] hscroll:h-[400px] hscroll:w-[300px] hscroll:shrink-0"
          >
            <span className="text-muted-foreground">Have a project in mind?</span>
            <span className="inline-flex items-center gap-2 text-lg font-semibold text-accent">
              Let&apos;s talk
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </Reveal>

      {/* Horizontal progress (large screens only) */}
      <div className="container-x mt-10 hidden hscroll:block">
        <div className="h-px w-full bg-line">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
