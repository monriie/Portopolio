'use client'

/** Mengatur urutan pengalaman, pilihan ringkasan, dan pembukaan panel detail sesuai ukuran layar. */

import dynamic from 'next/dynamic'
import { useId, useState } from 'react'
import { PageContainer, PageHeading } from '@/components/layout/PageContainer'
import { useAppState } from '@/components/providers/app-state'
import { Eyebrow } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Icon } from '@/components/ui/Icon'
import { DetailSkeleton } from '@/components/ui/Skeleton'
import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/cn'
import { formatRange, yearOf } from '@/lib/format'
import { ExperiencePreview } from './ExperiencePreview'

// Kode detail dipisahkan dari halaman utama dan menampilkan pengganti sementara saat dimuat.
const ExperienceDetail = dynamic(() => import('./ExperienceDetail'), { loading: () => <DetailSkeleton /> })

export function ExperienceView() {
  const { t, l, locale } = useI18n()
  const { activeExperience, setActiveExperience } = useAppState()
  const [detailIndex, setDetailIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const titleId = useId()

  const openDetail = (index: number) => {
    setActiveExperience(index)
    setDetailIndex(index)
    setOpen(true)
  }
  const detail = detailIndex === null ? null : experiences[detailIndex]
  const active = experiences[activeExperience] ?? experiences[experiences.length - 1]

  return (
    <PageContainer className="gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow className="[@media(max-height:760px)]:hidden">{t.experience.eyebrow}</Eyebrow>
          <PageHeading className="mt-3 [@media(max-height:760px)]:mt-0">{t.experience.title}</PageHeading>
          <p className="mt-2 max-w-xl text-[15px] text-mist [@media(max-height:700px)]:hidden">{t.experience.intro}</p>
        </div>
        <a href={profile.socials[0].href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 text-sm text-mint hover:underline">
          <Icon name="linkedin" size={18} />
          LinkedIn
        </a>
      </header>

      {/* Layar besar menampilkan urutan pengalaman secara mendatar beserta panel ringkasan. */}
      <ol className="relative hidden grid-cols-5 gap-3 before:absolute before:inset-x-0 before:top-10 before:h-px before:bg-line-strong lg:grid">
        {experiences.map((exp, i) => {
          const isActive = i === activeExperience
          const isCurrent = exp.end === null
          return (
            <li key={exp.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-rise">
              <button
                type="button"
                onMouseEnter={() => setActiveExperience(i)}
                onFocus={() => setActiveExperience(i)}
                onClick={() => openDetail(i)}
                aria-haspopup="dialog"
                aria-current={isActive ? 'step' : undefined}
                className="group block w-full rounded-2xl text-left"
              >
                <span className="block h-5 text-xs font-medium text-dim tabular-nums">
                  {exp.end && yearOf(exp.start) === yearOf(exp.end) ? yearOf(exp.start) : `${yearOf(exp.start)} — ${exp.end ? yearOf(exp.end) : t.common.present}`}
                </span>
                <span className="relative mt-2 flex h-6 items-center">
                  <span
                    className={cn(
                      'relative size-3 rounded-full border-2 transition-all duration-300',
                      isActive ? 'scale-125 border-cream bg-cream shadow-[0_0_0_5px_rgb(243_233_215_/_0.12)]' : 'border-mist/60 bg-night group-hover:border-cream',
                      isCurrent && !isActive && 'border-mint',
                    )}
                  >
                    {isCurrent && <span className="absolute -inset-1 animate-ping rounded-full border border-mint/50 [animation-duration:2.8s]" />}
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-3 block rounded-2xl border p-3.5 transition-all duration-300',
                    isActive
                      ? 'border-line-strong bg-surface-2/80 shadow-[0_12px_40px_-20px_rgb(0_0_0_/_0.8)]'
                      : 'border-line bg-surface/40 group-hover:border-line-strong',
                  )}
                >
                  <span className="block text-sm font-semibold leading-snug text-warm">{l(exp.role)}</span>
                  {exp.company && <span className="mt-1 block text-xs leading-snug text-mist">{exp.company}</span>}
                  <span className="mt-2.5 flex items-center justify-between">
                    <span className={cn('text-xs font-medium', isCurrent ? 'text-mint' : 'text-dim')}>{l(exp.stage)}</span>
                    <Icon name="arrow-up-right" size={14} className="text-dim transition-colors group-hover:text-warm" />
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="hidden min-h-[220px] flex-1 lg:flex">
        <ExperiencePreview experience={active} onOpen={() => openDetail(activeExperience)} />
      </div>

      {/* Ponsel dan tablet menampilkan pengalaman secara vertikal dari yang terbaru. */}
      <ol className="relative flex flex-col gap-2.5 pl-6 before:absolute before:top-3 before:bottom-3 before:left-[5px] before:w-px before:bg-line-strong lg:hidden">
        {experiences
          .map((exp, i) => ({ exp, i }))
          .reverse()
          .map(({ exp, i }, order) => {
            const isCurrent = exp.end === null
            return (
              <li key={exp.id} className="animate-rise relative" style={{ animationDelay: `${order * 50}ms` }}>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-5 -left-6 size-[11px] rounded-full border-2',
                    isCurrent ? 'border-mint bg-mint/30' : 'border-mist/60 bg-night',
                  )}
                />
                <button
                  type="button"
                  onClick={() => openDetail(i)}
                  aria-haspopup="dialog"
                  className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface/50 p-3.5 text-left transition-colors active:bg-surface-2 sm:p-4"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-dim tabular-nums">
                      {formatRange(exp.start, exp.end, locale, t.common.present)}
                    </span>
                    <span className="mt-1 block text-[15px] font-semibold text-warm">{l(exp.role)}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-mist">
                      {exp.company && <span>{exp.company}</span>}
                      <span className={cn('text-xs font-medium', isCurrent ? 'text-mint' : 'text-dim')}>{l(exp.stage)}</span>
                    </span>
                  </span>
                  <Icon name="chevron-right" size={18} className="shrink-0 text-dim" />
                </button>
              </li>
            )
          })}
      </ol>

      <Drawer open={open} onClose={() => setOpen(false)} label={detail ? l(detail.role) : t.experience.title}>
        {detail && detailIndex !== null && (
          <ExperienceDetail
            experience={detail}
            titleId={titleId}
            onClose={() => setOpen(false)}
            onPrevious={detailIndex > 0 ? () => openDetail(detailIndex - 1) : undefined}
            onNext={detailIndex < experiences.length - 1 ? () => openDetail(detailIndex + 1) : undefined}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}
