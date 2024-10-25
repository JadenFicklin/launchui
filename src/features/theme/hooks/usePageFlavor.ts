import type { TailwindColor } from '~/features/theme/types/Theme'
import { useAtomValue, useSetAtom } from 'jotai'
import { flavorPreferenceAtom } from '~/features/theme/atoms/preferences.atom'
import { flavorAtom } from '~/features/theme/atoms/theme.atom'
import { createTailwindFlavor } from '~/features/theme/utils/createTailwindFlavor'
import { useEffect } from 'react'

export const usePageFlavor = (color: TailwindColor) => {
  const setFlavor = useSetAtom(flavorAtom)
  const flavorPreference = useAtomValue(flavorPreferenceAtom)

  useEffect(() => {
    const tailwindFlavor = createTailwindFlavor(color)
    setFlavor(tailwindFlavor)

    return () => setFlavor(flavorPreference)
  })
}
