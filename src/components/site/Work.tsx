"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Tilt } from "@/components/ui/bits";
import { projects, type Project } from "@/data/content";
import Section from "@/components/ui/Section";
import Phone, { StoreLinks } from "./Phone";

const ease = [0.22, 1, 0.36, 1] as const;

function Featured({ p }: { p: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [70, -50]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const href = p.android ?? p.ios ?? "#work";
  return (
    <motion.article
      key={p.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease }}
    >
      <Tilt max={4}>
      <motion.a
        ref={cardRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Get app"
        aria-label={`Get ${p.title}`}
        initial={{ clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease }}
        className="group relative flex h-[340px] overflow-hidden rounded-2xl border border-line bg-card md:h-[400px]"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-[20%]"
          style={{ y: glowY, background: `radial-gradient(60% 60% at 20% 80%, ${p.color}, ${p.color}22 55%, transparent 80%)` }}
        />
        <div className="relative z-10 flex flex-1 flex-col justify-between p-6 md:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> Featured · Live on stores
          </span>
          <h3 className="max-w-md text-3xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-[2.75rem]">
            {p.title}
            <span className="block font-serif text-[0.8em] font-normal italic text-foreground/80">{p.sector.toLowerCase()} app</span>
          </h3>
        </div>
        <div className="relative w-[44%] max-w-[230px] shrink-0 pr-6 pt-10 md:pr-10">
          <motion.div style={{ y: phoneY }}>
            <Phone p={p} className="w-full transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:rotate-[-3deg] group-hover:scale-[1.03]" />
          </motion.div>
        </div>
      </motion.a>
      </Tilt>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:gap-10">
        <div>
          <p className="max-w-xl text-[15px] leading-relaxed text-foreground/75">{p.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <StoreLinks p={p} />
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-line md:block md:space-y-3 md:border-l md:pl-6">
          {[
            ["Year", p.year],
            ["Role", p.role],
            ["Sector", p.sector],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-foreground/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const sectors = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.sector)))], []);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<Project | null>(null);

  const list = filter === "All" ? projects : projects.filter((p) => p.sector === filter);
  const [featured, ...rest] = list;

  // Floating preview that follows the cursor over the list (desktop only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const fx = useSpring(mx, { stiffness: 180, damping: 22 });
  const fy = useSpring(my, { stiffness: 180, damping: 22 });

  return (
    <Section
      id="work"
      num="03"
      label="Shipped work"
      title="Six apps. *Real stores,* real users."
      intro="Not concept shots. Every app here is installable today. Tap a store badge and try it on your own phone."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by sector">
        {sectors.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={filter === s}
            onClick={() => setFilter(s)}
            className={`relative rounded-full border px-4 py-2 active:scale-95 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              filter === s ? "border-transparent text-background" : "border-line text-dim hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {filter === s && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ duration: 0.4, ease }} />
            )}
            <span className="relative">{s}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">{featured && <Featured key={featured.id} p={featured} />}</AnimatePresence>

      {rest.length > 0 && (
        <div className="mt-16">
          <div className="mb-2 flex items-center gap-4">
            <span className="h-px w-8 bg-line" />
            <span className="label">More apps</span>
          </div>
          <ul
            className="relative"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - r.left);
              my.set(e.clientY - r.top);
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence initial={false}>
              {rest.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  onMouseEnter={() => setHovered(p)}
                  data-cursor="Preview"
                  className="sweep group grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-line px-1 py-5 md:grid-cols-[2.5rem_1fr_8rem_auto]"
                >
                  <span className="font-mono text-[11px] text-faint">{String(i + 2).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h4 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                      {p.title}
                    </h4>
                    <p className="mt-1 truncate text-[13px] text-dim">{p.summary}</p>
                  </div>
                  <span className="label hidden md:block">{p.sector}</span>
                  <StoreLinks p={p} compact />
                </motion.li>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {hovered && hovered.id !== featured?.id && (
                <motion.div
                  className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[150px] lg:block"
                  style={{ x: fx, y: fy, translateX: "-50%", translateY: "-110%" }}
                  initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <Phone p={hovered} />
                </motion.div>
              )}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </Section>
  );
}
