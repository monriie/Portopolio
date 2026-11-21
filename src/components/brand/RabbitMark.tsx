/** Menyediakan logo maskot kelinci astronaut dalam bentuk SVG. */

import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Menggambar maskot kelinci astronaut yang dapat disesuaikan ukurannya untuk logo dan avatar. */
export function RabbitMark({ size = 32, className, title }: { size?: number; className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6e6d6" />
          <stop offset="1" stopColor="#5fb8a5" />
        </linearGradient>
      </defs>
      {/* Jejak bintang di belakang kelinci. */}
      <g fill="#f7f5f0">
        <circle cx="6" cy="41" r="0.9" opacity="0.55" />
        <circle cx="9.5" cy="44.5" r="0.7" opacity="0.4" />
        <circle cx="3.5" cy="45" r="0.6" opacity="0.3" />
      </g>
      <g transform="rotate(-14 24 27)">
        {/* Kaki dan lengan di samping tubuh. */}
        <ellipse cx="19.6" cy="43" rx="3.1" ry="3.8" fill="#8ba9d9" />
        <ellipse cx="28.2" cy="43.4" rx="3.1" ry="3.5" fill="#8ba9d9" />
        <ellipse cx="14.8" cy="35" rx="2.8" ry="4.3" transform="rotate(32 14.8 35)" fill="#8ba9d9" />
        {/* Pakaian, ekor, dan kerah kelinci. */}
        <ellipse cx="24" cy="36.5" rx="9.4" ry="7.8" fill={`url(#${id}-suit)`} />
        <circle cx="32.6" cy="40.4" r="2.3" fill="#ffffff" />
        <ellipse cx="24" cy="30.6" rx="7" ry="1.9" fill="#d4f0e8" />
        {/* Lengan yang melambai. */}
        <ellipse cx="33.6" cy="29.6" rx="2.8" ry="4.4" transform="rotate(-32 33.6 29.6)" fill="#8ba9d9" />
        {/* Kaca helm. */}
        <circle cx="24" cy="18.5" r="13.6" fill="#101522" />
        <circle cx="24" cy="18.5" r="13.6" fill="#8ba9d9" fillOpacity="0.1" />
        {/* Telinga kelinci. */}
        <ellipse cx="20.2" cy="12.6" rx="2.6" ry="5" transform="rotate(-8 20.2 12.6)" fill="#ffffff" />
        <ellipse cx="20.2" cy="13" rx="1.1" ry="3.3" transform="rotate(-8 20.2 13)" fill="#f0b48a" />
        <ellipse cx="27.8" cy="12.8" rx="2.6" ry="4.8" transform="rotate(12 27.8 12.8)" fill="#ffffff" />
        <ellipse cx="27.8" cy="13.2" rx="1.1" ry="3.1" transform="rotate(12 27.8 13.2)" fill="#f0b48a" />
        {/* Kepala dan wajah kelinci. */}
        <ellipse cx="24" cy="21.6" rx="9.4" ry="8.4" fill="#ffffff" />
        <circle cx="20.5" cy="22.6" r="1.05" fill="#14161f" />
        <circle cx="27.5" cy="22.6" r="1.05" fill="#14161f" />
        <ellipse cx="24" cy="24.9" rx="0.85" ry="0.6" fill="#e6a792" />
        {/* Bingkai helm dan pantulan cahaya pada kaca. */}
        <circle cx="24" cy="18.5" r="13.6" stroke="#f7f5f0" strokeWidth="1.7" />
        <path d="M13.4 15.2a11 11 0 0 1 5-5.6" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {/* Bintang di depan kelinci. */}
      <path d="M41.5 4.5c.35 2.7 1.8 4.15 4.5 4.5-2.7.35-4.15 1.8-4.5 4.5-.35-2.7-1.8-4.15-4.5-4.5 2.7-.35 4.15-1.8 4.5-4.5Z" fill="#d2ae62" />
      <circle cx="44.5" cy="17" r="0.9" fill="#f7f5f0" opacity="0.7" />
    </svg>
  )
}
