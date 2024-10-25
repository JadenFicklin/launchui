import React from 'react'
import { toast as sonnerToast } from 'sonner'
import { cn } from '~/utils/cn'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

type Toast = (children: React.ReactNode, options?: ToastOptions) => void

type ToastOptions = {
  icon?: React.ElementType
  duration?: number
  hideExit?: boolean
  className?: string
}

type ToastTemplateProps = {
  children: React.ReactNode
  options?: ToastOptions
  type: {
    styling: string
    icon?: React.ElementType
  } & ToastOptions
}

const ToastTemplate = (props: ToastTemplateProps) => {
  const { children, options, type } = props
  const { hideExit, className, duration } = props.options ?? {}
  const { styling } = type

  const Icon = options?.icon ?? type?.icon

  const wrapperClasses = cn(
    'relative justify-between rounded-md',
    'border p-4 shadow-lg duration-150',
    styling,
    className,
  )

  return sonnerToast.custom(
    (toastId) => (
      <div className={wrapperClasses}>
        <div className='flex min-w-[20rem] items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            {Icon && <Icon className='h-5 w-5 flex-shrink-0' />}
            {children}
          </div>
          {!hideExit && (
            <button onClick={() => sonnerToast.dismiss(toastId)}>
              <XMarkIcon className='h-4 w-4 select-none' />
            </button>
          )}
        </div>
      </div>
    ),
    { duration },
  )
}

type ToastCollection = Toast & {
  success: Toast
  warning: Toast
  error: Toast
  info: Toast
  theme: Toast
}

const styles = {
  plain: 'bg-mono-base text-script dark:bg-mono-100 border-mono-full/10',
  success:
    'bg-green-50 border-green-100 dark:border-transparent text-green-400 dark:bg-green-900 dark:text-green-300',
  warning:
    'bg-yellow-50 border-yellow-200 dark:border-transparent text-yellow-400 dark:bg-yellow-900 dark:text-yellow-300',
  error:
    'bg-red-50 border-red-100 dark:border-transparent text-red-400 dark:bg-red-900 dark:text-red-300',
  info: 'bg-sky-50 border-sky-100 dark:border-transparent text-sky-400 dark:bg-sky-900 dark:text-sky-300',
  theme:
    'bg-theme-50 border-theme-100 dark:border-transparent text-theme-400 dark:bg-theme-100 dark:text-theme-700',
}

const toast: ToastCollection = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { styling: styles.plain },
  })

toast.success = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { icon: CheckCircleIcon, styling: styles.success },
  })

toast.warning = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { icon: ExclamationTriangleIcon, styling: styles.warning },
  })

toast.error = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { icon: ExclamationCircleIcon, styling: styles.error },
  })

toast.info = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { icon: InformationCircleIcon, styling: styles.info },
  })

toast.theme = (children, options) =>
  ToastTemplate({
    children,
    options,
    type: { styling: styles.theme },
  })

export { toast }
