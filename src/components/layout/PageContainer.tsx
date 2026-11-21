/** Menyediakan wadah halaman dan judul dengan jarak serta perilaku gulir yang seragam. */

import { cn } from '@/lib/cn'

/**
 * Wadah isi halaman memenuhi area utama. Jika isinya tidak muat, gulir dilakukan di dalam wadah
 * tanpa menggeser tata letak utama.
 */
export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="h-full overflow-y-auto overscroll-contain">
      <div
        className={cn(
          'mx-auto flex min-h-full w-full max-w-[1320px] flex-col px-4 pt-3 pb-5 sm:px-6 md:pt-4 lg:px-10 lg:pb-7 2xl:max-w-[1560px]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function PageHeading({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h1
      id={id}
      className={cn(
        'text-[clamp(1.75rem,1.1rem+1.7vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-warm',
        className,
      )}
    >
      {children}
    </h1>
  )
}
