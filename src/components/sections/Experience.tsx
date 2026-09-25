"use client";

import { useEffect, useRef } from "react";
import { MapPin, Check } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Zilmoney",
    role: "Software Engineer",
    location: "Manjeri, Malappuram, Kerala",
    period: "Oct 2025 – Present",
    isCurrent: true,
    description: "US-based fintech — building scalable fintech products.",
    highlights: [
      "iOS and Android app development",
      "Scalable architecture design",
      "API integration and optimisation",
      "UI/UX implementation",
      "Code review participation",
      "AI-assisted code generation",
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
      "Clean architecture — Provider, Riverpod, BLoC",
      "Automotive, education, ecommerce and chat apps",
    ],
  },
  {
    company: "Softroniics",
    role: "Flutter Developer",
    location: "Malappuram, Kerala",
    period: "Nov 2023 – Jul 2024",
    isCurrent: false,
    description: "Maintained and developed cross-platform mobile applications.",
    highlights: [
      "Cross-functional team collaboration",
      "Mentoring junior developers",
      "Multiple app maintenance",
      "UI/UX implementation",
    ],
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Timeline line draws itself as you scroll through the section
  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-y relative w-full border-t border-line">
      <Reveal className="container-x">
        <SectionHeader
          index="03"
          label="Experience"
          title={
            <>
              Professional <span className="text-gradient">journey</span>
            </>
          }
          subtitle="Building products across fintech, automotive, ecommerce and more."
        />

        <div ref={timelineRef} className="relative">
          {/* Track + animated fill */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(25%+7px)]" aria-hidden />
          <div
            ref={lineRef}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(25%+7px)]"
            aria-hidden
          />

          <ol className="space-y-12 md:space-y-16">
            {experiences.map((exp) => (
              <li
                key={exp.company}
                data-reveal
                className="relative grid grid-cols-1 gap-3 pl-10 md:grid-cols-4 md:gap-10 md:pl-0"
              >
                {/* Period (left column on desktop) */}
                <div className="md:pr-8 md:pt-1 md:text-right">
                  <p className="text-sm font-medium tabular-nums text-muted-foreground">
                    {exp.period}
                  </p>
                  {exp.isCurrent && (
                    <span className="mt-2 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      Current
                    </span>
                  )}
                </div>

                {/* Node */}
                <span
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background md:left-[25%] ${
                    exp.isCurrent ? "shadow-[0_0_0_5px_rgba(139,123,216,0.2)]" : ""
                  }`}
                  aria-hidden
                />

                {/* Card */}
                <div className="card card-hover p-6 md:col-span-3 md:ml-4 md:p-8">
                  <h3 className="mb-1 text-xl text-foreground md:text-2xl">
                    {exp.role}{" "}
                    <span className="text-accent">@ {exp.company}</span>
                  </h3>
                  <p className="mb-4 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </p>
                  <p className="mb-5 leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-foreground/75"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
