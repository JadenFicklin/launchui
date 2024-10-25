import type { TailwindColor } from '~/features/theme/types/Theme'
import { FloatingPortal } from '@floating-ui/react'
import { useTooltip } from '~/components/Tooltip'
import colors from 'tailwindcss/colors'
import clsx from 'clsx'

type TooltipProps = {
  color: TailwindColor | 'custom'
  label?: string
  className?: string
  children: React.ReactNode
}

export const FlavorTooltip: React.FC<TooltipProps> = (props) => {
  const { color, children, label, className } = props
  const { wrapperProps, tooltipProps, show } = useTooltip()

  const isCustom = color === 'custom'
  const selectedColor = isCustom ? 'gray' : colors[color][500]

  const wrapperClasses = clsx(
    'relative transition-[opacity,top] duration-150',
    show ? 'top-0 opacity-100' : '-top-3 opacity-0',
  )

  const tooltipClasses = clsx(
    'relative rounded-md px-4 py-2',
    'text-white backdrop-blur-lg',
  )

  const arrowClasses = clsx(
    'absolute -bottom-[4px] left-1/2 h-0 w-0 -translate-x-1/2 transform',
    'border-b-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent',
  )

  const tooltipStyle = {
    backgroundColor: selectedColor,
  }

  const arrowStyle = {
    borderTopColor: selectedColor,
  }

  return (
    <>
      <div {...wrapperProps} className={className}>
        {children}
      </div>
      <FloatingPortal>
        <div {...tooltipProps} className='pointer-events-none'>
          <div className={wrapperClasses}>
            <div className={tooltipClasses} style={tooltipStyle}>
              {label}
              <div className={arrowClasses} style={arrowStyle} />
            </div>
          </div>
        </div>
      </FloatingPortal>
    </>
  )
}
