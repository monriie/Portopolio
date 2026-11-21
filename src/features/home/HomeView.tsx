'use client'

/** Menyusun halaman pembuka dari data profil, bidang keahlian, statistik, dan ilustrasi maskot. */

import { Fragment } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { ButtonLink } from '@/components/ui/Button'
import { CountUp } from '@/components/ui/CountUp'
import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { useI18n } from '@/i18n/context'
import { HeroScene } from './HeroScene'

const homeStats = [
  { value: String(projects.length), label: { en: 'Selected projects', id: 'Proyek pilihan' } },
  { value: '10+', label: { en: 'Web projects during GDGoC', id: 'Proyek web selama GDGoC' } },
]

export function HomeView() {
  const { t, l } = useI18n()

  return (
    <PageContainer className="justify-center">
      <section
        aria-labelledby="home-title"
        className="grid flex-1 content-center items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8"
      >
        <div className="order-2 flex flex-col items-start lg:order-1">
          <p className="animate-rise mt-4 flex items-center gap-2 text-base text-mist [animation-delay:60ms] lg:mt-6 lg:text-lg">
            {t.home.greeting}
            <Icon name="sparkle" size={14} className="animate-twinkle-pop text-gold" />
          </p>
          <h1
            id="home-title"
            aria-label={profile.name}
            className="text-[clamp(2.25rem,1rem+3.2vw,4.5rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-warm"
          >
            {profile.name.split(' ').map((word, w, words) => (
              <Fragment key={w}>
                <span aria-hidden="true" className="inline-block whitespace-nowrap">
                  {[...word].map((ch, i) => (
                    <span
                      key={i}
                      className="animate-char-in inline-block"
                      style={{ animationDelay: `${(w * 4 + i) * 12}ms` }}
                    >
                      {ch}
                    </span>
                  ))}
                  {w === words.length - 1 && (
                    <span className="animate-char-in inline-block text-gold" style={{ animationDelay: `${profile.name.length * 12}ms` }}>
                      .
                    </span>
                  )}
                </span>
                {w < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <p className="animate-rise mt-3 text-base font-medium text-cream [animation-delay:140ms] lg:mt-4">
            {l(profile.headline)}
          </p>

          <p className="animate-rise mt-4 max-w-[34rem] text-[15px] leading-relaxed text-mist [animation-delay:180ms] lg:mt-5 lg:text-[17px]">
            {t.home.valueProp}
          </p>

          <div className="animate-rise mt-6 flex flex-wrap items-center gap-2.5 [animation-delay:220ms] lg:mt-8">
            <ButtonLink href="/projects" icon="arrow-right">
              {t.home.viewProjects}
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              {t.home.aboutMe}
            </ButtonLink>
            {profile.cvUrl && (
              <ButtonLink href={profile.cvUrl} download variant="ghost" icon="download" iconPosition="start">
                {t.common.downloadCv}
              </ButtonLink>
            )}
          </div>

          <dl
            aria-label={t.home.statsLabel}
            className="animate-rise mt-8 hidden gap-8 border-t border-line pt-5 [animation-delay:260ms] sm:flex lg:mt-10"
          >
            {homeStats.map((stat, i) => (
              <div key={stat.value} className="flex flex-col-reverse gap-0.5">
                <dt className="text-xs text-dim">{l(stat.label)}</dt>
                <dd className=" text-xl font-semibold tracking-tight text-warm tabular-nums lg:text-2xl">
                  <CountUp value={stat.value} delay={500 + i * 120} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroScene className="w-[min(78vw,34dvh,320px)] md:w-[min(60vw,40dvh,380px)] lg:w-[min(100%,74dvh,620px)]" />
        </div>
      </section>
    </PageContainer>
  )
}
