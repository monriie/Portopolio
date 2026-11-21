'use client'

/** Menyelaraskan keadaan panel React dengan dialog bawaan peramban. */

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Panel detail muncul di samping pada komputer dan memenuhi layar pada ponsel. Elemen dialog
 * bawaan peramban menangani pembatasan fokus, tombol Escape, dan pengembalian fokus setelah
 * ditutup.
 */
export function Drawer({
  open,
  onClose,
  labelledBy,
  label,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  labelledBy?: string
  label?: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        // Klik pada latar dialog diterima oleh elemen dialog itu sendiri.
        if (event.target === event.currentTarget) onClose()
      }}
      className={cn(
        'drawer fixed inset-0 m-0 outline-none focus-visible:outline-none h-dvh max-h-none w-full max-w-none overflow-hidden bg-night p-0 text-warm md:left-auto md:w-[min(640px,92vw)] md:border-l md:border-line md:shadow-[-30px_0_80px_-20px_rgb(0_0_0_/_0.6)]',
        className,
      )}
    >
      {children}
    </dialog>
  )
}
