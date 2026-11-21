/** Menyediakan kolom masukan satu baris dan beberapa baris beserta label serta pesan kesalahan. */

import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/* Kolom menggunakan garis bawah yang memanjang saat menerima fokus. */
const control =
  'peer w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 pt-1.5 pb-2.5 text-[16px] text-warm outline-none transition-colors duration-200 placeholder:text-dim/80 hover:border-warm/30 focus:border-transparent focus-visible:outline-none disabled:opacity-60 aria-[invalid=true]:border-lantern/50 [&:-webkit-autofill]:[-webkit-text-fill-color:#f7f5f0] [&:-webkit-autofill]:[transition:background-color_99999s]'

type FieldProps = {
  id: string
  label: string
  error?: string
}

function FieldShell({ id, label, error, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-dim uppercase">
        {label}
      </label>
      <div className="relative">
        {children}
        {/* Garis penanda fokus memanjang dari sisi kiri kolom. */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left rounded-full transition-transform duration-300 ease-[var(--ease-soft)]',
            error ? 'scale-x-100 bg-lantern/80' : 'scale-x-0 bg-mint peer-focus:scale-x-100',
          )}
        />
      </div>
      {/* Menyediakan ruang pesan kesalahan agar susunan formulir tidak bergeser saat validasi. */}
      <p id={`${id}-error`} className="mt-1.5 flex min-h-4 items-center gap-1 text-xs text-[#f09a9a]" aria-live="polite">
        {error && (
          <>
            <Icon name="alert" size={12} />
            {error}
          </>
        )}
      </p>
    </div>
  )
}

export function TextField({ id, label, error, className, ...props }: FieldProps & ComponentProps<'input'>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-error`}
        className={cn(control, 'h-11', className)}
        {...props}
      />
    </FieldShell>
  )
}

export function TextArea({ id, label, error, className, ...props }: FieldProps & ComponentProps<'textarea'>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-error`}
        className={cn(control, 'block min-h-20 resize-none leading-relaxed [field-sizing:content] max-h-48', className)}
        {...props}
      />
    </FieldShell>
  )
}
