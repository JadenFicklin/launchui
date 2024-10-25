import type { RowData, HeaderGroup, Header } from '@tanstack/react-table'
import type { TableData } from '~/features/table/types/Table.types'
import { cn } from '~/utils/cn'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { flexRender } from '@tanstack/react-table'

type TableHeadProps<TData extends RowData> = {
  data: TableData<TData>
}

export const TableHead = <TData extends RowData>(
  props: TableHeadProps<TData>,
) => {
  const { data } = props
  const tableHeaderGroups = data.table.getHeaderGroups()

  return (
    <thead className='bg-mono-50'>
      {tableHeaderGroups.map((headerGroup) => (
        <TableHeaderGroup
          key={headerGroup.id}
          data={data}
          headerGroup={headerGroup}
        />
      ))}
    </thead>
  )
}

type TableHeaderGroupProps<TData extends RowData> = {
  data: TableData<TData>
  headerGroup: HeaderGroup<TData>
}

const TableHeaderGroup = <TData extends RowData>(
  props: TableHeaderGroupProps<TData>,
) => {
  const { data } = props
  const { id, headers } = props.headerGroup

  return (
    <tr key={id}>
      {headers.map((header) => (
        <TableHeader key={header.id} data={data} header={header} />
      ))}
    </tr>
  )
}

type TableHeaderProps<TData extends RowData> = {
  data: TableData<TData>
  header: Header<TData, unknown>
}

const TableHeader = <TData extends RowData>(props: TableHeaderProps<TData>) => {
  const {
    id,
    isPlaceholder,
    colSpan,
    column,
    getContext,
    getSize,
    getResizeHandler,
  } = props.header

  const handleSort = column.getToggleSortingHandler()
  const isSortable = column.getCanSort()
  const isSorted = column.getIsSorted()

  const isSpacer = id === 'spacer'
  const isResizable = column.getCanResize()
  const isResizing = column.getIsResizing()
  const headerSize = getSize()

  const headerMeta = column.columnDef.meta
  const { columnClassName, headerClassName } = (headerMeta ?? {}) as {
    columnClassName?: string
    headerClassName?: string
  }

  const contents = flexRender(column.columnDef.header, getContext())
  const contentIsString = typeof contents === 'string'

  const headerClasses = cn(
    'relative overflow-hidden px-3 py-3.5 text-left text-sm font-semibold',
    isSortable && 'group cursor-pointer select-none',
    columnClassName,
    headerClassName,
  )

  const headerStyle = { width: isSpacer ? '100%' : headerSize }
  const headerTextStyle = cn(contentIsString && 'truncate')

  const chevronClasses = cn(
    'mr-1 inline size-4 flex-shrink-0 opacity-0 duration-150',
    isSortable && 'group-hover:opacity-25',
    isSorted && 'opacity-100 group-hover:opacity-100',
    isSorted === 'asc' && 'rotate-180',
    isSorted === 'desc' && 'rotate-0',
  )

  const resizerClasses = cn(
    'flex h-full w-5 cursor-ew-resize items-center',
    'justify-center bg-mono-50 duration-150',
    'absolute right-0 top-0 touch-none select-none',
    'opacity-0 group-hover:opacity-100',
    isResizing && 'opacity-100',
    (!isResizable || isSpacer) && 'hidden',
  )

  const resizerIndicatorClasses = cn(
    'h-5 w-1 rounded-full bg-mono-200 duration-150',
    isResizing && 'bg-mono-600',
  )

  if (isPlaceholder) return null

  return (
    <th colSpan={colSpan} className={headerClasses} style={headerStyle}>
      <div className='flex items-center gap-1' onClick={handleSort}>
        <span className={headerTextStyle}>{contents}</span>
        {isSortable && <ChevronDownIcon className={chevronClasses} />}
      </div>
      <div
        onMouseDown={getResizeHandler()}
        onTouchStart={getResizeHandler()}
        className={resizerClasses}
      >
        <div className={resizerIndicatorClasses} />
      </div>
    </th>
  )
}
