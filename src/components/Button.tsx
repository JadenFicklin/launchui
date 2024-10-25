import { cn } from '~/utils/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, ...rest } = props

  const classes = cn(
    'text-sm font-semibold text-white shadow-sm outline-none duration-150',
    'focus:ringed rounded-full bg-theme-500 px-4 py-2.5 hover:bg-theme-400',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  return <button type='button' className={classes} {...rest} />
}
