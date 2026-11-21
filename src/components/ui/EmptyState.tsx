/** Menampilkan penjelasan ketika data kosong dan tombol tindakan jika tersedia. */

import { RabbitMark } from '@/components/brand/RabbitMark'
import { Button } from './Button'

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line p-8 text-center">
      <RabbitMark size={48} className="animate-float opacity-80" />
      <p className="text-base font-medium text-warm">{title}</p>
      {hint && <p className="max-w-xs text-sm text-dim">{hint}</p>}
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick} className="mt-1">
          {action.label}
        </Button>
      )}
    </div>
  )
}
