"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Smartphone, Globe, Server, Rocket, LifeBuoy } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { scrollToId } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Mobile App Development",
    icon: Smartphone,
    description:
      "Android & iOS apps with Flutter — one codebase, both platforms. High-performance mobile experiences with clean architecture, from UI/UX to store release.",
    tags: ["Flutter", "Android", "iOS"],
  },
  {
    title: "Web Development",
    icon: Globe,
    description:
      "Responsive websites and web apps that convert. React and Next.js — fast, SEO-friendly and mobile-first so your product works everywhere.",
    tags: ["React", "Next.js", "SEO"],
  },
  {
    title: "Backend & API Development",
    icon: Server,
    description:
      "APIs and server logic that scale. Node.js, Firebase, REST APIs, database design, authentication and security — the foundation your app needs.",
    tags: ["Node.js", "Firebase", "REST"],
  },
  {
    title: "App Publishing",
    icon: Rocket,
    description:
      "Get your app on the Play Store & App Store. Submission, store assets, listing copy and guideline compliance so you can go live without the hassle.",
    tags: ["Play Store", "App Store"],
  },
  {
    title: "Maintenance & Support",
    icon: LifeBuoy,
    description:
      "Ongoing updates, bug fixes and new features. Long-term support so your app stays fast, secure and aligned with your business.",
    tags: ["Updates", "Bug fixes", "Features"],
  },
];

export default function Services() {
  const listRef = useRef<HTMLOListElement>(null);

  // Highlight the service row passing through the middle of the viewport
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      list.querySelectorAll("li").forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: "is-active",
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section-y relative w-full border-t border-line">
      <Reveal className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index="02"
              label="Services"
              title={
                <>
                  What I can <span className="text-gradient">build for you</span>
                </>
              }
              subtitle="From the first sketch to the store listing — I handle the full lifecycle of your product, or plug into your team where you need me."
              className="!mb-8"
            />
            <button
              type="button"
              data-reveal
              onClick={() => scrollToId("contact")}
              className="btn-primary group"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Services list */}
        <ol ref={listRef} className="lg:col-span-7">
          {services.map(({ title, icon: Icon, description, tags }, i) => (
            <li
              key={title}
              data-reveal
              className="group relative border-b border-line py-8 first:border-t lg:first:border-t-0 lg:first:pt-0 md:py-10"
            >
              <div className="flex gap-5 md:gap-8">
                <span className="w-8 shrink-0 pt-1 text-sm font-semibold tabular-nums text-muted transition-colors duration-500 group-hover:text-accent group-[.is-active]:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted-foreground transition-all duration-500 group-hover:border-accent-muted group-hover:bg-accent/10 group-hover:text-accent group-[.is-active]:border-accent-muted group-[.is-active]:bg-accent/10 group-[.is-active]:text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="text-xl text-foreground md:text-2xl">{title}</h3>
                  </div>
                  <p className="mb-4 leading-relaxed text-muted-foreground transition-colors duration-500 group-[.is-active]:text-foreground/80">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Progress line that fills when the row is active */}
              <span className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 group-[.is-active]:scale-x-100" />
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
