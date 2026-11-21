/** Menyimpan identitas dan kontak publik yang digunakan pada halaman portfolio. */

import type { FocusArea, Localized } from '@/types/portfolio'

export const profile = {
  name: 'Monica Amrina Rosyada',
  headline: {
    en: 'Web Developer · Applied AI & ML',
    id: 'Pengembang Web · AI & ML Terapan',
  } satisfies Localized,
  bio: {
    en: 'I develop web applications and explore applied AI and machine learning. My work spans frontend development, evaluation of scientific search, and color analysis. I have also supported programming practicums and operational requirements analysis.',
    id: 'Saya mengembangkan aplikasi web dan mendalami AI serta machine learning terapan. Karya saya mencakup pengembangan frontend, evaluasi pencarian ilmiah, dan analisis warna. Saya juga pernah mendampingi praktikum pemrograman dan menganalisis kebutuhan operasional.',
  } satisfies Localized,
  location: 'Palembang, Sumatera Selatan, Indonesia',
  timeZone: 'Asia/Jakarta',
  timeZoneLabel: 'WIB',
  // Isi hanya dengan alamat yang boleh ditampilkan kepada pengunjung.
  email: null as string | null,
  cvUrl: null as string | null,
  photo: null as string | null,
  socials: [
    { id: 'linkedin', label: 'LinkedIn', handle: 'in/monriie', href: 'https://id.linkedin.com/in/monriie' },
    { id: 'github', label: 'GitHub', handle: '@monriie', href: 'https://github.com/monriie' },
  ] as const,
}

export const focusAreas: FocusArea[] = [
  {
    category: 'frontend',
    title: { en: 'Frontend Development', id: 'Pengembangan Frontend' },
    description: {
      en: 'React interfaces, dashboards and REST API integration.',
      id: 'Antarmuka React, dasbor, dan integrasi REST API.',
    },
  },
  {
    category: 'ml',
    title: { en: 'Applied AI & ML', id: 'AI & ML Terapan' },
    description: {
      en: 'Semantic search evaluation and image color analysis.',
      id: 'Evaluasi pencarian semantik dan analisis warna citra.',
    },
  },
  {
    category: 'uiux',
    title: { en: 'UI/UX', id: 'UI/UX' },
    description: {
      en: 'Web design and requirements analysis.',
      id: 'Desain web dan analisis kebutuhan.',
    },
  },
]
