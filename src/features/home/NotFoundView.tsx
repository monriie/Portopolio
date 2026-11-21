'use client'

/** Menampilkan pesan ketika halaman tidak ditemukan dan menyediakan jalan kembali ke portfolio. */

import { RabbitMark } from '@/components/brand/RabbitMark'
import { PageContainer } from '@/components/layout/PageContainer'
import { ButtonLink } from '@/components/ui/Button'
import { useI18n } from '@/i18n/context'

export function NotFoundView() {
  const { t } = useI18n()
  return (
    <PageContainer className="items-center justify-center text-center">
      <RabbitMark size={88} className="animate-float" />
      <p className="mt-6 text-xs font-medium tracking-[0.2em] text-dim">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-warm">{t.notFound.title}</h1>
      <p className="mt-3 max-w-sm text-[15px] text-mist">{t.notFound.body}</p>
      <ButtonLink href="/" icon="home" iconPosition="start" className="mt-6">
        {t.notFound.back}
      </ButtonLink>
    </PageContainer>
  )
}
