import type { InputProps } from '~/components/Input'
import { DebouncedInput } from '~/features/table/components/DebouncedInput'
import { useTableContext } from '~/features/table/hooks/useTableContext'

type TableSearchProps = InputProps

export const TableSearch: React.FC<TableSearchProps> = (props) => {
  const { state } = useTableContext()
  const { globalFilter, setGlobalFilter } = state
  const { ...rest } = props

  return (
    <DebouncedInput
      {...rest}
      value={globalFilter}
      onChange={(value) => setGlobalFilter(String(value))}
      placeholder='Search'
    />
  )
}
