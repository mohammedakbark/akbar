"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/content";
import Section, { DrawLine } from "@/components/ui/Section";
import { FadeUp } from "@/components/ui/text";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });

  return (
    <Section
      id="experience"
      num="05"
      label="Experience"
      title="The road so *far.*"
      intro="Three companies, three years, from client apps to US fintech."
    >
      <DrawLine />
      <ol ref={ref} className="relative">
        {/* Progress rail that fills as you scroll */}
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 hidden h-full w-px origin-top bg-foreground/60 md:block"
          style={{ scaleY: scrollYProgress }}
        />
        {experience.map((e, i) => (
          <li key={e.company} className="sweep group grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-8">
            <FadeUp delay={i * 0.05}>
              <div className="font-mono text-[12px] tracking-[0.14em] text-dim">
                {e.period[0]} <span className="text-faint">→</span> {e.period[1]}
              </div>
              {e.current && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-live/25 bg-live/[0.07] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-live">
                  ● Current
                </span>
              )}
            </FadeUp>
            <FadeUp delay={i * 0.05 + 0.05}>
              <h3 className="text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5">{e.company}</h3>
              <p className="mt-0.5 text-[15px] text-foreground/75">
                {e.role} <span className="text-faint">· {e.place}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[14px] text-dim">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
                    {pt}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </li>
        ))}
      </ol>
    </Section>
  );
}
