import dynamic from 'next/dynamic'
import { memo } from 'react'
const GridLoader = dynamic(() => import('react-spinners/GridLoader'), {
  ssr: false,
})

type LoadingProps = {
  color?: string
  size?: number
  loading?: boolean
  speedMultiplier?: number
  margin?: number
  className?: string
}

const LoadingContent: React.FC<LoadingProps> = (props) => {
  const { ...rest } = props
  return <GridLoader color='currentColor' {...rest} />
}

const memoizedLoading = memo(LoadingContent)

export const Loading = memoizedLoading
