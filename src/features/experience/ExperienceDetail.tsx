'use client'

/** Menyusun jabatan, tanggung jawab, hasil, galeri, keterampilan, dan tautan pendukung pengalaman. */

import { ResourceLink } from '@/components/shared/ResourceLink'
import { SkillBadge } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/Button'
import { Gallery } from '@/components/ui/Gallery'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/i18n/context'
import { formatRange } from '@/lib/format'
import type { Experience } from '@/types/portfolio'

/** Menampilkan seluruh informasi pengalaman dalam panel detail yang kodenya dimuat terpisah. */
export default function ExperienceDetail({
  experience,
  titleId,
  onClose,
  onPrevious,
  onNext,
}: {
  experience: Experience
  titleId: string
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
}) {
  const { t, l, locale } = useI18n()
  const isCurrent = experience.end === null

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <p className="text-xs font-medium tracking-[0.14em] text-dim uppercase">{t.experience.eyebrow}</p>
        <div className="flex items-center gap-2">
          <IconButton icon="chevron-left" label={t.common.previous} onClick={onPrevious} disabled={!onPrevious} />
          <IconButton icon="chevron-right" label={t.common.next} onClick={onNext} disabled={!onNext} />
          <IconButton icon="x" label={t.common.close} onClick={onClose} />
        </div>
      </div>

      <div key={experience.id} className="animate-rise flex-1 overflow-y-auto overscroll-contain px-4 pt-6 pb-10 md:px-8">
        <header>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-mist">
            {isCurrent && <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />}
            {l(experience.stage)}
          </p>
          <h2 id={titleId} className="mt-3 text-2xl font-semibold tracking-tight text-warm md:text-[28px]">
            {l(experience.role)}
          </h2>
          {experience.company && <p className="mt-1 text-base text-cream/90">{experience.company}</p>}
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-mist">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">{t.experience.period}</dt>
              <Icon name="clock" size={14} className="text-dim" />
              <dd>{formatRange(experience.start, experience.end, locale, t.common.present)}</dd>
            </div>
            {experience.employmentType && <div className="flex items-center gap-1.5">
              <dt className="sr-only">{t.experience.employmentType}</dt>
              <Icon name="briefcase" size={14} className="text-dim" />
              <dd>{l(experience.employmentType)}</dd>
            </div>}
            {experience.location && <div className="flex items-center gap-1.5">
              <dt className="sr-only">{t.contact.location}</dt>
              <Icon name="map-pin" size={14} className="text-dim" />
              <dd>{experience.location}</dd>
            </div>}
          </dl>
          <p className="mt-4 text-[15px] leading-relaxed text-mist">{l(experience.summary)}</p>
        </header>

        {experience.highlights.length > 0 && <section aria-label={t.experience.impact} className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {experience.highlights.map((m) => (
            <div key={m.value} className="rounded-2xl border border-line bg-white/[0.02] p-3.5">
              <p className="text-xl font-semibold tracking-tight text-warm tabular-nums">{m.value}</p>
              <p className="mt-0.5 text-xs text-dim">{l(m.label)}</p>
            </div>
          ))}
        </section>}

        <section className="mt-8">
          <h3 className="text-sm font-semibold text-warm">{t.experience.responsibilities}</h3>
          <ul className="mt-3 space-y-2.5">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-mist">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-mint/12 text-mint">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
                {l(item)}
              </li>
            ))}
          </ul>
        </section>

        {experience.gallery.length > 0 && (
          <section className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-warm">{t.experience.gallery}</h3>
            <Gallery
              items={experience.gallery.map((g) => ({ src: g.src, alt: l(g.alt), credit: g.credit }))}
              labels={{ previous: t.common.previous, next: t.common.next }}
            />
          </section>
        )}

        <section className="mt-8">
          <h3 className="text-sm font-semibold text-warm">{t.experience.skillsLearned}</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {[
              { title: t.experience.techStack, items: experience.techStack },
              { title: t.experience.hardSkills, items: experience.hardSkills.map(l) },
              { title: t.experience.softSkills, items: experience.softSkills.map(l) },
            ].filter((group) => group.items.length > 0).map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-medium tracking-wide text-dim uppercase">{group.title}</h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <SkillBadge>{item}</SkillBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {experience.resources.length > 0 && (
          <section className="mt-8">
            <h3 className="text-sm font-semibold text-warm">{t.experience.resources}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {experience.resources.map((r) => (
                <li key={r.href + r.kind}>
                  <ResourceLink kind={r.kind} label={l(r.label)} href={r.href} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
