/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040D14', 
        foreground: '#f8fafc', 
        "brand-blue": "#0ECFFE", 
        "brand-midnight": "#051C2C", 
        "brand-slate": "#8591A9",
        navy: {
          DEFAULT: '#051C2C',
          mid: '#0ECFFE',
          light: '#8591A9',
        },
        brand: {
          blue: '#0ECFFE',
          cyan: '#0ECFFE',
          violet: '#8b5cf6',
          dark: '#051C2C',
          slate: '#8591A9',
        },
        ink: '#F8FAFC',
        divider: 'rgba(255, 255, 255, 0.1)',
        muted: '#8591A9',
      },
      fontFamily: {
        sans: ['"Google Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Space Grotesk"', 'Georgia', 'serif'],
        technical: ['"Space Grotesk"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(0, 87, 184, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)',
      },
      maxWidth: {
        'content': '1440px',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}