'use client'

/** Menyediakan tombol penggantian bahasa dengan pilihan tampilan biasa atau ringkas. */

import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useI18n } from '@/i18n/context'
import type { Locale } from '@/types/portfolio'

const NAMES: Record<Locale, string> = { en: 'English', id: 'Bahasa Indonesia' }

/** Mengganti bahasa Inggris dan Indonesia melalui tombol teks. */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()
  return (
    <SegmentedControl<Locale>
      size="sm"
      label={t.meta.language}
      value={locale}
      onChange={setLocale}
      options={[
        { value: 'en', label: 'EN', ariaLabel: NAMES.en },
        { value: 'id', label: 'ID', ariaLabel: NAMES.id },
      ]}
    />
  )
}
