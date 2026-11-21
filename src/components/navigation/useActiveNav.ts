'use client'

/** Membandingkan alamat halaman aktif dengan alamat menu untuk menentukan penanda navigasi. */

import { usePathname } from 'next/navigation'

export function useIsActive() {
  const pathname = usePathname()
  return (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))
}
