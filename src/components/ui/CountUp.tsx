'use client'

/** Menampilkan animasi angka statistik dengan tetap menyediakan nilai utuh bagi pembaca layar. */

import { useEffect, useState } from 'react'

/** Menganimasikan bagian angka pada statistik sambil mempertahankan teks sebelum dan sesudahnya. */
export function CountUp({ value, duration = 1200, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const target = match ? Number(match[2]) : 0
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }
    let raf = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration))
      setCurrent(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, delay])

  if (!match) return <>{value}</>
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {current}
        {match[3]}
      </span>
    </>
  )
}
