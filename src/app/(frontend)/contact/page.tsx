/** Menentukan judul halaman kontak dan menampilkan informasi serta formulir pesan. */

import type { Metadata } from 'next'
import { ContactView } from '@/features/contact/ContactView'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return <ContactView />
}
