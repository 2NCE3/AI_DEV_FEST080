import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#10261f",
        ink: "#17231f",
        muted: "#65736e",
        subtle: "#8b9692",
        line: "#e3e9e6",
        surface: "#ffffff",
        appBg: "#f5f8f6",
        upay: {
          DEFAULT: "#0e9f67",
          dark: "#087c50",
          soft: "#e8f7f0",
          light: "#54d59d",
        },
        risk: {
          critical: "#dc3f4d",
          criticalSoft: "#fdecef",
          high: "#e8752e",
          highSoft: "#fff1e7",
          medium: "#b7790b",
          mediumSoft: "#fff7df",
          low: "#0e9f67",
          lowSoft: "#e8f7f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(16, 38, 31, 0.05), 0 1px 2px rgba(16, 38, 31, 0.03)",
        drawer: "-10px 0 40px rgba(16, 38, 31, 0.12)",
        subtle: "0 2px 8px rgba(16, 38, 31, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
