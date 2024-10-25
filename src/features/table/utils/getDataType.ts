type GetDataType = (
  variable: unknown,
) => 'string' | 'number' | 'boolean' | 'date' | 'other'

export const getDataType: GetDataType = (variable: unknown) => {
  if (typeof variable === 'string') return 'string'
  if (typeof variable === 'number') return 'number'
  if (typeof variable === 'boolean') return 'boolean'
  if (variable instanceof Date && !isNaN(variable.valueOf())) return 'date'

  return 'other'
}
