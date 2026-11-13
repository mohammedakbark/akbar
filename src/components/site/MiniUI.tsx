"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/content";

/**
 * Code-drawn, animated "key moment" screens for each app.
 * All sizes are in `em`; the root font-size scales with the phone width (container query units),
 * so the same screen works in the big featured card and the small hover preview.
 */

/** Counter that advances every `ms` while the screen is visible. */
function useLoop(active: boolean, ms: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setT((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [active, ms]);
  return t;
}

const pop = {
  initial: { opacity: 0, y: "0.6em", scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: "-0.4em" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
} as const;

function Header({ p, right }: { p: Project; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[0.5em]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.icon} alt="" className="h-[1.9em] w-[1.9em] rounded-[0.5em] bg-white object-contain" />
      <div className="flex-1 font-semibold leading-tight">{p.title}</div>
      {right}
    </div>
  );
}

const card = "rounded-[0.8em] border border-white/[0.06] bg-white/[0.04]";
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

/* ───────────────────────── Wheelskart: live auction ───────────────────────── */
function Wheelskart({ p, t }: { p: Project; t: number }) {
  const cycle = t % 24; // 24 ticks per auction
  const left = 23 - cycle;
  const bids = Math.floor(cycle / 3);
  const price = 450000 + bids * 5000;
  const sold = left <= 1;
  const history = Array.from({ length: bids }, (_, i) => ({ id: i, dealer: 10 + ((i * 7) % 23) })).slice(-5).reverse();
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header
        p={p}
        right={
          <span className="flex items-center gap-[0.3em] rounded-full bg-red-500/15 px-[0.5em] py-[0.15em] text-[0.7em] font-semibold text-red-400">
            <span className="h-[0.5em] w-[0.5em] animate-pulse rounded-full bg-red-500" /> LIVE
          </span>
        }
      />
      <div className={`${card} p-[0.8em]`}>
        <div className="flex items-center justify-between text-[0.7em] text-white/50">
          <span>Swift VXI · 2021</span>
          <span className={`tabular-nums font-semibold ${left < 6 ? "text-red-400" : "text-white"}`}>00:{String(left).padStart(2, "0")}</span>
        </div>
        <motion.div key={price} initial={{ scale: 1.08, color: p.color }} animate={{ scale: 1, color: "#fff" }} className="mt-[0.3em] origin-left text-[1.5em] font-bold tabular-nums">
          {inr(price)}
        </motion.div>
        <div className="mt-[0.5em] flex h-[2.2em] items-end gap-[0.25em]">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[0.2em]"
              style={{ background: i < bids ? p.color : "rgba(255,255,255,0.08)" }}
              animate={{ height: `${i < bids ? 30 + i * 9 : 15}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-[0.35em] overflow-hidden">
        <AnimatePresence initial={false}>
          {history.map((b) => (
            <motion.div key={b.id} layout {...pop} className={`${card} flex items-center justify-between px-[0.7em] py-[0.45em] text-[0.75em]`}>
              <span className="text-white/70">Dealer #{b.dealer}</span>
              <span className="font-semibold text-emerald-400">+{inr(5000)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        animate={sold ? { backgroundColor: "#10b981" } : { backgroundColor: p.color, scale: [1, 1.03, 1] }}
        transition={sold ? {} : { scale: { duration: 1, repeat: Infinity } }}
        className="rounded-[0.7em] py-[0.6em] text-center text-[0.85em] font-semibold"
      >
        {sold ? "SOLD ✓" : "Place bid"}
      </motion.div>
    </div>
  );
}

/* ───────────────────────── F9 Cars: slot booking + status ───────────────────────── */
function F9Cars({ p, t }: { p: Project; t: number }) {
  const cycle = t % 16;
  const slots = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00"];
  const booked = Math.min(cycle, 4); // slots fill one by one
  const mine = 3;
  const stage = Math.max(0, Math.min(3, cycle - 5)) ; // 0..3
  const steps = ["Received", "Washing", "Drying", "Ready"];
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="text-[0.7em] text-white/50">Today</span>} />
      <div className="text-[0.7em] uppercase tracking-wider text-white/40">Pick a slot</div>
      <div className="grid grid-cols-3 gap-[0.35em]">
        {slots.map((s, i) => {
          const isMine = i === mine && booked > mine - 1;
          const taken = !isMine && [0, 2, 5, 7].indexOf(i) > -1 && [0, 2, 5, 7].indexOf(i) < booked;
          return (
            <motion.div
              key={s}
              animate={{
                backgroundColor: isMine ? p.color : taken ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
                scale: isMine && booked === mine + 1 ? [1, 1.12, 1] : 1,
              }}
              className={`rounded-[0.5em] py-[0.45em] text-center text-[0.72em] tabular-nums ${taken ? "text-white/20 line-through" : "text-white"}`}
            >
              {isMine ? "✓ " + s : s}
            </motion.div>
          );
        })}
      </div>
      <div className={`${card} mt-auto p-[0.8em]`}>
        <div className="flex justify-between text-[0.7em] text-white/50">
          <span>KL 10 AB 1234</span>
          <span style={{ color: p.color }}>{steps[stage]}</span>
        </div>
        <div className="mt-[0.7em] flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <motion.div
                animate={{ backgroundColor: i <= stage ? p.color : "rgba(255,255,255,0.12)", scale: i === stage ? 1.25 : 1 }}
                className="h-[0.7em] w-[0.7em] rounded-full"
              />
              {i < steps.length - 1 && (
                <div className="mx-[0.2em] h-[0.15em] flex-1 overflow-hidden rounded bg-white/10">
                  <motion.div className="h-full" style={{ background: p.color }} animate={{ width: i < stage ? "100%" : "0%" }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-[0.4em] flex justify-between text-[0.55em] text-white/40">
          {steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="rounded-[0.7em] py-[0.55em] text-center text-[0.8em] font-semibold text-black" style={{ background: p.color }}>
        Pay with PhonePe
      </div>
    </div>
  );
}

/* ───────────────────────── Animaline: listing + live chat ───────────────────────── */
function Animaline({ p, t }: { p: Project; t: number }) {
  const cycle = t % 10;
  const msgs = [
    { me: true, text: "Is she still available?", at: 1 },
    { me: false, text: "typing", at: 3 },
    { me: false, text: "Yes! Visit today 4 pm?", at: 4 },
    { me: true, text: "Perfect, see you 👍", at: 6 },
  ].filter((m) => cycle >= m.at && !(m.text === "typing" && cycle >= 4));
  const fav = cycle >= 2;
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="text-[0.7em] text-white/50">◎ 2.4 km</span>} />
      <div className={`${card} overflow-hidden`}>
        <div className="relative h-[5.5em]" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}33)` }}>
          <svg viewBox="0 0 64 40" className="absolute bottom-0 left-[1em] h-[4.2em] text-black/30" fill="currentColor" aria-hidden>
            <path d="M8 22c0-6 6-10 14-10h16c4 0 7-3 10-3 3 0 6 2 6 5 0 2-1 3-3 4v4c0 2-2 4-4 4h-3v10h-4V28H20v8h-4V27c-5-1-8-3-8-5z" />
          </svg>
          <motion.span
            animate={{ scale: fav ? [1, 1.4, 1] : 1, color: fav ? "#f43f5e" : "rgba(255,255,255,0.7)" }}
            className="absolute right-[0.6em] top-[0.5em] text-[1.1em]"
          >
            ♥
          </motion.span>
          <span className="absolute left-[0.6em] top-[0.5em] rounded-full bg-black/40 px-[0.5em] text-[0.6em] font-semibold">PREMIUM</span>
        </div>
        <div className="flex items-center justify-between p-[0.6em] text-[0.75em]">
          <span>Gir Cow · 3 yrs</span>
          <span className="font-semibold" style={{ color: p.color }}>₹65,000</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-[0.35em] overflow-hidden">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.text}
              layout
              {...pop}
              className={`max-w-[80%] rounded-[0.8em] px-[0.7em] py-[0.4em] text-[0.72em] ${m.me ? "self-end text-black" : "self-start bg-white/10"}`}
              style={m.me ? { background: p.color } : undefined}
            >
              {m.text === "typing" ? (
                <span className="flex gap-[0.25em] py-[0.25em]">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="h-[0.4em] w-[0.4em] rounded-full bg-white/70" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.12 }} />
                  ))}
                </span>
              ) : (
                m.text
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-[0.4em] rounded-full bg-white/[0.06] px-[0.8em] py-[0.45em] text-[0.7em] text-white/40">
        Message seller… <span className="ml-auto" style={{ color: p.color }}>➤</span>
      </div>
    </div>
  );
}

/* ───────────────────────── Dazzles: live logistics dashboard ───────────────────────── */
function Dazzles({ p, t }: { p: Project; t: number }) {
  const cycle = t % 12;
  const roles = ["Admin", "Driver", "Store"];
  const stops = 4;
  const pos = Math.min(cycle / 8, 1);
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="text-[0.7em] text-white/50">Live</span>} />
      <div className="flex gap-[0.3em]">
        {roles.map((r, i) => (
          <motion.span
            key={r}
            animate={{ backgroundColor: i === Math.floor(t / 4) % 3 ? p.color : "rgba(255,255,255,0.06)" }}
            className="flex-1 rounded-full py-[0.3em] text-center text-[0.65em]"
          >
            {r}
          </motion.span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[0.4em]">
        {[
          { k: "Delivered", v: 128 + cycle * 3 },
          { k: "In transit", v: 24 - Math.floor(cycle / 2) },
          { k: "In stock", v: 8024 - cycle * 6 },
          { k: "Parking", v: `${12 + (cycle % 4)}/20` },
        ].map((s) => (
          <div key={s.k} className={`${card} p-[0.6em]`}>
            <div className="text-[1.15em] font-bold tabular-nums">{s.v}</div>
            <div className="text-[0.6em] text-white/45">{s.k}</div>
          </div>
        ))}
      </div>
      <div className={`${card} p-[0.8em]`}>
        <div className="flex justify-between text-[0.7em]">
          <span className="text-white/50">Route #DZ-204</span>
          <span style={{ color: p.color }}>{pos >= 1 ? "Delivered ✓" : "On the way"}</span>
        </div>
        <div className="relative mt-[0.9em] h-[0.2em] rounded bg-white/10">
          <motion.div className="absolute left-0 top-0 h-full rounded" style={{ background: p.color }} animate={{ width: `${pos * 100}%` }} transition={{ duration: 0.8 }} />
          {Array.from({ length: stops }, (_, i) => (
            <span
              key={i}
              className="absolute top-1/2 h-[0.6em] w-[0.6em] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0c0c0e]"
              style={{ left: `${(i / (stops - 1)) * 100}%`, background: pos >= i / (stops - 1) ? p.color : "#333" }}
            />
          ))}
          <motion.span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-[130%] text-[0.9em]"
            animate={{ left: `${pos * 100}%` }}
            transition={{ duration: 0.8 }}
          >
            🚚
          </motion.span>
        </div>
      </div>
      <AnimatePresence>
        {cycle >= 9 && (
          <motion.div {...pop} className="flex items-center gap-[0.5em] rounded-[0.7em] bg-white/10 px-[0.7em] py-[0.5em] text-[0.7em]">
            <span style={{ color: p.color }}>●</span> Push: Order #204 delivered
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Bhasha Sagar: multilingual learning ───────────────────────── */
const LANGS = [
  { g: "अ", l: "Hindi", w: "नमस्ते" },
  { g: "അ", l: "Malayalam", w: "നമസ്കാരം" },
  { g: "அ", l: "Tamil", w: "வணக்கம்" },
  { g: "অ", l: "Bengali", w: "নমস্কার" },
  { g: "ಅ", l: "Kannada", w: "ನಮಸ್ಕಾರ" },
];
function BhashaSagar({ p, t }: { p: Project; t: number }) {
  const i = Math.floor(t / 2) % LANGS.length;
  const L = LANGS[i];
  const progress = ((t % 10) + 1) / 10;
  const r = 15.9;
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="text-[0.7em] text-white/50">🔥 12</span>} />
      <div className="flex gap-[0.3em] overflow-hidden">
        {LANGS.map((x, k) => (
          <motion.span
            key={x.l}
            animate={{ backgroundColor: k === i ? p.color : "rgba(255,255,255,0.06)", color: k === i ? "#000" : "#fff" }}
            className="rounded-full px-[0.5em] py-[0.25em] text-[0.6em]"
          >
            {x.l.slice(0, 3)}
          </motion.span>
        ))}
      </div>
      <div className={`${card} relative flex flex-1 flex-col items-center justify-center overflow-hidden`}>
        {/* Remount per letter → flip-in (no exit, so it can never get stuck mid-transition) */}
        <motion.div
            key={L.g}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
            style={{ transformPerspective: 400 }}
          >
            <div className="text-[6.5em] leading-none" style={{ color: p.color }}>
              {L.g}
            </div>
            <div className="mt-[0.3em] text-[1.3em] font-semibold">{L.w}</div>
            <div className="mt-[0.2em] text-[0.75em] text-white/45">“Hello” in {L.l}</div>
          </motion.div>
      </div>
      <div className="flex items-center gap-[0.7em]">
        <svg viewBox="0 0 36 36" className="h-[2.6em] w-[2.6em] -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <motion.circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke={p.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * r}
            animate={{ strokeDashoffset: 2 * Math.PI * r * (1 - progress) }}
          />
        </svg>
        <div className="text-[0.7em]">
          <div className="font-semibold">Lesson {Math.round(progress * 10)}/10</div>
          <div className="text-white/45">Daily practice</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Crisant HRMS: punch-in + leave approval ───────────────────────── */
function CrisantHRMS({ p, t }: { p: Project; t: number }) {
  const cycle = t % 12;
  const punched = cycle >= 3;
  const approved = cycle >= 7;
  const days = ["M", "T", "W", "T", "F"];
  const hours = [8.5, 9, 7.5, 9.2, Math.min(9, 4 + cycle * 0.5)];
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="text-[0.7em] text-white/50">Hi, Anu</span>} />
      <div className={`${card} p-[0.8em] text-center`}>
        <div className="text-[0.65em] text-white/45">Wed, 12 Nov</div>
        <div className="text-[1.6em] font-bold tabular-nums">09:0{Math.min(cycle, 9)}</div>
        <motion.div
          animate={{ backgroundColor: punched ? "#10b981" : p.color, scale: cycle === 3 ? [1, 1.08, 1] : 1 }}
          className="mx-auto mt-[0.5em] w-[80%] rounded-full py-[0.5em] text-[0.8em] font-semibold"
        >
          {punched ? "Punched in ✓ 09:02" : "Punch in"}
        </motion.div>
      </div>
      <div className={`${card} flex items-center justify-between p-[0.7em]`}>
        <div className="text-[0.7em]">
          <div className="font-semibold">Leave · 14–15 Nov</div>
          <div className="text-white/45">Casual leave · 2 days</div>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={approved ? "a" : "p"}
            initial={{ scale: 1.6, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: approved ? -8 : 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-[0.4em] border px-[0.4em] py-[0.1em] text-[0.6em] font-bold uppercase ${approved ? "border-emerald-400 text-emerald-400" : "border-amber-400/60 text-amber-300"}`}
          >
            {approved ? "Approved" : "Pending"}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className={`${card} mt-auto p-[0.8em]`}>
        <div className="text-[0.65em] text-white/45">This week</div>
        <div className="mt-[0.5em] flex h-[3.5em] items-end gap-[0.5em]">
          {days.map((d, k) => (
            <div key={k} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.2em]">
              <motion.div className="w-full rounded-t-[0.25em]" style={{ background: k === 4 ? p.color : "rgba(255,255,255,0.18)" }} animate={{ height: `${(hours[k] / 10) * 100}%` }} />
              <span className="text-[0.55em] text-white/40">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── OnlineCheckWriter: send a payment ───────────────────────── */
function OnlineCheckWriter({ p, t }: { p: Project; t: number }) {
  const cycle = t % 16;
  const methods = ["Check", "ACH", "Wire", "Card"];
  const selected = cycle < 4 ? 3 - cycle : 0; // browses the methods, settles on Check
  const steps = ["Created", "Approved", "Sent"];
  const done = cycle < 6 ? 0 : cycle < 9 ? 1 : cycle < 12 ? 2 : 3; // steps completed so far
  const sent = done === 3;
  return (
    <div className="flex h-full flex-col gap-[0.7em]">
      <Header p={p} right={<span className="rounded-full bg-white/[0.06] px-[0.5em] py-[0.15em] text-[0.65em] text-white/60">USD</span>} />
      <div className={`${card} p-[0.8em]`}>
        <div className="text-[0.65em] text-white/45">Pay to</div>
        <div className="text-[0.85em] font-semibold">Acme Supplies LLC</div>
        <div className="mt-[0.4em] text-[1.5em] font-bold tabular-nums">$2,450.00</div>
        <div className="text-[0.6em] text-white/40">Invoice #1042 · due Nov 20</div>
      </div>
      <div className="grid grid-cols-4 gap-[0.3em]">
        {methods.map((m, i) => (
          <motion.div
            key={m}
            animate={{ backgroundColor: i === selected ? p.color : "rgba(255,255,255,0.05)", scale: i === selected ? 1.05 : 1 }}
            className="rounded-[0.5em] py-[0.45em] text-center text-[0.62em] font-semibold"
          >
            {m}
          </motion.div>
        ))}
      </div>
      <div className={`${card} flex-1 space-y-[0.55em] p-[0.8em]`}>
        {steps.map((s, i) => {
          const ok = i < done;
          return (
            <div key={s} className="flex items-center gap-[0.6em] text-[0.75em]">
              <motion.span
                animate={{ backgroundColor: ok ? p.color : "rgba(255,255,255,0.08)", scale: ok && i === done - 1 ? [1, 1.3, 1] : 1 }}
                className="flex h-[1.4em] w-[1.4em] items-center justify-center rounded-full text-[0.8em] font-bold"
              >
                {ok ? "✓" : ""}
              </motion.span>
              <span className={ok ? "text-white" : "text-white/40"}>{s}</span>
            </div>
          );
        })}
      </div>
      <motion.div
        animate={sent ? { backgroundColor: "#10b981" } : { backgroundColor: p.color, scale: [1, 1.03, 1] }}
        transition={sent ? {} : { scale: { duration: 1, repeat: Infinity } }}
        className="rounded-[0.7em] py-[0.6em] text-center text-[0.85em] font-semibold"
      >
        {sent ? "Payment sent ✓" : "Send payment"}
      </motion.div>
    </div>
  );
}

const SCREENS: Record<string, React.ComponentType<{ p: Project; t: number }>> = {
  onlinecheckwriter: OnlineCheckWriter,
  wheelskart: Wheelskart,
  f9cars: F9Cars,
  animaline: Animaline,
  dazzles: Dazzles,
  bhashasagar: BhashaSagar,
  crisanthrms: CrisantHRMS,
};

export default function MiniUI({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  const t = useLoop(visible, 1000);
  const Screen = SCREENS[p.id];
  return (
    <div ref={ref} className="h-full w-full" style={{ containerType: "inline-size" }}>
      <div className="flex h-full w-full flex-col bg-[#0c0c0e] px-[0.9em] pb-[0.9em] pt-[2.4em] text-white" style={{ fontSize: "6.4cqw" }}>
        {Screen ? <Screen p={p} t={t} /> : null}
      </div>
    </div>
  );
}
