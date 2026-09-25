"use client";

import { ElementType, ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Vertical distance (px) elements travel while fading in */
  y?: number;
  stagger?: number;
}

/**
 * Reveal
 * - Fades + lifts every `[data-reveal]` descendant into view once it scrolls in
 * - Elements entering together are staggered as a batch
 * - Falls back to the wrapper itself when no `[data-reveal]` children exist
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 28,
  stagger = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const found = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets = found.length ? Array.from(found) : [root];

      gsap.set(targets, { opacity: 0, y });
      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: "power3.out",
            overwrite: true,
            // Hand transforms back to CSS so hover effects keep working
            clearProps: "transform,opacity",
          }),
      });
    }, root);

    return () => ctx.revert();
  }, [y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
