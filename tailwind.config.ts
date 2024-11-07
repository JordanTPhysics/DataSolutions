
import { Scale } from "lucide-react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)",
            Scale: "scale(0.75)",
           },
           "50%": { Scale: "scale(1.1)",},

          "100%": { transform: "translateX(-100%)",
            Scale: "scale(0.75)",
           },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)",
            Scale: "scale(0.75)",
           },
           "50%": { Scale: "scale(1.1)",},

          "100%": { transform: "translateX(0%)",
            Scale: "scale(0.75)",
           },
        },
      },

      screens: {
        mob: {'max':"640px"},
      },
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        "background-secondary": "rgba(var(--background-secondary))",
        "foreground-secondary": "rgba(var(--foreground-secondary))",
        warning: "rgba(var(--warning))",
        success: "rgba(var(--success))",
        danger: "rgba(var(--danger))",
        info: "rgba(var(--info))",
        text: "rgba(var(--text))",
        border: "rgba(var(--border))",
        contrast: "rgba(var(--contrast))",
        "icon-border": "rgba(var(--icon-border))",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
