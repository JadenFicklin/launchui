import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
    },
    extend: {
      colors: {
        script: 'hsl(var(--script) / <alpha-value>)',
        theme: {
          50: 'hsl(var(--theme-50) / <alpha-value>)',
          100: 'hsl(var(--theme-100) / <alpha-value>)',
          200: 'hsl(var(--theme-200) / <alpha-value>)',
          300: 'hsl(var(--theme-300) / <alpha-value>)',
          400: 'hsl(var(--theme-400) / <alpha-value>)',
          500: 'hsl(var(--theme-500) / <alpha-value>)',
          600: 'hsl(var(--theme-600) / <alpha-value>)',
          700: 'hsl(var(--theme-700) / <alpha-value>)',
          800: 'hsl(var(--theme-800) / <alpha-value>)',
          900: 'hsl(var(--theme-900) / <alpha-value>)',
          950: 'hsl(var(--theme-950) / <alpha-value>)',
        },
        mono: {
          base: 'hsl(var(--mono-base) / <alpha-value>)',
          50: 'hsl(var(--mono-50) / <alpha-value>)',
          100: 'hsl(var(--mono-100) / <alpha-value>)',
          200: 'hsl(var(--mono-200) / <alpha-value>)',
          300: 'hsl(var(--mono-300) / <alpha-value>)',
          400: 'hsl(var(--mono-400) / <alpha-value>)',
          500: 'hsl(var(--mono-500) / <alpha-value>)',
          600: 'hsl(var(--mono-600) / <alpha-value>)',
          700: 'hsl(var(--mono-700) / <alpha-value>)',
          800: 'hsl(var(--mono-800) / <alpha-value>)',
          900: 'hsl(var(--mono-900) / <alpha-value>)',
          950: 'hsl(var(--mono-950) / <alpha-value>)',
          full: 'hsl(var(--mono-full) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config
