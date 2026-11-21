/** Menggambar penanda pemuatan berbentuk bulan dan bintang. */

import { cn } from '@/lib/cn'

/** Menampilkan bulan kecil dan bintang yang mengorbit sebagai penanda proses sedang berlangsung. */
export function OrbitLoader({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ width: size, height: size }} aria-hidden="true">
      <span className="absolute inset-[30%] rounded-full bg-current opacity-80" />
      <span className="absolute inset-0 rounded-full border border-current opacity-25" />
      <span className="animate-orbit absolute inset-0">
        <span className="absolute -top-px left-1/2 size-[22%] -translate-x-1/2 rounded-full bg-current" />
      </span>
    </span>
  )
}
