import type { Project } from "@/data/content";
import { SafeImage } from "@/components/ui/bits";

/** Stylised app UI shown until a real screenshot exists at project.image. */
function MockScreen({ p }: { p: Project }) {
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-[#0c0c0e] p-3 pt-7">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-lg" style={{ background: p.color }} />
        <div className="text-[10px] font-semibold text-white">{p.title}</div>
      </div>
      <div className="mt-1 h-20 rounded-xl p-2" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}55)` }}>
        <div className="h-1.5 w-12 rounded bg-white/70" />
        <div className="mt-1.5 h-1.5 w-20 rounded bg-white/40" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-lg border border-white/5 bg-white/[0.04] p-1.5">
            <div className="h-3 w-3 rounded" style={{ background: `${p.color}aa` }} />
            <div className="mt-1.5 h-1 w-8 rounded bg-white/20" />
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around rounded-lg bg-white/[0.04] py-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-2 w-2 rounded-sm" style={{ background: i === 0 ? p.color : "#ffffff33" }} />
        ))}
      </div>
    </div>
  );
}

export default function Phone({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] overflow-hidden rounded-[1.6rem] border-[5px] border-[#1d1d20] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black" />
      <SafeImage src={p.image} alt={`${p.title} app screen`} className="h-full w-full object-cover object-top" fallback={<MockScreen p={p} />} />
    </div>
  );
}

export function StoreLinks({ p, compact = false }: { p: Project; compact?: boolean }) {
  const cls = compact
    ? "inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-dim transition-colors hover:border-foreground/40 hover:text-foreground"
    : "inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[12px] text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground";
  return (
    <div className="flex items-center gap-2">
      {p.android && (
        <a href={p.android} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.title} on Google Play`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M3.6 1.8 13.8 12 3.6 22.2a1 1 0 0 1-.6-.9V2.7a1 1 0 0 1 .6-.9Zm10.9 10.9 2.3 2.3-10.9 6.3 8.6-8.6Zm3.2-3.2 2.3 2.3c.7.4.7 1.1 0 1.5l-2.3 1.3-2.5-2.5 2.5-2.6ZM5.9 2.7 16.8 9l-2.3 2.3L5.9 2.7Z" />
          </svg>
          {!compact && "Google Play"}
        </a>
      )}
      {p.ios && (
        <a href={p.ios} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.title} on the App Store`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.3 9.8.8 1.2 1.8 2.5 3 2.5 1.2-.1 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.7-4ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" />
          </svg>
          {!compact && "App Store"}
        </a>
      )}
    </div>
  );
}
