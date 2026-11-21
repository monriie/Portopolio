'use client'

/** Menggabungkan informasi kontak dan formulir pengiriman pesan pada satu halaman. */

import { PageContainer, PageHeading } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'

export function ContactView() {
  const { t } = useI18n()
  return (
    <PageContainer className="justify-center">
      <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16">
        <div className="flex flex-col">
          <Eyebrow>{t.contact.eyebrow}</Eyebrow>
          <PageHeading className="mt-3 max-w-md">{t.contact.title}</PageHeading>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist max-sm:line-clamp-2">{t.contact.intro}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-dim sm:hidden">
            <Icon name="map-pin" size={13} />
            {profile.location}
          </p>
          <div className="mt-4 sm:mt-5 lg:mt-7">
            <ContactInfo />
          </div>
        </div>
        <ContactForm />
      </div>
    </PageContainer>
  )
}
