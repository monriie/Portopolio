'use client'

/** Menampilkan konfirmasi pengiriman pesan dan tombol untuk mengisi formulir baru. */

import { RabbitMark } from '@/components/brand/RabbitMark'
import { SparklePath } from '@/components/brand/Sparkle'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/i18n/context'

export function ContactSuccess({ onReset }: { onReset: () => void }) {
  const { t } = useI18n()
  return (
    <div role="status" className="flex h-full flex-col items-center justify-center px-4 py-8 text-center">
      <div className="animate-pop relative flex size-36 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-line" aria-hidden="true" />
        <span className="absolute inset-5 rounded-full bg-cream/[0.05]" aria-hidden="true" />
        <span className="animate-orbit absolute inset-0 [animation-duration:9s]" aria-hidden="true">
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_12px_rgb(143_213_196_/_0.8)]" />
        </span>
        <svg viewBox="0 0 144 144" className="pointer-events-none absolute inset-0" aria-hidden="true">
          <SparklePath x={20} y={34} r={6} fill="#d2ae62" className="animate-twinkle" />
          <SparklePath x={126} y={44} r={5} fill="#f7f5f0" className="animate-twinkle" style={{ animationDelay: '0.8s' }} />
          <SparklePath x={118} y={122} r={4} fill="#d2ae62" className="animate-twinkle" style={{ animationDelay: '1.6s' }} />
        </svg>
        <RabbitMark size={72} className="animate-float" />
      </div>
      <h2 className="animate-rise mt-6 flex items-center gap-2 text-xl font-semibold text-warm [animation-delay:120ms]">
        {t.contact.successTitle}
        <Icon name="sparkle" size={16} className="text-gold" />
      </h2>
      <p className="animate-rise mt-2 max-w-sm text-[15px] leading-relaxed text-mist [animation-delay:180ms]">{t.contact.successBody}</p>
      <Button variant="secondary" size="sm" onClick={onReset} className="animate-rise mt-6 [animation-delay:240ms]">
        {t.contact.sendAnother}
      </Button>
    </div>
  )
}
