/** Menyediakan fungsi penulisan tanggal dan rentang waktu sesuai bahasa pengguna. */

import type { Locale } from '@/types/portfolio'

const intlLocale: Record<Locale, string> = { en: 'en-GB', id: 'id-ID' }

/** Mengubah tanggal berformat tahun dan bulan menjadi nama bulan singkat sesuai bahasa aktif. */
export function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split('-').map(Number)
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

// Tanggal akhir yang kosong diganti dengan keterangan bahwa kegiatan masih berlangsung.
export function formatRange(start: string, end: string | null, locale: Locale, presentLabel: string) {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : presentLabel}`
}

export function yearOf(value: string) {
  return value.slice(0, 4)
}
