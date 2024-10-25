import type { RowData } from '@tanstack/react-table'
import type { TableData } from '~/features/table/types/Table.types'
import { cn } from '~/utils/cn'
import { Drawer } from '~/components/Drawer'

type TableFootProps<TData extends RowData> = {
  data: TableData<TData>
}

export const TableFoot = <TData extends RowData>(
  props: TableFootProps<TData>,
) => {
  const { table } = props.data

  const totalSelectedRows = table.getSelectedRowModel().flatRows.length
  const showFooter = totalSelectedRows > 0
  const pluralRows = totalSelectedRows === 1 ? 'row' : 'rows'

  const footerClasses = cn(
    'bg-mono-50 duration-150',
    !showFooter && 'overflow-hidden border-none',
  )

  const drawerClasses = cn('duration-150', showFooter ? 'py-3' : 'py-0')

  return (
    <tfoot className={footerClasses}>
      <tr>
        <td colSpan={7} className='p-0'>
          <Drawer show={showFooter} className={drawerClasses}>
            <div className='px-4'>
              <span className='font-medium'>{totalSelectedRows}</span>
              <span className='ml-1'>{pluralRows} selected</span>
            </div>
          </Drawer>
        </td>
      </tr>
    </tfoot>
  )
}
