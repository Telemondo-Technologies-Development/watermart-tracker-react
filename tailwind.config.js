/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0066cc',
        'light-blue': '#e6f0ff',
        'dark-blue': '#004499',
        'accent-cyan': '#00d4ff',
        'gray': '#e0e6ed',
        'light-gray': '#f8fafc',
        'dark-gray': '#6c757d',
        'very-dark': '#1a1d23',
        'error': '#ef4444',
        'success': '#10b981',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-in': 'slideIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'custom': '0 2px 8px rgba(0, 102, 204, 0.15)',
        'custom-hover': '0 4px 12px rgba(0, 102, 204, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 20px rgba(0, 102, 204, 0.15)',
      }
    },
  },
  plugins: [],
}