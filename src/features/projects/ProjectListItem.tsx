/** Menampilkan logo, judul, kategori, dan tahun sebagai satu baris pilihan proyek. */

import { CategoryChip } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'
import type { Project } from '@/types/portfolio'
import { ProjectLogo } from './ProjectCover'

export function ProjectListItem({ project, selected, opensDialog, onSelect }: {
  project: Project
  selected: boolean
  opensDialog: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-haspopup={opensDialog ? 'dialog' : undefined}
      aria-current={selected ? 'true' : undefined}
      className={cn(
        'grid min-h-[4.25rem] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors duration-200 focus-visible:outline-offset-[-2px]',
        selected ? 'border-mint/30 bg-mint/10' : 'border-transparent hover:bg-white/5',
      )}
    >
      <ProjectLogo project={project} size="md" />
      <span className="min-w-0">
        <span className="block text-sm leading-snug font-semibold text-warm">{project.title}</span>
        <CategoryChip category={project.category} className="mt-1" />
      </span>
      <span className="self-start pt-1 text-xs text-mist tabular-nums">{project.year}</span>
    </button>
  )
}
