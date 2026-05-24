/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-dark': '#121212',
        'gh-card': '#1e1e1e',
        'gh-gold': '#d4af37',
        'gh-gold-hover': '#b8962e',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  corePlugins: {
    preflight: false, // Prevents Tailwind from resetting existing base styles
  },
  daisyui: {
    themes: [
      {
        bistro: {
          "primary": "#d4af37",
          "secondary": "#1e1e1e",
          "accent": "#b8962e",
          "neutral": "#121212",
          "base-100": "#121212",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
