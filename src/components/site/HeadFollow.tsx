"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";

/** Frames on a 3×3 grid: [column, row] with -1/0/1 for left/center/right and top/center/bottom. */
const GRID: Record<string, [number, number]> = {
  "top-left": [-1, -1], top: [0, -1], "top-right": [1, -1],
  left: [-1, 0], center: [0, 0], right: [1, 0],
  "bottom-left": [-1, 1], bottom: [0, 1], "bottom-right": [1, 1],
};
const DIRS = Object.keys(GRID);
const nameAt = (x: number, y: number) => DIRS.find((d) => GRID[d][0] === x && GRID[d][1] === y)!;

const FADE_MS = 320; // crossfade length of each frame
const STEP_MS = 120; // time between steps when travelling across the grid
const ENTER = 0.13; // fraction of the viewport the cursor must move to turn the head…
const EXIT = 0.08; // …and how far back it must come to turn it back (hysteresis: no flicker at edges)

/** Touch devices: slow look-around (no cursor to follow). */
const IDLE = ["center", "left", "top-left", "top", "top-right", "right", "center", "bottom-left", "center"];

/** Axis value with hysteresis: keep the current side until the cursor clearly crosses back. */
function axis(v: number, current: number) {
  if (current !== 0) return Math.sign(v) === current && Math.abs(v) > EXIT ? current : Math.abs(v) > ENTER ? Math.sign(v) : 0;
  return Math.abs(v) > ENTER ? Math.sign(v) : 0;
}

/**
 * Portrait that turns its head toward the visitor's cursor.
 * - Walks through neighbouring frames (left → center → right) like a real head turn.
 * - New frame fades in on top of the previous one (no brightness dip).
 * - A small spring drift of the whole portrait smooths motion between frames.
 * - Re-renders only when the frame changes; listeners pause when the hero is off screen.
 */
export default function HeadFollow({ className = "", fallback }: { className?: string; fallback: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [frames, setFrames] = useState({ top: "center", under: "center" });
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"follow" | "idle" | "still">("still");

  const shown = useRef<[number, number]>([0, 0]); // frame currently on top
  const target = useRef<[number, number]>([0, 0]); // frame we're heading to
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spring drift (motion values → no React re-render on mouse move).
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const x = useSpring(driftX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(driftY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setMode(reduced ? "still" : fine ? "follow" : "idle");
    return () => {
      if (stepTimer.current) clearTimeout(stepTimer.current);
    };
  }, []);

  /** Move one grid step toward the target; repeat until we arrive. */
  const step = () => {
    stepTimer.current = null;
    const [cx, cy] = shown.current;
    const [tx, ty] = target.current;
    if (cx === tx && cy === ty) return;
    const next: [number, number] = [cx + Math.sign(tx - cx), cy + Math.sign(ty - cy)];
    const prev = nameAt(cx, cy);
    shown.current = next;
    setFrames({ top: nameAt(next[0], next[1]), under: prev });
    stepTimer.current = setTimeout(step, STEP_MS);
  };

  const aim = (tx: number, ty: number) => {
    if (target.current[0] === tx && target.current[1] === ty) return;
    target.current = [tx, ty];
    if (!stepTimer.current) step();
  };

  // Desktop: follow the cursor while the hero is visible.
  useEffect(() => {
    if (mode !== "follow" || !inView) return;
    let rect = ref.current!.getBoundingClientRect();
    let raf = 0;
    let mx = 0;
    let my = 0;
    const measure = () => {
      if (ref.current) rect = ref.current.getBoundingClientRect();
    };
    const update = () => {
      raf = 0;
      const dx = (mx - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy = (my - (rect.top + rect.height * 0.38)) / window.innerHeight; // ≈ eye level
      aim(axis(dx, target.current[0]), axis(dy, target.current[1]));
      driftX.set(Math.max(-1, Math.min(1, dx * 2)) * 10);
      driftY.set(Math.max(-1, Math.min(1, dy * 2)) * 6);
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onLeave = () => {
      aim(0, 0);
      driftX.set(0);
      driftY.set(0);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, inView]);

  // Touch: slow look-around while visible.
  useEffect(() => {
    if (mode !== "idle" || !inView) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % IDLE.length;
      const [tx, ty] = GRID[IDLE[i]];
      aim(tx, ty);
    }, 2400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, inView]);

  if (failed) return <>{fallback}</>;

  return (
    <motion.div ref={ref} style={{ x, y }} className={`relative aspect-[1100/1065] [contain:paint] ${className}`}>
      {DIRS.map((d) => {
        const isTop = d === frames.top;
        const isUnder = d === frames.under && !isTop;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={d}
            src={`${profile.photoDir}/${d}.webp`}
            alt={d === "center" ? profile.name : ""}
            aria-hidden={d !== "center"}
            draggable={false}
            decoding="async"
            fetchPriority={d === "center" ? "high" : "low"}
            onError={d === "center" ? () => setFailed(true) : undefined}
            className="absolute inset-0 h-full w-full select-none object-contain object-bottom"
            style={{
              // Top frame fades in over the previous one; the previous stays fully visible underneath
              // until covered, then drops out (delayed), so the image never dims mid-change.
              opacity: isTop || isUnder ? 1 : 0,
              zIndex: isTop ? 2 : isUnder ? 1 : 0,
              transition: isTop
                ? `opacity ${FADE_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`
                : `opacity 0ms linear ${FADE_MS}ms`,
              willChange: isTop || isUnder ? "opacity" : undefined,
            }}
          />
        );
      })}
    </motion.div>
  );
}
