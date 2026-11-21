/** Menentukan judul halaman profil dan menampilkan informasi pemilik portfolio. */

import type { Metadata } from 'next'
import { AboutView } from '@/features/about/AboutView'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return <AboutView />
}
