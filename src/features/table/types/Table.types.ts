import type {
  Table as TableType,
  RowData,
  Row,
  ColumnDef,
  CellContext,
  FilterFnOption,
} from '@tanstack/react-table'

export type TableData<TData extends RowData> = {
  table: TableType<TData>
  state: TableState
  options?: TableOptions<TData>
}

type TableState = {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  rowSelection: Record<string, boolean>
  setRowSelection: (value: Record<string, boolean>) => void
}

export type TableOptions<TData extends RowData> = {
  rows?: {
    drawer?: React.FC<TableDrawerProps<TData>>
    className?: string
  }
}

export type TableFilter<TData extends RowData> = FilterFnOption<TData>
export type TableColumns<TData extends RowData> = ColumnDef<TData, unknown>[]
export type TableCellProps<TData extends RowData> = CellContext<TData, unknown>
export type TableDrawerProps<TData extends RowData> = {
  data: TableData<TData>
  row: Row<TData>
}
