'use client'

/** Menyusun halaman profil dari biografi, bidang fokus, dan teknologi yang digunakan. */

import { PageContainer, PageHeading } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Badge'
import { CATEGORY_META } from '@/constants/categories'
import { focusAreas, profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/cn'
import { ProfileCard } from './ProfileCard'
import { TechStack } from './TechStack'

export function AboutView() {
  const { t, l } = useI18n()
  return (
    <PageContainer className="gap-4 lg:justify-center lg:gap-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-8 xl:grid-cols-[320px_1fr]">
        <ProfileCard />

        <section aria-labelledby="about-title" className="flex flex-col justify-center">
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <PageHeading id="about-title" className="mt-3">
            {t.about.hello} {profile.name.split(' ')[0]}.
          </PageHeading>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-mist sm:text-[15px] lg:text-base">{l(profile.bio)}</p>

          <h2 className="mt-5 text-xs font-medium tracking-wide text-dim uppercase lg:mt-6">{t.about.focusTitle}</h2>
          <ul className="mt-2.5 grid grid-cols-2 gap-2 xl:grid-cols-4">
            {focusAreas.map((area, i) => {
              const meta = CATEGORY_META[area.category]
              return (
                <li
                  key={area.category}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="animate-rise group rounded-2xl border border-line bg-white/[0.02] p-3 transition-colors duration-200 hover:border-line-strong lg:p-3.5"
                >
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-warm lg:text-sm">
                    <span className={cn('size-1.5 rounded-full', meta.dot)} aria-hidden="true" />
                    {l(area.title)}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-dim max-sm:hidden">{l(area.description)}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <TechStack />
    </PageContainer>
  )
}
