import { cn } from '~/utils/cn'
import kebabCase from 'lodash/kebabCase'

type RadioButtonGroupProps = {
  options: RadioButtonOption[]
  legend?: string
  disabled?: boolean
  className?: string
  name: string
  checked?: string
  onChange?: (id: string) => void
  defaultChecked?: string
  inputClassName?: string
}

type RadioButtonOption = string

export const RadioButtons: React.FC<RadioButtonGroupProps> = (props) => {
  const { options, legend, disabled, className } = props
  const { name, checked, onChange, defaultChecked, inputClassName } = props

  const wrapperClasses = cn(
    'text-sm font-medium leading-6 text-script',
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  return (
    <fieldset className={wrapperClasses}>
      {legend && <legend className='sr-only'>{legend}</legend>}
      <div className='space-y-3'>
        {options?.map((singleRadioButtonProps) => (
          <SingleRadioButton
            key={singleRadioButtonProps}
            singleRadioButtonProps={singleRadioButtonProps}
            radioButtonsProps={{
              name,
              checked,
              onChange,
              defaultChecked,
              inputClassName,
            }}
          />
        ))}
      </div>
    </fieldset>
  )
}

type SingleRadioButtonProps = {
  singleRadioButtonProps: RadioButtonOption
  radioButtonsProps: Pick<
    RadioButtonGroupProps,
    'name' | 'checked' | 'onChange' | 'defaultChecked' | 'inputClassName'
  >
}

const SingleRadioButton: React.FC<SingleRadioButtonProps> = (props) => {
  const label = props.singleRadioButtonProps
  const { name, checked, onChange, defaultChecked, inputClassName } =
    props.radioButtonsProps

  const id = `${name}-${kebabCase(label)}`

  const isChecked = checked ? checked === label : undefined
  const isDefaultChecked = defaultChecked ? defaultChecked === label : undefined
  const selectOption = () => onChange?.(label)

  const inputClasses = cn(
    'h-4 w-4 cursor-pointer border-mono-300 bg-mono-base text-theme-500',
    'focus:ringed outline-none duration-150',
    inputClassName,
  )

  return (
    <div className='flex items-center'>
      <input
        type='radio'
        id={id}
        name={name}
        className={inputClasses}
        checked={isChecked}
        defaultChecked={isDefaultChecked}
        onChange={selectOption}
      />
      <label htmlFor={id} className='block cursor-pointer select-none pl-2'>
        {label}
      </label>
    </div>
  )
}
