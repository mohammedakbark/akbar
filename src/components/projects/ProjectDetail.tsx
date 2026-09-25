"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { useLauncher } from "@/components/providers";
import { projects } from "@/lib/projects";

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.7.4.7 1.08 0 1.48l-2.302 1.302-2.532-2.532 2.532-2.552zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const storeLinkClass =
  "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-foreground";

/**
 * ProjectDetail
 * - Details for the selected app, kept in sync with the phone
 * - Prev/next controls, swipe on touch, and an "apps explored" meter
 */
export default function ProjectDetail() {
  const { selectedProject, appOpen, openApp } = useLauncher();
  const project = projects[selectedProject];
  const Icon = project.icon;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) openApp(selectedProject + 1);
    else if (info.offset.x > 60) openApp(selectedProject - 1);
  };

  return (
    <div className="flex min-w-0 flex-col">
      {/* Details */}
      <div className="relative min-h-[340px] touch-pan-y">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="mb-5 flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ background: `linear-gradient(145deg, ${project.color[0]}, ${project.color[1]})` }}
              >
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {project.category}
                </p>
                <h3 className="text-3xl text-foreground md:text-4xl">{project.title}</h3>
              </div>
            </div>

            <p className="mb-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!appOpen && (
                <button type="button" onClick={() => openApp(selectedProject)} className="btn-primary">
                  <Rocket className="h-4 w-4" />
                  Launch app
                </button>
              )}
              {project.android && (
                <a href={project.android} target="_blank" rel="noopener noreferrer" className={storeLinkClass}>
                  <PlayStoreIcon className="h-4 w-4" />
                  Play Store
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              )}
              {project.ios && (
                <a href={project.ios} target="_blank" rel="noopener noreferrer" className={storeLinkClass}>
                  <AppStoreIcon className="h-4 w-4" />
                  App Store
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => openApp(selectedProject - 1)}
          className="icon-btn h-11 w-11"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openApp(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedProject ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => openApp(selectedProject + 1)}
          className="icon-btn h-11 w-11"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="ml-auto hidden text-xs text-muted sm:block">Tip: use ← → keys</span>
      </div>
    </div>
  );
}
