'use client'

/** Menghubungkan perubahan kondisi layar dengan pembaruan tampilan React. */

import { useSyncExternalStore } from 'react'

/**
 * Memantau kecocokan ukuran layar dengan kueri CSS. Server menggunakan nilai fallback sebelum
 * peramban tersedia.
 */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}
