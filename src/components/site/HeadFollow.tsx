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

const RANGE_X = 0.22; // fraction of the viewport width the cursor travels for a full left/right turn
const RANGE_Y = 0.2; // …and of the viewport height for a full up/down turn
const HEAD_SPRING = { stiffness: 90, damping: 22, mass: 0.7 };
const EPSILON = 0.001; // weights below this count as zero

/** Touch devices: slow look-around (no cursor to follow). */
const IDLE = ["center", "left", "top-left", "top", "top-right", "right", "center", "bottom-left", "center"];

const clamp = (v: number) => Math.max(-1, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t); // settle on real photos, pass quickly through blends

/** Weight of grid line `line` (-1, 0 or 1) for a head position `v` in -1…1. */
function axisWeight(v: number, line: number) {
  const t = smooth(Math.abs(v));
  if (line === 0) return 1 - t;
  return Math.sign(v) === line ? t : 0;
}

/**
 * Portrait that turns its head toward the visitor's cursor.
 * - The head position is continuous (-1…1 on each axis) and spring-smoothed, so it tracks the cursor.
 * - The 9 photos are blended by position; opacities are written straight to the DOM (no re-render).
 * - A small spring drift of the whole portrait adds motion between photos.
 * - Listeners pause when the hero is off screen.
 */
export default function HeadFollow({ className = "", fallback }: { className?: string; fallback: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgs = useRef<Record<string, HTMLImageElement | null>>({});
  const inView = useInView(ref);
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"follow" | "idle" | "still">("still");

  // Head position (motion values → no React re-render on mouse move).
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  const hx = useSpring(headX, HEAD_SPRING);
  const hy = useSpring(headY, HEAD_SPRING);

  // Spring drift of the whole portrait.
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const x = useSpring(driftX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(driftY, { stiffness: 60, damping: 18, mass: 0.6 });

  // Start moving only once every frame is decoded, so the first turn has no hitch.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let cancelled = false;
    const all = DIRS.map((d) => imgs.current[d]?.decode().catch(() => {}));
    Promise.all(all).then(() => {
      if (!cancelled) setMode(fine ? "follow" : "idle");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Blend the photos for the current head position.
  useEffect(() => {
    const apply = () => {
      const px = clamp(hx.get());
      const py = clamp(hy.get());
      // Stacked layers: each one's opacity is its share of the weight so far, which gives an exact
      // weighted mix with no dimming and no see-through.
      let sum = 0;
      for (const d of DIRS) {
        const img = imgs.current[d];
        if (!img) continue;
        const w = axisWeight(px, GRID[d][0]) * axisWeight(py, GRID[d][1]);
        if (w < EPSILON) {
          img.style.opacity = "0";
          img.style.willChange = "";
          continue;
        }
        sum += w;
        img.style.opacity = String(w / sum);
        img.style.willChange = "opacity";
      }
    };
    const offX = hx.on("change", apply);
    const offY = hy.on("change", apply);
    return () => {
      offX();
      offY();
    };
  }, [hx, hy]);

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
      headX.set(clamp(dx / RANGE_X));
      headY.set(clamp(dy / RANGE_Y));
      driftX.set(clamp(dx * 2) * 10);
      driftY.set(clamp(dy * 2) * 6);
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onLeave = () => {
      headX.set(0);
      headY.set(0);
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
      headX.set(tx);
      headY.set(ty);
    }, 2400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, inView]);

  if (failed) return <>{fallback}</>;

  return (
    <motion.div ref={ref} style={{ x, y }} className={`relative aspect-[1100/1065] [contain:paint] ${className}`}>
      {DIRS.map((d) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={d}
          ref={(el) => {
            imgs.current[d] = el;
          }}
          src={`${profile.photoDir}/${d}.webp`}
          alt={d === "center" ? profile.name : ""}
          aria-hidden={d !== "center"}
          draggable={false}
          decoding="async"
          fetchPriority={d === "center" ? "high" : "low"}
          onError={d === "center" ? () => setFailed(true) : undefined}
          className="absolute inset-0 h-full w-full select-none object-contain object-bottom"
          // Initial state only; opacities are driven by the head spring after mount.
          style={{ opacity: d === "center" ? 1 : 0 }}
        />
      ))}
    </motion.div>
  );
}
