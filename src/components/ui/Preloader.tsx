"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen intro: counter 0→100, then a curtain wipes up.
 * Shows once per browser tab session; later visits call onDone immediately.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ak-loaded") === "1";
      sessionStorage.setItem("ak-loaded", "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setVisible(false);
      onDone();
      return;
    }
    const c = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setVisible(false), 250),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#0b0b0d] px-5 py-6 sm:px-8"
          exit={{ y: "-100%", borderBottomLeftRadius: "50% 12vh", borderBottomRightRadius: "50% 12vh" }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex justify-between">
            <span className="label text-foreground/70">{profile.name}</span>
            <span className="label">Portfolio · 2026</span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-3xl font-semibold tracking-[-0.03em] sm:text-5xl"
            >
              Simple software for <span className="font-serif font-normal italic">real problems.</span>
            </motion.p>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <span className="label">Loading</span>
              <span className="text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums sm:text-[10rem]">
                {count}
                <span className="text-faint">%</span>
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <div className="h-px bg-foreground transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
