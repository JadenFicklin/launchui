import type { TailwindColor } from '~/features/theme/types/Theme'

type TailwindColors = {
  monochromatic: TailwindColor[]
  chromatic: TailwindColor[]
}

export const tailwindColors: TailwindColors = {
  monochromatic: ['slate', 'gray', 'zinc', 'neutral', 'stone'],
  chromatic: [
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
  ],
}
