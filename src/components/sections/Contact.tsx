"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { EMAIL, LOCATION, PHONE, PHONE_HREF, socials } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-foreground placeholder:text-muted transition-colors duration-300 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

/**
 * Contact Section Component
 * - Contact details + a form that opens the visitor's email app pre-filled
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [opened, setOpened] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${formData.message}\n\n— ${formData.name}\n${formData.email}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpened(true);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: "Phone", value: PHONE, href: PHONE_HREF },
    { icon: MapPin, label: "Location", value: LOCATION, href: null },
  ];

  return (
    <section id="contact" className="section-y relative w-full overflow-hidden border-t border-line">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />

      <Reveal className="container-x relative">
        <SectionHeader
          index="05"
          label="Contact"
          title={
            <>
              Let&apos;s work <span className="text-gradient">together</span>
            </>
          }
          subtitle="Have a project or an opportunity in mind? I usually reply within a day."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Details */}
          <div className="space-y-4 lg:col-span-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                      {label}
                    </span>
                    <span className="block truncate font-medium text-foreground">
                      {value}
                    </span>
                  </span>
                  {href && (
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  )}
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  data-reveal
                  className="card card-hover group flex items-center gap-4 p-4"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} data-reveal className="card flex items-center gap-4 p-4">
                  {inner}
                </div>
              );
            })}

            <div data-reveal className="pt-4">
              <p className="mb-3 text-sm text-muted-foreground">Find me online</p>
              <div className="flex gap-3">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="icon-btn"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            data-reveal
            className="card space-y-5 p-6 md:p-8 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground/90">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={inputClass}
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground/90">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground/90">Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project discussion"
                className={inputClass}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground/90">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me a little about your project…"
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </label>

            {opened && (
              <p className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground/90" role="status">
                Opening your email app… If nothing happens, email me directly at{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-accent underline underline-offset-2">
                  {EMAIL}
                </a>
                .
              </p>
            )}

            <button type="submit" className="btn-primary group w-full py-3.5">
              Send message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
