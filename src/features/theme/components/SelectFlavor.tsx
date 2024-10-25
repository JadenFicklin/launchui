import type { TailwindColor } from '~/features/theme/types/Theme'
import { useAtom, useSetAtom } from 'jotai'
import { flavorAtom } from '~/features/theme/atoms/theme.atom'
import { flavorPreferenceAtom } from '~/features/theme/atoms/preferences.atom'
import { tailwindColors } from '~/features/theme/constants/tailwindColors'
import { createTailwindFlavor } from '~/features/theme/utils/createTailwindFlavor'
import { SelectCustomFlavor } from '~/features/theme/components/SelectCustomFlavor'
import { FlavorTooltip } from '~/features/theme/components/FlavorTooltip'
import { cn } from '~/utils/cn'
import customColor from '~/assets/images/custom-color.webp'
import colors from 'tailwindcss/colors'
import clsx from 'clsx'

export const SelectFlavor: React.FC = () => {
  const {
    applyFlavor,
    chromatic,
    isCustom,
    monochromatic,
    selectedFlavor,
    setCustomFlavor,
  } = useSelectFlavor()

  return (
    <section className='flex flex-col gap-8'>
      <span className='text-lg font-medium text-script'>Accent</span>

      {/* monochrome colors */}
      <div className='flex flex-col gap-4'>
        <span className='text-xs font-medium text-script/50'>Monochrome</span>
        <div className='grid grid-cols-6 gap-5 self-start sm:grid-cols-9'>
          {monochromatic.map((color) => (
            <ColorSelect
              key={color}
              color={color}
              onClick={() => applyFlavor(color)}
              selected={color === selectedFlavor}
            />
          ))}
        </div>
      </div>

      {/* chromatic colors */}
      <div className='flex flex-col gap-4'>
        <span className='text-xs font-medium text-script/50'>Chromatic</span>
        <div className='grid grid-cols-6 gap-5 self-start sm:grid-cols-9'>
          {chromatic.map((color) => (
            <ColorSelect
              key={color}
              color={color}
              onClick={() => applyFlavor(color)}
              selected={color === selectedFlavor}
            />
          ))}
          <ColorSelect
            color='custom'
            onClick={setCustomFlavor}
            selected={isCustom}
            dotClassName='bg-slate-600'
            style={{
              backgroundImage: `url(${customColor.src})`,
              outlineColor: `hsl(var(--mono-500))`,
            }}
          />
        </div>
      </div>

      {/* custom color picker */}
      <SelectCustomFlavor />
    </section>
  )
}

type ColorSelectProps = {
  color: TailwindColor | 'custom'
  isCustom?: boolean
  selected: boolean
  styles?: React.CSSProperties
  dotClassName?: string
} & React.HTMLAttributes<HTMLButtonElement>

const ColorSelect: React.FC<ColorSelectProps> = (props) => {
  const { color, styles, selected, dotClassName, ...rest } = props

  const isCustom = color === 'custom'
  const selectedColor = isCustom ? '' : colors[color][500]

  const selectClasses = clsx(
    'relative h-6 w-6 cursor-pointer rounded-full bg-cover bg-center',
    'grid place-items-center duration-150',
    'before:absolute before:inset-0 focus:outline-none',
    'before:rounded-full before:duration-150 before:content-[""]',
    'before:outline before:outline-2 before:outline-transparent',
    'before:focus:outline-offset-[3px] before:focus:outline-inherit',
  )

  const dotClasses = cn(
    'rounded-full bg-white duration-150',
    selected ? 'h-2 w-2' : 'h-0 w-0',
    dotClassName,
  )

  const buttonStyles = {
    backgroundColor: selectedColor,
    outlineColor: selectedColor,
    ...styles,
  }

  return (
    <FlavorTooltip color={color} label={color}>
      <button
        type='button'
        className={selectClasses}
        style={buttonStyles}
        {...rest}
      >
        <div className={dotClasses} />
      </button>
    </FlavorTooltip>
  )
}

const useSelectFlavor = () => {
  const [flavor, setFlavor] = useAtom(flavorAtom)
  const setFlavorPreference = useSetAtom(flavorPreferenceAtom)

  const applyFlavor = (color: TailwindColor) => {
    const tailWindFlavor = createTailwindFlavor(color)
    setFlavorPreference(tailWindFlavor)
  }

  const setCustomFlavor = () => {
    setFlavor({ ...flavor, name: 'custom' })
  }

  const { monochromatic, chromatic } = tailwindColors
  const selectedFlavor = flavor.name
  const isCustom = flavor.name === 'custom'

  return {
    applyFlavor,
    chromatic,
    isCustom,
    monochromatic,
    selectedFlavor,
    setCustomFlavor,
  }
}
