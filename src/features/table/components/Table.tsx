import type { TableData } from '~/features/table/types/Table.types'
import type { RowData } from '@tanstack/react-table'
import { cn } from '~/utils/cn'
import { TableHead } from '~/features/table/components/TableHead'
import { TableBody } from '~/features/table/components/TableBody'
import { TableFoot } from '~/features/table/components/TableFoot'
import { TableSearch } from '~/features/table/components/TableSearch'
import { TableFilters } from '~/features/table/components/TableFilters'
import { TablePagination } from '~/features/table/components/TablePagination'
import { TablePagesDropdown } from '~/features/table/components/TablePagesDropdown'
import {
  TableContext,
  useTableContext,
} from '~/features/table/hooks/useTableContext'

type TableProps<TData extends RowData> = {
  className?: string
  children?: React.ReactNode
} & TableData<TData>

export const Table = <TData extends RowData>(props: TableProps<TData>) => {
  const { className, children, ...rest } = props

  return (
    <TableContext.Provider value={rest as TableData<RowData>}>
      <div className={className}>{children}</div>
    </TableContext.Provider>
  )
}

type TableContentProps = {
  className?: string
}

const TableContent: React.FC<TableContentProps> = (props) => {
  const data = useTableContext()
  const { className } = props

  const wrapperClasses = cn(
    'w-full overflow-x-auto overflow-y-clip shadow',
    'rounded-lg ring-1 ring-mono-full ring-opacity-5',
    className,
  )

  return (
    <div className={wrapperClasses}>
      <table className='w-full min-w-full table-fixed divide-y divide-mono-300'>
        <TableHead data={data} />
        <TableBody data={data} />
        <TableFoot data={data} />
      </table>
    </div>
  )
}

Table.Content = TableContent
Table.Search = TableSearch
Table.Filters = TableFilters
Table.Pagination = TablePagination
Table.PagesDropdown = TablePagesDropdown
