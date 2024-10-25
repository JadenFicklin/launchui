import type { PluggableList } from 'node_modules/react-markdown/lib'
import { ExternalLink } from '~/components/ExternalLink'
import { cn } from '~/utils/cn'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'

type MarkdownProps = {
  children: string
  renderHTML?: boolean
  className?: string
}

export const Markdown: React.FC<MarkdownProps> = (props) => {
  const { children, renderHTML, className } = props

  const markdownClasses = cn('prose prose-lg dark:prose-invert', className)

  const rehypePlugins = renderHTML
    ? [rehypeRaw as unknown as PluggableList[0]]
    : []

  return (
    <ReactMarkdown
      className={markdownClasses}
      remarkPlugins={[gfm]}
      rehypePlugins={rehypePlugins}
      components={{
        a({ children, ...rest }) {
          return <ExternalLink {...rest}>{children}</ExternalLink>
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
