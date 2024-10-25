import { cn } from '~/utils/cn'

type CheckboxProps = {
  id?: string
  label?: string
  reference?: React.Ref<HTMLInputElement>
  className?: string
  inputClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { id, label, reference, className, inputClassName, ...rest } = props

  const wrapperClasses = cn(
    'flex items-center text-sm font-medium leading-6 text-script',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  const inputClasses = cn(
    'h-4 w-4 cursor-pointer rounded border-mono-300 bg-mono-base outline-none',
    'focus:ringed text-theme-500 duration-150',
    inputClassName,
  )

  return (
    <div className={wrapperClasses}>
      <input
        id={id}
        ref={reference}
        type='checkbox'
        aria-describedby={id ? `${id}-description` : undefined}
        className={inputClasses}
        {...rest}
      />
      {label && (
        <label
          htmlFor={id}
          className='user-select-none cursor-pointer select-none pl-2'
        >
          {label}
        </label>
      )}
    </div>
  )
}
