"use client";

import { expertise, note } from "@/data/content";
import Section, { DrawLine } from "@/components/ui/Section";
import { FadeUp, ScrollText } from "@/components/ui/text";

export default function Expertise() {
  return (
    <Section
      id="expertise"
      num="06"
      label="Expertise"
      title="What I bring to the *build.*"
      intro="Six areas, with the concrete skills under each."
    >
      <DrawLine />
      <ul>
        {expertise.map((x, i) => (
          <FadeUp key={x.title} delay={i * 0.04}>
            <li className="sweep group grid grid-cols-1 gap-4 border-b border-line py-7 md:grid-cols-[14rem_1fr] md:gap-8">
              <div className="flex gap-4">
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-foreground/90 transition-transform duration-500 group-hover:translate-x-1">
                  {x.title}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 pl-8 md:pl-0">
                {x.items.map((it) => (
                  <span key={it} className="text-[15px] text-foreground/60 transition-colors duration-300 group-hover:text-foreground/90">
                    {it}
                  </span>
                ))}
              </div>
            </li>
          </FadeUp>
        ))}
      </ul>

      <div className="mt-20">
        <div className="label mb-4">· Note</div>
        <ScrollText text={note} className="font-serif text-[1.9rem] italic leading-[1.15] md:text-[2.5rem]" />
      </div>
    </Section>
  );
}
