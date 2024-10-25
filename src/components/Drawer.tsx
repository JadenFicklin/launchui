import { Transition } from '@headlessui/react'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type DrawerProps = {
  show: boolean
  duration?: string
  children: React.ReactNode
  className?: string
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const { show, duration, children, className } = props

  const wrapperClasses = clsx(
    'grid w-full duration-100 ease-in-out',
    show ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
  )

  const drawerClasses = cn('overflow-hidden', className)

  const styles = {
    transition: `grid-template-rows ${duration ?? '0.15s'} ease-in-out`,
  }

  return (
    <div aria-hidden={!show} className={wrapperClasses} style={styles}>
      <div className={drawerClasses}>{children}</div>
    </div>
  )
}

export const TransitionDrawer: React.FC<DrawerProps> = (props) => {
  const { show, duration, children, className } = props

  const drawerClasses = cn('overflow-hidden', className)

  const styles = {
    transition: `grid-template-rows ${duration ?? '0.15s'} ease-in-out`,
  }

  return (
    <Transition
      show={show}
      enterFrom='grid-rows-[0fr]'
      enterTo='grid-rows-[1fr]'
      leaveFrom='grid-rows-[1fr]'
      leaveTo='grid-rows-[0fr]'
      className='grid w-full ease-in-out'
      style={styles}
      aria-hidden={!show}
    >
      <div className={drawerClasses}>{children}</div>
    </Transition>
  )
}
