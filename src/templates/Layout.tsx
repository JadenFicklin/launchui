import { cn } from '~/utils/cn'

type LayoutProps = {
  children: React.ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { className, children } = props

  const wrapperClasses = cn('mx-auto max-w-3xl', className)

  return (
    <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className={wrapperClasses}>{children}</div>
    </main>
  )
}
