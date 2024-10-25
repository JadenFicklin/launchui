import type { AccordionMenuProps } from '~/components/AccordionMenu'
import { useState } from 'react'
import { AccordionMenu } from '~/components/AccordionMenu'
import { cn } from '~/utils/cn'

type AccordionGroupProps = {
  menus: AccordionMenuProps[]
  selected?: string
  setSelected?: (selected: string) => void
  disableUserExpand?: boolean
  className?: string
}

export const AccordionGroup: React.FC<AccordionGroupProps> = (props) => {
  const {
    menus,
    selected: controlledSelected,
    setSelected: setControlledSelected,
    disableUserExpand,
    className,
  } = props

  const [uncontrolledSelected, setUncontrolledSelected] = useState(
    menus[0]?.label ?? '',
  )

  const selected = controlledSelected ?? uncontrolledSelected
  const setSelected = setControlledSelected ?? setUncontrolledSelected

  const wrapperClasses = cn('flex flex-col gap-4', className)

  return (
    <div className={wrapperClasses}>
      {menus.map((menu) => (
        <AccordionMenu
          key={menu.label}
          {...menu}
          show={menu.label === selected}
          setShow={() => setSelected(menu.label)}
          disableUserExpand={disableUserExpand}
        />
      ))}
    </div>
  )
}
