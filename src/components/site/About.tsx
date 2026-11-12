"use client";

import { about, profile } from "@/data/content";
import Section from "@/components/ui/Section";
import { ScrollText } from "@/components/ui/text";
import { Arrow, LiveClock, LiveDot, Magnetic, RollText } from "@/components/ui/bits";

export default function About() {
  const facts = [
    { k: "Based in", v: <>{profile.country} · {profile.location}</> },
    { k: "Local time", v: <span className="flex items-center gap-2"><LiveDot /> <LiveClock /></span> },
    { k: "Status", v: <span className="flex items-center gap-2"><LiveDot /> {profile.status}</span> },
    { k: "Currently", v: <>Software Engineer @ Zilmoney</> },
  ];

  return (
    <Section
      id="about"
      num="04"
      label="About me"
      title="Problem first. *Code second.*"
      aside={
        <div className="mt-10 space-y-5">
          {facts.map((f) => (
            <div key={f.k}>
              <div className="label">{f.k}</div>
              <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-foreground/90">{f.v}</div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 pt-3">
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-background active:scale-95"
              >
                <RollText>Download resume</RollText> <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <a
              href={profile.socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground active:scale-95"
            >
              <RollText>GitHub</RollText> <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </div>
      }
    >
      <ScrollText
        text={about.lead}
        className="text-[1.55rem] font-medium leading-[1.3] tracking-[-0.02em] md:text-[2rem]"
      />
      <ScrollText
        text={about.body}
        className="mt-10 text-[1.2rem] leading-[1.45] tracking-[-0.01em] text-foreground/60 md:text-[1.45rem]"
      />
    </Section>
  );
}
