/** Menyeragamkan pembersihan dan pemeriksaan masukan kontak di peramban serta server. */

import type { ContactErrorKey } from '@/i18n/dictionaries'

/** Tipe masukan dipakai bersama oleh formulir dan endpoint kontak. Server tetap melakukan validasi akhir. */
export type ContactField = 'name' | 'email' | 'subject' | 'message'
export type ContactInput = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, ContactErrorKey>>

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 2, max: 120 },
  message: { min: 10, max: 4000 },
  email: { max: 254 },
} as const

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

/** Merapikan spasi dan menghapus karakter kontrol pada kolom satu baris agar tidak menyisipkan header email. */
const singleLine = (value: unknown) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim() : ''

// Isi pesan tetap boleh memiliki baris baru, tetapi karakter kontrol lain dibersihkan.
const multiLine = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim() : ''

// Data yang belum diketahui bentuknya diubah menjadi empat kolom teks yang aman diperiksa.
export function normalizeContact(raw: unknown): ContactInput {
  const source = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    name: singleLine(source.name),
    email: singleLine(source.email).toLowerCase(),
    subject: singleLine(source.subject),
    message: multiLine(source.message),
  }
}

// Mengembalikan kunci pesan kesalahan agar tampilan dapat memilih terjemahannya.
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  const { name, email, subject, message } = input

  if (!name) errors.name = 'nameRequired'
  else if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) errors.name = 'nameLength'

  if (!email) errors.email = 'emailRequired'
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_RE.test(email)) errors.email = 'emailInvalid'

  if (!subject) errors.subject = 'subjectRequired'
  else if (subject.length < CONTACT_LIMITS.subject.min || subject.length > CONTACT_LIMITS.subject.max)
    errors.subject = 'subjectLength'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < CONTACT_LIMITS.message.min || message.length > CONTACT_LIMITS.message.max)
    errors.message = 'messageLength'

  return errors
}

// Bentuk respons membedakan keberhasilan, kesalahan kolom, dan kegagalan layanan.
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: 'validation'; fields: ContactErrors }
  | { ok: false; error: 'not_configured' | 'rate_limited' | 'send_failed' | 'bad_request' }
