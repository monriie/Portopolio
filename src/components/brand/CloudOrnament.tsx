/** Menggambar ornamen awan xiangyun menggunakan garis sederhana. */
export function CloudPaths({ stroke = '#f3e9d7', strokeWidth = 2 }: { stroke?: string; strokeWidth?: number }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 40C40 40 34 14 56 12c16-1 20 18 7 19-8 1-8-9-2-9" />
      <path d="M60 40H22c-12 0-12-16 0-16 8 0 8 9 2 9" />
      <path d="M60 40h38c12 0 14-14 2-15-8 0-8 8-2 8" />
      <path d="M98 40h18M4 40h18" />
    </g>
  )
}

export function CloudOrnament({ className, stroke, width = 120 }: { className?: string; stroke?: string; width?: number }) {
  return (
    <svg viewBox="0 0 120 50" width={width} height={(width * 50) / 120} className={className} aria-hidden="true">
      <CloudPaths stroke={stroke} />
    </svg>
  )
}
