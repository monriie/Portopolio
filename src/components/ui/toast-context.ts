'use client'

/** Menyediakan fungsi untuk meminta notifikasi singkat dari komponen di dalam penyedia notifikasi. */

import { createContext, useContext } from 'react'

export type ToastContextValue = { toast: (message: string) => void }

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
