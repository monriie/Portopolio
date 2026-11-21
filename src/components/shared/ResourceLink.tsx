/** Menampilkan tautan sumber pendukung dengan ikon sesuai jenis sumber. */

import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { ResourceKind } from '@/types/portfolio'
import { RESOURCE_ICONS } from './resource-icons'

export function ResourceLink({ kind, label, href }: { kind: ResourceKind; label: string; href: string }) {
  const className =
    'group flex min-h-11 items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-sm text-warm transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.04]'
  const content = (
    <>
      <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.05] text-mist group-hover:text-warm">
        <Icon name={RESOURCE_ICONS[kind]} size={15} />
      </span>
      <span className="flex-1 truncate">{label}</span>
      <Icon name="arrow-up-right" size={15} className="text-dim transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-warm" />
    </>
  )
  if (href.startsWith('/')) {
    return (
      <Link href={href} scroll={false} className={className}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} target={href.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer" className={className}>
      {content}
    </a>
  )
}
