'use client'

/** Menampilkan waktu sesuai zona waktu profil dan memperbaruinya setiap tiga puluh detik. */

import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'

export function LocalTime() {
  // Nilai awal kosong menjaga tampilan server dan peramban sama sebelum jam dihitung.
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const format = () =>
      setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timeZone }).format(new Date()))
    format()
    const id = setInterval(format, 30_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time ?? '--:--'}</span>
}
