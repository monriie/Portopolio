'use client'

/** Menampilkan email, lokasi, dan media sosial serta menyediakan tindakan menyalin alamat email. */

import { IconButton } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { useToast } from '@/components/ui/toast-context'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'

export function ContactInfo() {
  const { t } = useI18n()
  const { toast } = useToast()
  const email = profile.email

  const copy = async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
      toast(t.contact.copied)
    } catch {
      // Jika izin menyalin tidak tersedia, buka aplikasi email sebagai pilihan pengganti.
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="flex flex-col gap-2.5 sm:gap-5 lg:gap-6">
      <dl className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
        {email && <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-mist">
            <Icon name="mail" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <dt className="text-xs text-dim">{t.contact.email}</dt>
            <dd>
              <a href={`mailto:${email}`} className="block truncate text-[15px] font-medium text-warm underline-offset-4 hover:underline">
                {email}
              </a>
            </dd>
          </div>
          <IconButton icon="copy" label={t.contact.copy} onClick={copy} />
        </div>}
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-3 max-sm:hidden">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-mist">
            <Icon name="map-pin" size={18} />
          </span>
          <div>
            <dt className="text-xs text-dim">{t.contact.location}</dt>
            <dd className="text-[15px] font-medium text-warm">{profile.location}</dd>
          </div>
        </div>
      </dl>

      <div>
        <h2 className="text-xs font-medium tracking-wide text-dim uppercase max-sm:sr-only">{t.contact.findMe}</h2>
        <ul className="grid grid-cols-2 gap-2 sm:mt-2.5 lg:grid-cols-1">
          {profile.socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-3 py-2.5 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.04] max-lg:justify-center"
              >
                <Icon name={s.id as IconName} size={18} className="text-mist transition-colors group-hover:text-warm" />
                <span className="text-sm font-medium text-warm max-sm:sr-only">{s.label}</span>
                <span className="flex-1 truncate text-[13px] text-dim max-lg:hidden">{s.handle}</span>
                <Icon name="arrow-up-right" size={15} className="text-dim transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-warm max-lg:hidden" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
