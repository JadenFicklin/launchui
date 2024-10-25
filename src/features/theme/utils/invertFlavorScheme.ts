import type { FlavorScheme } from '~/features/theme/types/Theme'

export const invertFlavorScheme = (colorScheme: FlavorScheme) => {
  const invertedScheme: FlavorScheme = {
    50: colorScheme['950'],
    100: colorScheme['900'],
    200: colorScheme['800'],
    300: colorScheme['700'],
    400: colorScheme['600'],
    500: colorScheme['500'],
    600: colorScheme['400'],
    700: colorScheme['300'],
    800: colorScheme['200'],
    900: colorScheme['100'],
    950: colorScheme['50'],
  }

  return invertedScheme
}
