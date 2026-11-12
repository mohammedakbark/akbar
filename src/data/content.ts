/**
 * Single source of truth for all portfolio content.
 * Edit text, links and assets here — components only render it.
 */

export const profile = {
  name: "Mohammed Akbar K",
  shortName: "Akbar",
  role: "Software Engineer",
  location: "Malappuram, Kerala",
  country: "IN",
  timeZone: "Asia/Kolkata",
  tzLabel: "IST",
  status: "Open to roles & freelance",
  email: "makbarkozhikkal@gmail.com",
  phone: "+91 98464 75854",
  phoneHref: "tel:+919846475854",
  whatsapp: "https://wa.me/919846475854",
  photo: "/profile.jpg",
  resume: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/mohammedakbark" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-akbar-k/" },
    { label: "Instagram", href: "https://www.instagram.com/akbarr.k_/" },
  ],
};

export const hero = {
  badge: "Open to mobile & full-stack roles",
  // Words wrapped in *asterisks* render in the italic serif.
  headline: "I build apps that live on *real phones,* not just in *pitch decks.*",
  intro:
    "Software Engineer in Kerala with 3+ years shipping Flutter apps to the Play Store and App Store, from booking flows and live auctions to fintech. I care about what happens after launch: crashes, edge cases and the 2G connection.",
};

export const stats = [
  { value: "20+", label: "Projects delivered" },
  { value: "50K+", label: "Users on shipped apps" },
  { value: "6", label: "Apps live on the stores" },
  { value: "3+", label: "Years in production" },
];

export const intro = {
  lead: "I write software for moments when an app has one job and no second chance: a car wash slot that has to be there, a bid that has to land before the timer ends, a payment that has to clear.",
  sub: "Marketplaces with live chat and maps. Auctions running on WebSockets. HR and logistics tools people use every working day.",
  closer: ["*Shipping is the easy part.*", "Keeping it fast, stable and loved is the job."],
};

export type Project = {
  id: string;
  title: string;
  sector: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  image: string;
  color: string; // accent used for the card's glow / thumbnail tint
  android?: string | null;
  ios?: string | null;
};

export const projects: Project[] = [
  {
    id: "wheelskart",
    title: "Wheelskart",
    sector: "Automotive",
    year: "2025",
    role: "Flutter Developer",
    summary:
      "A used-car auction platform with live bidding. Real-time price updates over WebSockets, countdown-synced bids and instant push alerts, so dealers never miss the closing second.",
    tags: ["Flutter", "WebSocket", "REST API", "Firebase"],
    image: "/apps/wheelskart.png",
    color: "#2563eb",
    android: "https://play.google.com/store/apps/details?id=com.crisant.wheelskart",
    ios: "https://apps.apple.com/in/app/wheels-kart/id6749476545",
  },
  {
    id: "f9cars",
    title: "F9 Cars",
    sector: "Automotive",
    year: "2024",
    role: "Flutter Developer",
    summary:
      "Premium car-wash booking with real-time slot management and in-app payments.",
    tags: ["Flutter", "Firebase", "Payments"],
    image: "/apps/f9cars.png",
    color: "#f97316",
    android: "https://play.google.com/store/apps/details?id=com.crisant.f9cars",
    ios: "https://apps.apple.com/in/app/f9-cars/id6738093040",
  },
  {
    id: "animaline",
    title: "Animaline.in",
    sector: "Marketplace",
    year: "2025",
    role: "Flutter Developer",
    summary:
      "An animal-trading marketplace with live chat, location-based listings, ads and payments.",
    tags: ["Flutter", "Maps", "Chat", "WebSocket"],
    image: "/apps/animaline.png",
    color: "#10b981",
    android: "https://play.google.com/store/apps/details?id=com.crisant.animaline.in",
    ios: null,
  },
  {
    id: "dazzles",
    title: "Dazzles",
    sector: "B2B",
    year: "2025",
    role: "Flutter Developer",
    summary:
      "Product and logistics management with real-time tracking and end-to-end workflow automation.",
    tags: ["Flutter", "Google Maps", "REST API"],
    image: "/apps/dazzles.png",
    color: "#e11d48",
    android: "https://play.google.com/store/apps/details?id=com.dazzles.app",
    ios: "https://apps.apple.com/in/app/dazzles/id6746066647",
  },
  {
    id: "bhashasagar",
    title: "Bhasha Sagar",
    sector: "Edtech",
    year: "2024",
    role: "Flutter Developer",
    summary:
      "A language-learning app for practising Indian languages, built offline-first with Hive.",
    tags: ["Flutter", "Hive", "Firebase"],
    image: "/apps/bhashasagar.png",
    color: "#eab308",
    android: "https://play.google.com/store/apps/details?id=com.ciil.bhashasagarapp",
    ios: null,
  },
  {
    id: "crisanthrms",
    title: "Crisant HRMS",
    sector: "B2B",
    year: "2025",
    role: "Flutter Developer",
    summary:
      "An HR management app for attendance, leave and employee records, used every working day.",
    tags: ["Flutter", "Firebase", "REST API"],
    image: "/apps/crisanthrms.png",
    color: "#8b5cf6",
    android: "https://play.google.com/store/apps/details?id=com.crisant.app",
    ios: "https://apps.apple.com/in/app/crisant-hrms/id6749476600",
  },
];

export const about = {
  lead: "I started out fixing other people's apps, and that's still how I think. *Read the crash log before the brief,* find where real users get stuck, then build so it doesn't happen again.",
  body: "Today I'm a Software Engineer at Zilmoney, a US fintech, building iOS and Android products where reliability isn't optional. Before that I shipped six cross-platform apps at Crisant across automotive, education, marketplaces and HR. I work across the stack, from Flutter UI to Node.js APIs to store releases.",
};

export const experience = [
  {
    company: "Zilmoney",
    role: "Software Engineer",
    place: "US Fintech · Manjeri, Kerala",
    period: ["2025", "Now"],
    current: true,
    points: [
      "iOS + Android fintech products at scale",
      "Architecture, API integration and code review",
      "AI-assisted development workflows",
    ],
  },
  {
    company: "Crisant Technologies",
    role: "Flutter Developer",
    place: "Mysuru, Karnataka",
    period: ["2024", "2025"],
    current: false,
    points: [
      "Shipped 6+ cross-platform apps end to end",
      "Clean architecture with BLoC, Riverpod and Provider",
      "Automotive, edtech, e-commerce and chat domains",
    ],
  },
  {
    company: "Softroniics",
    role: "Flutter Developer",
    place: "Malappuram, Kerala",
    period: ["2023", "2024"],
    current: false,
    points: [
      "Built and maintained multiple client apps",
      "Mentored junior developers",
      "Cross-functional delivery with design + backend",
    ],
  },
];

export const expertise = [
  {
    title: "Cross-platform mobile",
    items: ["Flutter + Dart", "iOS + Android from one codebase", "Pixel-accurate UI", "Store release + review"],
  },
  {
    title: "Architecture & state",
    items: ["Clean architecture", "BLoC · Riverpod · Provider", "Testable, modular code", "Offline-first with Hive"],
  },
  {
    title: "Real-time systems",
    items: ["WebSockets + live updates", "Chat + push notifications", "Maps + location", "Payment gateways"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js + REST", "Firebase · MongoDB · PostgreSQL", "Auth + security", "API design + optimisation"],
  },
  {
    title: "Web",
    items: ["React + Next.js", "TypeScript", "Tailwind CSS", "SEO + performance"],
  },
  {
    title: "AI-assisted engineering",
    items: ["Claude Code in daily work", "Faster prototyping", "Assisted code review", "Spec + docs generation"],
  },
];

export const note = "Users never see your architecture. *They feel it,* every time the app opens fast and never loses their data.";

export const faqs = [
  {
    q: "When can you start?",
    short: "Short notice for the right role.",
    a: "I'm open to full-time mobile and full-stack roles, and to selected freelance projects. Send me a note and we can work out timelines.",
  },
  {
    q: "Do you take freelance projects?",
    short: "Yes, end to end.",
    a: "Yes. I can take an app from idea to the Play Store and App Store: UI, backend, payments, store listing and post-launch support.",
  },
  {
    q: "What's your main stack?",
    short: "Flutter, Node.js, React.",
    a: "Flutter and Dart for mobile, Node.js and Firebase on the backend, and React or Next.js for the web. I pick whatever fits the product best.",
  },
  {
    q: "Can you work on an existing codebase?",
    short: "Most of my work has.",
    a: "Yes. I've spent a lot of time maintaining and refactoring apps I didn't start. I read the code first, stabilise it, then improve it step by step.",
  },
  {
    q: "Do you work remotely?",
    short: "Remote, hybrid or on-site.",
    a: "Yes. I'm currently working with a US-based company from Kerala, and I'm comfortable across time zones with async communication.",
  },
  {
    q: "Do you use AI in your workflow?",
    short: "Daily, with judgement.",
    a: "I use AI tools like Claude Code to move faster on boilerplate, reviews and docs. Every line that ships is still my responsibility.",
  },
];

export const contact = {
  lines: ["Have an app idea?", "Need it shipped?", "Have a role for me?"],
  sub: "Every good app starts as a conversation.",
  subItalic: "Let's start one.",
};
