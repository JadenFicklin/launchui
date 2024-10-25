import { cn } from '~/utils/cn'

type TextareaProps = {
  id?: string
  label?: string
  className?: string
  inputClassName?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { id, label, className, inputClassName, ...rest } = props

  const wrapperClasses = cn(
    'block text-sm font-medium leading-6 text-script',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  const inputClasses = cn(
    'border-1 block w-full rounded-md border-mono-300 bg-mono-base py-1.5',
    'resize-none text-script shadow-sm outline-none ring-mono-300 duration-150',
    'focus:ringed placeholder:text-mono-400 focus:border-mono-300',
    'sm:text-sm sm:leading-6',
    inputClassName,
  )

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className='mb-2 block'>
          {label}
        </label>
      )}
      <textarea id={id} className={inputClasses} {...rest} />
    </div>
  )
}
