/**
 * Komponen dipasang ulang saat berpindah halaman untuk menjalankan animasi kemunculan. Tata letak
 * utama tetap terpasang.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in h-full">{children}</div>
}
