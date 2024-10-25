import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { DebouncedInput } from '~/features/table/components/DebouncedInput'
import { Popover } from '~/components/Popover'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type PaginationProps = {
  totalPages: number
  pageNeighbors: number
  selected: number
  setSelected: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPages, selected, setSelected, className } = props
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = selected === 1
  const isLastPage = selected === totalPages

  const nextPage = () => setSelected(selected + 1)
  const previousPage = () => setSelected(selected - 1)

  const wrapperClasses = cn(
    'flex items-center justify-between -space-x-px',
    className,
  )

  const navigationButton = clsx(
    'relative inline-flex items-center bg-mono-base px-2 py-2 text-mono-400',
    'ring-1 ring-inset ring-mono-300 duration-150',
    'hover:bg-theme-100 hover:text-script',
    'focus:outline-offset-0 focus-visible:outline focus-visible:outline-2',
    'focus-visible:outline-offset-2 focus-visible:outline-theme-500',
    'disabled:pointer-events-none disabled:text-mono-300',
  )

  return (
    <nav className={wrapperClasses}>
      <button
        onClick={previousPage}
        disabled={isFirstPage}
        className={cn(navigationButton, 'rounded-l-md')}
      >
        <span className='sr-only'>Previous</span>
        <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
      </button>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          paginationButtonProps={{ page }}
          paginationProps={{ isFirstPage, isLastPage, ...props }}
        />
      ))}
      <button
        onClick={nextPage}
        disabled={isLastPage}
        className={cn(navigationButton, 'rounded-r-md')}
      >
        <span className='sr-only'>Next</span>
        <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
      </button>
    </nav>
  )
}

type Page = {
  page: number
}

type PaginationButtonProps = {
  paginationButtonProps: Page
  paginationProps: PaginationProps & {
    isFirstPage: boolean
    isLastPage: boolean
  }
}

const PaginationButton: React.FC<PaginationButtonProps> = (props) => {
  const { shouldDisplay, isEllipsis, numberProps } = usePage(props)

  if (shouldDisplay) return <Number {...numberProps} />
  if (isEllipsis) return <Ellipses {...numberProps} />
  return <></>
}

type NumberProps = {
  paginationButtonProps: Page
  paginationProps: Pick<PaginationProps, 'selected' | 'setSelected'>
}

const Number: React.FC<NumberProps> = (props) => {
  const { page } = props.paginationButtonProps
  const { selected, setSelected } = props.paginationProps

  const isSelected = selected === page
  const handleChange = () => setSelected?.(page)

  const selectedButtonClasses =
    'z-10 bg-theme-500 text-white hover:bg-theme-400'

  const unselectedButtonClasses =
    'bg-mono-base text-mono-900 ring-1 ring-inset ring-mono-300 hover:bg-theme-100 focus:outline-offset-0'

  const buttonClasses = clsx(
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold outline-none duration-150',
    'focus:outline-offset-0 focus-visible:outline focus-visible:outline-2 active:bg-theme-200',
    'focus-visible:outline-offset-2 focus-visible:outline-theme-500',
    isSelected ? selectedButtonClasses : unselectedButtonClasses,
  )

  return (
    <button className={buttonClasses} onClick={handleChange}>
      {page}
    </button>
  )
}

type EllipsesProps = NumberProps

const Ellipses: React.FC<EllipsesProps> = (props) => {
  const { selected, setSelected } = props.paginationProps

  const handlePageChange = (value: string | number) =>
    setSelected(value as number)

  const ellipsisClasses = clsx(
    'relative inline-flex select-none items-center bg-mono-base px-4 py-2',
    'bg-mono-base text-sm font-semibold text-mono-900 ring-1 ring-inset',
    'ring-mono-300 hover:bg-theme-100 focus:outline-offset-0',
    'focus:outline-offset-0 focus-visible:outline focus-visible:outline-2 active:bg-theme-200',
    'focus-visible:outline-offset-2 focus-visible:outline-theme-500',
  )

  return (
    <Popover placement='top' offset={15}>
      <Popover.Trigger>
        <button className={ellipsisClasses}>...</button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow className='bg-mono-100 ring-1 ring-mono-300 ring-opacity-50' />
        <div className='rounded-md bg-mono-100 p-4 shadow-md ring-1 ring-mono-300 ring-opacity-50'>
          <DebouncedInput
            type='number'
            label='Go to page:'
            value={selected}
            onChange={handlePageChange}
          />
        </div>
      </Popover.Content>
    </Popover>
  )
}

const usePage = (props: PaginationButtonProps) => {
  const { page } = props.paginationButtonProps
  const {
    isFirstPage,
    isLastPage,
    totalPages,
    selected,
    pageNeighbors,
    setSelected,
  } = props.paginationProps

  const isPageNeighbor = Math.abs(selected - page) <= pageNeighbors

  const isSecondPage = page === 2
  const isPenultimatePage = page === totalPages - 1

  // Handling first and last pages
  const isWithinStartBuffer = isFirstPage && page <= 1 + pageNeighbors + 1

  const isWithinEndBuffer = isLastPage && page >= totalPages - pageNeighbors - 1

  // Handling page neighbors
  const shouldDisplayFirstOrLastPage = page === 1 || page === totalPages
  const isPageNeighborOrBoundary =
    isPageNeighbor || shouldDisplayFirstOrLastPage

  const shouldDisplay =
    isWithinEndBuffer || isWithinStartBuffer || isPageNeighborOrBoundary

  // Handling ellipsis
  const shouldDisplayLeadingEllipsis =
    isSecondPage && !isFirstPage && !isPageNeighbor

  const shouldDisplayTrailingEllipsis =
    isPenultimatePage && !isLastPage && !isPageNeighbor

  const isEllipsis =
    shouldDisplayLeadingEllipsis || shouldDisplayTrailingEllipsis

  const numberProps = {
    paginationButtonProps: {
      page,
    },
    paginationProps: {
      selected,
      setSelected,
    },
  }

  return {
    shouldDisplay,
    isEllipsis,
    numberProps,
  }
}
