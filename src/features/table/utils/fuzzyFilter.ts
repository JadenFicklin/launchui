import type { FilterFn } from '@tanstack/react-table'
import type { RowData } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

type GenericFilterFn = <TData extends RowData>() => FilterFn<TData>

export const fuzzyFilter: GenericFilterFn = () => {
  return (row, columnId, value, addMeta) => {
    const isNotString = typeof value !== 'string'
    if (isNotString) {
      console.error('Expected string value for fuzzy filter')
      return false
    }

    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }
}
