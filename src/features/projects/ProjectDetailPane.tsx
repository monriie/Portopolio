'use client'

/** Menyusun detail proyek untuk panel desktop dan dialog ponsel. */

import { RESOURCE_ICONS } from '@/components/shared/resource-icons'
import { CategoryChip, SkillBadge } from '@/components/ui/Badge'
import { ButtonLink, IconButton } from '@/components/ui/Button'
import { CATEGORY_META } from '@/constants/categories'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/cn'
import type { Project } from '@/types/portfolio'
import { ProjectCover, ProjectLogo } from './ProjectCover'

/** Menampilkan studi kasus dalam panel yang digulir terpisah dari daftar kartu. */
export function ProjectDetailPane({
  project,
  onBack,
}: {
  project: Project
  onBack?: () => void
}) {
  const { t, l } = useI18n()
  const meta = CATEGORY_META[project.category]
  const [primary, ...secondary] = project.links

  const story = [
    { key: 'challenge', title: t.projects.challenge, body: l(project.challenge), dot: 'bg-peach' },
    { key: 'solution', title: t.projects.solution, body: l(project.solution), dot: 'bg-dusty' },
    { key: 'impact', title: t.projects.impact, body: l(project.impact), dot: 'bg-mint' },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-line bg-night/70 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 flex-[1_1_12rem] items-center gap-3">
          {onBack && <IconButton icon="arrow-left" label={t.projects.back} onClick={onBack} />}
          <ProjectLogo project={project} size="lg" />
          <div className="min-w-0">
            <h2 id="project-title" className="text-lg leading-snug font-semibold text-warm sm:text-xl">
              {project.title}
            </h2>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-mist">
              <CategoryChip category={project.category} />
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{project.year}</span>
            </p>
          </div>
        </div>
        {primary && <ButtonLink href={primary.href} icon="arrow-up-right">{t.projects.viewProject}</ButtonLink>}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-[760px] px-4 pt-5 pb-8 lg:px-7">
          <p className="text-base leading-relaxed text-cream">{l(project.tagline)}</p>
          <p className="mt-1 text-sm text-mist">{t.projects.role}: {l(project.role)}</p>
          <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-night">
            <ProjectCover project={project} alt={project.imageAlt ? l(project.imageAlt) : ''} className="aspect-[16/9]" sizes="(min-width: 1100px) 710px, (min-width: 768px) 60vw, 100vw" />
          </figure>
          {secondary.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {secondary.map((link) => (
                <ButtonLink key={link.href + link.kind} href={link.href} variant="secondary" size="sm" icon={RESOURCE_ICONS[link.kind]} iconPosition="start">
                  {l(link.label)}
                </ButtonLink>
              ))}
            </div>
          )}

          {project.metrics.length > 0 && <dl aria-label={t.projects.impact} className="mt-6 flex flex-wrap gap-2.5">
            {project.metrics.map((m) => (
              <div key={m.label.en} className="flex flex-1 basis-28 flex-col-reverse rounded-2xl border border-line bg-white/[0.02] p-3 sm:p-3.5">
                <dt className="mt-0.5 text-[11px] leading-tight text-dim sm:text-xs">{l(m.label)}</dt>
                <dd className="text-[15px] font-semibold tracking-tight text-warm tabular-nums sm:text-lg">{m.value}</dd>
              </div>
            ))}
          </dl>}

          <section className="mt-8 space-y-5">
            {story.map((s) => (
              <div key={s.key} className="grid gap-1.5 sm:grid-cols-[120px_1fr] sm:gap-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-warm">
                  <span className={cn('size-1.5 rounded-full', s.dot)} aria-hidden="true" />
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </section>

          {project.facts.length > 0 && (
            <section className="mt-8">
              <h3 className="text-sm font-semibold text-warm">{t.projects.details}</h3>
              <dl className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {project.facts.map((f) => (
                  <div key={f.label.en} className="grid grid-cols-[minmax(110px,38%)_1fr] gap-3 px-4 py-3 text-sm">
                    <dt className="text-dim">{l(f.label)}</dt>
                    <dd className={cn('text-warm', (f.label.en === 'Result' || f.label.en === 'Outcome') && meta.text)}>{l(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-8">
            <h3 className="text-sm font-semibold text-warm">{t.projects.technology}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <SkillBadge>{tech}</SkillBadge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
