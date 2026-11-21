/** Menyimpan urutan kategori proyek beserta label, warna, dan gaya tampilannya. */

import type { ProjectCategory } from '@/types/portfolio'

/** Setiap kategori memiliki warna aksen yang digunakan pada penanda, label, dan garis. */
export const CATEGORY_META: Record<
  ProjectCategory,
  { label: string; color: string; text: string; dot: string; ring: string; soft: string }
> = {
  qa: {
    label: 'QA',
    color: '#8fd5c4',
    text: 'text-mint',
    dot: 'bg-mint',
    ring: 'ring-mint/40',
    soft: 'bg-mint/10',
  },
  ml: {
    label: 'ML',
    color: '#b8a7d9',
    text: 'text-lavender',
    dot: 'bg-lavender',
    ring: 'ring-lavender/40',
    soft: 'bg-lavender/10',
  },
  frontend: {
    label: 'Frontend',
    color: '#8ba9d9',
    text: 'text-dusty',
    dot: 'bg-dusty',
    ring: 'ring-dusty/40',
    soft: 'bg-dusty/10',
  },
  uiux: {
    label: 'UI/UX',
    color: '#e6a792',
    text: 'text-peach',
    dot: 'bg-peach',
    ring: 'ring-peach/40',
    soft: 'bg-peach/10',
  },
}

export const CATEGORY_ORDER: ProjectCategory[] = ['qa', 'ml', 'frontend', 'uiux']
