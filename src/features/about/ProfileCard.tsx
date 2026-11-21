'use client'

/** Menampilkan identitas, foto atau maskot pengganti, serta tautan profil. */

import Image from 'next/image'
import { RabbitMark } from '@/components/brand/RabbitMark'
import { CloudOrnament } from '@/components/brand/CloudOrnament'
import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'

export function ProfileCard() {
  const { t, l } = useI18n()
  return (
    <aside className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/60 p-3 backdrop-blur-sm max-lg:flex-row max-lg:items-center max-lg:gap-4">
      <div className="relative aspect-square shrink-0 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_38%,#1d2742_0%,#121829_70%)] max-lg:size-24 sm:max-lg:size-28 lg:aspect-[5/4] lg:max-h-[30dvh] lg:w-full">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={`${t.about.photoAlt} ${profile.name}`}
            fill
            sizes="(min-width: 1024px) 320px, 112px"
            className="object-cover"
          />
        ) : (
          // Menampilkan maskot ketika foto belum diisi pada data profil.
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="absolute size-[62%] rounded-full bg-cream/[0.06]" />
            <RabbitMark className="relative size-[54%]" />
            <CloudOrnament width={90} className="absolute bottom-[8%] left-[6%] opacity-25 max-lg:hidden" />
          </div>
        )}
        {/* Aksen cahaya di dekat foto profil. */}
        <span aria-hidden="true" className="absolute top-0 right-5 flex flex-col items-center max-lg:hidden">
          <span className="h-5 w-px bg-gold/50" />
          <span className="h-4 w-3 rounded-[40%] bg-lantern/80 shadow-[0_0_14px_rgb(217_95_95_/_0.5)]" />
          <span className="h-1.5 w-px bg-gold/60" />
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-1 lg:mt-4 lg:px-2 lg:pb-2">
        <div className="flex items-center gap-2">
          <p className="truncate text-base font-semibold text-warm lg:text-lg">{profile.name}</p>
          <RabbitMark size={20} className="opacity-90 max-lg:hidden" />
        </div>
        <p className="text-[13px] leading-snug text-mist">{l(profile.headline)}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-dim">
          <Icon name="map-pin" size={13} />
          {t.about.location} {profile.location}
        </p>
      </div>
    </aside>
  )
}
