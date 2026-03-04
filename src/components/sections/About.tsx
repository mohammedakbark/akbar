"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Mobile",
    skills: ["Flutter", "Dart", "Android", "iOS", "React Native"],
    accent: "#6B5B95",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    accent: "#7B6BA5",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Firebase", "MongoDB", "REST API", "WebSocket", "PostgreSQL"],
    accent: "#5B4B85",
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Docker", "Postman", "CI/CD", "Figma"],
    accent: "#8B7BB5",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(
          headerRef.current.querySelectorAll("[data-reveal]"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }
        );
        const line = headerRef.current.querySelector("[data-line]");
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.3);
      }

      // Bio block
      if (bioRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(
          bioRef.current.querySelectorAll("[data-bio-item]"),
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" }
        );
      }

      // Skills cards
      if (skillsRef.current) {
        const cards = skillsRef.current.querySelectorAll("[data-skill-card]");
        cards.forEach((card, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
          tl.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: "power3.out" }
          );
          const skills = card.querySelectorAll("[data-skill]");
          if (skills.length) {
            tl.fromTo(
              skills,
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" },
              0.3
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <span
            data-reveal
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-accent/30 text-accent bg-accent/10 mb-8 opacity-0"
          >
            About
          </span>
          <h2
            data-reveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl opacity-0"
          >
            Engineer who turns ideas
            <br />
            into <span className="text-gradient">shipped products</span>
          </h2>
          <div
            data-line
            className="mt-8 h-px w-20 bg-accent/50 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Bio + Snapshot grid */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
          {/* Left: Bio */}
          <div className="lg:col-span-7 space-y-6">
            <p
              data-bio-item
              className="text-lg md:text-xl text-[#bbb] leading-relaxed opacity-0"
            >
              I&apos;m Mohammed Akbar K — a software engineer based in
              Malappuram, Kerala. I build mobile apps, web platforms, and
              backend systems that people actually use.
            </p>
            <p
              data-bio-item
              className="text-base md:text-lg text-[#888] leading-relaxed opacity-0"
            >
              Over the past 2+ years I&apos;ve shipped production apps across
              fintech, automotive, ecommerce, and logistics — working end-to-end
              from architecture and UI to deployment on Play Store and App Store.
              I care about clean code, scalable systems, and user experience
              that feels effortless.
            </p>
            <p
              data-bio-item
              className="text-base md:text-lg text-[#888] leading-relaxed opacity-0"
            >
              My stack centers on Flutter and Node.js, but I&apos;m equally
              comfortable with React, Next.js, Firebase, and relational
              databases. I pick the right tool for the job, not the trendy one.
            </p>
          </div>

          {/* Right: Quick facts */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6">
              {[
                { label: "Focus", value: "Mobile & Full-Stack" },
                { label: "Primary Stack", value: "Flutter · Node.js · React" },
                { label: "Experience", value: "2+ Years Professional" },
                { label: "Location", value: "Kerala, India" },
              ].map((item, i) => (
                <div
                  key={i}
                  data-bio-item
                  className="flex items-baseline justify-between border-b border-white/[0.06] pb-4 opacity-0"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#555]">
                    {item.label}
                  </span>
                  <span className="text-sm text-[#ccc] font-medium text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef}>
          <h3
            data-skill-card
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] mb-8 opacity-0"
          >
            Technical Proficiency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                data-skill-card
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_-12px_rgba(107,91,149,0.12)] opacity-0"
              >
                {/* Category title */}
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.accent }}
                  />
                  {cat.title}
                </h4>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <span
                      key={si}
                      data-skill
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] text-[#999] border border-white/[0.06] transition-all duration-300 hover:text-white hover:border-accent/40 hover:bg-accent/10 opacity-0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
