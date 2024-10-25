import { useCallback, useEffect, useState } from 'react'

type RawLoaderOutput = {
  default: string
}

const importMarkdown = async (path: string): Promise<string> => {
  const markdown = (await import(
    `!!raw-loader!~/assets/markdowns/${path}`
  )) as RawLoaderOutput
  return markdown.default
}

export const useLoadMarkdown = (path: string) => {
  const [markdownContent, setMarkdownContent] = useState('')

  const loadMarkdown = useCallback(async () => {
    try {
      const content = await importMarkdown(path)
      setMarkdownContent(content)
    } catch (error) {
      console.error('Error loading markdown:', error)
    }
  }, [path])

  useEffect(() => {
    void loadMarkdown()
  }, [loadMarkdown])

  return markdownContent
}
