import { cn } from '~/utils/cn'

type RangeProps = {
  id?: string
  min: number
  max: number
  value?: number
  defaultValue?: number
  step?: number
  name?: string
  label?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Range: React.FC<RangeProps> = (props) => {
  const { id, value, label, className, ...rest } = props

  const labelOrValue = label ?? value !== undefined

  const wrapperClasses = cn(
    'text-sm font-medium leading-6 text-script',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  const sliderClasses = cn(
    'focus-visible:ringed w-full rounded-full bg-mono-300',
    'accent-theme-500 outline-none transition-colors duration-150',
    className,
  )

  return (
    <div className={wrapperClasses}>
      {labelOrValue && (
        <label
          htmlFor={id}
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
        >
          <span>
            {label} {value}
          </span>
        </label>
      )}
      <input
        id={id}
        type='range'
        value={value}
        className={sliderClasses}
        {...rest}
      />
    </div>
  )
}
