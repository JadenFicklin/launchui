'use client'

import { useAtom, useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { appearanceAtom, flavorAtom } from '~/features/theme/atoms/theme.atom'
import { appearancePreferenceAtom } from '~/features/theme/atoms/preferences.atom'
import { getSavedThemePreference } from '~/features/theme/utils/themeLocalStorage'

export const InitializeTheme: React.FC = () => {
  useInitializeTheme()
  return <></>
}

const useInitializeTheme = () => {
  const setAppearance = useSetAtom(appearanceAtom)
  const setFlavor = useSetAtom(flavorAtom)
  const [appearancePreference, setAppearancePreference] = useAtom(
    appearancePreferenceAtom,
  )

  const setInitialFlavor = useCallback(() => {
    const savedFlavor = getSavedThemePreference('flavor')
    if (savedFlavor) setFlavor(savedFlavor)
  }, [setFlavor])

  const setInitialAppearance = useCallback(() => {
    const initialAppearance = getSavedThemePreference('appearance')
    const preference = initialAppearance ?? 'system'
    setAppearancePreference(preference)
  }, [setAppearancePreference])

  const updateAppearance = useCallback(
    (e: MediaQueryListEvent) => {
      if (appearancePreference !== 'system') return
      const newAppearance = e.matches ? 'dark' : 'light'
      setAppearance(newAppearance)
    },
    [appearancePreference, setAppearance],
  )

  useEffect(() => {
    setInitialFlavor()
  }, [setInitialFlavor])

  useEffect(() => {
    setInitialAppearance()
  }, [setInitialAppearance])

  useEffect(() => {
    const windowScheme = window?.matchMedia('(prefers-color-scheme: dark)')
    windowScheme.addEventListener('change', updateAppearance)
    return () => windowScheme.removeEventListener('change', updateAppearance)
  }, [updateAppearance])
}
