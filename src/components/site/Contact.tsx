"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { contact, profile } from "@/data/content";
import { SectionLabel, DrawLine } from "@/components/ui/Section";
import { Arrow, Magnetic, Parallax, RollText } from "@/components/ui/bits";
import { FadeUp } from "@/components/ui/text";

const WireShape = dynamic(() => import("@/components/ui/WireShape"), { ssr: false });

function RotatingLines() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % contact.lines.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <h2 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]">
      {contact.lines.map((l, i) => (
        <span
          key={l}
          className={`block transition-all duration-700 hover:translate-x-2 ${i === active ? "text-foreground" : "text-foreground/25 hover:text-foreground/60"}`}
        >
          {l}
        </span>
      ))}
    </h2>
  );
}

function MessageForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const body = encodeURIComponent(`${msg}\n\n— ${name}`);
  const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);

  const field =
    "w-full border-b border-line bg-transparent py-3 text-[15px] outline-none transition-colors placeholder:text-faint focus:border-foreground/60";

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      }}
    >
      <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" />
      <textarea
        className={`${field} min-h-[96px] resize-none`}
        placeholder="What are you building?"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        required
        aria-label="Message"
      />
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Magnetic>
          <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[14px] font-medium text-background active:scale-95">
            <RollText>Send email</RollText> <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </Magnetic>
        <a
          href={`${profile.whatsapp}?text=${encodeURIComponent(msg || "Hi Akbar!")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] text-foreground/80 transition-colors hover:border-[#25D366]/60 hover:text-foreground active:scale-95"
        >
          <RollText>WhatsApp</RollText> <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
        </a>
      </div>
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  return (
    <section id="contact" className="scroll-mt-20">
      <DrawLine />
      <div className="site-x py-24 md:py-32">
        <SectionLabel num="08" label="Contact" />
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RotatingLines />
            <p className="mt-8 text-[17px] text-foreground/75">
              {contact.sub} <span className="font-serif text-[1.15em] italic">{contact.subItalic}</span>
            </p>
            <div className="mt-12 max-w-md">
              <MessageForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Parallax speed={50} className="mx-auto hidden aspect-square w-full max-w-[300px] lg:block">
              <WireShape kind="knot" speed={0.7} />
            </Parallax>
            <FadeUp className="mt-6 space-y-6">
              <div>
                <div className="label">Email</div>
                <div className="mt-1.5 flex items-center gap-3">
                  <a href={`mailto:${profile.email}`} className="link-underline break-all text-xl font-semibold tracking-tight md:text-2xl">
                    {profile.email}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(profile.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1600);
                    }}
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all active:scale-90 ${copied ? "border-live/40 text-live" : "border-line text-dim hover:text-foreground"}`}
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
              <div>
                <div className="label">Phone</div>
                <a href={profile.phoneHref} className="mt-1.5 block font-mono text-[14px] text-foreground/80 hover:text-foreground">
                  {profile.phone}
                </a>
              </div>
              <div>
                <div className="label">Elsewhere</div>
                <div className="mt-2 flex flex-wrap gap-5">
                  {profile.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-[15px] text-foreground/80 hover:text-foreground">
                      {s.label} <Arrow />
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
