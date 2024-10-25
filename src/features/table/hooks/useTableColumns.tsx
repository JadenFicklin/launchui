import type { RowData, ColumnDef } from '@tanstack/react-table'
import { useEffect, useRef } from 'react'
import { Checkbox } from '~/components/Checkbox'
import { cn } from '~/utils/cn'

export const useTableColumns = <TData extends RowData>() => {
  const spacerColumn: ColumnDef<TData> = { id: 'spacer', header: '', cell: '' }

  const checkboxColumn: ColumnDef<TData> = {
    id: 'select',
    size: 35,
    enableResizing: false,
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }

  const columns = { checkboxColumn, spacerColumn }
  return columns
}

type IndeterminateCheckboxProps = {
  indeterminate?: boolean
  className?: string
} & React.HTMLProps<HTMLInputElement>

const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = (props) => {
  const { indeterminate, className, ...rest } = props
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    const isBoolean = typeof indeterminate === 'boolean'
    if (!isBoolean) return

    ref.current.indeterminate = !rest.checked && indeterminate
  }, [ref, indeterminate])

  const checkboxClasses = cn('cursor-pointer', className)

  return <Checkbox reference={ref} className={checkboxClasses} {...rest} />
}
