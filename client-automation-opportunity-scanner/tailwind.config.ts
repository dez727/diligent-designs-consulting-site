import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: "#f7f8fa", deep: "#eceff3" },
        ink: { DEFAULT: "#101216", soft: "#5f6670" },
        brand: { DEFAULT: "#b11226", deep: "#090a0c", mid: "#171a1f" },
        copper: "#b11226",
        blueprint: "#343a42",
        gold: "#c7ccd3",
        platinum: "#eceff3",
        signal: "#e23b4b"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 35px -12px rgba(16, 18, 22, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
