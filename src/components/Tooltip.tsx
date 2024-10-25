import { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react'
import clsx from 'clsx'

type TooltipProps = {
  label?: string
  show?: boolean
  className?: string
  children: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { label, show = true, className, children } = props

  if (!label || !show) return <div className={className}>{children}</div>
  return <TooltipComponent {...props} />
}

const TooltipComponent: React.FC<TooltipProps> = (props) => {
  const { children, label, className } = props
  const { wrapperProps, tooltipProps, show } = useTooltip()

  const wrapperClasses = clsx(
    'relative transition-[opacity,top] duration-150',
    show ? 'top-0 opacity-100' : '-top-3 opacity-0',
  )

  const tooltipClasses = clsx(
    'relative rounded-md bg-script px-4 py-2',
    'text-white backdrop-blur-lg dark:bg-theme-500',
  )

  const arrowClasses = clsx(
    'absolute -bottom-[4px] left-1/2 h-0 w-0 -translate-x-1/2 transform',
    'border-b-0 border-l-[6px] border-r-[6px] border-t-[6px]',
    'border-transparent border-t-script dark:border-t-theme-500',
  )

  return (
    <>
      <div {...wrapperProps} className={className}>
        {children}
      </div>
      <FloatingPortal>
        <div {...tooltipProps} className='pointer-events-none'>
          <div className={wrapperClasses}>
            <div className={tooltipClasses}>
              {label}
              <div className={arrowClasses} />
            </div>
          </div>
        </div>
      </FloatingPortal>
    </>
  )
}

export const useTooltip = () => {
  const [show, setShow] = useState(false)

  const middleware = [
    offset(12),
    flip({
      fallbackAxisSideDirection: 'start',
    }),
    shift(),
  ]

  const { refs, floatingStyles, context } = useFloating({
    open: show,
    onOpenChange: setShow,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: middleware,
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  const wrapperProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  }

  const tooltipProps = {
    ref: refs.setFloating,
    style: floatingStyles,
    ...getFloatingProps(),
  }

  return {
    wrapperProps,
    tooltipProps,
    show,
  }
}
