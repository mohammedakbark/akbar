"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor (fine pointers only): a dot plus a trailing ring, over a soft spotlight glow.
 * Ring grows over links/buttons; elements with data-cursor="Label" show that label.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role='tab']");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const leave = () => setHidden(true);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  // Spotlight: a soft light that trails the cursor and brightens whatever is under it.
  const gx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const gy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}px ${gy}px, rgba(255,255,255,0.06), transparent 65%)`;

  if (!enabled) return null;

  const size = label ? 84 : hover ? 46 : 28;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ background: glow, mixBlendMode: "plus-lighter", opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full border mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? "rgba(255,255,255,1)" : hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
          borderColor: label ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-black"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[96] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden || label ? 0 : 1 }}
      />
    </>
  );
}
