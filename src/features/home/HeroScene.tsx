'use client'

/** Mengatur interaksi ilustrasi utama melalui gerakan penunjuk dan klik pada maskot. */

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AstronautBunnyArt } from '@/components/brand/AstronautBunny'
import { CloudPaths } from '@/components/brand/CloudOrnament'
import { SparklePath } from '@/components/brand/Sparkle'
import { Icon } from '@/components/ui/Icon'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/cn'

const BURST = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * Math.PI * 2
  const dist = 70 + (i % 3) * 18
  return {
    dx: `${Math.round(Math.cos(angle) * dist)}px`,
    dy: `${Math.round(Math.sin(angle) * dist)}px`,
    color: ['text-gold', 'text-mint', 'text-warm'][i % 3],
    size: 10 + (i % 3) * 3,
  }
})

/**
 * Ilustrasi halaman utama berisi bulan, planet, bintang jatuh, dan kelinci astronaut. Kelinci
 * mengikuti gerakan penunjuk dan merespons klik dengan animasi.
 */
export function HeroScene({ className }: { className?: string }) {
  const { t } = useI18n()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const [boops, setBoops] = useState(0)
  const [saying, setSaying] = useState(false)
  const sayTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(sayTimer.current), [])

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    const el = root.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
    })
  }
  const onPointerLeave = () => {
    root.current?.style.setProperty('--px', '0')
    root.current?.style.setProperty('--py', '0')
  }

  const boop = () => {
    setBoops((n) => n + 1)
    setSaying(true)
    clearTimeout(sayTimer.current)
    sayTimer.current = setTimeout(() => setSaying(false), 2200)
  }

  return (
    <div
      ref={root}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('relative aspect-[560/520] select-none', className)}
    >
      {/* Latar langit bergerak berlawanan dengan penunjuk untuk memberi kesan kedalaman. */}
      <svg
        viewBox="0 0 560 520"
        aria-hidden="true"
        className="absolute inset-0 size-full transition-transform duration-350 ease-out"
        style={{ transform: 'translate3d(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -6px), 0)' }}
      >
        <defs>
          <radialGradient id="hero-moon" cx="38%" cy="34%" r="70%">
            <stop offset="0%" stopColor="#f8f2e6" />
            <stop offset="70%" stopColor="#efe2c9" />
            <stop offset="100%" stopColor="#dccaa8" />
          </radialGradient>
          <linearGradient id="hero-shoot" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f7f5f0" />
            <stop offset="1" stopColor="#f7f5f0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Lingkaran cahaya di sekitar bulan. */}
        <g className="animate-glow">
          <circle cx="360" cy="214" r="200" fill="#f3e9d7" opacity="0.03" />
          <circle cx="360" cy="212" r="172" fill="#f3e9d7" opacity="0.045" />
        </g>

        {/* Lintasan orbit planet. */}
        <ellipse cx="330" cy="250" rx="240" ry="70" transform="rotate(-14 330 250)" fill="none" stroke="#f7f5f0" strokeOpacity="0.13" strokeDasharray="2 7" />

        {/* Bulan beserta bentuk kawah dan pantulan cahayanya. */}
        <circle cx="360" cy="212" r="150" fill="url(#hero-moon)" />
        <g fill="#cfbb96" opacity="0.38">
          <circle cx="310" cy="160" r="22" />
          <circle cx="412" cy="244" r="30" />
          <circle cx="352" cy="292" r="13" />
          <circle cx="425" cy="142" r="10" />
          <circle cx="282" cy="240" r="8" />
        </g>
        <g fill="#ffffff" opacity="0.35">
          <circle cx="307" cy="156" r="16" />
          <circle cx="408" cy="239" r="22" />
        </g>

        <g transform="rotate(-14 330 250)">
          <circle r="7" fill="#8ba9d9">
            {!reduced && <animateMotion dur="22s" repeatCount="indefinite" path="M90 250a240 70 0 1 0 480 0a240 70 0 1 0 -480 0" />}
          </circle>
          {reduced && <circle cx="90" cy="250" r="7" fill="#8ba9d9" />}
        </g>

        {/* Ornamen awan yang bergerak perlahan. */}
        <g className="animate-cloud-drift" opacity="0.6">
          <g transform="translate(250 330) scale(1.25)">
            <CloudPaths stroke="#f3e9d7" strokeWidth={1.6} />
          </g>
        </g>
        <g className="animate-cloud-drift" style={{ animationDelay: '-6s' }} opacity="0.35">
          <g transform="translate(440 372) scale(0.8)">
            <CloudPaths stroke="#f3e9d7" strokeWidth={2} />
          </g>
        </g>

        {/* Bintang jatuh dengan waktu animasi yang berbeda. */}
        {[
          { x: 520, y: 40, delay: '1s', dur: '9s' },
          { x: 300, y: 18, delay: '5.5s', dur: '11s' },
        ].map((s, i) => (
          <g key={i} className="animate-shoot" style={{ animationDelay: s.delay, animationDuration: s.dur }}>
            <path d={`M${s.x} ${s.y}l46 -23`} stroke="url(#hero-shoot)" strokeWidth="2" strokeLinecap="round" />
            <circle cx={s.x} cy={s.y} r="1.8" fill="#ffffff" />
          </g>
        ))}

        {/* Bintang kecil yang berkelip. */}
        {[
          { x: 150, y: 92, r: 9, fill: '#f7f5f0', d: '0s' },
          { x: 528, y: 72, r: 7, fill: '#d2ae62', d: '1.2s' },
          { x: 508, y: 420, r: 7, fill: '#f7f5f0', d: '2.1s' },
          { x: 70, y: 200, r: 5, fill: '#d2ae62', d: '0.6s' },
          { x: 250, y: 470, r: 4, fill: '#8fd5c4', d: '2.8s' },
        ].map((s, i) => (
          <SparklePath
            key={i}
            x={s.x}
            y={s.y}
            r={s.r}
            fill={s.fill}
            className="animate-twinkle-pop svg-origin-center"
            style={{ animationDelay: s.d }}
          />
        ))}
      </svg>

      {/* Lapisan kelinci menggabungkan gerakan mengikuti penunjuk, kemunculan, gerakan melayang, dan respons klik. */}
      <div
        className="absolute top-[15%] left-[2%] w-[56%] transition-transform duration-350 ease-out"
        style={{ transform: 'translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 12px), 0)' }}
      >
        <div className="animate-fly-in [animation-delay:250ms]">
          <button
            type="button"
            onClick={boop}
            aria-label={t.home.bunnyLabel}
            className="animate-bob group relative block aspect-[200/230] w-full cursor-pointer rounded-[40%] focus-visible:outline-offset-8"
          >
            <svg viewBox="0 0 200 230" className="size-full overflow-visible transition-transform duration-300 ease-[var(--ease-bounce)] group-hover:scale-[1.04]" aria-hidden="true">
              <g key={boops} className={boops > 0 ? 'animate-boop svg-origin-center' : undefined}>
                <AstronautBunnyArt animated={!reduced} />
              </g>
            </svg>
            {boops > 0 &&
              BURST.map((b, i) => (
                <span
                  key={`${boops}-${i}`}
                  aria-hidden="true"
                  className={cn('animate-burst pointer-events-none absolute top-[38%] left-1/2', b.color)}
                  style={{ '--dx': b.dx, '--dy': b.dy } as CSSProperties}
                >
                  <Icon name="sparkle" size={b.size} />
                </span>
              ))}
          </button>
        </div>

        <p
          role="status"
          className={cn(
            'pointer-events-none absolute -top-[6%] -right-[22%] origin-bottom-left rounded-2xl rounded-bl-sm bg-cream px-3 py-1.5 text-[13px] font-medium whitespace-nowrap text-night shadow-[0_10px_30px_-12px_rgb(243_233_215_/_0.6)] transition-all duration-300 ease-[var(--ease-bounce)]',
            saying ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
          )}
        >
          {saying ? t.home.bunnyHi : ''}
        </p>
      </div>
    </div>
  )
}
