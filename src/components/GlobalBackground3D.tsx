"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GlobalBackground3D Component
 * - Creates an animated particle background using pure CSS/SVG
 * - Mouse-responsive particles for interactivity
 * - Multiple layers of depth for immersive feel
 */
export default function GlobalBackground3D() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 120;

    // Create particles with varying sizes and speeds
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 40 + 30;
      const delay = Math.random() * 8;
      const depth = Math.random() * 3;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(229, 57, 53, ${0.8 - depth * 0.2}), rgba(229, 57, 53, 0));
        border-radius: 50%;
        box-shadow: 0 0 ${size * 3}px rgba(229, 57, 53, ${0.8 - depth * 0.2}), 0 0 ${size * 6}px rgba(229, 57, 53, ${0.4 - depth * 0.1});
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s linear ${delay}s infinite;
        opacity: ${Math.random() * 0.8 + 0.2};
        filter: blur(${depth * 0.5}px);
      `;

      container.appendChild(particle);
    }

    // Add mouse tracking for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const particles = container.querySelectorAll(".particle");
      particles.forEach((p: any, index: number) => {
        const speed = (index % 3) * 0.02;
        const offsetX = (e.clientX / window.innerWidth - 0.5) * 100 * speed;
        const offsetY = (e.clientY / window.innerHeight - 0.5) * 100 * speed;
        p.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(229, 57, 53, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(229, 57, 53, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(229, 57, 53, 0.05) 0%, transparent 40%),
          linear-gradient(135deg, #0a0a0a 0%, #1a1515 50%, #0d0d0d 100%)
        `,
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at center, rgba(229, 57, 53, 0.1) 0%, transparent 70%)",
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: ${Math.random() * 0.8 + 0.2};
          }
          50% {
            transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * -400}px) scale(${Math.random() * 1.5 + 0.5}) rotate(360deg);
            opacity: ${Math.random() * 0.8 + 0.2};
          }
          95% {
            opacity: 0;
          }
          100% {
            transform: translate(${Math.random() * 150 - 75}px, -500px) scale(0) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        .particle {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
