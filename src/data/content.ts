/**
 * Single source of truth for all portfolio content.
 * Edit text, links and assets here — components only render it.
 * Words wrapped in *asterisks* render in the italic serif accent.
 */

export const profile = {
  name: "Mohammed Akbar K",
  shortName: "Akbar",
  role: "Software Engineer · Mobile apps & end-to-end delivery",
  location: "Malappuram, Kerala",
  country: "IN",
  timeZone: "Asia/Kolkata",
  tzLabel: "IST",
  status: "Open to roles & client projects",
  email: "makbarkozhikkal@gmail.com",
  phone: "+91 98464 75854",
  phoneHref: "tel:+919846475854",
  whatsapp: "https://wa.me/919846475854",
  photo: "/profile/center.webp",
  photoDir: "/profile", // 9 head-direction frames: center, left, right, top, bottom, top-left, …
  resume: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/mohammedakbark" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-akbar-k/" },
    { label: "Instagram", href: "https://www.instagram.com/akbarr.k_/" },
  ],
};

export const hero = {
  badge: "Open to roles & client projects",
  headline: "You bring the *business headache.* I build the software that makes it disappear.",
  intro:
    "Software engineer from Kerala. Mobile apps are my craft; with an AI-accelerated workflow I also deliver the backend and web pieces, so you get one person who takes a business problem all the way to a working product.",
};

export const stats = [
  { value: "20+", label: "Projects delivered" },
  { value: "50K+", label: "Users on shipped apps" },
  { value: "6", label: "Products live in production" },
  { value: "3+", label: "Years in production" },
];

export const intro = {
  lead: "Most businesses don't need more software. They need the *right* software: the booking that never double-books, the report that writes itself, the approval that no longer lives in a WhatsApp group.",
  sub: "Car-wash bookings, live auctions, HR, logistics, marketplaces. Different industries, same job: find the bottleneck and remove it.",
  closer: ["*Code is the easy part.*", "Understanding the problem is the job."],
};

export const process = [
  { title: "Understand", text: "Sit with the people doing the work and map how it really happens today." },
  { title: "Simplify", text: "Find the smallest solution that removes the pain, not the biggest one I could build." },
  { title: "Build & ship", text: "Mobile, backend or web, whatever fits. Tested, released and in people's hands." },
  { title: "Automate & support", text: "Remove the manual steps that are left, watch how it's used, and keep improving it." },
];

export type Project = {
  id: string;
  title: string;
  sector: string;
  year: string;
  role: string;
  problem: string;
  summary: string; // the solution
  tags: string[];
  icon: string; // real app icon (from the store listing)
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
    role: "Mobile + real-time",
    problem: "Dealers were losing used-car auctions to slow, manual bid updates.",
    summary:
      "A live auction app with a 100+ point vehicle inspection checklist. Bids update in real time over WebSockets, countdowns stay in sync on every phone, and instant alerts mean no dealer misses the closing second.",
    tags: ["Flutter", "WebSocket", "REST API", "Firebase"],
    icon: "/apps/icons/wheelskart.png",
    color: "#2563eb",
    android: "https://play.google.com/store/apps/details?id=com.crisant.wheelskart",
    ios: "https://apps.apple.com/in/app/wheels-kart/id6749476545",
  },
  {
    id: "f9cars",
    title: "F9 Cars",
    sector: "Automotive",
    year: "2024",
    role: "Mobile + payments",
    problem: "Phone-call bookings caused double-booked car-wash slots.",
    summary: "Self-serve booking with customer and staff modules, QR login, live vehicle-status tracking and PhonePe payments.",
    tags: ["Flutter", "Firebase", "QR", "PhonePe"],
    icon: "/apps/icons/f9cars.png",
    color: "#f97316",
    android: "https://play.google.com/store/apps/details?id=com.crisant.f9cars",
    ios: "https://apps.apple.com/in/app/f9-cars/id6738093040",
  },
  {
    id: "animaline",
    title: "Animaline.in",
    sector: "Marketplace",
    year: "2025",
    role: "Mobile + marketplace",
    problem: "Animal buyers and sellers had no trusted, local way to find each other.",
    summary: "A marketplace with location-based listings, favorites, premium plans, live chat and payments.",
    tags: ["Flutter", "Maps", "Chat", "WebSocket"],
    icon: "/apps/icons/animaline.png",
    color: "#10b981",
    android: "https://play.google.com/store/apps/details?id=com.crisant.animaline.in",
    ios: null,
  },
  {
    id: "dazzles",
    title: "Dazzles",
    sector: "Automation",
    year: "2025",
    role: "Mobile + workflow",
    problem: "Stock and deliveries were tracked by phone calls and guesswork.",
    summary: "Stock, delivery and logistics in one platform, with role-based modules, parking management and push notifications.",
    tags: ["Flutter", "Push", "REST API", "Roles"],
    icon: "/apps/icons/dazzles.png",
    color: "#e11d48",
    android: "https://play.google.com/store/apps/details?id=com.dazzles.app",
    ios: "https://apps.apple.com/in/app/dazzles/id6746066647",
  },
  {
    id: "bhashasagar",
    title: "Bhasha Sagar",
    sector: "Edtech",
    year: "2024",
    role: "Mobile + localization",
    problem: "Learners needed one place to practise many Indian languages.",
    summary: "A multilingual learning app with dynamic localization and BLoC architecture.",
    tags: ["Flutter", "BLoC", "Localization", "Firebase"],
    icon: "/apps/icons/bhashasagar.png",
    color: "#eab308",
    android: "https://play.google.com/store/apps/details?id=com.ciil.bhashasagarapp",
    ios: null,
  },
  {
    id: "crisanthrms",
    title: "Crisant HRMS",
    sector: "Automation",
    year: "2025",
    role: "Mobile + backend",
    problem: "Attendance and leave were tracked in spreadsheets nobody trusted.",
    summary: "One app for attendance, leave and employee records, used every working day.",
    tags: ["Flutter", "Firebase", "REST API"],
    icon: "/apps/icons/crisanthrms.png",
    color: "#8b5cf6",
    android: "https://play.google.com/store/apps/details?id=com.crisant.app",
    ios: "https://apps.apple.com/in/app/crisant-hrms/id6749476600",
  },
];

export const about = {
  lead: "I don't start with code. I start with *where it hurts:* the step everyone hates, the spreadsheet nobody trusts, the process that breaks every Monday. Then I build the simplest thing that fixes it.",
  body: "Today I'm a Software Engineer at Zilmoney, a US fintech, working across a suite of business payment, payroll and remittance products where reliability isn't optional. Before that, at Crisant, I worked directly with clients, turning their business ideas into scope and shipping six apps from plan to store.",
};

export const experience = [
  {
    company: "Zilmoney",
    role: "Software Engineer",
    place: "US Fintech · Manjeri, Kerala",
    period: ["2025", "Now"],
    current: true,
    points: [
      "7 fintech products: OnlineCheckWriter, ZilRemit, Virtual Cards, Payment Link, Payroll & more",
      "Secure auth, Clean Architecture, Play Store + App Store releases",
      "Tests, code review, security & compliance checks",
      "Agentic workflows: custom skills, agents, hooks & MCP integrations",
    ],
  },
  {
    company: "Crisant Technologies",
    role: "Flutter Developer",
    place: "Mysuru, Karnataka",
    period: ["2024", "2025"],
    current: false,
    points: [
      "Worked directly with clients to turn business ideas into scope and plans",
      "6+ apps from planning through store release",
      "Automotive, logistics, education & marketplace domains",
    ],
  },
  {
    company: "Softroniics",
    role: "Flutter Developer",
    place: "Malappuram, Kerala",
    period: ["2023", "2024"],
    current: false,
    points: [
      "QR login, PhonePe payments, GPS and live chat features",
      "Trained students: syllabus, practice problems, hands-on guidance",
    ],
  },
];

export const expertise = [
  {
    title: "Problem discovery & automation",
    items: ["Requirement discovery with clients", "Workflow mapping", "Scoping the simplest fix", "Replacing manual steps"],
  },
  {
    title: "Mobile apps",
    items: ["Flutter · iOS + Android", "BLoC · Riverpod · Provider · GetX", "Localization + push", "Store releases"],
  },
  {
    title: "Backend & integrations",
    items: ["REST + WebSocket integration", "Payment gateways (PhonePe)", "Firebase · Node.js · MongoDB", "AI-accelerated backend builds"],
  },
  {
    title: "Web",
    items: ["Next.js + React (this site)", "Landing pages", "Simple dashboards", "AI-accelerated delivery"],
  },
  {
    title: "Quality & release",
    items: ["Unit · widget · integration tests", "Code review (human + AI code)", "Security & compliance checks", "CI/CD + versioning"],
  },
  {
    title: "AI & agentic workflows",
    items: ["Multiple AI agents & assistants", "Custom skills, agents & hooks", "MCP integrations (Jira, Figma)", "The right tool for each job"],
  },
];

export const note = "Good software disappears. *People just notice the problem is gone.*";

export const faqs = [
  {
    q: "What kind of problems can you solve?",
    short: "Anything slowed down by manual work.",
    a: "Bookings handled over phone calls, data living in spreadsheets, approvals stuck in WhatsApp, customers with no app to reach you. If people are repeating the same manual steps every day, there's usually a simple system that can do it for them.",
  },
  {
    q: "Do you only build mobile apps?",
    short: "Mobile first, complete products end to end.",
    a: "Mobile is my specialty and where I have the deepest experience. For backend and web, I use an AI-accelerated workflow, so I can still deliver a complete product (app, API and admin panel) end to end, and I review and test everything that ships.",
  },
  {
    q: "I have an idea but no spec. Can you help?",
    short: "Yes, that's where I start.",
    a: "Most good projects start as a problem, not a document. We talk through how things work today, I suggest the simplest solution, and we agree on scope and timeline before any code is written.",
  },
  {
    q: "Are you open to full-time roles?",
    short: "Yes, and to client projects.",
    a: "I'm open to full-time mobile and software engineering roles, and to selected client projects. Send me a note and we can work out timelines.",
  },
  {
    q: "Do you work remotely?",
    short: "Remote, hybrid or on-site.",
    a: "Yes. I'm currently working with a US-based company from Kerala, and I'm comfortable across time zones with async communication.",
  },
  {
    q: "Do you use AI in your workflow?",
    short: "Every day, and not just one tool.",
    a: "I use coding agents, research assistants, AI app builders and MCP integrations, each for what it does best. I build custom skills and agents to automate repeat work, and every line that ships is reviewed and tested.",
  },
];

export const contact = {
  lines: ["Have a business problem?", "Need it automated?", "Have a role for me?"],
  sub: "Every good solution starts with a conversation.",
  subItalic: "Tell me what's slowing you down.",
};
