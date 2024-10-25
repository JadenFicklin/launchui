import type { FlavorScheme } from '~/features/theme/types/Theme'
import { useAtomValue } from 'jotai'
import { flavorAtom } from '~/features/theme/atoms/theme.atom'

export const FlavorSchemeGradient: React.FC = () => {
  const flavor = useAtomValue(flavorAtom)
  const brightnesses = Object.keys(flavor.light)

  return (
    <div className='border-1 flex self-center overflow-hidden rounded-lg border border-mono-200'>
      {brightnesses.map((brightness) => {
        const currentBrightness =
          flavor.light[brightness as unknown as keyof FlavorScheme]
        const currentColor = `hsl(${currentBrightness})`

        return (
          <div
            key={brightness}
            className='relative flex flex-col items-center gap-2'
          >
            <div
              className='h-6 w-8 duration-150'
              style={{ backgroundColor: currentColor }}
            />
          </div>
        )
      })}
    </div>
  )
}
