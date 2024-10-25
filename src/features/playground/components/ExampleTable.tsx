import type { Person } from '~/features/table/utils/makeData'
import type { MenuOption } from '~/components/Menu'
import type {
  TableColumns,
  TableDrawerProps,
  TableCellProps,
  TableFilter,
} from '~/features/table/types/Table.types'
import { useMemo } from 'react'
import { Table } from '~/features/table/components/Table'
import { useTable } from '~/features/table/hooks/useTable'
import { useTableColumns } from '~/features/table/hooks/useTableColumns'
import { makeData } from '~/features/table/utils/makeData'
import { Button } from '~/components/Button'
import { TransitionDrawer } from '~/components/Drawer'
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { MeatballMenu } from '~/components/MeatballMenu'

export const ExampleTable = () => {
  const tableProps = usePersonTable()
  const { table } = tableProps

  const viewSelected = () => {
    const selectedRows = table.getSelectedRowModel().flatRows
    console.log(selectedRows)
  }

  return (
    <Table {...tableProps} className='flex w-full flex-col items-start gap-8'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-2xl'>People</h2>
        <div className='flex items-center gap-4'>
          <Table.Filters />
          <Table.Search />
        </div>
      </div>
      <Table.Content />
      <div className='flex items-center gap-5'>
        <Table.Pagination />
        <Table.PagesDropdown sizes={[10, 20, 30]} />
        <Button onClick={viewSelected}>View selected rows</Button>
      </div>
    </Table>
  )
}

const usePersonTable = () => {
  const { checkboxColumn, spacerColumn } = useTableColumns<Person>()

  const columnStructure: TableColumns<Person> = [
    checkboxColumn,
    {
      id: 'fullName',
      header: 'Full Name',
      cell: (info) => info.getValue() as string,
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      size: 180,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      size: 80,
    },
    {
      accessorKey: 'taken',
      header: 'Taken',
      cell: (info) => (info.getValue() ? 'Yes' : 'No'),
      size: 95,
      meta: {
        columnClassName: 'hidden lg:table-cell',
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: DateCell,
      size: 110,
      filterFn: 'dataRange' as TableFilter<Person>,
      meta: {
        columnClassName: 'hidden lg:table-cell',
      },
    },
    spacerColumn,
    {
      id: 'expander',
      header: () => null,
      cell: RowDrawerButton,
      size: 25,
      enableResizing: false,
      meta: {
        cellClassName: 'lg:hidden table-cell relative h-full group',
        columnClassName: 'lg:hidden table-cell',
      },
    },
    {
      id: 'menu',
      header: '',
      cell: TableMenu,
      size: 55,
      enableResizing: false,
    },
  ]

  const columns = useMemo(() => columnStructure, [])
  const data = useMemo(() => makeData(200), [])

  const config = { data, columns }

  const options = {
    rows: {
      className: 'hover:bg-mono-100 duration-150',
      drawer: RowDrawer,
    },
  }

  const tableProps = useTable({ config, options })
  return tableProps
}

const isDate = (value: unknown): value is Date => value instanceof Date

const DateCell: React.FC<TableCellProps<Person>> = (props) => {
  const { getValue } = props
  const value = getValue()

  return isDate(value) ? value.toLocaleDateString() : 'Invalid Date'
}

const TableMenu: React.FC<TableCellProps<Person>> = (props) => {
  const { row } = props
  const { original } = row
  const name = `${original.firstName} ${original.lastName}`

  const menuOptions: MenuOption[] = [
    {
      label: `View ${name}`,
      href: '#',
      onClick: (item: MenuOption) => console.log(item),
    },
    {
      label: `Rename`,
      href: '#',
      onClick: (item: MenuOption) => console.log(item),
    },
    {
      label: `Delete`,
      href: '#',
      onClick: (item: MenuOption) => console.log(item),
    },
  ]

  return <MeatballMenu options={menuOptions} placement='bottom-end' />
}

const RowDrawerButton: React.FC<TableCellProps<Person>> = (props) => {
  const { row } = props
  const isExpanded = row.getIsExpanded()
  const canExpand = row.getCanExpand()
  const expandRow = row.getToggleExpandedHandler()

  const buttonClasses =
    'size-4 cursor-pointer opacity-50 duration-150 group-hover:opacity-100 flex-shrink-0'

  if (!canExpand) return null

  return (
    <button
      className='absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center'
      onClick={expandRow}
    >
      {isExpanded ? (
        <MinusIcon className={buttonClasses} />
      ) : (
        <PlusIcon className={buttonClasses} />
      )}
    </button>
  )
}

const RowDrawer: React.FC<TableDrawerProps<Person>> = (props) => {
  const { original, getIsExpanded } = props.row
  const { firstName, lastName, age, taken, date } = original
  const expanded = getIsExpanded()

  return (
    <TransitionDrawer show={expanded}>
      <div className='flex flex-col gap-3 border-t border-solid border-mono-200 p-6'>
        <div className='flex gap-2'>
          <span className='font-semibold'>First Name:</span>
          <span>{firstName}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Last Name:</span>
          <span>{lastName}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Age:</span>
          <span>{age}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Taken:</span>
          <span>{taken ? 'Yes' : 'No'}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Date:</span>
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>
    </TransitionDrawer>
  )
}
