import type { AppearancePreference } from '~/features/theme/types/Preferences'
import { useAtom } from 'jotai'
import { RadioCards } from '~/components/RadioCards'
import { appearancePreferenceAtom } from '~/features/theme/atoms/preferences.atom'
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/20/solid'

export const SelectAppearance: React.FC = () => {
  const { appearancePreference, handleChecked, options } = useSelectAppearance()

  return (
    <section className='flex flex-col gap-8'>
      <span className='text-lg font-medium text-script'>Appearance</span>
      <RadioCards
        checked={appearancePreference}
        setChecked={handleChecked}
        options={options}
        className='w-64'
      />
    </section>
  )
}

const useSelectAppearance = () => {
  const options = [
    {
      id: 'light',
      value: 'Light',
      icon: <SunIcon className='h-6 w-6 text-script dark:text-yellow-500' />,
    },
    {
      id: 'dark',
      value: 'Dark',
      icon: <MoonIcon className='h-6 w-6 text-script dark:text-purple-500' />,
    },
    {
      id: 'system',
      value: 'System',
      icon: (
        <ComputerDesktopIcon className='h-6 w-6 text-script dark:text-slate-500' />
      ),
    },
  ]

  const [appearancePreference, setAppearancePrefrence] = useAtom(
    appearancePreferenceAtom,
  )

  const handleChecked = (id: string) => {
    setAppearancePrefrence(id as AppearancePreference)
  }

  return {
    appearancePreference,
    handleChecked,
    options,
  }
}
