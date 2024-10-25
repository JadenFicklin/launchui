import { FloatingFocusManager, type Placement } from '@floating-ui/react'
import type { FloatingMenu } from '~/hooks/useFloatingMenu'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { cn } from '~/utils/cn'
import clsx from 'clsx'
import { useFloatingMenu } from '~/hooks/useFloatingMenu'
import { Fragment } from 'react'

type MenuProps = {
  label: string
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

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    label,
    options,
    placement = 'bottom-end',
    className,
    inputClassName,
  } = props
  const floatProps = useFloatingMenu({ placement })

  const wrapperClasses = cn('inline-block text-left text-script', className)

  return (
    <HeadlessMenu as='div' className={wrapperClasses}>
      {({ open }) => (
        <>
          <MenuButton
            headlessMenuProps={{ open }}
            menuProps={{ label, inputClassName }}
            floatProps={floatProps}
          />
          <MenuOptionsContainer
            headlessMenuProps={{ open }}
            menuProps={{ options }}
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
  menuProps: Pick<MenuProps, 'label' | 'inputClassName'>
  floatProps: FloatingMenu
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const { open } = props.headlessMenuProps
  const { label, inputClassName } = props.menuProps
  const { triggerProps } = props.floatProps

  const buttonClasses = cn(
    'inline-flex w-full items-center justify-center gap-x-1.5 rounded-md',
    'border-[1px] border-mono-300 bg-mono-base px-3 py-2 outline-none',
    'text-sm font-semibold shadow-sm duration-100 hover:bg-theme-50',
    'focus-visible:ringed active:bg-theme-100',
    open && 'ringed',
    inputClassName,
  )

  return (
    <HeadlessMenu.Button className={buttonClasses} {...triggerProps}>
      {label}
      <ChevronDownIcon
        className={cn(
          '-mr-1 h-5 w-5 text-mono-400 duration-100',
          open && '-rotate-180',
        )}
        aria-hidden='true'
      />
    </HeadlessMenu.Button>
  )
}

type MenuOptionsContainerProps = {
  headlessMenuProps: HeadlessMenuProps
  menuProps: Pick<MenuProps, 'options'>
  floatProps: FloatingMenu
}

export const MenuOptionsContainer: React.FC<MenuOptionsContainerProps> = (
  props,
) => {
  const { options } = props.menuProps
  const { open } = props.headlessMenuProps
  const { focusManagerProps, menuProps } = props.floatProps

  const optionContainerClasses = clsx(
    'z-10 w-full py-1',
    'rounded-md bg-mono-base/50 outline-none backdrop-blur-lg',
    'shadow-lg ring-1 ring-mono-300 ring-opacity-50',
  )

  return (
    <FloatingFocusManager {...focusManagerProps}>
      <div {...menuProps}>
        <Transition
          as={Fragment}
          show={open}
          enter='ease-out duration-150 relative'
          enterFrom='opacity-0 -top-3'
          enterTo='opacity-100 top-0'
          leave='ease-in duration-150 relative'
          leaveFrom='opacity-100 top-0'
          leaveTo='opacity-0 top-3'
        >
          <HeadlessMenu.Items className={optionContainerClasses}>
            {options.map((menuOptionProps) => (
              <MenuOption
                key={menuOptionProps.label}
                menuOptionProps={menuOptionProps}
              />
            ))}
          </HeadlessMenu.Items>
        </Transition>
      </div>
    </FloatingFocusManager>
  )
}

type MenuOptionProps = {
  menuOptionProps: MenuOption
}

export type MenuOptionCallback = Omit<MenuOption, 'onClick'>

export const MenuOption: React.FC<MenuOptionProps> = (props) => {
  const { value, href, label, onClick } = props.menuOptionProps

  const clickHandler = () => {
    const callbackProps = { value, href, label }
    onClick?.(callbackProps)
  }

  return (
    <HeadlessMenu.Item>
      {({ active }) => {
        const optionClasses = cn(
          'block px-4 py-2 text-sm duration-100',
          'hover:bg-theme-200/50 hover:text-theme-700',
          active && 'bg-theme-200/50 text-theme-700',
        )

        return (
          <a href={href} onClick={clickHandler} className={optionClasses}>
            {label}
          </a>
        )
      }}
    </HeadlessMenu.Item>
  )
}
