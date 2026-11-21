/** Menangani alamat yang tidak cocok dengan halaman portfolio yang tersedia. */

﻿import { notFound } from 'next/navigation'

/** Mengarahkan alamat yang tidak dikenal ke halaman 404 dengan tata letak portfolio. */
export default function UnknownPage() {
  notFound()
}
