import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        positive: "rgb(var(--color-positive) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        silver: "rgb(var(--color-silver) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1180px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgb(var(--color-positive) / 0.35)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 0 5px rgb(var(--color-positive) / 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-dot": "pulse-dot 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
