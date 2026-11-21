'use client'

/** Memberi pengguna papan ketik tautan untuk langsung menuju isi utama halaman. */

import { useI18n } from '@/i18n/context'

export function SkipLink() {
  const { t } = useI18n()
  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-[60] -translate-y-[150%] rounded-full bg-cream px-4 py-2 text-sm font-medium text-night transition-transform focus:translate-y-0"
    >
      {t.meta.skip}
    </a>
  )
}
