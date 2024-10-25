import type {
  AppearancePreference,
  FlavorPreference,
} from '~/features/theme/types/Preferences'

type ThemePreference = {
  appearance?: AppearancePreference
  flavor?: FlavorPreference
}

export const saveThemePreference = <K extends keyof ThemePreference>(
  key: K,
  value: ThemePreference[K],
): void => {
  const themeStr = localStorage.getItem('theme') ?? '{}'
  let themeObj: ThemePreference

  try {
    themeObj = JSON.parse(themeStr) as ThemePreference
  } catch (error) {
    console.error('Error parsing theme from localStorage:', error)
    return
  }

  themeObj[key] = value
  localStorage.setItem('theme', JSON.stringify(themeObj))
}

export const getSavedThemePreference = <K extends keyof ThemePreference>(
  key: K,
): ThemePreference[K] | undefined => {
  const themeStr = localStorage.getItem('theme')

  if (!themeStr) return undefined

  let themeObj: ThemePreference

  try {
    themeObj = JSON.parse(themeStr) as ThemePreference
  } catch (error) {
    console.error('Error parsing theme from localStorage:', error)
    return undefined
  }

  return themeObj[key]
}
