import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      boxShadow: {
        card: '0 6px 12px rgba(2,6,23,0.06)',
        dark: '0 8px 24px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        xl: '12px',
        lg: '8px'
      }
    },
  },
  plugins: [],
} satisfies Config
