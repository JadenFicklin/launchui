import { ExampleTable } from '~/features/playground/components/ExampleTable'

export const TableComponents: React.FC = () => {
  return (
    <div className='mb-16 flex w-full flex-col items-start gap-12'>
      <h2 className='text-3xl'>Table</h2>
      <ExampleTable />
    </div>
  )
}
