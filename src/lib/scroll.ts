import type Lenis from "lenis";

/**
 * Shared access to the page's Lenis instance so any component
 * can trigger smooth, offset-aware scrolling.
 */
let lenisInstance: Lenis | null = null;

export const NAV_OFFSET = 72;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToId(id: string) {
  const target = id === "hero" ? 0 : document.getElementById(id);
  if (target === null) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: target === 0 ? 0 : -NAV_OFFSET, duration: 1.2 });
    return;
  }

  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
