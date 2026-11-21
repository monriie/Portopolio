/** Menyediakan bentuk bintang SVG yang dapat digunakan kembali pada ilustrasi. */

import type { CSSProperties } from 'react'

/** Menggambar bintang berujung empat yang digunakan pada ilustrasi. */
export function SparklePath({
  x,
  y,
  r,
  fill = '#f7f5f0',
  className,
  style,
}: {
  x: number
  y: number
  r: number
  fill?: string
  className?: string
  style?: CSSProperties
}) {
  const k = r * 0.18
  const d = `M${x} ${y - r}C${x + k} ${y - k} ${x + k} ${y - k} ${x + r} ${y}C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + r}C${x - k} ${y + k} ${x - k} ${y + k} ${x - r} ${y}C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - r}Z`
  return <path d={d} fill={fill} className={className} style={style} />
}
