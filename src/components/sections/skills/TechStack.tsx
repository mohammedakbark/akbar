"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useLauncher } from "@/components/providers";
import { projects, projectsUsing } from "@/lib/projects";
import { skillCategories, type Skill, type SkillCategory } from "@/lib/skills";
import { scrollToId } from "@/lib/scroll";

function SkillTile({
  skill,
  active,
  onPick,
}: {
  skill: Skill;
  active: boolean;
  onPick: (skill: Skill) => void;
}) {
  const Icon = skill.icon;
  const appCount = projectsUsing(skill.tag ?? skill.name).length;
  const interactive = appCount > 0;
  const style = {
    "--brand": skill.color,
    "--brand-soft": `${skill.color}1f`,
    "--brand-line": `${skill.color}66`,
  } as CSSProperties;

  const body = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-soft)]">
        <Icon className="h-4 w-4" style={{ color: skill.color }} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">{skill.name}</span>
      {skill.core && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" title="Core daily tool" />
      )}
      {interactive && (
        <span
          className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground transition-colors group-hover:text-foreground"
          title={`Used in ${appCount} shipped app${appCount > 1 ? "s" : ""}`}
        >
          {appCount} app{appCount > 1 ? "s" : ""}
        </span>
      )}
    </>
  );

  const base =
    "group inline-flex items-center gap-2 rounded-xl border py-1.5 pl-1.5 pr-3 transition-all duration-200";

  if (!interactive) {
    return (
      <div style={style} className={`${base} border-line bg-white/[0.02] hover:border-[color:var(--brand-line)]`}>
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      style={style}
      onClick={() => onPick(skill)}
      aria-pressed={active}
      className={`${base} hover:-translate-y-0.5 active:scale-[0.98] ${
        active
          ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]"
          : "border-line bg-white/[0.02] hover:border-[color:var(--brand-line)]"
      }`}
    >
      {body}
    </button>
  );
}

function CategoryCard({
  category,
  active,
  onPick,
}: {
  category: SkillCategory;
  active: string | null;
  onPick: (skill: Skill) => void;
}) {
  const Icon = category.icon;

  const content = (
    <div
      className={`flex h-full flex-col rounded-2xl bg-surface p-5 md:p-6 ${
        category.highlight ? "" : "border border-line"
      }`}
    >
      <div className="mb-5 flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            category.highlight ? "bg-accent text-white" : "bg-accent/10 text-accent"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base text-foreground">{category.title}</h4>
            {category.highlight && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Daily workflow
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillTile key={skill.name} skill={skill} active={active === skill.name} onPick={onPick} />
        ))}
      </div>

      {category.stats && <div className="min-h-6 flex-1" aria-hidden />}
      {category.stats && (
        <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5">
          {category.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">{stat.value}</dd>
              <dd className="text-xs leading-snug text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );

  return (
    <div data-reveal className={category.span ?? ""}>
      {category.highlight ? (
        // Gradient border for the highlighted card
        <div className="h-full rounded-2xl bg-gradient-to-br from-accent/70 via-accent/15 to-emerald-400/40 p-px shadow-[0_20px_50px_-25px_rgba(139,123,216,0.5)]">
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

/**
 * TechStack
 * - Bento grid of skill categories with brand logos
 * - Techs used in shipped apps link through to those apps on the Projects phone
 */
export default function TechStack() {
  const { openApp } = useLauncher();
  const [active, setActive] = useState<Skill | null>(null);
  const matches = active ? projectsUsing(active.tag ?? active.name) : [];

  const pick = (skill: Skill) =>
    setActive((current) => (current?.name === skill.name ? null : skill));

  const jumpTo = (index: number) => {
    openApp(index);
    scrollToId("projects");
  };

  return (
    <div>
      <div data-reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-2xl text-foreground md:text-3xl">Technical proficiency</h3>
        <p className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Core daily tools
          </span>
          <span className="hidden sm:inline">Click a tech to see where it shipped</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <CategoryCard key={category.title} category={category} active={active?.name ?? null} onPick={pick} />
        ))}
      </div>

      {/* Where a tech was used */}
      <AnimatePresence initial={false}>
        {active && matches.length > 0 && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
              <p className="shrink-0 text-sm text-foreground">
                <span className="font-semibold" style={{ color: active.color }}>
                  {active.name}
                </span>{" "}
                — shipped in {matches.length} app{matches.length > 1 ? "s" : ""}:
              </p>
              <div className="flex flex-1 flex-wrap gap-2">
                {matches.map((i) => {
                  const p = projects[i];
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-background py-1 pl-1 pr-3 text-xs font-medium text-foreground transition-colors hover:border-accent/60"
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                        style={{ background: `linear-gradient(145deg, ${p.color[0]}, ${p.color[1]})` }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {p.title}
                      <ArrowRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="self-end text-muted transition-colors hover:text-foreground sm:self-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
