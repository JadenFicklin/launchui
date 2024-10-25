import type { DropdownProps } from '~/components/Dropdown'
import { Dropdown } from '~/components/Dropdown'
import { useTableContext } from '~/features/table/hooks/useTableContext'

type TablePagesDropdownProps = {
  sizes?: number[]
} & Omit<DropdownProps, 'options'>

export const TablePagesDropdown: React.FC<TablePagesDropdownProps> = (
  props,
) => {
  const { table } = useTableContext()
  const { sizes, ...rest } = props

  const pageSize = table.getState().pagination.pageSize
  const setPageSize = (pageSize: number) => table.setPageSize(pageSize)

  const customPageSizes = sizes?.map((size) => ({ label: String(size) }))

  const defaultPageSizes = [
    { label: '10' },
    { label: '20' },
    { label: '30' },
    { label: '40' },
    { label: '50' },
  ]

  const pageOptions = customPageSizes ? customPageSizes : defaultPageSizes

  return (
    <Dropdown
      {...rest}
      selected={{ label: String(pageSize) }}
      options={pageOptions}
      onChange={(value) => setPageSize(Number(value.label))}
    />
  )
}
