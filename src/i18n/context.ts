'use client'

/** Menyediakan akses ke bahasa aktif, kamus antarmuka, dan fungsi pemilihan teks dari data dua bahasa. */

import { createContext, useContext } from 'react'
import type { Dictionary } from './dictionaries'
import type { Locale, Localized } from '@/types/portfolio'

export type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  /** Mengambil teks dari data dua bahasa sesuai bahasa yang sedang aktif. */
  l: (value: Localized) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
