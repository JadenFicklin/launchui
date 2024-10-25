export const getHslValue = (hsl: {
  h: number
  s: number
  l: number
}): string => {
  const h = `${Math.round(hsl.h)}deg`
  const s = `${Math.round(hsl.s * 100)}%`
  const l = `${Math.round(hsl.l * 100)}%`
  const hslValue = `${h} ${s} ${l}`

  return hslValue
}
