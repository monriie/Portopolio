/** Menyediakan tombol tindakan, tautan berbentuk tombol, dan tombol ikon dengan tampilan yang seragam. */

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const base =
  'group/btn relative isolate inline-flex shrink-0 overflow-hidden items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-cream text-night hover:bg-warm hover:shadow-[0_0_0_4px_rgb(243_233_215_/_0.12),0_8px_30px_-8px_rgb(243_233_215_/_0.45)]',
  secondary:
    'border border-line-strong bg-white/[0.02] text-warm hover:border-warm/35 hover:bg-white/[0.05]',
  ghost: 'text-mist hover:bg-white/[0.05] hover:text-warm',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  icon?: IconName
  /** Menentukan posisi ikon. Posisi bawaan berada setelah label. */
  iconPosition?: 'start' | 'end'
  children: ReactNode
  className?: string
}

function Content({
  icon,
  iconPosition = 'end',
  children,
  variant,
}: Pick<CommonProps, 'icon' | 'iconPosition' | 'children' | 'variant'>) {
  const iconEl = icon ? (
    <Icon
      name={icon}
      size={16}
      className={cn(
        'transition-transform duration-200',
        iconPosition === 'end' && (icon === 'arrow-right' || icon === 'arrow-up-right') && 'group-hover/btn:translate-x-0.5',
      )}
    />
  ) : null
  return (
    <>
      {variant === 'primary' && (
        // Menampilkan sorotan saat penunjuk berada di atas tombol utama.
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 bg-white/70 opacity-0 group-hover/btn:animate-shine" />
      )}
      {iconPosition === 'start' && iconEl}
      {children}
      {iconPosition === 'end' && iconEl}
    </>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Content icon={icon} iconPosition={iconPosition} variant={variant}>
        {children}
      </Content>
    </button>
  )
}

/**
 * Tautan halaman internal memakai komponen Link tanpa mengubah posisi gulir. Tautan eksternal
 * dibuka di tab baru.
 */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  className,
  children,
  download,
}: CommonProps & { href: string; download?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <Content icon={icon} iconPosition={iconPosition} variant={variant}>
      {children}
    </Content>
  )
  if (href.startsWith('/') && !download) {
    return (
      <Link href={href} scroll={false} className={classes}>
        {content}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={classes}
      download={download || undefined}
      {...(!download && !href.startsWith('#') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

export function IconButton({
  icon,
  label,
  className,
  ...props
}: { icon: IconName; label: string } & Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.05] hover:text-warm disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={18} />
    </button>
  )
}
