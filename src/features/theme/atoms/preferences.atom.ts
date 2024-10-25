import { atom } from 'jotai'
import { defaultFlavor } from '~/features/theme/constants/defaultFlavor'
import type {
  AppearancePreference,
  FlavorPreference,
} from '~/features/theme/types/Preferences'
import { appearanceAtom, flavorAtom } from '~/features/theme/atoms/theme.atom'
import { saveThemePreference } from '~/features/theme/utils/themeLocalStorage'

export const appearancePreferenceAtom = atom('light', (get, set, update) => {
  const appearancePreference = update as AppearancePreference
  saveThemePreference('appearance', appearancePreference)

  if (appearancePreference === 'system') {
    const windowScheme = window?.matchMedia('(prefers-color-scheme: dark)')
    const systemTheme = windowScheme.matches ? 'dark' : 'light'

    set(appearanceAtom, systemTheme)
    set(appearancePreferenceAtom, appearancePreference)
    return
  }

  set(appearanceAtom, appearancePreference)
  set(appearancePreferenceAtom, appearancePreference)
})

export const flavorPreferenceAtom = atom(defaultFlavor, (get, set, update) => {
  const flavorPreference = update as FlavorPreference
  saveThemePreference('flavor', flavorPreference)
  set(flavorAtom, flavorPreference)
  set(flavorPreferenceAtom, flavorPreference)
})
