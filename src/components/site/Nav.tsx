"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { RollText } from "@/components/ui/bits";
import { useReady } from "@/components/ui/ready";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function ResumeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M4 1.5h5.5L12.5 4.5v10h-8.5z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 8h4.5M6 10.5h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const ready = useReady();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-px origin-left bg-foreground/70"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-0 h-24 bg-gradient-to-b from-background via-background/70 to-transparent" />
        <nav className="site-x relative flex h-[72px] items-center justify-between">
          <a href="#top" className="font-mono text-[12px] uppercase tracking-[0.25em] text-foreground">
            Akbar<span className="text-faint">.k</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group text-[14px] text-foreground/80 transition-colors hover:text-foreground">
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur transition-all hover:border-foreground hover:bg-foreground hover:text-background active:scale-95 sm:flex"
            >
              <ResumeIcon /> <RollText>Resume</RollText>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-5 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="space-y-3">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 text-5xl font-semibold tracking-tight">
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="label text-foreground">
                Resume ↗
              </a>
              <a href={`mailto:${profile.email}`} className="label">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
