import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand:       "#E8C98A",
        terracotta: "#C4622D",
        earth:      "#8B4513",
        savanna:    "#2D5016",
        cream:      "#FAF3E7",
        "deep-brown": "#1A0A00",
        gold:       "#D4900A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm:       ["var(--font-dm)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
