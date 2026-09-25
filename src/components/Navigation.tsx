"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getLenis, scrollToId } from "@/lib/scroll";
import { navItems, socials } from "@/lib/site";

/**
 * Navigation Component
 * - Fixed header that hides on scroll-down and returns on scroll-up
 * - Active section tracked via IntersectionObserver with a sliding indicator
 * - Full-screen menu on mobile
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // Background + hide-on-scroll-down
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsHidden(y > lastY && y > 400);
      lastY = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section: whichever section crosses the middle band of the viewport
  useEffect(() => {
    const ids = ["hero", ...navItems.map((item) => item.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scrolling while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Let the menu start closing (and Lenis restart) before scrolling
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled || menuOpen
            ? "border-b border-line bg-background/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: isHidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <nav className="container-x flex h-[72px] items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => go("hero")}
            className="text-xl font-bold tracking-tight text-foreground"
            aria-label="Back to top"
          >
            AK<span className="text-accent">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1 md:flex">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/15"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover sm:inline-flex"
            >
              Let&apos;s Talk
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="icon-btn md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className={`flex w-full items-baseline gap-4 border-b border-line py-4 text-left text-3xl font-bold ${
                      activeSection === item.id ? "text-accent" : "text-foreground"
                    }`}
                  >
                    <span className="text-xs font-medium tabular-nums text-muted">
                      0{i + 1}
                    </span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-auto flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
