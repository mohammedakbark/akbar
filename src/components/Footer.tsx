"use client";

import { scrollToId } from "@/lib/scroll";
import { navItems, socials } from "@/lib/site";

/**
 * Footer Component
 * - Compact footer with name, section links, socials and copyright
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-foreground">
            Mohammed Akbar K<span className="text-accent">.</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Software Engineer — Mobile &amp; Full-Stack
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="icon-btn h-9 w-9"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="container-x">
        <p className="border-t border-line py-6 text-center text-xs text-muted md:text-left">
          © {currentYear} Mohammed Akbar K. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
