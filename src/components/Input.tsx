import { cn } from '~/utils/cn'

export type InputProps = {
  id?: string
  label?: string
  className?: string
  inputClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = (props) => {
  const { id, label, className, inputClassName, ...rest } = props

  const wrapperClasses = cn(
    'text-sm font-medium leading-6 text-script',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  const inputClasses = cn(
    'border-1 block w-full rounded-md border-mono-300 bg-mono-base py-1.5',
    'text-script shadow-sm outline-none duration-150 placeholder:text-mono-400',
    'focus:ringed focus:border-mono-300 sm:text-sm sm:leading-6',
    inputClassName,
  )

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className='mb-2 block'>
          {label}
        </label>
      )}
      <input id={id} className={inputClasses} {...rest} />
    </div>
  )
}
