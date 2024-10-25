import type {
  TableOptions as ReactTableOptions,
  RowData,
} from '@tanstack/react-table'

import type {
  TableOptions,
  TableData,
} from '~/features/table/types/Table.types'

import { useState } from 'react'
import { fuzzyFilter } from '~/features/table/utils/fuzzyFilter'
import { dateRangeFilter } from '~/features/table/utils/dateRangeFilter'

import {
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
} from '@tanstack/react-table'

type UseTableProps<TData extends RowData> = {
  config: TableConfig<TData>
  options: TableOptions<TData>
}

type RequiredTableOptions = 'columns' | 'data'
type OmittedTableOptions<TData extends RowData> = Omit<
  ReactTableOptions<TData>,
  keyof Omit<ReactTableOptions<TData>, RequiredTableOptions>
>

type TableConfig<TData extends RowData> = OmittedTableOptions<TData> &
  Pick<ReactTableOptions<TData>, RequiredTableOptions>

export const useTable = <TData extends RowData>(
  props: UseTableProps<TData>,
) => {
  const { config, options } = props
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const filterFns: ReactTableOptions<TData>['filterFns'] = {
    fuzzy: fuzzyFilter<TData>(),
    dataRange: dateRangeFilter<TData>(),
  }

  const table = useReactTable<TData>({
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter<TData>(),
    filterFns: filterFns,
    columnResizeMode: 'onChange',
    state: { globalFilter, rowSelection },
    ...config,
  })

  const state = {
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
  }

  const tableData: TableData<TData> = {
    table,
    state,
    options,
  }

  return tableData
}
