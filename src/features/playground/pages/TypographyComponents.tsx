import { Markdown } from '~/components/Markdown'
import { useLoadMarkdown } from '~/hooks/useLoadMarkdown'

export const TypographyComponents: React.FC = () => {
  const exampleMarkdown = useLoadMarkdown('example-markdown.md')

  return (
    <div className='mb-16 flex flex-col items-start gap-12'>
      <h2 className='text-3xl'>Typography</h2>
      <Markdown renderHTML={true}>{exampleMarkdown}</Markdown>
    </div>
  )
}
