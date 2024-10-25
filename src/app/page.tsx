'use client'

import type { NextPage } from 'next'
import { useState } from 'react'
import { FormComponents } from '~/features/playground/pages/FormComponents'
import { TypographyComponents } from '~/features/playground/pages/TypographyComponents'
import { MenuComponents } from '~/features/playground/pages/MenuComponents'
import { MiscComponents } from '~/features/playground/pages/MiscComponents'
import { TableComponents } from '~/features/playground/pages/TableComponents'
import { ThemeComponents } from '~/features/playground/pages/ThemeComponents'
import { TabGroup } from '~/components/TabGroup'
import { Layout } from '~/templates/Layout'

const Playground: NextPage = () => {
  const tabs = [
    { label: 'Theme', content: ThemeComponents },
    { label: 'Forms', content: FormComponents },
    { label: 'Typography', content: TypographyComponents },
    { label: 'Menus', content: MenuComponents },
    { label: 'Tables', content: TableComponents },
    { label: 'Misc', content: MiscComponents },
  ]

  const [currentTab, setCurrentTab] = useState('Theme')

  return (
    <Layout>
      <div className='my-8 space-y-8'>
        <TabGroup
          tabs={tabs}
          selected={currentTab}
          onChange={(tab) => setCurrentTab(tab)}
          vertical={true}
        />
      </div>
    </Layout>
  )
}

export default Playground
