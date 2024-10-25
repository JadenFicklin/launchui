import type { HandlesProps } from 'rc-slider/lib/Handles'
import { useRef, useState } from 'react'
import { cn } from '~/utils/cn'
import RcSlider from 'rc-slider'
import clsx from 'clsx'

type SingleSliderProps = {
  value?: number
  name?: string
  disabled?: boolean
  onChange?: (value: number) => void
  min: number
  max: number
  defaultValue?: number
  label?: string
  className?: string
}

export const Slider: React.FC<SingleSliderProps> = (props) => {
  const { name, label, disabled, min, max, className } = props
  const { value, sliderRef, trackStyles, handleTrackClick, handleChange } =
    useSingleSlider(props)

  const wrapperClasses = cn(
    'flex cursor-pointer flex-col gap-4 text-sm font-medium leading-6',
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className='whitespace-nowrap'>
          {label} {value}
        </label>
      )}
      <div
        className='relative h-5 w-full pt-2'
        ref={sliderRef}
        onClick={handleTrackClick}
      >
        {/* Rail */}
        <div className='absolute h-1 w-full rounded bg-mono-300' />

        {/* Track */}
        <div
          className='absolute h-1 rounded bg-theme-500'
          style={trackStyles}
        />

        {/* Hidden input for form submission */}
        <input type='hidden' name={name} value={value} />

        {/* Slider */}
        <RcSlider
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          range={false}
          handleRender={Handle}
        />
      </div>
    </div>
  )
}

export const Handle: HandlesProps['handleRender'] = (node, handleProps) => {
  const { dragging } = handleProps
  const { props: nodeProps } = node

  const handleClasses = clsx(
    'focus:ringed absolute h-5 w-5 cursor-pointer rounded-full outline-none',
    'transition-[box-shadow,background-color] duration-150',
    dragging
      ? 'ringed bg-theme-700 hover:bg-theme-700'
      : 'bg-theme-500 hover:bg-theme-400',
  )

  const handleStyle = {
    ...nodeProps.style,
    transform: `${nodeProps.style?.transform} translateY(-40%)`,
  }

  return <div {...nodeProps} style={handleStyle} className={handleClasses} />
}

const useSingleSlider = (props: SingleSliderProps) => {
  const {
    value: controlledValue,
    onChange: controlledOnChange,
    min,
    max,
    defaultValue,
  } = props

  const [uncontrolledValue, setUncontrolledValue] = useState<number>(
    defaultValue ?? min,
  )

  const value = controlledValue ?? uncontrolledValue

  const sliderRef = useRef<HTMLDivElement>(null)

  const trackWidth = ((value - min) / (max - min)) * 100
  const trackStyles = {
    width: `${trackWidth}%`,
  }

  const handleChange = (value: number | number[]) => {
    const changeHandler = controlledOnChange ?? setUncontrolledValue
    if (typeof value === 'number') changeHandler(value)
  }

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const width = rect.width

    const clickedPercentage = x / width
    const newValue = min + clickedPercentage * (max - min)

    handleChange(Math.round(newValue))
  }

  return {
    value,
    sliderRef,
    trackStyles,
    handleTrackClick,
    handleChange,
  }
}
