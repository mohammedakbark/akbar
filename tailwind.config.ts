import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        card: "#0a0a0c",
        line: "#1c1c20",
        foreground: "#f5f5f5",
        dim: "#8a8a8f",
        faint: "#55555b",
        live: "#22c55e",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
