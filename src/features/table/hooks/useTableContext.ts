import type { TableData } from '~/features/table/types/Table.types'
import type { RowData } from '@tanstack/react-table'
import { createContext, useContext } from 'react'

export const TableContext = createContext<TableData<RowData> | null>(null)

export const useTableContext = <TData extends RowData>() => {
  const context = useContext(TableContext) as TableData<TData>

  if (!context) {
    const errorMessage = `useTableContext must be used within a Table component`
    throw new Error(errorMessage)
  }

  return context
}
