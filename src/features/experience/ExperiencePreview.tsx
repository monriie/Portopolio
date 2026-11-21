'use client'

/** Menyusun ringkasan pengalaman aktif beserta foto dan tombol pembuka detail. */

import { SkillBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/context'
import { formatRange } from '@/lib/format'
import type { Experience } from '@/types/portfolio'
import { PhotoMarquee } from './PhotoMarquee'

/** Panel pada layar besar menampilkan ringkasan pengalaman yang dipilih atau ditunjuk. */
export function ExperiencePreview({ experience, onOpen }: { experience: Experience; onOpen: () => void }) {
  const { t, l, locale } = useI18n()
  const isCurrent = experience.end === null
  const location = [experience.company, experience.employmentType && l(experience.employmentType), experience.location]
    .filter(Boolean)
    .join(' · ')
  const skills = experience.techStack.length ? experience.techStack : experience.hardSkills.map(l)

  return (
    <section
      aria-live="polite"
      aria-label={l(experience.role)}
      className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/55 p-6 backdrop-blur-sm xl:p-7"
    >
      <div key={`l-${experience.id}`} className="animate-rise flex min-h-0 flex-col">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-mist">
          {isCurrent && <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />}
          {l(experience.stage)} · {formatRange(experience.start, experience.end, locale, t.common.present)}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-warm">{l(experience.role)}</h2>
        {location && <p className="mt-1 text-sm text-cream/85">{location}</p>}
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-mist">{l(experience.summary)}</p>
        <ul className="mt-4 space-y-2 [@media(max-height:820px)]:hidden">
          {experience.responsibilities.slice(0, 2).map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-mist">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-mint" aria-hidden="true" />
              <span className="line-clamp-2">{l(item)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-5">
          <Button icon="arrow-right" onClick={onOpen} aria-haspopup="dialog">
            {t.experience.openDetails}
          </Button>
        </div>
      </div>

      <div key={`r-${experience.id}`} className="animate-rise flex min-h-0 flex-col gap-4 [animation-delay:60ms]">
        {experience.highlights.length > 0 && <dl className="flex flex-wrap gap-2">
          {experience.highlights.slice(0, 3).map((m) => (
            <div key={m.value} className="flex flex-col-reverse rounded-xl border border-line bg-white/[0.02] px-3 py-2.5">
              <dt className="mt-0.5 text-[11px] leading-tight text-dim">{l(m.label)}</dt>
              <dd className="text-lg font-semibold tracking-tight text-warm tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>}
        {skills.length > 0 && <div>
          <p className="text-xs font-medium tracking-wide text-dim uppercase">{experience.techStack.length ? t.experience.techStack : t.experience.hardSkills}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <li key={s}>
                <SkillBadge>{s}</SkillBadge>
              </li>
            ))}
          </ul>
        </div>}
        <PhotoMarquee images={experience.gallery} onOpen={onOpen} label={`${t.experience.gallery} — ${l(experience.role)}`} />
      </div>
    </section>
  )
}
