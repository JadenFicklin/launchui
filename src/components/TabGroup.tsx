import type { Tab } from '~/components/Tabs'
import { memo } from 'react'
import { Transition } from '@headlessui/react'
import { Dropdown } from '~/components/Dropdown'
import { Tabs } from '~/components/Tabs'
import { cn } from '~/utils/cn'

type TabGroupProps = {
  tabs: Tab[]
  selected: string
  vertical?: boolean
  onChange: (tab: string) => void
  className?: string
}

export const TabGroup: React.FC<TabGroupProps> = (props) => {
  const { tabs, selected, onChange, vertical, className } = props

  const wrapperClasses = cn(
    'relative flex flex-col gap-8',
    vertical ? 'sm:flex-row' : 'sm:flex-col',
    className,
  )

  const tabsProps = { tabs, selected, onChange, vertical }

  return (
    <div className={wrapperClasses}>
      <Tabs {...tabsProps} className='hidden sm:flex' />
      <MobileTabs tabGroupProps={{ tabs, selected, onChange }} />
      <div className='flex-grow'>
        {tabs.map((tabContentProps) => (
          <TabContent
            key={tabContentProps.label}
            tabContentProps={tabContentProps}
            tabGroupProps={{ selected }}
          />
        ))}
      </div>
    </div>
  )
}

type MobileTabsProps = {
  tabGroupProps: Pick<TabGroupProps, 'tabs' | 'selected' | 'onChange'>
}

const MobileTabs: React.FC<MobileTabsProps> = (props) => {
  const { tabs, selected, onChange } = props.tabGroupProps

  const dropdownOptions = tabs.map((tab) => ({
    id: tab.label,
    label: tab.label,
  }))

  const selectedOption = dropdownOptions.find(
    (option) => option.id === selected,
  )

  return (
    <Dropdown
      selected={selectedOption}
      options={dropdownOptions}
      onChange={(value) => onChange(value.label)}
      className='sm:hidden'
    />
  )
}

type TabContentProps = {
  tabContentProps: Tab
  tabGroupProps: Pick<TabGroupProps, 'selected'>
}

const TabContent: React.FC<TabContentProps> = memo((props) => {
  const { label, content: Content } = props.tabContentProps
  const { selected } = props.tabGroupProps

  const isSelected = selected === label

  return (
    <Transition
      show={isSelected}
      enter='delay-100'
      enterFrom='opacity-0 translate-y-2'
      enterTo='opacity-100 translate-y-0'
      leaveFrom='opacity-100 -translate-y-0'
      leaveTo='opacity-0 -translate-y-2'
      className='absolute w-full transition-[opacity,transform] duration-200 ease-in-out'
    >
      <Content />
    </Transition>
  )
})

TabContent.displayName = 'TabContent'
