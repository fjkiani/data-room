/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Universal theme colors using CSS custom properties
        'theme': {
          'primary': 'var(--bg-primary)',
          'secondary': 'var(--bg-secondary)',
          'card': 'var(--bg-card)',
        },
        'text-theme': {
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
        },
        'border-theme': {
          'primary': 'var(--border-primary)',
        },
        // Override common slate colors to use theme
        'slate': {
          '50': 'var(--slate-50, #f8fafc)',
          '100': 'var(--slate-100, #f1f5f9)',
          '200': 'var(--slate-200, #e2e8f0)',
          '300': 'var(--slate-300, #cbd5e1)',
          '400': 'var(--slate-400, #94a3b8)',
          '500': 'var(--slate-500, #64748b)',
          '600': 'var(--slate-600, #475569)',
          '700': 'var(--slate-700, #334155)',
          '800': 'var(--slate-800, var(--bg-card))',
          '900': 'var(--slate-900, var(--bg-primary))',
          '950': 'var(--slate-950, var(--bg-secondary))',
        }
      }
    },
  },
  plugins: [],
}

