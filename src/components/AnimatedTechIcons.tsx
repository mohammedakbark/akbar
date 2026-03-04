"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Braces,
  Zap,
  GitBranch,
  Database,
  Cpu,
  Cloud,
  Smartphone,
} from "lucide-react";

/**
 * AnimatedTechIcons Component
 * - Displays floating tech icons with animations
 * - Used in background to add visual interest
 * - Responsive and performance-optimized
 */
interface TechIcon {
  id: number;
  icon: React.ReactNode;
  label: string;
  delay: number;
  position: { top: string; left: string };
  color: string;
  duration: number;
}

export default function AnimatedTechIcons() {
  const techIcons: TechIcon[] = [
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6" />,
      label: "Flutter",
      delay: 0,
      position: { top: "10%", left: "5%" },
      color: "#2196F3",
      duration: 4,
    },
    {
      id: 2,
      icon: <Code2 className="w-6 h-6" />,
      label: "JavaScript",
      delay: 0.5,
      position: { top: "20%", left: "90%" },
      color: "#F7DF1E",
      duration: 5,
    },
    {
      id: 3,
      icon: <Braces className="w-6 h-6" />,
      label: "Node.js",
      delay: 1,
      position: { top: "70%", left: "10%" },
      color: "#339933",
      duration: 4.5,
    },
    {
      id: 4,
      icon: <GitBranch className="w-6 h-6" />,
      label: "Git",
      delay: 1.5,
      position: { top: "75%", left: "85%" },
      color: "#F1502F",
      duration: 5.5,
    },
    {
      id: 5,
      icon: <Database className="w-6 h-6" />,
      label: "Firebase",
      delay: 0.3,
      position: { top: "45%", left: "8%" },
      color: "#FFA726",
      duration: 4.8,
    },
    {
      id: 6,
      icon: <Cpu className="w-6 h-6" />,
      label: "React",
      delay: 0.8,
      position: { top: "40%", left: "92%" },
      color: "#61DAFB",
      duration: 5.2,
    },
    {
      id: 7,
      icon: <Cloud className="w-6 h-6" />,
      label: "MongoDB",
      delay: 1.2,
      position: { top: "15%", left: "50%" },
      color: "#13AA52",
      duration: 4.5,
    },
    {
      id: 8,
      icon: <Zap className="w-6 h-6" />,
      label: "TypeScript",
      delay: 0.6,
      position: { top: "80%", left: "50%" },
      color: "#3178C6",
      duration: 5.3,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {techIcons.map((tech) => (
        <motion.div
          key={tech.id}
          className="absolute p-3 rounded-lg backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          style={{
            top: tech.position.top,
            left: tech.position.left,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.6, delay: tech.delay }}
          whileHover={{ scale: 1.2, opacity: 1 }}
        >
          {/* Animated rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: tech.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ color: tech.color }}
          >
            {tech.icon}
          </motion.div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"
            style={{
              boxShadow: `0 0 20px ${tech.color}`,
            }}
          />

          {/* Tooltip label */}
          <motion.div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background/80 rounded text-xs whitespace-nowrap opacity-0 pointer-events-auto"
            whileHover={{ opacity: 1 }}
            style={{ color: tech.color }}
          >
            {tech.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
