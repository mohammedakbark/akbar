"use client";

import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

type Token = { text: string; italic: boolean };

/** Split "plain *italic* plain" into word tokens, remembering which were italic. */
export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  source.split(/(\*[^*]+\*)/g).forEach((part) => {
    if (!part) return;
    const italic = part.startsWith("*") && part.endsWith("*");
    const clean = italic ? part.slice(1, -1) : part;
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => tokens.push({ text: w, italic }));
  });
  return tokens;
}

const italicCls = "font-serif italic font-normal tracking-normal";

/** Renders text where *segments* become the italic serif accent. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className={italicCls}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ScrollWord({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={token.italic ? italicCls : undefined}>
      {token.text}{" "}
    </motion.span>
  );
}

/** Words light up from grey to white as the block scrolls through the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const tokens = tokenize(text);
  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <ScrollWord
          key={i}
          token={t}
          progress={scrollYProgress}
          range={[i / tokens.length, (i + 1) / tokens.length]}
        />
      ))}
    </p>
  );
}

/** Each word slides up out of a mask when the element enters view. */
export function WordsUp({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  play = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  play?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref, { once: true, margin: "-10% 0px" });
  const inView = seen && play;
  const tokens = tokenize(text);
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden>
        {tokens.map((t, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${t.italic ? italicCls : ""}`}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.text}
              {i < tokens.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Simple fade-up wrapper for blocks. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
