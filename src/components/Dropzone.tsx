import type { DropzoneOptions } from 'react-dropzone'
import { useDropzone as useReactDropzone } from 'react-dropzone'
import { Loading } from '~/components/Loading'
import { cn } from '~/utils/cn'

type DropzoneProps = {
  label: string
  icon: React.FC<{ className?: string }>
  state: DropzoneState
  accept: string
  acceptMimes?: string[]
  onChange: DropzoneOptions['onDrop']
  multiple?: boolean
  className?: string
} & Omit<DropzoneOptions, 'accept'>

export type DropzoneState =
  | 'neutral'
  | 'loading'
  | 'success'
  | 'failure'
  | 'disabled'

export const Dropzone: React.FC<DropzoneProps> = (props) => {
  const { className } = props
  const { states, isLoading, handleKeyDown, getRootProps, getInputProps } =
    useDropzone(props)

  const wrapperClasses = cn(
    'flex cursor-default flex-col items-center justify-center p-4',
    'select-none font-medium outline-none duration-150',
    'focus-visible:ringed focus-visible:text-theme-500',
    'cursor-default rounded-xl border-2 border-dashed border-current',
    states.neutral &&
      'cursor-pointer text-script active:text-theme-500 dark:text-script/50 dark:focus-visible:text-theme-500 dark:active:text-theme-500',
    states.neutralDragging && 'text-theme-500 dark:text-theme-500',
    states.choosing && 'text-theme-500 dark:text-theme-500',
    states.loading && 'text-theme-300 dark:text-theme-300',
    states.success && 'text-green-500 dark:text-green-500',
    states.failure && 'text-red-500 dark:text-red-500',
    states.disabled && 'text-theme-500 opacity-50 dark:text-theme-500',
    className,
  )

  return (
    <div
      {...getRootProps({ refKey: 'innerref' })}
      className={wrapperClasses}
      onKeyDown={handleKeyDown}
    >
      <input {...getInputProps()} />
      {isLoading ? <Loading size={18} margin={4} /> : <Message {...props} />}
    </div>
  )
}

type MessageProps = Pick<DropzoneProps, 'label' | 'icon'>

const Message: React.FC<MessageProps> = (props) => {
  const { label, icon } = props
  const Icon = icon

  return (
    <div className='pointer-events-none flex flex-col items-center gap-2 text-center'>
      <Icon className='h-20 w-20 [&>path]:stroke-[.7]' />
      {label}
    </div>
  )
}

const useDropzone = (props: DropzoneProps) => {
  const { state, accept, acceptMimes, multiple, onChange } = props

  const isLoading = state === 'loading'
  const isDisabled = state !== 'neutral'

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFileDialogActive,
    inputRef,
  } = useReactDropzone({
    onDrop: onChange,
    accept: { [accept]: acceptMimes ?? [] },
    disabled: isDisabled,
    multiple,
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return
    if (!inputRef.current) return

    const enterOrSpace = event.key === 'Enter' || event.key === ' '
    if (enterOrSpace) inputRef.current.click()
  }

  const states = {
    neutral: state === 'neutral',
    neutralDragging: state === 'neutral' && isDragActive,
    choosing: isFileDialogActive,
    loading: state === 'loading',
    success: state === 'success',
    failure: state === 'failure',
    disabled: state === 'disabled',
  }

  return {
    states,
    isLoading,
    handleKeyDown,
    getRootProps,
    getInputProps,
  }
}
