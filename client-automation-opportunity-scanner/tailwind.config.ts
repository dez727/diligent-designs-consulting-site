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
        slateBlue: "#2F3B6D",
        sage: "#77A38A",
        sand: "#EEE6D8",
        coral: "#EA6D58"
      },
      boxShadow: {
        soft: "0 12px 35px -12px rgba(22, 30, 52, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
