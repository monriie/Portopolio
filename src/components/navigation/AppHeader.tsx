'use client'

/** Menjaga navigasi dan pemilih bahasa tetap tersedia ketika halaman berubah. */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { RabbitMark } from '@/components/brand/RabbitMark'
import { IconButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { NAV_ITEMS } from '@/constants/navigation'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/cn'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useIsActive } from './useActiveNav'

function Navigation({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { t } = useI18n()
  const isActive = useIsActive()

  return (
    <nav aria-label={t.meta.primaryNav}>
      <ul className={cn('flex gap-1', mobile && 'flex-col')}>
        {NAV_ITEMS.map(({ href, key, icon }) => {
          const active = isActive(href)
          return (
            <li key={href}>
              <Link
                href={href}
                scroll={false}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors lg:px-3.5',
                  active ? 'bg-mint/12 text-mint' : 'text-mist hover:bg-white/5 hover:text-warm',
                )}
              >
                {mobile && <Icon name={icon} size={18} />}
                {t.nav[key]}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function AppHeader() {
  const { t } = useI18n()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const sheet = useRef<HTMLDialogElement>(null)

  // Dialog bawaan membatasi fokus dan mendukung Escape ketika menu ponsel terbuka.
  useEffect(() => {
    const dialog = sheet.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <header className="relative z-20 shrink-0 border-b border-line bg-night/85 backdrop-blur-sm">
        <div className="mx-auto flex min-h-14 max-w-[1560px] items-center gap-2 px-3 md:min-h-16 md:gap-3 md:px-5 lg:gap-6 lg:px-8">
          <IconButton
            icon="menu"
            label={t.nav.menu}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="border-transparent md:hidden"
          />
          <Link href="/" scroll={false} className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg" aria-label={`${profile.name} — ${t.nav.home}`}>
            <RabbitMark size={34} className="shrink-0" />
            <span className="truncate text-sm font-semibold text-warm">{profile.name}</span>
          </Link>
          <LanguageSwitcher />
          <div className="hidden md:block"><Navigation /></div>
        </div>
      </header>

      <dialog
        ref={sheet}
        aria-label={t.meta.primaryNav}
        onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false) }}
        className="sheet-left fixed inset-0 right-auto m-0 h-dvh max-h-none w-[min(296px,84vw)] max-w-none overflow-y-auto border-r border-line bg-night p-4 text-warm"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-semibold"><RabbitMark size={30} />{profile.name}</span>
          <IconButton icon="x" label={t.nav.closeMenu} onClick={() => setOpen(false)} />
        </div>
        <Navigation mobile onNavigate={() => setOpen(false)} />
      </dialog>
    </>
  )
}
