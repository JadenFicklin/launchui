import { Pagination } from '~/components/Pagination'
import { useTableContext } from '~/features/table/hooks/useTableContext'

type TablePaginationProps = {
  className?: string
}

export const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { table } = useTableContext()
  const { className } = props

  const selectedPage = table.getState().pagination.pageIndex + 1
  const setSelectedPage = (page: number) => table.setPageIndex(page - 1)
  const totalPages = table.getPageCount()
  const showPagination = table.getPageCount() > 1

  if (!showPagination) return null

  return (
    <Pagination
      selected={selectedPage}
      setSelected={setSelectedPage}
      totalPages={totalPages}
      pageNeighbors={1}
      className={className}
    />
  )
}
