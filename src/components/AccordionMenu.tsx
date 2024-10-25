import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { TransitionDrawer } from '~/components/Drawer'
import { cn } from '~/utils/cn'

export type AccordionMenuProps = {
  label: string
  content: React.FC
  duration?: string
  show?: boolean
  setShow?: (show: boolean) => void
  disableUserExpand?: boolean
}

export const AccordionMenu: React.FC<AccordionMenuProps> = (props) => {
  const {
    label,
    duration,
    show: controlledShow,
    setShow: controlledSetShow,
    disableUserExpand,
    content: Content,
  } = props

  const [uncontrolledShow, setUncrolledShow] = useState(false)

  const show = controlledShow ?? uncontrolledShow
  const setShow = controlledSetShow ?? setUncrolledShow

  const wrapperClasses = cn(
    'flex w-full flex-col overflow-hidden rounded-lg',
    'shadow-md dark:border dark:border-mono-full/10',
  )

  const titleClasses = cn(
    'font-sm text-sm font-medium tracking-wider',
    'flex w-full items-center justify-between gap-2',
    'bg-theme-500 p-4 text-left text-white',
    'outline-none duration-150',
    disableUserExpand
      ? 'cursor-default'
      : 'focus-visible:bg-theme-700 active:bg-theme-600',
  )

  const chevronClasses = cn('h-5 w-5 duration-150', show && 'rotate-180')

  const handleShow = () => {
    if (disableUserExpand) return
    setShow(!show)
  }

  return (
    <div className={wrapperClasses}>
      <button onClick={handleShow} className={titleClasses}>
        <span>{label}</span>
        <ChevronDownIcon className={chevronClasses} />
      </button>
      <TransitionDrawer
        show={show}
        duration={duration ?? '300ms'}
        className='border-t border-mono-full/10 bg-mono-base'
      >
        <Content />
      </TransitionDrawer>
    </div>
  )
}
