import { Button } from '~/components/Button'
import { ExternalLink } from '~/components/ExternalLink'
import { Loading } from '~/components/Loading'
import { Modal } from '~/components/Modal'
import { Uploader } from '~/components/Uploader'
import { Tooltip } from '~/components/Tooltip'
import { toast } from '~/components/Toast'
import { BeakerIcon, StarIcon } from '@heroicons/react/20/solid'

export const MiscComponents: React.FC = () => {
  const handlePlainToasts = () => {
    toast('Plain toast', { icon: BeakerIcon, duration: 5000 })
  }

  const handleSpecialToasts = () => {
    toast.theme('Theme toast', { icon: StarIcon })
    toast.info('Info toast')
    toast.error('Error toast')
    toast.warning('Warning toast')
    toast.success('Success toast')
  }

  return (
    <div className='mb-16 flex flex-col items-start gap-12'>
      <h2 className='text-3xl'>Misc</h2>
      <div className='flex gap-3'>
        <ExternalLink href='/settings'>Internal link</ExternalLink>
        <ExternalLink href='https://google.com'>External link</ExternalLink>
        <ExternalLink href='tel:555-555-5555'>Telephone link</ExternalLink>
        <ExternalLink href='mailto:example@email.com'>Mail link</ExternalLink>
        <ExternalLink>No link</ExternalLink>
      </div>
      <Modal />
      <Loading />
      <Uploader />
      <Tooltip label='Tooltip'>
        <span className='cursor-pointer select-none'>Hover for tooltip</span>
      </Tooltip>
      <div className='flex gap-6'>
        <Button onClick={handlePlainToasts}>Plain toasts showcase</Button>
        <Button onClick={handleSpecialToasts}>Special toasts showcase</Button>
      </div>
    </div>
  )
}
