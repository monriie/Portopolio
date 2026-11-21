/** Menyediakan sampul dan logo proyek dengan bentuk yang menyesuaikan kategorinya. */

import Image from 'next/image'
import { CATEGORY_META } from '@/constants/categories'
import { cn } from '@/lib/cn'
import type { Project } from '@/types/portfolio'

/**
 * Menghasilkan nilai tetap antara nol dan satu dari slug agar setiap proyek memiliki variasi
 * sampul yang konsisten.
 */
function seeded(slug: string, n: number) {
  let h = 2166136261
  for (const ch of slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return Array.from({ length: n }, (_, i) => (((h >>> (i * 3)) & 0xff) / 255) * 0.6 + 0.4)
}

function QaArt({ c, v }: { c: string; v: number[] }) {
  return (
    <g>
      <rect x="70" y="34" width="180" height="132" rx="12" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
      {[0, 1, 2, 3].map((i) => {
        const y = 56 + i * 28
        const flaky = i === 2
        return (
          <g key={i}>
            <circle cx="92" cy={y} r="7" fill={flaky ? '#d2ae62' : c} fillOpacity="0.2" />
            <path d={`M88.5 ${y}l2.5 2.5 4.5-5`} stroke={flaky ? '#d2ae62' : c} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="108" y={y - 3} width={88 * v[i]} height="6" rx="3" fill="#ffffff" fillOpacity="0.14" />
            <rect x="208" y={y - 6} width="28" height="12" rx="6" fill={flaky ? '#d2ae62' : c} fillOpacity="0.16" />
          </g>
        )
      })}
    </g>
  )
}

function MlArt({ c, v }: { c: string; v: number[] }) {
  const dots = Array.from({ length: 16 }, (_, i) => ({
    x: 84 + ((i * 37) % 120),
    y: 70 + ((i * 53) % 80) * v[i % v.length],
  }))
  return (
    <g>
      <path d="M72 160h150M72 160V44" stroke="#ffffff" strokeOpacity="0.12" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill={c} fillOpacity={0.25 + (i % 4) * 0.15} />
      ))}
      <path d={`M76 150C110 ${140 - 30 * v[0]} 140 ${110 - 20 * v[1]} 216 58`} stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
      <g transform="translate(232 70)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={(i % 2) * 22} y={Math.floor(i / 2) * 22} width="20" height="20" rx="4" fill={c} fillOpacity={i === 0 || i === 3 ? 0.55 : 0.12} />
        ))}
      </g>
    </g>
  )
}

function FrontendArt({ c, v }: { c: string; v: number[] }) {
  return (
    <g>
      <rect x="56" y="30" width="208" height="140" rx="12" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.1" />
      <path d="M56 50h208" stroke="#ffffff" strokeOpacity="0.08" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={70 + i * 10} cy="40" r="2.6" fill="#ffffff" fillOpacity="0.22" />
      ))}
      <rect x="68" y="62" width="40" height="96" rx="6" fill={c} fillOpacity="0.1" />
      <rect x="118" y="62" width={134 * v[0]} height="10" rx="5" fill="#ffffff" fillOpacity="0.14" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={118 + i * 46} y="84" width="40" height="34" rx="6" fill={c} fillOpacity={0.12 + i * 0.1} />
      ))}
      <path d={`M118 148l22-${12 * v[1]} 22 6 22-${16 * v[2]} 22 4 22-12`} stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

function UiuxArt({ c, v }: { c: string; v: number[] }) {
  return (
    <g>
      <rect x="86" y="26" width="72" height="148" rx="14" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.12" />
      <rect x="96" y="44" width="52" height="34" rx="6" fill={c} fillOpacity="0.18" />
      <rect x="96" y="86" width={52 * v[0]} height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
      <rect x="96" y="98" width={40 * v[1]} height="6" rx="3" fill="#ffffff" fillOpacity="0.1" />
      <rect x="96" y="150" width="52" height="12" rx="6" fill={c} fillOpacity="0.5" />
      <path d="M166 100h22" stroke={c} strokeOpacity="0.6" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M184 95l5 5-5 5" stroke={c} strokeOpacity="0.6" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="196" y="46" width="62" height="108" rx="12" fill="#ffffff" fillOpacity="0.02" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />
      <circle cx="227" cy="84" r="14" fill={c} fillOpacity="0.12" />
      <rect x="208" y="110" width="38" height="6" rx="3" fill="#ffffff" fillOpacity="0.1" />
    </g>
  )
}

const ART = { qa: QaArt, ml: MlArt, frontend: FrontendArt, uiux: UiuxArt }

/**
 * Membuat sampul proyek dari SVG. Jika alamat tangkapan layar tersedia, gambar ditampilkan
 * menggunakan komponen Image.
 */
export function ProjectCover({ project, alt = '', className, sizes = '(min-width: 1560px) 500px, (min-width: 1024px) 33vw, 50vw' }: { project: Project; alt?: string; className?: string; sizes?: string }) {
  const meta = CATEGORY_META[project.category]
  const Art = ART[project.category]
  return (
    <span className={cn('relative block overflow-hidden bg-[#121829]', className)}>
      {project.image ? (
        <Image src={project.image} alt={alt} fill sizes={sizes} className={alt ? 'bg-white object-contain' : 'object-cover'} />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(247_245_240_/_0.07)_1px,transparent_1px)] [background-size:14px_14px]"
          />
          <span
            aria-hidden="true"
            className="absolute -top-1/3 -right-1/4 size-2/3 rounded-full opacity-[0.10] blur-3xl"
            style={{ backgroundColor: meta.color }}
          />
          <svg viewBox="40 18 240 164" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full p-2" aria-hidden="true">
            <Art c={meta.color} v={seeded(project.slug, 6)} />
          </svg>
        </>
      )}
    </span>
  )
}

export function ProjectLogo({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' | 'lg' }) {
  const meta = CATEGORY_META[project.category]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl border border-line bg-night/80 font-semibold tracking-tight backdrop-blur',
        meta.text,
        size === 'sm' && 'size-8 text-[11px]',
        size === 'md' && 'size-9 text-xs',
        size === 'lg' && 'size-12 rounded-2xl text-sm',
      )}
    >
      {project.monogram}
    </span>
  )
}
