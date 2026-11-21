'use client'

/** Mengatur galeri foto dan posisi foto aktif saat pengguna menggeser atau menekan tombol navigasi. */

import Image from 'next/image'
import { useRef, useState } from 'react'
import { IconButton } from './Button'
import { cn } from '@/lib/cn'

type Item = { src: string; alt: string; credit?: string }

/**
 * Galeri memuat foto saat diperlukan dan dapat digeser melalui sentuhan. Posisi foto dirapikan
 * oleh CSS, sementara tombol menyediakan navigasi bagi tetikus dan papan ketik.
 */
export function Gallery({ items, labels }: { items: Item[]; labels: { previous: string; next: string } }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const go = (next: number) => {
    const el = track.current
    if (!el) return
    const clamped = Math.max(0, Math.min(items.length - 1, next))
    el.scrollTo({ left: clamped * el.clientWidth })
  }

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget
          setIndex(Math.round(el.scrollLeft / el.clientWidth))
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl motion-safe:scroll-smooth"
      >
        {items.map((item, i) => (
          <figure key={item.src} className="relative aspect-[3/2] w-full shrink-0 snap-center overflow-hidden bg-white/[0.04]">
            <div className="animate-shimmer absolute inset-0 bg-white/[0.04]" aria-hidden="true" />
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-cosmos/85 to-transparent px-4 pt-10 pb-3 text-xs text-warm/90">
              <span>{item.alt}</span>
              <span className="shrink-0 text-dim tabular-nums">
                {i + 1}/{items.length}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {items.map((item, i) => (
              <span
                key={item.src}
                className={cn('h-1 rounded-full transition-all duration-300', i === index ? 'w-5 bg-warm/80' : 'w-1.5 bg-warm/20')}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <IconButton icon="chevron-left" label={labels.previous} onClick={() => go(index - 1)} disabled={index === 0} />
            <IconButton icon="chevron-right" label={labels.next} onClick={() => go(index + 1)} disabled={index === items.length - 1} />
          </div>
        </div>
      )}
    </div>
  )
}
