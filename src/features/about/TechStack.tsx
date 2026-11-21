'use client'

/** Menampilkan teknologi yang tercatat di proyek, profil GitHub, dan pengalaman. */

import { TECH_LOGOS } from '@/data/tech-logos'
import { useI18n } from '@/i18n/context'
import type { SkillGroup } from '@/types/portfolio'

const groups: SkillGroup[] = [
  { id: 'web', label: { en: 'Web development', id: 'Pengembangan web' }, skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'FastAPI'] },
  { id: 'ml', label: { en: 'Data & ML', id: 'Data & ML' }, skills: ['Python', 'Jupyter', 'Sentence Transformers', 'OpenCV', 'NumPy'] },
  { id: 'tools', label: { en: 'Design & tools', id: 'Desain & alat' }, skills: ['Figma', 'Git', 'GitHub', 'Vercel'] },
]

export function TechStack() {
  const { t, l } = useI18n()
  return (
    <section aria-labelledby="stack-title" className="rounded-[var(--radius-card)] border border-line bg-surface/50 p-4 lg:p-5">
      <h2 id="stack-title" className="text-base font-semibold text-warm">{t.about.stackTitle}</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm font-medium text-mist">{l(group.label)}</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.skills.map((name) => {
                const logo = TECH_LOGOS.find((item) => item.name === name)
                return (
                  <li key={name} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[13px] text-warm">
                    {logo && (
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0 fill-current text-cream/75">
                        <path d={logo.path} fillRule={logo.evenOdd ? 'evenodd' : undefined} />
                      </svg>
                    )}
                    {name}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
