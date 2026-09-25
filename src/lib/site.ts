import { Github, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";

/** Single source for contact details and social links used across sections */
export const EMAIL = "makbarkozhikkal@gmail.com";
export const PHONE = "+91 9846475854";
export const PHONE_HREF = "tel:+919846475854";
export const LOCATION = "Malappuram, Kerala, India";

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: "https://github.com/mohammedakbark", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-akbar-k/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/akbarr.k_", icon: Instagram },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
];

export const navItems = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];
