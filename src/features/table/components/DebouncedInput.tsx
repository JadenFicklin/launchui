import { useState, useEffect, useRef } from 'react'
import type { InputProps } from '~/components/Input'
import { Input } from '~/components/Input'
import { useDebounce } from '~/hooks/useDebounce'

type DebouncedInputProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputProps, 'onChange'>

export const DebouncedInput: React.FC<DebouncedInputProps> = (props) => {
  const { value: initialValue, onChange, debounce = 500, ...rest } = props
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce<string | number>(value, debounce)
  const hasUserInteracted = useRef(false)

  useEffect(() => {
    if (hasUserInteracted.current) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    hasUserInteracted.current = true
  }

  useEffect(() => {
    hasUserInteracted.current = false
    setValue(initialValue)
  }, [initialValue])

  return <Input {...rest} value={value} onChange={handleChange} />
}
