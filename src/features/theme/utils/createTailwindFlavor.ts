import type {
  Flavor,
  FlavorScheme,
  TailwindColor,
} from '~/features/theme/types/Theme'
import { invertFlavorScheme } from '~/features/theme/utils/invertFlavorScheme'
import { getHslValue } from '~/features/theme/utils/getHslValue'
import colors from 'tailwindcss/colors'
import tinycolor from 'tinycolor2'

export const createTailwindFlavor = (color: TailwindColor) => {
  const tailwindScheme = colors[color] as FlavorScheme
  const progressScheme: Partial<FlavorScheme> = {}

  for (const color in tailwindScheme) {
    const colorKey = color as unknown as keyof FlavorScheme
    const hexColor = tailwindScheme[colorKey]

    const hsl = tinycolor(hexColor).toHsl()
    const currentColorHSL = getHslValue(hsl)

    progressScheme[colorKey] = currentColorHSL
  }

  const flavorScheme = progressScheme as FlavorScheme

  const newFlavor: Flavor = {
    name: color,
    seed: tailwindScheme[500],
    light: flavorScheme,
    dark: invertFlavorScheme(flavorScheme),
  }

  return newFlavor
}
