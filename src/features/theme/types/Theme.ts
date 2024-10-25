import type colors from 'tailwindcss/colors'

export type Appearance = 'light' | 'dark'

export type FlavorScheme = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export type TailwindColor = keyof typeof colors
export type FlavorName = TailwindColor | 'custom'

export type Flavor = {
  name: FlavorName
  seed: string
  light: FlavorScheme
  dark: FlavorScheme
}

export type AppearanceColor =
  | 'mono-base'
  | 'mono-50'
  | 'mono-100'
  | 'mono-200'
  | 'mono-300'
  | 'mono-400'
  | 'mono-500'
  | 'mono-600'
  | 'mono-700'
  | 'mono-800'
  | 'mono-900'
  | 'mono-950'
  | 'mono-full'
  | 'script'

export type AppearanceScheme = Record<AppearanceColor, string>
