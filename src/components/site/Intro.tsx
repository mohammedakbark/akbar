"use client";

import dynamic from "next/dynamic";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { intro, process, stats } from "@/data/content";
import { ScrollText, FadeUp } from "@/components/ui/text";
import { SectionLabel, DrawLine } from "@/components/ui/Section";
import { Parallax } from "@/components/ui/bits";

const WireShape = dynamic(() => import("@/components/ui/WireShape"), { ssr: false });

function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseFloat(value);
  const suffix = value.replace(/[\d.]/g, "");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, num, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [inView, num]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

export default function Intro() {
  return (
    <section id="what-i-do">
      <DrawLine />
      <div className="site-x py-24 md:py-36">
        <SectionLabel num="02" label="What I do" />
        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ScrollText
              text={intro.lead}
              className="text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[2.15rem]"
            />
            <ScrollText
              text={intro.sub}
              className="mt-8 text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em] text-dim md:text-[1.7rem]"
            />
            <FadeUp className="mt-8 text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em] md:text-[1.7rem]">
              <span className="font-serif italic font-normal">{intro.closer[0].replace(/\*/g, "")}</span>{" "}
              <span className="text-dim">{intro.closer[1]}</span>
            </FadeUp>
          </div>
          <Parallax speed={70} className="mx-auto aspect-square w-full max-w-[340px] lg:col-span-4">
            <WireShape kind="ico" />
          </Parallax>
        </div>

        {/* How I work */}
        <div className="mt-24">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-8 bg-line" />
            <span className="label">How I work</span>
          </div>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.1} className="h-full">
                <li className="sweep group flex h-full flex-col bg-background p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                    {i < process.length - 1 && (
                      <span className="hidden font-mono text-[11px] text-faint transition-transform duration-500 group-hover:translate-x-1 lg:inline">→</span>
                    )}
                  </div>
                  <h3 className="mt-10 text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-dim">{step.text}</p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>

        <div className="mt-6 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="sweep group border-b border-r border-line p-6 md:p-8">
              <div className="text-4xl font-semibold tracking-[-0.04em] transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                <Count value={s.value} />
              </div>
              <div className="label mt-3">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
