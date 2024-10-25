import type { RowData, Cell, Row } from '@tanstack/react-table'
import type { TableData } from '~/features/table/types/Table.types'
import { cn } from '~/utils/cn'
import { flexRender } from '@tanstack/react-table'

type TableBodyProps<TData extends RowData> = {
  data: TableData<TData>
}

export const TableBody = <TData extends RowData>(
  props: TableBodyProps<TData>,
) => {
  const { data } = props
  const tableRows = data.table.getRowModel().rows

  return (
    <tbody className='divide-y divide-mono-200 bg-mono-base'>
      {tableRows.map((row) => (
        <TableRow key={row.id} data={data} row={row} />
      ))}
    </tbody>
  )
}

type TableRowProps<TData extends RowData> = {
  data: TableData<TData>
  row: Row<TData>
}

const TableRow = <TData extends RowData>(props: TableRowProps<TData>) => {
  const { data } = props
  const { drawer: Drawer, className } = data?.options?.rows ?? {}

  const { getVisibleCells } = props.row
  const cells = getVisibleCells()

  return (
    <>
      <tr className={className}>
        {cells.map((cell) => (
          <TableCell key={cell.id} data={data} cell={cell} />
        ))}
      </tr>
      {Drawer && (
        <tr className='border-none'>
          <td colSpan={cells.length} className='p-0'>
            <Drawer data={data} row={props.row} />
          </td>
        </tr>
      )}
    </>
  )
}

type TableCellProps<TData extends RowData> = {
  data: TableData<TData>
  cell: Cell<TData, unknown>
}

const TableCell = <TData extends RowData>(props: TableCellProps<TData>) => {
  const { column, getContext } = props.cell

  const size = column.getSize()
  const isSpacer = column.id === 'spacer'

  const columnMeta = column.columnDef.meta
  const { columnClassName, cellClassName } = (columnMeta ?? {}) as {
    columnClassName?: string
    cellClassName?: string
  }

  const contents = flexRender(column.columnDef.cell, getContext())

  const cellStyle = { width: isSpacer ? '100%' : size }
  const cellClasses =
    cellClassName ?? cn('truncate px-3 py-4 text-sm', columnClassName)

  return (
    <td className={cellClasses} style={cellStyle}>
      {contents}
    </td>
  )
}
