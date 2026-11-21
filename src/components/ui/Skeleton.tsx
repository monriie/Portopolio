/** Menyediakan bentuk sementara untuk menggantikan isi yang belum selesai dimuat. */

import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-shimmer rounded-lg bg-white/[0.06]', className)} />
}

/** Menampilkan bentuk sementara selama kode isi panel detail sedang dimuat. */
export function DetailSkeleton() {
  return (
    <div className="flex h-full flex-col gap-6 p-6 md:p-8" role="status" aria-label="Loading">
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>
      </div>
      <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
      <div className="space-y-2.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-11/12" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    </div>
  )
}
