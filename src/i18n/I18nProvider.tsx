'use client'

/** Menyediakan pilihan bahasa dan kamus terjemahan untuk seluruh halaman serta menyimpan pilihan di peramban. */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nContextValue } from './context'
import { dictionaries } from './dictionaries'
import type { Locale } from '@/types/portfolio'

const STORAGE_KEY = 'portfolio-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  // Memulihkan pilihan bahasa setelah halaman aktif di peramban. Tampilan awal dari server menggunakan bahasa Inggris.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'id') setLocaleState(stored)
  }, [])

  // Bahasa dokumen diselaraskan agar pembaca layar mengenali bahasa yang sedang digunakan.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Menyimpan pilihan agar bahasa yang sama dipakai ketika halaman dibuka kembali.
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      l: (v) => v[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
