import { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/**
 * SectionHeader
 * - Consistent eyebrow ("01 — About"), title and optional subtitle
 * - Children carry `data-reveal` so a parent <Reveal> animates them
 */
export default function SectionHeader({
  index,
  label,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 md:mb-20 ${className}`}>
      <p
        data-reveal
        className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
      >
        <span className="tabular-nums">{index}</span>
        <span className="h-px w-8 bg-accent/50" />
        <span>{label}</span>
      </p>
      <h2
        data-reveal
        className="max-w-3xl text-4xl leading-[1.1] text-foreground md:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
