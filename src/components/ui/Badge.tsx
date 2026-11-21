/** Menyediakan label keterampilan, penanda kategori, dan teks pengantar bagian halaman. */

import { CATEGORY_META } from '@/constants/categories'
import { cn } from '@/lib/cn'
import type { ProjectCategory } from '@/types/portfolio'

export function SkillBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full border border-line bg-white/[0.025] px-2.5 text-xs font-medium text-mist',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function CategoryChip({
  category,
  label,
  className,
}: {
  category: ProjectCategory
  label?: string
  className?: string
}) {
  const meta = CATEGORY_META[category]
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', meta.text, className)}>
      <span className={cn('size-1.5 rounded-full', meta.dot)} aria-hidden="true" />
      {label ?? meta.label}
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-dim uppercase', className)}>
      <span className="h-px w-5 bg-gold/60" aria-hidden="true" />
      {children}
    </p>
  )
}
