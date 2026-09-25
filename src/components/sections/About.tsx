"use client";

import { useEffect, useRef } from "react";
import { Smartphone, Monitor, Server, Wrench } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["Flutter", "Dart", "Android", "iOS", "React Native"],
  },
  {
    title: "Frontend",
    icon: Monitor,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Firebase", "MongoDB", "REST API", "WebSocket", "PostgreSQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Postman", "CI/CD", "Figma"],
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 50, suffix: "K+", label: "Active users" },
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

const facts = [
  { label: "Focus", value: "Mobile & Full-Stack" },
  { label: "Primary stack", value: "Flutter · Node.js · React" },
  { label: "Experience", value: "3+ years professional" },
  { label: "Location", value: "Kerala, India" },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Count the stat numbers up once they scroll into view
  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${suffix}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-y relative w-full">
      <Reveal className="container-x">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              Engineer who turns ideas into{" "}
              <span className="text-gradient">shipped products</span>
            </>
          }
        />

        {/* Bio + quick facts */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-5 lg:col-span-7">
            <p data-reveal className="text-lg leading-relaxed text-foreground/85 md:text-xl">
              Flutter Developer with over 3 years of experience building mobile
              applications and working on real-world product features.
            </p>
            <p data-reveal className="leading-relaxed text-muted-foreground md:text-lg">
              Focused on creating clean, responsive, and scalable applications
              using Flutter and Dart, with experience in payment flows, banking
              features, API integrations, state management, authentication, and
              application architecture.
            </p>
            <p data-reveal className="leading-relaxed text-muted-foreground md:text-lg">
              Beyond mobile development, I also work across web applications,
              websites, backend development, APIs, databases, and end-to-end
              product implementation.
            </p>
            <p data-reveal className="leading-relaxed text-muted-foreground md:text-lg">
              AI-assisted development is part of my workflow, helping with
              development, debugging, code review, automation, and exploring
              better implementation approaches.
            </p>
            <p data-reveal className="leading-relaxed text-muted-foreground md:text-lg">
              I enjoy building complete digital products from idea to
              implementation and solving practical problems across mobile, web,
              and backend systems.
            </p>
          </div>

          <dl className="self-center lg:col-span-5">
            {facts.map((item) => (
              <div
                key={item.label}
                data-reveal
                className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:border-t"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </dt>
                <dd className="text-right text-sm font-medium text-foreground/90">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mb-24 grid grid-cols-2 overflow-hidden rounded-2xl border border-line lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`bg-surface p-6 md:p-8 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                i < 2 ? "border-b border-line lg:border-b-0" : ""
              } ${i === 1 ? "lg:border-r" : ""}`}
            >
              <p
                data-count={s.value}
                data-suffix={s.suffix}
                className="mb-1 text-4xl font-bold tabular-nums text-foreground md:text-5xl"
              >
                {s.value}
                {s.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <h3
          data-reveal
          className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Technical proficiency
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map(({ title, icon: Icon, skills }) => (
            <div key={title} data-reveal className="card card-hover p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h4 className="text-base text-foreground">{title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
