"use client";

import { motion } from "framer-motion";
import { WordsUp, FadeUp } from "./text";

/** Divider that draws itself from left to right when scrolled into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/**
 * Editorial two-column section: sticky number/label/title on the left, content on the right.
 */
export default function Section({
  id,
  num,
  label,
  title,
  intro,
  children,
  aside,
}: {
  id: string;
  num: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <DrawLine />
      <div className="site-x grid grid-cols-1 gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel num={num} label={label} />
            <WordsUp
              text={title}
              className="mt-6 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[2.6rem]"
            />
            {intro && (
              <FadeUp delay={0.2}>
                <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-dim">{intro}</p>
              </FadeUp>
            )}
            {aside}
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-mono text-[11px] tracking-[0.18em] text-foreground/80">№ {num}</span>
      <motion.span
        className="h-px w-8 origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <span className="label">{label}</span>
    </motion.div>
  );
}
