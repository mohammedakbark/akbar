"use client";

import { useEffect, useRef } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Zilmoney",
    role: "Software Engineer",
    location: "Malappuram, Manjeri, Kerala",
    period: "Oct 2025 – Present",
    isCurrent: true,
    description:
      "US-based Fintech — building scalable fintech products.",
    highlights: [
      "IOS and Android app development",
      "Scalable architecture design",
      "API integration and optimization",
      "UI/UX implementation",
      "Code review participation",
      "AI based code generation",
    ],
  },
  {
    company: "Crisant Technologies",
    role: "Flutter Developer",
    location: "Mysuru",
    period: "Aug 2024 – Oct 2025",
    isCurrent: false,
    description: "Cross-platform mobile apps across multiple domains.",
    highlights: [
      "6+ cross-platform mobile applications",
      "Clean architecture — Provider, Riverpod, BLOC",
      "Automotive, education, ecommerce, chat apps etc..",
    ],
  },
  {
    company: "Softroniics",
    role: "Flutter Developer",
    location: "Malappuram, Kerala",
    period: "Nov 2023 – Jul 2024",
    isCurrent: false,
    description:
      "Maintained and developed cross-platform mobile applications.",
    highlights: [
      "Cross-functional team collaboration",
      "Mentoring junior developers",
      "Multiple app maintenance",
      "UI/UX implementation",
    ],
  },
  // {
  //   company: "Edapt",
  //   role: "Intern",
  //   location: "Malappuram, Kerala",
  //   period: "May 2022 – Nov 2023",
  //   isCurrent: false,
  //   description:
  //     "UI implementation and API integration with senior guidance.",
  //   highlights: [
  //     "UI development",
  //     "API integration",
  //     "Code review participation",
  //   ],
  // },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        const pill = headerRef.current.querySelector("[data-pill]");
        const h2 = headerRef.current.querySelector("h2");
        const p = headerRef.current.querySelector("p");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        if (pill)
          tl.fromTo(pill, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
        if (h2)
          tl.fromTo(h2, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.1);
        if (p)
          tl.fromTo(p, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.25);
      }

      // Vertical timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 1.5,
            },
          }
        );
      }

      // Cards — staggered reveal with per-card timeline
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const node = card.querySelector("[data-node]");
        const inner = card.querySelector("[data-card]");
        const period = card.querySelector("[data-period]");
        const badge = card.querySelector("[data-badge]");
        const role = card.querySelector("[data-role]");
        const company = card.querySelector("[data-company]");
        const loc = card.querySelector("[data-loc]");
        const desc = card.querySelector("[data-desc]");
        const highlights = card.querySelectorAll("[data-hl]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        if (node)
          tl.fromTo(
            node,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: "back.out(2)" },
            0
          );
        if (inner)
          tl.fromTo(
            inner,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.05
          );
        if (period)
          tl.fromTo(period, { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, 0.2);
        if (badge)
          tl.fromTo(badge, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, 0.3);
        if (role)
          tl.fromTo(role, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.25);
        if (company)
          tl.fromTo(company, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.3);
        if (loc)
          tl.fromTo(loc, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.35);
        if (desc)
          tl.fromTo(desc, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.4);
        if (highlights.length)
          tl.fromTo(
            highlights,
            { x: -10, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: "power2.out" },
            0.45
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span
            data-pill
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-accent/30 text-accent bg-accent/10 mb-6 opacity-0"
          >
            Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 opacity-0">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto opacity-0">
            From intern to engineer — building products across fintech,
            automotive, ecommerce, and more.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/60 to-accent/20 origin-top"
            style={{ transform: "scaleY(0)" }}
            aria-hidden
          />

          <ul className="space-y-0">
            {experiences.map((exp, index) => (
              <li
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative flex gap-6 md:gap-8 pb-14 last:pb-0"
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 flex items-start pt-1.5">
                  <div
                    data-node
                    className={`w-3.5 h-3.5 rounded-full border-2 border-accent bg-background ${
                      exp.isCurrent
                        ? "ring-[5px] ring-accent/20 shadow-[0_0_12px_rgba(107,91,149,0.5)]"
                        : ""
                    }`}
                    style={{ transform: "scale(0)" }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <div
                    data-card
                    className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(107,91,149,0.15)] opacity-0"
                  >
                    {/* Period + Badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        data-period
                        className="text-xs font-medium text-muted-foreground tracking-wider uppercase opacity-0"
                      >
                        {exp.period}
                      </span>
                      {exp.isCurrent && (
                        <span
                          data-badge
                          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/15 text-accent border border-accent/30 opacity-0"
                        >
                          Current
                        </span>
                      )}
                    </div>

                    <h3
                      data-role
                      className="text-xl md:text-2xl font-bold text-foreground mb-1 opacity-0"
                    >
                      {exp.role}
                    </h3>
                    <p
                      data-company
                      className="text-accent font-semibold text-sm mb-4 opacity-0"
                    >
                      {exp.company}
                    </p>
                    <div
                      data-loc
                      className="flex items-center gap-2 text-muted-foreground text-sm mb-5 opacity-0"
                    >
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{exp.location}</span>
                    </div>
                    <p
                      data-desc
                      className="text-muted-foreground text-sm leading-relaxed mb-6 opacity-0"
                    >
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          data-hl
                          className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 opacity-0"
                        >
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-accent/70 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
