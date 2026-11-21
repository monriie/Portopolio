/** Menyimpan daftar menu, alamat halaman, dan ikon yang digunakan bersama oleh navigasi. */

import type { IconName } from '@/components/ui/Icon'
import type { Dictionary } from '@/i18n/dictionaries'

export type NavItem = {
  href: string
  key: keyof Dictionary['nav']
  icon: IconName
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', key: 'home', icon: 'home' },
  { href: '/about', key: 'about', icon: 'user' },
  { href: '/experience', key: 'experience', icon: 'briefcase' },
  { href: '/projects', key: 'projects', icon: 'grid' },
  { href: '/contact', key: 'contact', icon: 'mail' },
]
