'use client'

/** Menampilkan notifikasi singkat dan menghilangkannya secara otomatis setelah waktu yang ditentukan. */

import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Icon } from './Icon'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [key, setKey] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const toast = useCallback((next: string) => {
    clearTimeout(timer.current)
    setMessage(next)
    setKey((k) => k + 1)
    timer.current = setTimeout(() => setMessage(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {message && (
          <div
            key={key}
            className="animate-pop flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2/95 py-2.5 pr-4 pl-3 text-sm text-warm shadow-[0_12px_40px_-12px_rgb(0_0_0_/_0.7)] backdrop-blur"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-mint/15 text-mint">
              <Icon name="check" size={12} strokeWidth={2.5} />
            </span>
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

