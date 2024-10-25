import type { Row, FilterFn, RowData } from '@tanstack/react-table'

export const dateRangeFilter = <TData extends RowData>(): FilterFn<TData> => {
  return (
    row: Row<TData>,
    columnId: string,
    value: [string, string] | undefined,
  ) => {
    const dateStr = row.getValue(columnId)
    let date: Date | null

    if (typeof dateStr === 'string') {
      date = new Date(dateStr)
    } else if (dateStr instanceof Date) {
      date = dateStr
    } else {
      date = null
    }

    if (!value) return true
    const [startStr, endStr] = value
    const startDate = startStr ? new Date(startStr) : null
    const endDate = endStr ? new Date(endStr) : null
    if (!date) return false
    if (startDate && date < startDate) return false
    if (endDate && date > endDate) return false
    return true
  }
}
