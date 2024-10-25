import type { SwitchProps as HeadlessSwitchProps } from '@headlessui/react'
import { useState } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type SwitchProps = {
  name?: string
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  defaultChecked?: boolean
  className?: string
  inputClassName?: string
} & HeadlessSwitchProps<'input'>

export const Switch: React.FC<SwitchProps> = (props) => {
  const {
    name,
    label,
    checked: controlledCheck,
    onChange: controlledOnChange,
    defaultChecked,
    className,
    inputClassName,
    ...rest
  } = props
  const [uncontrolledCheck, setUncontrolledCheck] = useState(defaultChecked)

  const checked = controlledCheck ?? uncontrolledCheck
  const setChecked = controlledOnChange ?? setUncontrolledCheck

  const wrapperClasses = cn(
    'flex items-center text-sm font-medium leading-6 text-script',
    rest.disabled && 'pointer-events-none opacity-50',
    className,
  )

  const inputClasses = cn(
    checked ? 'bg-theme-500' : 'bg-mono-200',
    'inline-flex h-6 w-11 flex-shrink-0 cursor-pointer',
    'rounded-full border-2 border-transparent outline-none',
    'transition-all duration-150 ease-in-out',
    'focus:ringed',
    inputClassName,
  )

  const checkboxClasses = clsx(
    'pointer-events-none inline-block h-5 w-5 transform',
    'rounded-full bg-mono-base shadow ring-0',
    'transition duration-150 ease-in-out',
    checked ? 'translate-x-5' : 'translate-x-0',
  )

  return (
    <HeadlessSwitch.Group as='div' className={wrapperClasses}>
      <HeadlessSwitch
        className={inputClasses}
        name={name}
        checked={checked}
        {...rest}
        onChange={setChecked}
      >
        <span className='sr-only'>Use setting</span>
        <span aria-hidden='true' className={checkboxClasses} />
      </HeadlessSwitch>
      {label && (
        <HeadlessSwitch.Label
          as='span'
          className='user-select-none cursor-pointer select-none pl-2'
        >
          {label}
        </HeadlessSwitch.Label>
      )}
    </HeadlessSwitch.Group>
  )
}
