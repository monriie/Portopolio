'use client'

/** Mengelola masukan formulir, validasi, permintaan ke server, dan tampilan hasil pengiriman pesan. */

import { useRef, useState, type FormEvent } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { TextArea, TextField } from '@/components/ui/FormField'
import { Icon } from '@/components/ui/Icon'
import { OrbitLoader } from '@/components/ui/OrbitLoader'
import { profile } from '@/data/profile'
import { useI18n } from '@/i18n/context'
import { ContactSuccess } from './ContactSuccess'
import {
  CONTACT_LIMITS,
  normalizeContact,
  validateContact,
  type ContactApiResponse,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from './validation'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Failure = 'send_failed' | 'not_configured' | 'rate_limited'

const EMPTY: ContactInput = { name: '', email: '', subject: '', message: '' }
const FIELD_ORDER: ContactField[] = ['name', 'email', 'subject', 'message']

export function ContactForm() {
  const { t } = useI18n()
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [failure, setFailure] = useState<Failure>('send_failed')
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Setelah percobaan kirim pertama, periksa ulang masukan setiap kali berubah agar pesan kesalahan ikut diperbarui.
    if (attempted) setErrors(validateContact(normalizeContact(next)))
  }

  // Fokus diarahkan ke kolom bermasalah pertama agar pengguna dapat langsung memperbaikinya.
  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f])
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
  }

  const submit = async (event?: FormEvent) => {
    event?.preventDefault()
    setAttempted(true)
    const input = normalizeContact(values)
    const errs = validateContact(input)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs)
      return
    }

    // Status pengiriman menonaktifkan isian dan menampilkan penanda pemuatan.
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, company: honeypot.current?.value ?? '' }),
      })
      // Respons yang bukan JSON diperlakukan sebagai kegagalan pengiriman.
      const data = (await res.json().catch(() => null)) as ContactApiResponse | null
      if (data?.ok) {
        setStatus('success')
        return
      }
      if (data && data.error === 'validation') {
        setErrors(data.fields)
        setStatus('idle')
        focusFirstError(data.fields)
        return
      }
      setFailure(data && (data.error === 'not_configured' || data.error === 'rate_limited') ? data.error : 'send_failed')
      setStatus('error')
    } catch {
      setFailure('send_failed')
      setStatus('error')
    }
  }

  // Mengosongkan isian dan status ketika pengguna ingin membuat pesan baru.
  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setAttempted(false)
    setStatus('idle')
  }

  const submitting = status === 'submitting'
  const err = (field: ContactField) => (errors[field] ? t.contact.errors[errors[field]] : undefined)
  const failureBody =
    failure === 'not_configured' ? t.contact.notConfigured : failure === 'rate_limited' ? t.contact.rateLimited : t.contact.failureBody

  return (
    <section
      aria-labelledby="contact-form-title"
      className="relative rounded-[var(--radius-card)] border border-line bg-surface/60 p-4 backdrop-blur-sm sm:p-6 lg:p-7"
    >
      {status === 'success' ? (
        <div key="success" className="min-h-[420px]">
          <ContactSuccess onReset={reset} />
        </div>
      ) : (
        <form ref={formRef} key="form" onSubmit={submit} noValidate aria-busy={submitting} className="animate-rise flex flex-col">
          <h2 id="contact-form-title" className="mb-5 text-base font-semibold text-warm">
            {t.contact.formTitle}
          </h2>
          <fieldset disabled={submitting} className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <TextField
              id="name"
              label={t.contact.name}
              placeholder={t.contact.namePlaceholder}
              autoComplete="name"
              maxLength={CONTACT_LIMITS.name.max}
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              error={err('name')}
              required
            />
            <TextField
              id="email"
              type="email"
              inputMode="email"
              label={t.contact.emailField}
              placeholder={t.contact.emailPlaceholder}
              autoComplete="email"
              maxLength={CONTACT_LIMITS.email.max}
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              error={err('email')}
              required
            />
            <div className="sm:col-span-2">
              <TextField
                id="subject"
                label={t.contact.subject}
                placeholder={t.contact.subjectPlaceholder}
                maxLength={CONTACT_LIMITS.subject.max}
                value={values.subject}
                onChange={(e) => update('subject', e.target.value)}
                error={err('subject')}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <TextArea
                id="message"
                label={t.contact.message}
                placeholder={t.contact.messagePlaceholder}
                rows={4}
                maxLength={CONTACT_LIMITS.message.max}
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                error={err('message')}
                required
              />
            </div>
            {/* Kolom perangkap untuk bot yang disembunyikan dari pengunjung dan pembaca layar. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input ref={honeypot} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </fieldset>

          {status === 'error' && (
            <div role="alert" className="animate-rise mb-4 flex gap-3 rounded-2xl border border-lantern/35 bg-lantern/[0.07] p-3.5">
              <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-[#f09a9a]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-warm">{t.contact.failureTitle}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-mist">{failureBody}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {failure !== 'not_configured' && (
                    <Button type="button" variant="secondary" size="sm" icon="refresh" iconPosition="start" onClick={() => submit()}>
                      {t.contact.retry}
                    </Button>
                  )}
                  <ButtonLink href={profile.socials[0].href} variant="ghost" size="sm" icon="linkedin" iconPosition="start">
                    LinkedIn
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-dim max-sm:text-center">{t.contact.privacy}</p>
            <Button type="submit" disabled={submitting} className="min-w-40" aria-live="polite">
              {submitting ? (
                <>
                  <OrbitLoader size={16} />
                  {t.contact.sending}
                </>
              ) : (
                <>
                  {t.contact.send}
                  <Icon name="send" size={15} />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </section>
  )
}
