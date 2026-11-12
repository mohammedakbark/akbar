"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/content";
import { Arrow, LiveClock, LiveDot } from "@/components/ui/bits";
import { DrawLine } from "@/components/ui/Section";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cols = [
    {
      h: "Index",
      items: [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
        { label: "Resume ↗", href: profile.resume, ext: true },
      ],
    },
    {
      h: "Connect",
      items: [
        ...profile.socials.map((s) => ({ label: s.label, href: s.href, ext: true })),
        { label: "Email", href: `mailto:${profile.email}` },
      ],
    },
  ];

  return (
    <footer>
      <DrawLine />
      <div className="pt-16">
      <div className="site-x grid grid-cols-2 gap-10 md:grid-cols-4">
        {cols.map((c) => (
          <div key={c.h}>
            <div className="label mb-4">{c.h}</div>
            <ul className="space-y-2">
              {c.items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    {...("ext" in it && it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-1 text-[14px] text-foreground/75 transition-all duration-300 hover:translate-x-1 hover:text-foreground"
                  >
                    {it.label.replace(" ↗", "")}
                    {"ext" in it && it.ext && <Arrow className="text-faint" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="label mb-4">Based in</div>
          <p className="text-[14px] text-foreground/75">{profile.location}</p>
          <p className="mt-1 flex items-center gap-2 font-mono text-[12px] text-dim">
            <LiveDot /> <LiveClock />
          </p>
        </div>
        <div>
          <div className="label mb-4">© {new Date().getFullYear()}</div>
          <p className="text-[14px] text-foreground/75">{profile.name}</p>
          <p className="text-[13px] text-faint">Built with Next.js, Three.js & care.</p>
          <a href="#top" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-dim hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </div>

      <div ref={ref} className="mt-16 overflow-hidden border-t border-line">
        <motion.div
          style={{ y, opacity }}
          aria-hidden
          className="select-none whitespace-nowrap text-center text-[15.5vw] font-bold leading-[0.85] tracking-[-0.06em] text-foreground/[0.06]"
        >
          AKBAR K
        </motion.div>
      </div>
      </div>
    </footer>
  );
}
