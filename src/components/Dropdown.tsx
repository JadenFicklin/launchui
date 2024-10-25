import type { FloatingMenu } from '~/hooks/useFloatingMenu'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FloatingFocusManager } from '@floating-ui/react'
import { useFloatingMenu } from '~/hooks/useFloatingMenu'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

export type DropdownProps = {
  name?: string
  label?: string
  options: DropdownOption[]
  selected?: DropdownOption
  onChange?: (option: DropdownOption) => void
  defaultSelected?: DropdownOption
  className?: string
  inputClassName?: string
}

export type DropdownOption = {
  label: string
  value?: unknown
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    name,
    label,
    options,
    selected: controlledSelected,
    onChange: controlledOnChange,
    defaultSelected,
    className,
    inputClassName,
  } = props

  const defaultOption: DropdownOption = defaultSelected ?? options[0]!
  const [uncontrolledSelected, setUncontrolledSelected] =
    useState<DropdownOption>(defaultOption)
  const floatProps = useFloatingMenu({ matchTriggerWidth: true })

  const selected = controlledSelected ?? uncontrolledSelected
  const setSelected = controlledOnChange ?? setUncontrolledSelected

  const wrapperClasses = cn('text-script', className)

  return (
    <Listbox
      as='div'
      name={name}
      className={wrapperClasses}
      value={selected}
      onChange={setSelected}
    >
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className='mb-2 block text-sm font-medium leading-6'>
              {label}
            </Listbox.Label>
          )}
          <div className='relative'>
            <DropdownButton
              listboxProps={{ open }}
              dropdownProps={{ selected, inputClassName }}
              floatProps={floatProps}
            />
            <OptionsContainer
              listboxProps={{ open }}
              dropdownProps={{ selected, options }}
              floatProps={floatProps}
            />
          </div>
        </>
      )}
    </Listbox>
  )
}

type ListboxProps = {
  open: boolean
}

type DropdownButtonProps = {
  listboxProps: ListboxProps
  dropdownProps: Pick<DropdownProps, 'selected' | 'inputClassName'>
  floatProps: FloatingMenu
}

const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { open } = props.listboxProps
  const { selected, inputClassName } = props.dropdownProps
  const { triggerProps } = props.floatProps

  const buttonClasses = cn(
    'relative w-full cursor-pointer rounded-md border-[1px] border-mono-300 bg-mono-base',
    'py-1.5 pl-3 pr-10 text-left shadow-sm outline-none duration-150',
    'focus-visible:ringed hover:bg-theme-50',
    'active:bg-theme-100 sm:text-sm sm:leading-6',
    open && 'ringed',
    inputClassName,
  )

  const chevronClasses = clsx(
    'h-5 w-5 text-mono-400 duration-150',
    open && 'rotate-180',
  )

  return (
    <Listbox.Button className={buttonClasses} {...triggerProps}>
      <span className='block truncate'>{selected?.label}</span>
      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
        <ChevronUpDownIcon className={chevronClasses} aria-hidden='true' />
      </span>
    </Listbox.Button>
  )
}

type OptionsContainerProps = {
  listboxProps: ListboxProps
  dropdownProps: Pick<DropdownProps, 'selected' | 'options'>
  floatProps: FloatingMenu
}

const OptionsContainer: React.FC<OptionsContainerProps> = (props) => {
  const { open } = props.listboxProps
  const { selected, options } = props.dropdownProps
  const { focusManagerProps, menuProps } = props.floatProps

  const optionsContainerClasses = clsx(
    'z-10 max-h-60 w-full overflow-auto',
    'rounded-md bg-mono-base/50 py-1 text-base shadow-lg backdrop-blur-lg',
    'ring-1 ring-mono-300 ring-opacity-50 sm:text-sm',
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
          <Listbox.Options className={optionsContainerClasses}>
            {options.map((optionProps) => (
              <Listbox.Option key={optionProps.label} value={optionProps}>
                {(listboxOptionProps) => (
                  <Option
                    listboxOptionProps={listboxOptionProps}
                    optionProps={optionProps}
                    dropdownProps={{ selected }}
                  />
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </FloatingFocusManager>
  )
}

type ListboxOptionProps = {
  active: boolean
}

type OptionProps = {
  optionProps: DropdownOption
  listboxOptionProps: ListboxOptionProps
  dropdownProps: Pick<DropdownProps, 'selected'>
}

const Option: React.FC<OptionProps> = (props) => {
  const { label } = props.optionProps
  const { active } = props.listboxOptionProps
  const { selected } = props.dropdownProps

  const checked = selected?.label === label

  const optionClasses = clsx(
    'relative cursor-pointer select-none py-2 pl-3 pr-9 duration-150',
    active && 'bg-theme-200/50 text-theme-700',
  )

  const textClasses = clsx(
    'block truncate',
    checked ? 'font-semibold' : 'font-normal',
  )

  const checkClasses = clsx(
    'absolute inset-y-0 right-0 flex items-center pr-4 duration-150',
    active ? 'text-theme-700' : 'text-theme-500',
  )

  return (
    <div className={optionClasses}>
      <span className={textClasses}>{label}</span>

      {checked && (
        <span className={checkClasses}>
          <CheckIcon className='h-5 w-5' aria-hidden='true' />
        </span>
      )}
    </div>
  )
}
