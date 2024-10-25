import { atom } from 'jotai'
import { defaultFlavor } from '~/features/theme/constants/defaultFlavor'
import { appearanceColors } from '~/features/theme/constants/appearanceColors'
import type {
  Appearance,
  AppearanceColor,
  Flavor,
  FlavorScheme,
} from '~/features/theme/types/Theme'

export const appearanceAtom = atom('light', (get, set, update) => {
  const appearance = update as Appearance
  const flavor = get(flavorAtom)

  const rootStyle = document.documentElement.style
  const classList = document.documentElement.classList

  if (appearance === 'dark') {
    classList.add('dark')
    rootStyle.setProperty(`color-scheme`, 'dark')
  }

  if (appearance === 'light') {
    classList.remove('dark')
    rootStyle.setProperty(`color-scheme`, 'light')
  }

  for (const color in appearanceColors[appearance]) {
    const currentColor = appearanceColors[appearance][color as AppearanceColor]
    rootStyle.setProperty(`--${color}`, currentColor)
  }

  applyFlavor(appearance, flavor)
  set(appearanceAtom, appearance)
})

export const flavorAtom = atom(defaultFlavor, (get, set, update) => {
  const flavor = update as Flavor
  const appearance = get(appearanceAtom) as Appearance
  applyFlavor(appearance, flavor)
  set(flavorAtom, flavor)
})

const applyFlavor = (appearance: Appearance, newFlavor: Flavor) => {
  const rootStyle = document.documentElement.style

  const currentFlavorScheme = newFlavor[appearance]

  for (const color in currentFlavorScheme) {
    const colorKey = color as unknown as keyof FlavorScheme
    const currentColor = currentFlavorScheme[colorKey]
    rootStyle.setProperty(`--theme-${color}`, currentColor)
  }
}
