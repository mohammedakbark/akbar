"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Navigation Component
 * - Fixed header with smooth animation
 * - Responsive design with mobile menu support
 * - Smooth scroll navigation to sections
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll position to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation menu items with smooth scroll links
  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <motion.div
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* <Link
            href="#hero"
            className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent"
          >
            AKBAR.K
          </Link> */}
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveSection(item.href.slice(1))}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="#contact"
            className="px-4 py-2 rounded-lg bg-accent/10 text-accent font-medium hover:bg-accent/20 transition-colors duration-300 border border-accent/30"
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
