import type { Flavor, FlavorScheme } from '~/features/theme/types/Theme'
import { useAtomValue, useSetAtom } from 'jotai'
import { HexColorPicker } from 'react-colorful'
import { Input } from '~/components/Input'
import { flavorAtom } from '~/features/theme/atoms/theme.atom'
import { getHslValue } from '~/features/theme/utils/getHslValue'
import { invertFlavorScheme } from '~/features/theme/utils/invertFlavorScheme'
import { flavorPreferenceAtom } from '~/features/theme/atoms/preferences.atom'
import { Transition } from '@headlessui/react'
import tinycolor from 'tinycolor2'

export const SelectCustomFlavor: React.FC = () => {
  const flavor = useAtomValue(flavorAtom)
  const isCustomFlavor = flavor.name === 'custom'

  return (
    <Transition
      show={isCustomFlavor}
      enterFrom='grid-rows-[0fr]'
      enterTo='grid-rows-[1fr]'
      leaveFrom='grid-rows-[1fr]'
      leaveTo='grid-rows-[0fr]'
      className='grid duration-200 ease-in-out'
    >
      <div className='relative -left-5 -top-5 overflow-hidden pl-5 pr-5 pt-5'>
        <CustomFlavorPicker />
      </div>
    </Transition>
  )
}

const CustomFlavorPicker: React.FC = () => {
  const { color, handleColorChange, handleInput } = useCustomFlavorPicker()

  return (
    <div className='flex flex-col gap-4 pb-1'>
      <span className='text-xs font-medium text-script/50'>Custom</span>
      <div className='w-64 space-y-4 sm:w-96'>
        <HexColorPicker
          color={color}
          onChange={handleColorChange}
          className='min-w-full'
        />
        <div className='flex gap-4'>
          <Input
            value={color}
            onChange={handleInput}
            id='custom-color'
            className='w-full sm:w-auto'
          />
        </div>
      </div>
    </div>
  )
}

const useCustomFlavorPicker = () => {
  const flavor = useAtomValue(flavorAtom)
  const setFlavorPreference = useSetAtom(flavorPreferenceAtom)

  const generateFlavorScheme = (hexColor: string): FlavorScheme => {
    // Convert the hex color to HSL and get the average brightness
    const hsl = tinycolor(hexColor).toHsl()
    const baseBrightness = 0.485
    hsl.l = baseBrightness

    // Initialize the color scheme object
    const colorScheme: Record<number, string> = {
      500: getHslValue(hsl),
    }

    // Create the color scheme
    const steps: number[] = [50, 100, 200, 300, 400, 600, 700, 800, 900, 950]
    steps.forEach((step) => {
      // The lower the contrast level, the further the brightness will be adjusted
      let contrastLevel = 1350
      if (step < 400) contrastLevel = 940

      // Reverse the brightness step calculation to make 950 darkest and 50 brightest
      const baseStep = 500
      const adjustment = (baseStep - step) / contrastLevel
      const targetBrightness = hsl.l + adjustment

      const adjustedColor = getHslValue({
        h: hsl.h,
        s: hsl.s,
        l: targetBrightness,
      })

      // Add to the color scheme object
      colorScheme[step] = adjustedColor
    })

    return colorScheme as FlavorScheme
  }

  const handleColorChange = (color: string) => {
    const newScheme = generateFlavorScheme(color)

    const newFlavor: Flavor = {
      name: 'custom',
      seed: color,
      light: newScheme,
      dark: invertFlavorScheme(newScheme),
    }

    setFlavorPreference(newFlavor)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange(e.target.value)
  }

  const color = flavor.seed

  return {
    color,
    handleColorChange,
    handleInput,
  }
}
