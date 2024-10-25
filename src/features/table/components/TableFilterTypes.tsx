import type { Column, RowData } from '@tanstack/react-table'
import type { TableData } from '~/features/table/types/Table.types'
import { useEffect, useState } from 'react'
import { Checkbox } from '~/components/Checkbox'
import { Switch } from '~/components/Switch'
import { DebouncedInput } from '~/features/table/components/DebouncedInput'
import { ArrowPathIcon } from '@heroicons/react/16/solid'
import { cn } from '~/utils/cn'

export type FilterTypeProps<TData> = {
  data: TableData<TData>
  column: Column<TData, unknown>
  contents: React.ReactNode
}

export const StringFilter = <TData extends RowData>(
  props: FilterTypeProps<TData>,
) => {
  const { column, contents } = props

  const initialFilterValue = String(column.getFilterValue() ?? '')
  const [filter, setFilter] = useState(initialFilterValue)

  const handleFilterChange = (value: string | number) => {
    const filterValue = String(value)
    setFilter(filterValue)
    column.setFilterValue(filterValue)
  }

  const clearFilter = () => {
    column.setFilterValue(undefined)
    setFilter('')
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2 text-sm font-semibold leading-6'>
        <FilterIndicator column={column} />
        <span>{contents}</span>
        <ClearFilterButton clearFilter={clearFilter} />
      </div>
      <div className='ml-4'>
        <DebouncedInput value={filter} onChange={handleFilterChange} />
      </div>
    </div>
  )
}

export const NumberFilter = <TData extends RowData>(
  props: FilterTypeProps<TData>,
) => {
  const { column, contents } = props

  const initialFilterValue = column.getFilterValue() as [string, string] | null
  const initialStartFilter = String(initialFilterValue?.[0] ?? '')
  const initialEndFilter = String(initialFilterValue?.[1] ?? '')

  const [startFilter, setStartFilter] = useState(initialStartFilter)
  const [endFilter, setEndFilter] = useState(initialEndFilter)

  const handleStartFilterChange = (value: string | number) => {
    const filterValue = String(value)
    setStartFilter(filterValue)
    column.setFilterValue([filterValue, endFilter])
  }

  const handleEndFilterChange = (value: string | number) => {
    const filterValue = String(value)
    setEndFilter(filterValue)
    column.setFilterValue([startFilter, filterValue])
  }

  const clearFilter = () => {
    column.setFilterValue(undefined)
    setStartFilter('')
    setEndFilter('')
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2 text-sm font-semibold leading-6'>
        <FilterIndicator column={column} />
        <span>{contents}</span>
        <ClearFilterButton clearFilter={clearFilter} />
      </div>
      <div className='ml-4 flex gap-3'>
        <DebouncedInput
          value={startFilter}
          type='number'
          label={`Minimum ${contents as string}`}
          onChange={handleStartFilterChange}
          className='w-full'
        />
        <DebouncedInput
          value={endFilter}
          type='number'
          label={`Maximum ${contents as string}`}
          onChange={handleEndFilterChange}
          className='w-full'
        />
      </div>
    </div>
  )
}

export const BooleanFilter = <TData extends RowData>(
  props: FilterTypeProps<TData>,
) => {
  const { column, contents } = props

  const initialFilterValue = column.getFilterValue()
  const initialCheckboxState = initialFilterValue !== undefined
  const [isCheckboxChecked, setIsCheckboxChecked] =
    useState<boolean>(initialCheckboxState)
  const [isToggleChecked, setIsToggleChecked] = useState<boolean>(
    initialFilterValue === true,
  )

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setIsCheckboxChecked(checked)

    if (checked) {
      column.setFilterValue(isToggleChecked)
    } else {
      column.setFilterValue(undefined)
    }
  }

  const handleToggleChange = (checked: boolean) => {
    setIsToggleChecked(checked)
    if (isCheckboxChecked) {
      column.setFilterValue(checked)
    }
  }

  const clearFilter = () => {
    column.setFilterValue(undefined)
    setIsCheckboxChecked(false)
    setIsToggleChecked(false)
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2 text-sm font-semibold leading-6'>
        <FilterIndicator column={column} />
        <Checkbox
          id={column.id}
          label={contents as string}
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
          className='font-semibold'
        />
        <ClearFilterButton clearFilter={clearFilter} />
      </div>
      <div className='ml-4 flex items-center gap-1'>
        <Switch
          label={`Show ${isToggleChecked ? 'true' : 'false'} results`}
          checked={isToggleChecked}
          onChange={handleToggleChange}
          disabled={!isCheckboxChecked}
        />
      </div>
    </div>
  )
}

export const DateFilter = <TData extends RowData>(
  props: FilterTypeProps<TData>,
) => {
  const { contents, column } = props

  const initialFilterValue = column.getFilterValue() as [string, string] | null
  const initialStartFilter = String(initialFilterValue?.[0] ?? '')
  const initialEndFilter = String(initialFilterValue?.[1] ?? '')

  const [startFilter, setStartFilter] = useState(initialStartFilter)
  const [endFilter, setEndFilter] = useState(initialEndFilter)

  useEffect(() => {
    const hasFilter = startFilter || endFilter
    if (!hasFilter) {
      column.setFilterValue(undefined)
    } else {
      column.setFilterValue([startFilter, endFilter])
    }
  }, [startFilter, endFilter])

  const clearFilter = () => {
    column.setFilterValue(undefined)
    setStartFilter('')
    setEndFilter('')
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2 text-sm font-semibold leading-6'>
        <FilterIndicator column={column} />
        <span>{contents}</span>
        <ClearFilterButton clearFilter={clearFilter} />
      </div>
      <div className='ml-4 flex gap-3'>
        <DebouncedInput
          label={`Earliest ${contents as string}`}
          value={startFilter}
          type='date'
          onChange={(newValue) => setStartFilter(String(newValue))}
          className='w-full'
        />
        <DebouncedInput
          label={`Latest ${contents as string}`}
          value={endFilter}
          type='date'
          onChange={(newValue) => setEndFilter(String(newValue))}
          className='w-full'
        />
      </div>
    </div>
  )
}

type FilterIndicatorProps<TData extends RowData> = {
  column: Column<TData, unknown>
}

const FilterIndicator = <TData extends RowData>(
  props: FilterIndicatorProps<TData>,
) => {
  const { column } = props

  const filterValue = column.getFilterValue() ?? null
  const hasFilter = filterValue !== null

  const indicatorClasses = cn(
    'size-2 rounded-full duration-150',
    hasFilter ? 'bg-theme-500' : 'bg-mono-200',
  )

  return <div className={indicatorClasses} />
}

type ClearFilterButtonProps = {
  clearFilter: () => void
}

const ClearFilterButton: React.FC<ClearFilterButtonProps> = (props) => {
  const { clearFilter } = props

  return (
    <button onClick={clearFilter}>
      <ArrowPathIcon className='w-4 opacity-50 duration-150 hover:opacity-100' />
    </button>
  )
}
