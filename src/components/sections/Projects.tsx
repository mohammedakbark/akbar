"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import PhoneMockup from "@/components/projects/PhoneMockup";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { useLauncher } from "@/components/providers";

/**
 * Projects Section
 * - Apps live on a phone home screen; launching one shows its details alongside
 * - ← / → switch apps while the section is on screen
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { selectedProject, openApp } = useLauncher();
  const selectedRef = useRef(selectedProject);
  selectedRef.current = selectedProject;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowRight") openApp(selectedRef.current + 1);
      if (e.key === "ArrowLeft") openApp(selectedRef.current - 1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [openApp]);

  return (
    <section id="projects" ref={sectionRef} className="section-y relative w-full overflow-hidden border-t border-line">
      <Reveal className="container-x">
        <SectionHeader
          index="04"
          label="Selected work"
          title={
            <>
              Apps shipped to <span className="text-gradient">real users</span>
            </>
          }
          subtitle="Live on the Play Store and App Store. Tap an app on the phone to launch it."
        />

        <div
          data-reveal
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20"
        >
          <PhoneMockup />
          <ProjectDetail />
        </div>
      </Reveal>
    </section>
  );
}
