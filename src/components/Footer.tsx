"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Github, Linkedin, Instagram } from "lucide-react";

/**
 * Footer Component
 * - Global footer with links and information
 * - Copyright and social media links
 * - Scroll to top button
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/mohammedakbark", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-akbar-k/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/akbar__kozhikkal", label: "Instagram" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-3">
              <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                Mohammed Akbar K
              </span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Software Engineer specializing in full-stack development and
              creating scalable solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            © {currentYear} Mohammed Akbar K. All rights reserved.
          </motion.p>

          {/* Made with love and scroll to top */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-accent fill-accent" />
              </motion.span>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ↑ Back to Top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
