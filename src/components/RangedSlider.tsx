import { useState } from 'react'
import { Handle } from '~/components/Slider'
import { cn } from '~/utils/cn'
import RcSlider from 'rc-slider'

type RangedSliderProps = {
  values?: Values
  minName?: string
  maxName?: string
  disabled?: boolean
  onChange?: (values: Values) => void
  min: number
  max: number
  defaultMin?: number
  defaultMax?: number
  label?: string
  className?: string
}

type Values = number[]

export const RangedSlider: React.FC<RangedSliderProps> = (props) => {
  const { minName, maxName, label, min, max, disabled, className } = props
  const { values, currentMin, currentMax, trackStyles, handleChange } =
    useMultiSlider(props)

  const wrapperClasses = cn(
    'flex flex-col gap-4 text-sm font-medium leading-6',
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className='whitespace-nowrap'>
          {label} {currentMin} - {currentMax}
        </label>
      )}
      <div className='relative h-5 w-full pt-2'>
        {/* Rail */}
        <div className='absolute h-1 w-full rounded bg-mono-300' />

        {/* Track */}
        <div
          className='absolute h-1 rounded bg-theme-500'
          style={trackStyles}
        />

        {/* Hidden inputs for form submission */}
        <input type='hidden' name={minName} value={currentMin} />
        <input type='hidden' name={maxName} value={currentMax} />

        {/* Slider */}
        <RcSlider
          min={min}
          max={max}
          allowCross={false}
          value={values}
          onChange={handleChange}
          range={true}
          handleRender={Handle}
        />
      </div>
    </div>
  )
}

const useMultiSlider = (props: RangedSliderProps) => {
  const {
    values: controlledValues,
    onChange: controlledOnChange,
    min,
    max,
    defaultMin,
    defaultMax,
  } = props
  const [uncontrolledValues, setUncontrolledValues] = useState<Values>([
    defaultMin ?? min,
    defaultMax ?? max,
  ])

  const currentMin = controlledValues?.[0] ?? uncontrolledValues[0] ?? 0
  const currentMax = controlledValues?.[1] ?? uncontrolledValues[1] ?? 0
  const values = controlledValues ?? uncontrolledValues

  const trackWidth = ((currentMax - currentMin) / (max - min)) * 100
  const trackLeft = ((currentMin - min) / (max - min)) * 100
  const trackStyles = {
    left: `${trackLeft}%`,
    width: `${trackWidth}%`,
  }

  const handleChange = (value: number | number[]) => {
    const changeHandler = controlledOnChange ?? setUncontrolledValues
    if (Array.isArray(value)) changeHandler(value)
  }

  return {
    values,
    min,
    max,
    currentMin,
    currentMax,
    trackStyles,
    handleChange,
  }
}
