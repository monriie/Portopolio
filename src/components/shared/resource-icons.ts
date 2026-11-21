/** Memetakan jenis sumber pendukung ke nama ikon yang tersedia. */

import type { IconName } from '@/components/ui/Icon'
import type { ResourceKind } from '@/types/portfolio'

export const RESOURCE_ICONS: Record<ResourceKind, IconName> = {
  project: 'layers',
  live: 'globe',
  github: 'github',
  pdf: 'file-text',
  certificate: 'award',
  'case-study': 'book-open',
}
