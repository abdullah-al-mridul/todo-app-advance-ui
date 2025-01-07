/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0A0A0F",
          800: "#13131A",
          700: "#1C1C26",
          600: "#2D2D3D",
        },
        accent: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          pink: "#EC4899",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          tertiary: "#64748B",
        },
      },
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', "sans-serif"],
      },
      boxShadow: {
        nft: "0 8px 16px rgba(0, 0, 0, 0.2)",
        "inner-light": "inset 0 2px 4px rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundSize: {
        "gradient-size": "400% 400%",
        300: "300% 300%",
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        shake: "shake 0.6s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        shrink: "shrink linear forwards",
        "spin-slow": "spin 3s linear infinite",
        "bounce-delay": "bounce 1s infinite",
        "modal-fade-in": "modal-fade-in 0.2s ease-out forwards",
        "modal-fade-out": "modal-fade-out 0.2s ease-out forwards",
        "modal-backdrop-fade-in":
          "modal-backdrop-fade-in 0.2s ease-out forwards",
        "modal-backdrop-fade-out":
          "modal-backdrop-fade-out 0.2s ease-out forwards",
        "gradient-x": "gradient-x 3s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        "modal-fade-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95) translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        "modal-fade-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.95) translateY(-10px)",
          },
        },
        "modal-backdrop-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-backdrop-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% center",
          },
          "50%": {
            "background-position": "100% center",
          },
        },
      },
      transitionDelay: {
        150: "150ms",
      },
      scale: {
        102: "1.02",
      },
      spacing: {
        app: "var(--app-height)",
      },
      height: {
        app: "var(--app-height)",
        screen: "var(--vh)",
      },
      minHeight: {
        app: "var(--app-height)",
        screen: "var(--vh)",
      },
      width: {
        app: "var(--app-width)",
        screen: "var(--vw)",
      },
      minWidth: {
        app: "var(--app-width)",
        screen: "var(--vw)",
      },
    },
  },
  plugins: [],
};
