import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import clsx from 'clsx'
import { cn } from '~/utils/cn'

type ExternalLinkProps = {
  children?: React.ReactNode
  href?: string
  className?: string
} & Omit<NextLinkProps, 'href'>

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  const { children, href, className, ...rest } = props

  const linkClasses = clsx(
    'focus-visible:ringed inline outline-none focus-visible:rounded-sm',
    className,
  )

  if (!href) return <div className={cn('inline', className)}>{children}</div>

  const isExternalLink =
    href.startsWith('http') ||
    href.startsWith('www.') ||
    href.startsWith('//') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:')

  if (isExternalLink) {
    return (
      <a
        href={href ?? ''}
        {...rest}
        className={linkClasses}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href ?? ''} {...rest} className={linkClasses}>
      {children}
    </NextLink>
  )
}
