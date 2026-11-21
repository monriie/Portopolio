/** Menentukan judul halaman pengalaman dan menampilkan daftar riwayat pengalaman. */

import type { Metadata } from 'next'
import { ExperienceView } from '@/features/experience/ExperienceView'

export const metadata: Metadata = { title: 'Experience' }

export default function ExperiencePage() {
  return <ExperienceView />
}
