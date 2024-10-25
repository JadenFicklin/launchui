import type { FilterTypeProps } from '~/features/table/components/TableFilterTypes'
import type { TableData } from '~/features/table/types/Table.types'
import type { Header, HeaderGroup, RowData } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useTableContext } from '~/features/table/hooks/useTableContext'
import { getDataType } from '~/features/table/utils/getDataType'
import { Popover } from '~/components/Popover'
import { FunnelIcon } from '@heroicons/react/16/solid'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { cn } from '~/utils/cn'
import clsx from 'clsx'
import {
  BooleanFilter,
  DateFilter,
  NumberFilter,
  StringFilter,
} from '~/features/table/components/TableFilterTypes'

type TableFiltersProps = {
  className?: string
}

export const TableFilters: React.FC<TableFiltersProps> = (props) => {
  const data = useTableContext()
  const { table } = data
  const { className } = props

  const [showFilters, setShowFilters] = useState(false)
  const tableHeaderGroups = table.getHeaderGroups()
  const toggleFilter = () => setShowFilters(!showFilters)

  const buttonClasses = cn(
    'padding-5 size-4 duration-150 hover:opacity-100',
    showFilters ? 'text-theme-500' : 'opacity-50',
    className,
  )

  const wrapperClasses = clsx(
    'flex max-h-[500px] w-full flex-col gap-8 overflow-y-auto bg-mono-100',
    'rounded-lg p-6 shadow-lg ring-1 ring-mono-300 ring-opacity-50',
  )

  return (
    <Popover show={showFilters} setShow={setShowFilters} offset={20}>
      <Popover.Trigger>
        <button onClick={toggleFilter}>
          <FunnelIcon className={buttonClasses} />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow className='bg-mono-100 ring-1 ring-mono-300 ring-opacity-50' />
        <div className={wrapperClasses}>
          <Popover.Exit>
            <button className='absolute right-3 top-3'>
              <XMarkIcon className='size-6 cursor-pointer opacity-50 duration-150 hover:opacity-100' />
            </button>
          </Popover.Exit>
          {tableHeaderGroups.map((headerGroup) => (
            <FilterContainer
              key={headerGroup.id}
              data={data}
              headerGroup={headerGroup}
            />
          ))}
        </div>
      </Popover.Content>
    </Popover>
  )
}

type FilterContainerProps<TData extends RowData> = {
  data: TableData<TData>
  headerGroup: HeaderGroup<TData>
}

const FilterContainer = <TData extends RowData>(
  props: FilterContainerProps<TData>,
) => {
  const { data, headerGroup } = props

  return (
    <>
      {headerGroup.headers.map((header) => (
        <ColumnFilter key={header.id} data={data} header={header} />
      ))}
    </>
  )
}

type ColumnFilterProps<TData extends RowData> = {
  data: TableData<TData>
  header: Header<TData, unknown>
}

const ColumnFilter = <TData extends RowData>(
  props: ColumnFilterProps<TData>,
) => {
  const { data } = props
  const { column, getContext } = props.header

  const canFilter = column.getCanFilter()
  if (!canFilter) return null

  const getFilters = data.table.getPreFilteredRowModel()
  const firstValue = getFilters.flatRows[0]?.getValue(column.id)
  const filterType = getDataType(firstValue)

  const contents = flexRender(column.columnDef.header, getContext())

  const filterProps: FilterTypeProps<TData> = {
    data,
    column,
    contents,
  }

  if (filterType === 'string') return <StringFilter {...filterProps} />
  if (filterType === 'number') return <NumberFilter {...filterProps} />
  if (filterType === 'boolean') return <BooleanFilter {...filterProps} />
  if (filterType === 'date') return <DateFilter {...filterProps} />

  return null
}
