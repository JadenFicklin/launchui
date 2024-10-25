import type { DropzoneState } from '~/components/Dropzone'
import type { DropzoneOptions } from 'react-dropzone'
import { useState } from 'react'
import { Dropzone } from '~/components/Dropzone'
import {
  CheckCircleIcon,
  NoSymbolIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'

export const Uploader: React.FC = () => {
  const { dropzoneState, dropzoneLabel, dropzoneIcon, mockUpload } =
    useUploader()

  return (
    <Dropzone
      accept='image/*'
      label={dropzoneLabel}
      icon={dropzoneIcon}
      state={dropzoneState}
      onChange={mockUpload}
      className='h-64 w-96'
    />
  )
}

const useUploader = () => {
  const [dropzoneState, setDropzoneState] = useState<DropzoneState>('neutral')
  const [dropzoneLabel, setDropzoneLabel] = useState('drop images here')
  const [dropzoneIcon, setDropzoneIcon] = useState<React.FC>(PhotoIcon)

  const resetDropzone = () => {
    setDropzoneState('neutral')
    setDropzoneLabel('drop images here')
    setDropzoneIcon(PhotoIcon)
  }

  const mockUpload: DropzoneOptions['onDrop'] = (files, rejects) => {
    const file = files[0]

    const hasRejects = rejects.length > 0
    if (hasRejects) {
      setDropzoneState('failure')
      setDropzoneLabel('only images are allowed')
      setDropzoneIcon(NoSymbolIcon)

      setTimeout(() => resetDropzone(), 2000)
      return
    }

    if (!file) return

    setDropzoneState('loading')
    setTimeout(() => {
      setDropzoneState('success')
      setDropzoneLabel('images uploaded')
      setDropzoneIcon(CheckCircleIcon)

      setTimeout(() => resetDropzone(), 2000)
    }, 1000)
  }

  return {
    dropzoneState,
    dropzoneLabel,
    dropzoneIcon,
    mockUpload,
  }
}
