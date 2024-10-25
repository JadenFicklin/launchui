import type { Appearance, AppearanceScheme } from '~/features/theme/types/Theme'

type AppearanceColors = Record<Appearance, AppearanceScheme>

export const appearanceColors: AppearanceColors = {
  light: {
    'mono-base': '0deg 0% 100%',
    'mono-50': '0deg 0% 98%',
    'mono-100': '0deg 0% 96%',
    'mono-200': '0deg 0% 90%',
    'mono-300': '0deg 0% 83%',
    'mono-400': '0deg 0% 64%',
    'mono-500': '0deg 0% 45%',
    'mono-600': '0deg 0% 32%',
    'mono-700': '0deg 0% 25%',
    'mono-800': '0deg 0% 15%',
    'mono-900': '0deg 0% 9%',
    'mono-950': '0deg 0% 4%',
    'mono-full': '0deg 0% 0%',
    script: '0deg 0% 11%',
  },

  dark: {
    'mono-base': '0deg 0% 8%',
    'mono-50': '0deg 0% 4%',
    'mono-100': '0deg 0% 9%',
    'mono-200': '0deg 0% 15%',
    'mono-300': '0deg 0% 25%',
    'mono-400': '0deg 0% 32%',
    'mono-500': '0deg 0% 45%',
    'mono-600': '0deg 0% 64%',
    'mono-700': '0deg 0% 83%',
    'mono-800': '0deg 0% 90%',
    'mono-900': '0deg 0% 96%',
    'mono-950': '0deg 0% 98%',
    'mono-full': '0deg 0% 100%',
    script: '0deg 0% 100%',
  },
}
