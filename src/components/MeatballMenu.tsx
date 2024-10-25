import type { MenuOptionCallback } from '~/components/Menu'
import type { Placement } from '@floating-ui/react'
import type { FloatingMenu } from '~/hooks/useFloatingMenu'
import { MenuOptionsContainer } from '~/components/Menu'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { cn } from '~/utils/cn'
import { useFloatingMenu } from '~/hooks/useFloatingMenu'

type MenuProps = {
  options: MenuOption[]
  placement?: Placement
  className?: string
  inputClassName?: string
}

export type MenuOption = {
  label: string
  href?: string
  value?: unknown
  onClick?: (item: MenuOptionCallback) => void
}

export const MeatballMenu: React.FC<MenuProps> = (props) => {
  const { options, placement = 'bottom-end', className, inputClassName } = props
  const floatProps = useFloatingMenu({ placement })

  const wrapperClasses = cn('inline-block text-left text-script', className)

  return (
    <HeadlessMenu as='div' className={wrapperClasses}>
      {({ open }) => (
        <>
          <MenuButton
            headlessMenuProps={{ open }}
            menuProps={{ inputClassName }}
            floatProps={floatProps}
          />
          <MenuOptionsContainer
            menuProps={{ options }}
            headlessMenuProps={{ open }}
            floatProps={floatProps}
          />
        </>
      )}
    </HeadlessMenu>
  )
}

type HeadlessMenuProps = {
  open: boolean
}

type MenuButtonProps = {
  headlessMenuProps: HeadlessMenuProps
  menuProps: Pick<MenuProps, 'inputClassName'>
  floatProps: FloatingMenu
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const { open } = props.headlessMenuProps
  const { inputClassName } = props.menuProps
  const { triggerProps } = props.floatProps

  const buttonClasses = cn(
    'focus:ringed inline-flex w-full items-center justify-center rounded-full p-1 outline-none duration-150',
    open && 'ringed',
    inputClassName,
  )

  return (
    <HeadlessMenu.Button className={buttonClasses} {...triggerProps}>
      <EllipsisHorizontalIcon
        className={cn(
          'h-5 w-5 duration-150 hover:text-mono-700',
          open ? 'text-mono-700' : 'text-mono-400',
        )}
        aria-hidden='true'
      />
    </HeadlessMenu.Button>
  )
}
