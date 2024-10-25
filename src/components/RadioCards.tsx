import { CheckIcon } from '@heroicons/react/20/solid'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type RadioCardsProps = {
  checked: string
  setChecked: (id: string) => void
  options: RadioCardOption[]
  className?: string
}

type RadioCardOption = {
  id: string
  value: string
  icon: React.ReactNode
}

export const RadioCards: React.FC<RadioCardsProps> = (props) => {
  const { checked, setChecked, options, className } = props

  const wrapperClasses = cn('flex flex-col gap-4', className)

  return (
    <div className={wrapperClasses}>
      {options.map((singleRadioCardProps) => (
        <SingleRadioCard
          key={singleRadioCardProps.id}
          singleRadioCardProps={singleRadioCardProps}
          radioCardsProps={{ checked, setChecked }}
        />
      ))}
    </div>
  )
}

type SingleRadioCardProps = {
  singleRadioCardProps: RadioCardOption
  radioCardsProps: Pick<RadioCardsProps, 'checked' | 'setChecked'>
}

const SingleRadioCard: React.FC<SingleRadioCardProps> = (props) => {
  const { id, value, icon } = props.singleRadioCardProps
  const { checked, setChecked } = props.radioCardsProps
  const isSelected = checked === id

  const buttonClasses = clsx(
    'flex h-12 items-center justify-between rounded-md',
    'bg-mono-base px-2 text-sm font-medium text-script',
    'border border-mono-full/10 shadow-sm duration-150',
    'focus:ringed outline-none hover:bg-theme-50 active:bg-theme-100',
  )

  const CheckClasses = clsx(
    'grid place-items-center overflow-hidden',
    'rounded-full bg-theme-500 duration-150',
    isSelected ? 'h-6 w-6' : 'h-0 w-0',
  )

  return (
    <button
      type='button'
      className={buttonClasses}
      onClick={() => setChecked(id)}
    >
      <div className='flex items-center gap-3'>
        {icon}
        <span>{value}</span>
      </div>
      <div className='grid h-6 w-6 place-items-center'>
        <div className={CheckClasses}>
          <CheckIcon className='h-4 w-4 text-mono-base duration-150' />
        </div>
      </div>
    </button>
  )
}
