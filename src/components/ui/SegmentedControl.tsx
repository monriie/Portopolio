'use client'

/** Menyediakan kelompok pilihan yang memperbarui nilai melalui fungsi dari komponen pemanggil. */

import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export type SegmentOption<T extends string> = {
  value: T
  label: ReactNode
  /** Label untuk pembaca layar ketika isi label bukan teks biasa. */
  ariaLabel?: string
}

/**
 * Kelompok tombol pilihan menggunakan aria pressed untuk menyampaikan status aktif. Setiap
 * pilihan dapat dijangkau dengan Tab dan diaktifkan dengan Enter atau spasi.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  className,
}: {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center gap-0.5 rounded-full border border-line bg-white/[0.02] p-1', className)}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors duration-200',
              size === 'sm' ? 'h-11 min-w-11 px-2 text-xs' : 'h-11 min-w-11 px-3 text-[13px]',
              active ? 'bg-warm/[0.1] text-warm shadow-[inset_0_0_0_1px_rgb(247_245_240_/_0.14)]' : 'text-mist hover:text-warm',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
