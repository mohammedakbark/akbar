"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { faqs } from "@/data/content";
import Section, { DrawLine } from "@/components/ui/Section";
import { WordsUp } from "@/components/ui/text";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const bigRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bigRef, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <>
      <Section id="faq" num="07" label="FAQs" title="Questions I get *most often.*" intro="Tap any question to expand it.">
        <DrawLine />
        <ul>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="sweep group flex w-full items-start gap-5 py-6 text-left"
                >
                  <span className="mt-1.5 font-mono text-[11px] text-faint">Q.{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className={`block text-lg font-medium tracking-tight transition-colors md:text-xl ${isOpen ? "text-foreground" : "text-foreground/75 group-hover:text-foreground"}`}>
                      {f.q}
                    </span>
                    {!isOpen && <span className="mt-1 block text-[13px] text-faint">{f.short}</span>}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none ${isOpen ? "border-transparent bg-foreground text-background" : "border-line text-dim"}`}
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-[3.25rem] text-[15px] leading-relaxed text-dim">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Section>

      <div ref={bigRef} className="site-x overflow-hidden py-20 md:py-28">
        <motion.div style={{ x: x1 }}>
          <WordsUp text="Still scrolling?" className="text-[13vw] font-semibold leading-[0.95] tracking-[-0.05em] text-foreground/40 md:text-[7.5rem]" />
        </motion.div>
        <motion.div style={{ x: x2 }}>
          <a href="#contact" data-cursor="Say hi" className="inline-block">
            <WordsUp text="We should *talk.*" delay={0.2} className="text-[13vw] font-semibold leading-[0.95] tracking-[-0.05em] md:text-[7.5rem]" />
          </a>
        </motion.div>
      </div>
    </>
  );
}
