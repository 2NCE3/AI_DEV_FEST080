import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        line: "var(--line)",
        lineStrong: "var(--line-strong)",
        surface: "var(--surface)",
        surfaceAlt: "var(--bg-alt)",
        appBg: "var(--bg)",
        upay: {
          DEFAULT: "var(--upay-gold, #f59e0b)",
          gold: "var(--upay-gold, #f59e0b)",
          amber: "var(--upay-amber, #d97706)",
          navy: "var(--upay-navy, #0b132b)",
          dark: "var(--upay-dark, #070a12)",
          cyan: "var(--upay-cyan, #06b6d4)",
          emerald: "var(--upay-emerald, #10b981)",
          soft: "var(--upay-soft, rgba(245, 158, 11, 0.12))",
          light: "var(--upay-light, #fcd34d)",
        },
        cyber: {
          dark: "#060913",
          panel: "#0d1424",
          card: "#111a30",
          border: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(245, 158, 11, 0.25)",
        },
        risk: {
          critical: "var(--red)",
          criticalSoft: "var(--red-soft)",
          high: "var(--orange)",
          highSoft: "var(--orange-soft)",
          medium: "var(--amber)",
          mediumSoft: "var(--amber-soft)",
          low: "var(--green)",
          lowSoft: "var(--green-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        drawer: "var(--shadow-lg)",
        subtle: "var(--shadow-md)",
        glowGold: "0 0 20px rgba(245, 158, 11, 0.35)",
        glowCyan: "0 0 20px rgba(6, 182, 212, 0.35)",
        glowCrimson: "0 0 20px rgba(244, 63, 94, 0.35)",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
