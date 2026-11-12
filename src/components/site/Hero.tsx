"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, profile } from "@/data/content";
import { WordsUp } from "@/components/ui/text";
import { LiveClock, LiveDot, Magnetic, RollText } from "@/components/ui/bits";
import HeadFollow from "./HeadFollow";
import { useReady } from "@/components/ui/ready";

const WireShape = dynamic(() => import("@/components/ui/WireShape"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax layers: portrait sinks slowly, watermark drifts sideways, copy rises faster.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 0.9, ease },
  });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24">
      {/* Watermark name behind the portrait */}
      <motion.div aria-hidden style={{ x: watermarkX }} className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center md:top-[18%]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.6, ease }}
          className="select-none whitespace-nowrap text-[26vw] font-bold leading-none tracking-[-0.06em] text-foreground/[0.035] md:text-[18vw]"
        >
          {profile.shortName}
        </motion.div>
      </motion.div>

      {/* Portrait: clip-reveals upward, parallaxes on scroll, and turns its head toward the cursor. */}
      <motion.div
        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 flex justify-center lg:pl-[20vw]"
      >
        <motion.div
          className="flex h-full justify-center"
          initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
          transition={{ duration: 1.5, ease }}
        >
          <HeadFollow
            className="h-full max-h-[92vh] shrink-0 opacity-45 contrast-[1.08] lg:opacity-100 [mask-image:radial-gradient(ellipse_48%_62%_at_50%_40%,black_52%,transparent_100%)]"
            fallback={
              <div className="mt-[6vh] h-[52vh] w-[52vh] max-w-[90vw] opacity-80">
                <WireShape kind="ico" />
              </div>
            }
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <motion.div style={{ y: copyY }} className="site-x relative mt-auto pb-10 md:pb-14">
        <motion.div
          {...show(0.3)}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-live/20 bg-live/[0.06] px-3.5 py-1.5"
        >
          <LiveDot />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/90">{hero.badge}</span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <WordsUp
            as="h1"
            text={hero.headline}
            delay={0.35}
            play={ready}
            className="text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:col-span-7 lg:text-[4.6rem]"
          />
          <motion.div {...show(0.85)} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-relaxed text-foreground/70">{hero.intro}</p>
            <div className="mt-6 flex items-center gap-6">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-transform active:scale-95"
                >
                  <RollText>See solutions</RollText>
                  <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
                </a>
              </Magnetic>
              <a href="#contact" className="group inline-flex items-center gap-1.5 text-[14px] text-dim transition-colors hover:text-foreground">
                <RollText>Let&apos;s talk</RollText>
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div {...show(1.1)} className="mt-12">
          <motion.div
            className="h-px origin-left bg-line"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : undefined}
            transition={{ delay: 1, duration: 1.4, ease }}
          />
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <span className="label">Portfolio · Edition 2026</span>
            <span className="label hidden sm:inline">{profile.role}</span>
            <span className="label flex items-center gap-2 text-foreground/70">
              {profile.location} · <LiveClock />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-line md:block"
      >
        <motion.span
          className="block h-1/2 w-px bg-foreground"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
