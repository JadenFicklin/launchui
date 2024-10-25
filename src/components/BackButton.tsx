import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { ExternalLink } from '~/components/ExternalLink'
import { cn } from '~/utils/cn'

type BackButtonProps = {
  className?: string
} & React.ComponentProps<typeof ExternalLink>

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { className, ...rest } = props

  const backButtonClasses = cn(
    'flex items-center gap-1 rounded-full bg-mono-full/5 px-2 py-1',
    'text-xs font-medium text-script outline-none duration-150',
    'hover:bg-mono-full/10 focus:ring-2 focus:ring-mono-full/10 focus:ring-offset-2',
    'focus:ring-offset-mono-base active:bg-mono-full/20 active:ring-mono-full/20',
    className,
  )

  return (
    <ExternalLink className={backButtonClasses} {...rest}>
      <ArrowLeftIcon className='h-3 w-3' /> Back
    </ExternalLink>
  )
}
