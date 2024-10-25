import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type TabsProps = {
  tabs: Tab[]
  selected: string
  onChange: (tab: string) => void
  vertical?: boolean
  className?: string
}

export type Tab = {
  label: string
  content: React.FC
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const { tabs, selected, vertical, onChange, className } = props
  const { navbarRef, indicatorStyle, setIndicatorToSelected, handleMouseOver } =
    useDesktopTabs(props)

  const wrapperClasses = cn('relative', className)

  const navClasses = clsx(
    'flex',
    vertical ? 'flex-col gap-3' : 'flex-row gap-4',
  )

  return (
    <div ref={navbarRef} className={wrapperClasses}>
      <nav
        className={navClasses}
        aria-label='Tabs'
        onMouseLeave={setIndicatorToSelected}
      >
        {tabs.map((singleTabProps) => (
          <SingleTab
            key={singleTabProps.label}
            singleTabProps={singleTabProps}
            tabsProps={{ selected, vertical, onChange, handleMouseOver }}
          />
        ))}
      </nav>
      <div
        className='absolute z-[-1] rounded-md bg-theme-100 transition-all duration-300 ease-out'
        style={indicatorStyle}
      />
    </div>
  )
}

type SingleTabProps = {
  singleTabProps: Tab
  tabsProps: Pick<TabsProps, 'selected' | 'vertical' | 'onChange'> & {
    handleMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void
  }
}

const SingleTab: React.FC<SingleTabProps> = (props) => {
  const { label } = props.singleTabProps
  const { selected, vertical, onChange, handleMouseOver } = props.tabsProps

  const isSelected = selected === label
  const tabClasses = clsx(
    'focus:ringed rounded-md px-3 py-2 text-sm font-medium outline-none duration-150',
    vertical ? 'text-left' : 'text-center',
    isSelected ? 'text-theme-700' : 'text-mono-500 hover:text-theme-700',
  )

  return (
    <button
      data-selected={isSelected}
      className={tabClasses}
      aria-current={isSelected ? 'page' : undefined}
      onClick={() => onChange(label)}
      onMouseOver={handleMouseOver}
    >
      {label}
    </button>
  )
}

const useDesktopTabs = (props: TabsProps) => {
  const { selected } = props
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({})
  const navbarRef = useRef<HTMLDivElement | null>(null)

  const updateIndicatorStyle = (element: HTMLElement) => {
    const { left, width, height, top } = element.getBoundingClientRect()
    const { left: parentLeft, top: parentTop } =
      navbarRef.current!.getBoundingClientRect()

    setIndicatorStyle({
      left: left - parentLeft,
      top: top - parentTop,
      width,
      height,
    })
  }

  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    updateIndicatorStyle(target)
  }

  const setIndicatorToSelected = useCallback(() => {
    const selectedTab = navbarRef.current!.querySelector(
      `[data-selected="true"]`,
    )

    if (!selectedTab) return

    const { left, width, height, top } = selectedTab.getBoundingClientRect()
    const { left: parentLeft, top: parentTop } =
      navbarRef.current!.getBoundingClientRect()

    setIndicatorStyle({
      left: left - parentLeft,
      top: top - parentTop,
      width,
      height,
    })
  }, [navbarRef])

  useEffect(() => {
    setIndicatorToSelected()
  }, [selected, setIndicatorToSelected])

  return {
    navbarRef,
    indicatorStyle,
    setIndicatorToSelected,
    handleMouseOver,
  }
}
