/** Membuat latar bintang dengan susunan tetap yang dipakai pada seluruh halaman. */

import { CloudPaths } from './CloudOrnament'
import { SparklePath } from './Sparkle'

/** Menggunakan pembangkit angka dengan nilai awal tetap agar posisi bintang sama di server dan peramban. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20260)
const STARS = Array.from({ length: 110 }, (_, i) => ({
  x: Math.round(rand() * 1600),
  y: Math.round(rand() * 1000),
  r: +(0.5 + rand() * 1.1).toFixed(2),
  o: +(0.25 + rand() * 0.55).toFixed(2),
  twinkle: i % 4 === 0,
  delay: +(rand() * 6).toFixed(2),
  duration: +(3 + rand() * 5).toFixed(2),
}))
const SPARKLES = [
  { x: 210, y: 140, r: 5, gold: false },
  { x: 1380, y: 120, r: 6, gold: true },
  { x: 1500, y: 640, r: 4, gold: false },
  { x: 120, y: 760, r: 4, gold: true },
  { x: 820, y: 60, r: 3.5, gold: false },
]

/**
 * Latar bintang digambar sebagai SVG di server dan dianimasikan melalui CSS. Latar tetap
 * terpasang saat berpindah halaman sehingga animasinya tidak dimulai ulang.
 */
export function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-cosmos">
      {/* Lapisan warna tipis untuk latar langit malam. */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_85%_-10%,rgb(139_169_217_/_0.10),transparent_60%),radial-gradient(900px_600px_at_-10%_110%,rgb(184_167_217_/_0.07),transparent_60%),linear-gradient(180deg,#0f1424_0%,#0d0f14_100%)]" />
      <div className="animate-drift absolute -inset-20">
        <svg className="size-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#f7f5f0"
              opacity={s.o}
              className={s.twinkle ? 'animate-twinkle' : undefined}
              style={s.twinkle ? { animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` } : undefined}
            />
          ))}
          {SPARKLES.map((s, i) => (
            <SparklePath
              key={i}
              x={s.x}
              y={s.y}
              r={s.r}
              fill={s.gold ? '#d2ae62' : '#f7f5f0'}
              className="animate-twinkle"
              style={{ animationDelay: `${i * 1.3}s`, animationDuration: '6s', opacity: 0.7 }}
            />
          ))}
          <g opacity="0.05" transform="translate(1320 860) scale(2.2)">
            <CloudPaths strokeWidth={1.4} />
          </g>
        </svg>
      </div>
    </div>
  )
}
