import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Viewports where the Projects section uses pinned horizontal scrolling
        hscroll: { raw: "(min-width: 1024px) and (min-height: 700px)" },
      },
      colors: {
        background: "#0a0a0b",
        surface: "#111113",
        foreground: "#f5f5f7",
        muted: "#6b6b73",
        "muted-foreground": "#a1a1aa",
        accent: "#8B7BD8",
        "accent-hover": "#7A69CC",
        "accent-muted": "rgba(139, 123, 216, 0.25)",
        line: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
export default config;
