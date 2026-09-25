import type { ComponentType, CSSProperties } from "react";
import {
  SiAndroid,
  SiApple,
  SiClaude,
  SiCursor,
  SiDart,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGithubcopilot,
  SiGooglemaps,
  SiHtml5,
  SiModelcontextprotocol,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  BellRing,
  Boxes,
  Braces,
  CreditCard,
  Database,
  Layers,
  Monitor,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
  Waves,
  Wand2,
  Wrench,
} from "lucide-react";

type Icon = ComponentType<{ className?: string; style?: CSSProperties }>;

export interface Skill {
  name: string;
  icon: Icon;
  /** Brand colour (6-digit hex), tuned to read on a dark background */
  color: string;
  /** Main daily tools */
  core?: boolean;
  /** Project tag to match against, when it differs from the name */
  tag?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: Icon;
  /** Bento sizing classes for the card */
  span?: string;
  highlight?: boolean;
  /** Optional highlight numbers shown at the bottom of the card */
  stats?: { value: string; label: string }[];
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile",
    description: "Cross-platform apps shipped to the Play Store and App Store",
    icon: Smartphone,
    span: "md:col-span-2 lg:col-span-2",
    stats: [
      { value: "6", label: "apps live on the stores" },
      { value: "3+", label: "years building with Flutter" },
      { value: "2", label: "platforms, one codebase" },
    ],
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#54C5F8", core: true },
      { name: "Dart", icon: SiDart, color: "#40C4FF", core: true },
      { name: "Android", icon: SiAndroid, color: "#3DDC84" },
      { name: "iOS", icon: SiApple, color: "#FFFFFF" },
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Provider", icon: Layers, color: "#8B7BD8" },
      { name: "Riverpod", icon: Waves, color: "#45D0C9" },
      { name: "BLoC", icon: Boxes, color: "#5CA8F0" },
    ],
  },
  {
    title: "AI-Assisted Development",
    description: "Part of my daily workflow for development, debugging, code review and automation",
    icon: Sparkles,
    highlight: true,
    skills: [
      { name: "Claude", icon: SiClaude, color: "#D97757", core: true },
      { name: "Claude Code", icon: TerminalSquare, color: "#D97757" },
      { name: "Cursor", icon: SiCursor, color: "#FFFFFF", core: true },
      { name: "MCP", icon: SiModelcontextprotocol, color: "#FFFFFF" },
      { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#FFFFFF" },
      { name: "Prompt Engineering", icon: Wand2, color: "#B3A6F0" },
    ],
  },
  {
    title: "Frontend",
    description: "Fast, responsive web apps and websites",
    icon: Monitor,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#5B9BE6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "HTML/CSS", icon: SiHtml5, color: "#F06529" },
    ],
  },
  {
    title: "Backend & Data",
    description: "APIs, real-time systems and databases",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#6CC24A", core: true },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28", core: true },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#6B8FF0" },
      { name: "REST API", icon: Braces, color: "#8B7BD8" },
      { name: "WebSocket", icon: SiSocketdotio, color: "#FFFFFF" },
      { name: "Hive", icon: Database, color: "#FFB300", tag: "Hive Database" },
    ],
  },
  {
    title: "Integrations",
    description: "Payments, maps, notifications and authentication",
    icon: Plug,
    skills: [
      { name: "Payments", icon: CreditCard, color: "#34D399", tag: "Payment Gateway" },
      { name: "Google Maps", icon: SiGooglemaps, color: "#4E8DF5" },
      { name: "Push Notifications", icon: BellRing, color: "#FFCA28" },
      { name: "Authentication", icon: ShieldCheck, color: "#B3A6F0" },
    ],
  },
  {
    title: "Tools & Workflow",
    description: "Shipping, collaboration and design handoff",
    icon: Wrench,
    span: "md:col-span-2 lg:col-span-3",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];
