import { Car, Gavel, Languages, Package, PawPrint, Users, type LucideIcon } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  android: string | null;
  ios: string | null;
  icon: LucideIcon;
  /** Gradient stops for the app icon + in-app accents */
  color: [string, string];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "F9 Cars",
    category: "Car Service App",
    description:
      "Premium car wash booking platform with seamless booking experience and real-time slot management.",
    tags: ["Flutter", "Firebase", "REST API", "Payment Gateway"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.f9cars&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/f9-cars/id6738093040",
    icon: Car,
    color: ["#3b82f6", "#1e3a8a"],
  },
  {
    id: 2,
    title: "Wheelskart",
    category: "Used Car Auction App",
    description:
      "Second-hand car auction platform with live bidding, real-time updates, and instant notifications.",
    tags: ["Flutter", "WebSocket", "REST API", "Firebase"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.wheelskart&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/wheels-kart/id6749476545",
    icon: Gavel,
    color: ["#f97316", "#9a3412"],
  },
  {
    id: 3,
    title: "Animaline.in",
    category: "Animal Trading App",
    description:
      "Comprehensive marketplace for animal trading with live chat support and location-based listings.",
    tags: ["Flutter", "Firebase", "REST API", "WebSocket", "Google Maps", "Chat", "Google Ads", "Payment Gateway"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.animaline.in&pcampaignid=web_share",
    // App Store listing id not available yet
    ios: null,
    icon: PawPrint,
    color: ["#22c55e", "#14532d"],
  },
  {
    id: 4,
    title: "Dazzles App",
    category: "Products Management App",
    description:
      "Logistics app with real-time tracking, parking management, and end-to-end workflow automation.",
    tags: ["Flutter", "Google Maps", "REST API"],
    android: "https://play.google.com/store/apps/details?id=com.dazzles.app&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/dazzles/id6746066647",
    icon: Package,
    color: ["#eab308", "#854d0e"],
  },
  {
    id: 5,
    title: "Bhasha Sagar",
    category: "Education",
    description: "Educational app for students to learn and practice the Indian languages.",
    tags: ["Flutter", "Firebase", "REST API", "Hive Database"],
    android: "https://play.google.com/store/apps/details?id=com.ciil.bhashasagarapp&pcampaignid=web_share",
    ios: null,
    icon: Languages,
    color: ["#ec4899", "#831843"],
  },
  {
    id: 6,
    title: "Crisant HRMS",
    category: "HRMS",
    description: "HRMS app for managing employees and their data.",
    tags: ["Flutter", "Firebase", "REST API"],
    android: "https://play.google.com/store/apps/details?id=com.crisant.app&pcampaignid=web_share",
    ios: "https://apps.apple.com/in/app/crisant-hrms/id6749476600",
    icon: Users,
    color: ["#8b7bd8", "#3b2f7a"],
  },
];

/** Skill names that should match a different project tag */
const TECH_ALIASES: Record<string, string> = {
  Dart: "Flutter",
};

/** Indexes of projects that used the given technology */
export function projectsUsing(tech: string): number[] {
  const tag = TECH_ALIASES[tech] ?? tech;
  return projects.flatMap((p, i) => (p.tags.includes(tag) ? [i] : []));
}
