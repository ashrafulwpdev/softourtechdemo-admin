import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        borderc: 'var(--border)',
        textc: 'var(--text)',
        textmuted: 'var(--text-muted)',
        primary: 'var(--primary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      boxShadow: {
        cardLight: '0 6px 12px rgba(2,6,23,0.06)',
        cardDark: '0 8px 24px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: []
}
export default config
