/**
 * Menggambar kelinci astronaut pada bidang berukuran 200 kali 230. Telinga, mata, dan lengan
 * memakai kelas animasi CSS yang mengikuti preferensi pengurangan gerakan. Komponen menghasilkan
 * kelompok SVG sehingga harus ditempatkan di dalam elemen SVG.
 */
export function AstronautBunnyArt({ animated = true }: { animated?: boolean }) {
  const a = (cls: string) => (animated ? cls : undefined)
  return (
    <g>
      <defs>
        <linearGradient id="ab-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6e6d6" />
          <stop offset="1" stopColor="#5fb8a5" />
        </linearGradient>
        <linearGradient id="ab-limb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a3b8ee" />
          <stop offset="1" stopColor="#7d94d8" />
        </linearGradient>
        <radialGradient id="ab-head" cx="45%" cy="36%" r="72%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#f8f6f2" />
          <stop offset="1" stopColor="#e2dfea" />
        </radialGradient>
      </defs>

      {/* Jejak bintang di belakang kelinci. */}
      <g fill="#f7f5f0">
        {[
          [48, 206, 1.8, 0],
          [36, 214, 1.3, 0.6],
          [58, 220, 1.1, 1.2],
          [26, 200, 1, 1.8],
          [44, 226, 0.9, 2.4],
          [16, 216, 0.8, 3],
        ].map(([cx, cy, r, d], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} className={a('animate-twinkle')} style={{ animationDelay: `${d}s` }} />
        ))}
      </g>

      {/* Bentuk kaki kelinci. */}
      <g transform="rotate(16 86 196)">
        <rect x="76" y="186" width="21" height="30" rx="10.5" fill="url(#ab-limb)" />
      </g>
      <g transform="rotate(-18 114 196)">
        <rect x="104" y="188" width="21" height="28" rx="10.5" fill="url(#ab-limb)" />
      </g>

      {/* Lengan yang berada di samping tubuh. */}
      <g transform="rotate(38 66 156)">
        <rect x="57" y="150" width="19" height="34" rx="9.5" fill="url(#ab-limb)" />
      </g>

      {/* Pakaian astronaut. */}
      <ellipse cx="100" cy="170" rx="38" ry="31" fill="url(#ab-suit)" />
      <ellipse cx="86" cy="160" rx="12" ry="16" fill="#ffffff" opacity="0.14" />
      <rect x="90" y="166" width="20" height="12" rx="4" fill="#101522" opacity="0.18" />
      <circle cx="96" cy="172" r="2" fill="#d2ae62" />
      <circle cx="104" cy="172" r="2" fill="#d95f5f" />
      <circle cx="137" cy="186" r="8.5" fill="#ffffff" />

      {/* Kerah pakaian dan kaca helm. */}
      <ellipse cx="100" cy="141" rx="30" ry="7" fill="#d4f0e8" />
      <circle cx="100" cy="84" r="58" fill="#0f1628" opacity="0.55" />
      <circle cx="100" cy="84" r="58" fill="#8ba9d9" opacity="0.1" />

      {/* Telinga kelinci. */}
      <g transform="rotate(-10 86 70)">
        <g className={a('animate-ear-wiggle svg-origin-bottom')}>
          <ellipse cx="86" cy="52" rx="10" ry="19" fill="url(#ab-head)" />
          <ellipse cx="86" cy="54" rx="4.6" ry="12.5" fill="#f0b48a" />
        </g>
      </g>
      <g transform="rotate(12 114 70)">
        <g className={a('animate-ear-wiggle svg-origin-bottom')} style={{ animationDelay: '0.18s' }}>
          <ellipse cx="114" cy="52" rx="10" ry="19" fill="url(#ab-head)" />
          <ellipse cx="114" cy="54" rx="4.6" ry="12.5" fill="#f0b48a" />
        </g>
      </g>

      {/* Kepala dan wajah kelinci. */}
      <ellipse cx="100" cy="96" rx="41" ry="36" fill="url(#ab-head)" />
      <ellipse cx="75" cy="110" rx="5.5" ry="3.2" fill="#e6a792" opacity="0.28" />
      <ellipse cx="125" cy="110" rx="5.5" ry="3.2" fill="#e6a792" opacity="0.28" />
      <g className={a('animate-blink svg-origin-center')}>
        <circle cx="85" cy="100" r="4.3" fill="#14161f" />
        <circle cx="115" cy="100" r="4.3" fill="#14161f" />
        <circle cx="86.5" cy="98.5" r="1.3" fill="#ffffff" />
        <circle cx="116.5" cy="98.5" r="1.3" fill="#ffffff" />
      </g>
      <ellipse cx="100" cy="108" rx="3" ry="2.1" fill="#e6a792" />
      <path
        d="M100 110v2.2m0 0c-1.2 1.6-3.2 1.6-4.4.4m4.4-.4c1.2 1.6 3.2 1.6 4.4.4"
        stroke="#14161f"
        strokeOpacity="0.5"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bingkai helm dan pantulan cahaya pada kaca. */}
      <circle cx="100" cy="84" r="58" fill="none" stroke="#f7f5f0" strokeOpacity="0.9" strokeWidth="3" />
      <path d="M60 64a46 46 0 0 1 26-28" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <circle cx="56" cy="76" r="2.6" fill="#ffffff" opacity="0.5" />

      {/* Lengan melambai di depan helm. Kelompok luar mengatur posisi dan kelompok dalam mengatur animasi. */}
      <g transform="rotate(50 134 150)">
        <g className={a('animate-wave svg-origin-bottom')}>
          <rect x="125" y="112" width="19" height="40" rx="9.5" fill="url(#ab-limb)" />
        </g>
      </g>
    </g>
  )
}
