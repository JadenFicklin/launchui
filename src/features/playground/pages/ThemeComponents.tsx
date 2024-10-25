import { SelectAppearance } from '~/features/theme/components/SelectAppearance'
import { SelectFlavor } from '~/features/theme/components/SelectFlavor'

export const ThemeComponents: React.FC = () => {
  return (
    <div className='mb-16 flex flex-col items-start gap-12'>
      <h2 className='text-3xl'>Theme</h2>
      <SelectAppearance />
      <SelectFlavor />
    </div>
  )
}
