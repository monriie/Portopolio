'use client'

/** Menampilkan deretan foto pengalaman yang bergerak berulang dan dapat membuka detail pengalaman. */

import Image from 'next/image'
import type { GalleryImage } from '@/types/portfolio'

/**
 * Mengulang kumpulan foto agar memenuhi baris, lalu menampilkan dua salinan. Pergeseran sejauh
 * setengah lebar membuat animasi dapat berulang tanpa jeda.
 */
export function PhotoMarquee({ images, onOpen, label }: { images: GalleryImage[]; onOpen: () => void; label: string }) {
  if (images.length === 0) return null
  const repeats = Math.max(1, Math.ceil(6 / images.length))
  const set = Array.from({ length: repeats }, () => images).flat()
  const track = [...set, ...set]
  // Menyesuaikan durasi dengan jumlah foto agar kecepatan gerakan tetap konsisten.
  const duration = `${set.length * 6}s`

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className="group relative mt-auto block h-28 w-full shrink-0 overflow-hidden rounded-xl xl:h-32 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <span className="animate-marquee flex h-full w-max gap-2" style={{ animationDuration: duration }}>
        {track.map((img, i) => (
          <span key={i} className="relative block aspect-[4/3] h-full shrink-0 overflow-hidden rounded-xl bg-white/[0.04]">
            <Image
              src={img.src}
              alt=""
              fill
              sizes="200px"
              loading="lazy"
              className="object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
            />
          </span>
        ))}
      </span>
    </button>
  )
}
