"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    number: "20+",
    numericValue: 20,
    suffix: "+",
    label: "Successful Projects",
    description: "Delivered across mobile, web, and backend platforms",
  },
  {
    number: "50K+",
    numericValue: 50,
    suffix: "K+",
    label: "Active Users",
    description: "Apps with significant user base",
  },
  {
    number: "2+",
    numericValue: 2,
    suffix: "+",
    label: "Years Experience",
    description: "Full-stack development expertise",
  },
  {
    number: "100%",
    numericValue: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "On-time delivery and quality code",
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards — stagger in, then count up numbers
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const numberEl = card.querySelector("[data-num]");
        const numericValue = achievements[i].numericValue;
        const suffix = achievements[i].suffix;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
          }
        );

        if (numberEl) {
          const counter = { val: 0 };
          tl.to(
            counter,
            {
              val: numericValue,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                numberEl.textContent = `${Math.round(counter.val)}${suffix}`;
              },
            },
            0.3
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-accent/30 text-accent bg-accent/10 mb-6 opacity-0">
            Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 opacity-0">
            What I&apos;ve <span className="text-gradient">Achieved</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto opacity-0">
            Real results from real projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative text-center p-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(107,91,149,0.15)] opacity-0"
            >
              <h3
                data-num
                className="text-5xl md:text-6xl font-bold text-accent mb-3 tabular-nums"
              >
                0{a.suffix}
              </h3>
              <p className="text-lg font-semibold text-foreground mb-2">
                {a.label}
              </p>
              <p className="text-muted-foreground text-sm">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
