"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Check, Signal, Wifi, BatteryFull } from "lucide-react";
import { useLauncher } from "@/components/providers";
import { projects, type Project } from "@/lib/projects";
import { scrollToId } from "@/lib/scroll";
import { socials } from "@/lib/site";

function gradient([from, to]: [string, string]) {
  return `linear-gradient(145deg, ${from}, ${to})`;
}

/** Live clock for the status bar (starts at 9:41 to keep SSR output stable) */
function useClock() {
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, ""));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** The launched app: splash first, then a mock app screen */
function AppScreen({ project, onHome }: { project: Project; onHome: () => void }) {
  const [splash, setSplash] = useState(true);
  const Icon = project.icon;

  useEffect(() => {
    setSplash(true);
    const t = setTimeout(() => setSplash(false), 700);
    return () => clearTimeout(t);
  }, [project.id]);

  return (
    <motion.div
      layoutId={`app-${project.id}`}
      className="absolute inset-0 z-20 overflow-hidden"
      style={{ background: gradient(project.color), borderRadius: 34 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        {splash ? (
          <motion.div
            key="splash"
            className="flex h-full flex-col items-center justify-center gap-4 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.25 }}
          >
            <Icon className="h-16 w-16" strokeWidth={1.5} />
            <p className="text-xl font-bold">{project.title}</p>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="flex h-full flex-col bg-[#0f0f12]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {/* App header */}
            <div className="px-5 pb-6 pt-14 text-white" style={{ background: gradient(project.color) }}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-lg font-bold leading-tight">{project.title}</p>
              <p className="text-xs text-white/75">{project.category}</p>
            </div>

            {/* Mock UI */}
            <div className="flex-1 space-y-3 p-4">
              <div className="grid grid-cols-2 gap-3">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    className="h-16 rounded-xl"
                    style={{ background: `${project.color[0]}26` }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  />
                ))}
              </div>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + 0.06 * i }}
                >
                  <span className="h-8 w-8 rounded-full" style={{ background: `${project.color[0]}55` }} />
                  <span className="flex-1 space-y-1.5">
                    <span className="block h-2 w-3/4 rounded bg-white/20" />
                    <span className="block h-2 w-1/2 rounded bg-white/10" />
                  </span>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={onHome}
              className="mx-4 mb-10 rounded-xl py-2.5 text-xs font-semibold text-white"
              style={{ background: gradient(project.color) }}
            >
              Back to home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * PhoneMockup
 * - A phone home screen with each project as an app icon
 * - Tapping an icon "launches" the app with a shared-layout morph
 */
export default function PhoneMockup() {
  const { selectedProject, appOpen, openApp, closeApp, openedApps } = useLauncher();
  const time = useClock();
  const current = projects[selectedProject];
  const showHint = openedApps.size === 0;

  // Esc returns to the home screen
  useEffect(() => {
    if (!appOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeApp();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [appOpen, closeApp]);

  return (
    <div className="relative mx-auto w-[290px] shrink-0">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-8 -z-10 rounded-full blur-[70px] transition-colors duration-700"
        style={{ background: appOpen ? `${current.color[0]}55` : "rgba(139,123,216,0.3)" }}
      />

      <div className="relative h-[600px] rounded-[44px] border-[10px] border-[#1c1c20] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="relative h-full overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_30%_20%,#3b2f7a_0%,#141221_55%,#0a0a0b_100%)]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-white drop-shadow">
            <span className="tabular-nums">{time}</span>
            <span className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <BatteryFull className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Home screen */}
          <div className="px-5 pt-16">
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {projects.map((project, i) => {
                const Icon = project.icon;
                const isOpen = appOpen && selectedProject === i;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => openApp(i)}
                    className="group flex flex-col items-center gap-1.5"
                    aria-label={`Open ${project.title}`}
                  >
                    <span className="relative h-14 w-14">
                      {!isOpen && (
                        <motion.span
                          layoutId={`app-${project.id}`}
                          className="absolute inset-0 flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                          style={{ background: gradient(project.color), borderRadius: 16 }}
                          transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.span>
                      )}
                      {showHint && i === 0 && (
                        <span className="pointer-events-none absolute -inset-1.5 animate-ping rounded-[20px] border-2 border-white/60" />
                      )}
                      {openedApps.has(i) && (
                        <span className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-black ring-2 ring-[#141221]">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      )}
                    </span>
                    <span className="max-w-[70px] truncate text-[11px] text-white/85">
                      {project.title.replace(".in", "")}
                    </span>
                  </button>
                );
              })}

              {/* Hire me app */}
              <button type="button" onClick={() => scrollToId("contact")} className="group flex flex-col items-center gap-1.5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#3b2f7a] shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                  <Briefcase className="h-6 w-6" />
                </span>
                <span className="text-[11px] text-white/85">Hire me</span>
              </button>
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.p
                  className="mt-8 text-center text-xs text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Tap an app to launch it
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Dock */}
          <div className="absolute inset-x-3 bottom-6 flex h-[72px] items-center justify-around rounded-[26px] bg-white/10 backdrop-blur-md">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white transition-transform duration-200 hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Launched app */}
          <AnimatePresence>
            {appOpen && <AppScreen key={current.id} project={current} onHome={closeApp} />}
          </AnimatePresence>

          {/* Home indicator */}
          <button
            type="button"
            onClick={closeApp}
            aria-label="Go to home screen"
            className="absolute bottom-1.5 left-1/2 z-30 flex h-5 w-36 -translate-x-1/2 items-center justify-center"
          >
            <span className="h-1 w-28 rounded-full bg-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
}
