import type { MenuOption } from '~/components/Menu'
import { useState } from 'react'
import { Menu } from '~/components/Menu'
import { MeatballMenu } from '~/components/MeatballMenu'
import { AccordionGroup } from '~/components/AccordionGroup'
import { Button } from '~/components/Button'

export const MenuComponents: React.FC = () => {
  const [openAccordionMenu, setOpenAccordionMenu] = useState('Second menu')

  const menuOptions = [
    {
      label: 'Wade Cooper',
      href: '#',
      onClick: (item: MenuOption) => console.log(item),
    },
    {
      label: 'Arlene Mccoy',
      href: '#',
      onClick: (item: MenuOption) => console.log(item),
    },
  ]

  const accordionGroup = [
    {
      label: 'First menu',
      content: () => (
        <AccordionMenuContent
          setOpenMenu={setOpenAccordionMenu}
          previousMenu='Third menu'
          nextMenu='Second menu'
        />
      ),
    },
    {
      label: 'Second menu',
      content: () => (
        <AccordionMenuContent
          setOpenMenu={setOpenAccordionMenu}
          previousMenu='First menu'
          nextMenu='Third menu'
        />
      ),
    },
    {
      label: 'Third menu',
      content: () => (
        <AccordionMenuContent
          setOpenMenu={setOpenAccordionMenu}
          previousMenu='Second menu'
          nextMenu='First menu'
        />
      ),
    },
  ]

  return (
    <div className='mb-16 flex flex-col items-start gap-12'>
      <h2 className='text-3xl'>Menus</h2>
      <div className='flex items-center gap-3'>
        <Menu label='Options' options={menuOptions} placement='bottom-start' />
        <MeatballMenu options={menuOptions} placement='bottom-end' />
      </div>
      <AccordionGroup
        menus={accordionGroup}
        selected={openAccordionMenu}
        setSelected={setOpenAccordionMenu}
        disableUserExpand={false}
      />
    </div>
  )
}

type AccordionMenuContentProps = {
  setOpenMenu: (menu: string) => void
  nextMenu: string
  previousMenu: string
}

const AccordionMenuContent: React.FC<AccordionMenuContentProps> = (props) => {
  const { setOpenMenu, nextMenu, previousMenu } = props

  return (
    <div className='flex flex-col gap-4 p-6'>
      <p>
        Ipsum et Lorem id non amet irure veniam nulla officia consectetur. Sit
        et do reprehenderit irure ut. Fugiat consequat est deserunt tempor
        dolore sunt duis dolore. Lorem veniam deserunt sit eu aliqua sit
        excepteur voluptate sit laborum amet. Officia sint nisi pariatur quis id
        reprehenderit consectetur amet sit sint dolor est ut. Ad ex sint tempor
        elit ex mollit duis minim aute labore quis.
      </p>
      <p>
        Ut reprehenderit occaecat incididunt et consectetur. Enim ipsum
        cupidatat nisi est duis enim veniam amet eiusmod officia nisi aliquip.
        Minim do exercitation sunt cillum in enim voluptate adipisicing. Fugiat
        ea pariatur eu excepteur fugiat esse non aliqua elit eu sit aute duis
        commodo. Ipsum irure dolore proident adipisicing velit anim labore
        occaecat elit reprehenderit.
      </p>
      <p>
        Aliqua duis sint pariatur incididunt. Cillum occaecat tempor veniam enim
        nisi dolor id non enim. Adipisicing consectetur mollit laboris
        adipisicing. Aliquip culpa laborum laborum nisi dolore ea labore ullamco
        occaecat culpa. Voluptate reprehenderit irure laborum et aute nostrud.
        Proident fugiat occaecat aliquip aute ut consectetur veniam enim tempor
        ut ullamco. Incididunt commodo ea aute voluptate in labore. Do aliquip
        eu elit duis laboris esse et. Velit et veniam nulla sunt ad. Ut mollit
        consequat nisi ea exercitation ad.
      </p>
      <div className='flex justify-between'>
        <Button onClick={() => setOpenMenu(previousMenu)}>Previous</Button>
        <Button onClick={() => setOpenMenu(nextMenu)}>Next</Button>
      </div>
    </div>
  )
}
