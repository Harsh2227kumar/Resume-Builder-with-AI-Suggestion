/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8b5cf6', // Deep Violet
        'secondary': '#3b82f6', // Electric Blue
        'accent': '#10b981', // Emerald Green (AI/Success)
        'highlight': '#f59e0b', // Amber (Warning/Highlight)
        'bg-warm': '#fafafa', // Warm White Background
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}