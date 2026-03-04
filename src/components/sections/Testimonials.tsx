"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Tech Startup",
    role: "Founder & CEO",
    message:
      "Mohammed delivered an exceptional mobile app within timeline. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
    avatar: "RK",
  },
  {
    name: "Sarah Johnson",
    company: "Digital Agency",
    role: "Project Manager",
    message:
      "Working with Mohammed was a pleasure. The backend architecture he built is scalable and maintainable. Highly recommended!",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Priya Patel",
    company: "E-commerce Platform",
    role: "Business Manager",
    message:
      "Delivered high-quality code and was very responsive to feedback. Our users love the app. Will definitely work with him again.",
    rating: 5,
    avatar: "PP",
  },
  {
    name: "Ahmed Hassan",
    company: "Mobile App Studio",
    role: "CTO",
    message:
      "Mohammed is a talented full-stack developer. He brings both technical expertise and creative solutions to every project.",
    rating: 5,
    avatar: "AH",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-reveal]"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards entrance
      const cards = track.querySelectorAll("[data-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const getScrollDistance = () => {
        if (!track) return 0;
        return Math.max(track.scrollWidth - window.innerWidth, 0);
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Header */}
        <div ref={headerRef} className="flex-shrink-0 px-8 pt-12 pb-8 md:px-16 lg:px-24 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span
                data-reveal
                className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-4 opacity-0"
              >
                Testimonials
              </span>
              <h2
                data-reveal
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white opacity-0"
              >
                What Clients <span className="text-gradient">Say</span>
              </h2>
            </div>
            <p
              data-reveal
              className="text-[#777] text-sm md:text-base max-w-sm opacity-0"
            >
              Trusted by founders and teams across multiple industries
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 will-change-transform pl-8 pr-8 md:pl-16 md:pr-16 lg:pl-24 lg:pr-24"
            style={{ width: "max-content" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-card
                className="group relative flex w-[340px] flex-shrink-0 flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_8px_40px_-12px_rgba(107,91,149,0.12)] md:w-[400px] opacity-0"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#ccc] text-base leading-relaxed flex-1 mb-8">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 border border-accent/20 text-sm font-bold text-accent">
                    {testimonial.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-[#777] text-xs truncate">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex-shrink-0 px-8 pb-8 md:px-16 lg:px-24 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#444]">
            {testimonials.length} Reviews
          </span>
        </div>
      </div>
    </section>
  );
}
