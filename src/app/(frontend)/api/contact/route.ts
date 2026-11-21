/**
 * Menerima permintaan kontak, memeriksa masukan, membatasi kiriman, dan mengirim email melalui
 * Gmail dari server.
 */

import nodemailer from 'nodemailer'
import { normalizeContact, validateContact, type ContactApiResponse } from '@/features/contact/validation'

export const runtime = 'nodejs'

/* Kredensial Gmail hanya dibaca oleh server dari variabel lingkungan. GMAIL_USER berisi alamat pengirim dan GMAIL_APP_PASSWORD berisi sandi aplikasi Google. CONTACT_TO_EMAIL menentukan penerima dan menggunakan alamat pengirim jika tidak diisi. */

const MAX_BODY_BYTES = 16_000
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Pembatasan disimpan dalam memori setiap proses server. Proses yang berbeda tidak berbagi data,
// sehingga batas ini hanya mengurangi lonjakan permintaan dalam satu proses.
const hits = new Map<string, number[]>()

// Menghitung permintaan dari alamat IP yang sama dalam rentang waktu yang masih berlaku.
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

// Respons kontak tidak disimpan dalam cache karena berisi hasil pemrosesan setiap permintaan.
function reply(body: ContactApiResponse, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// Memeriksa format dan isi permintaan sebelum membuka koneksi ke layanan email.
export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply({ ok: false, error: 'bad_request' }, 415)
  }

  // Membatasi panjang teks permintaan sebelum menguraikan JSON.
  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return reply({ ok: false, error: 'bad_request' }, 413)

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return reply({ ok: false, error: 'bad_request' }, 400)
  }

  // Jika kolom tersembunyi terisi, kembalikan respons berhasil tanpa mengirim email untuk mengabaikan kiriman bot.
  if (payload && typeof payload === 'object' && (payload as Record<string, unknown>).company) {
    return reply({ ok: true }, 200)
  }

  // Server memeriksa ulang masukan meskipun formulir di peramban sudah melakukan validasi.
  const input = normalizeContact(payload)
  const fields = validateContact(input)
  if (Object.keys(fields).length > 0) return reply({ ok: false, error: 'validation', fields }, 422)

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return reply({ ok: false, error: 'rate_limited' }, 429)

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) return reply({ ok: false, error: 'not_configured' }, 503)

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
    // Akun Gmail menjadi pengirim. Balasan diarahkan ke alamat pengunjung melalui replyTo.
    await transporter.sendMail({
      from: { name: 'Portfolio Contact', address: user },
      to: process.env.CONTACT_TO_EMAIL || user,
      replyTo: { name: input.name, address: input.email },
      subject: `[Portfolio] ${input.subject}`,
      text: `From: ${input.name} <${input.email}>\nSubject: ${input.subject}\n\n${input.message}\n`,
    })
    return reply({ ok: true }, 200)
  } catch (error) {
    // Catat hanya jenis kesalahan agar kredensial dan isi pesan tidak masuk ke log.
    console.error('Contact email failed:', error instanceof Error ? error.name : 'unknown error')
    return reply({ ok: false, error: 'send_failed' }, 502)
  }
}
