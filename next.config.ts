import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Membatasi pekerja build agar penggunaan memori lebih rendah. Endpoint Gmail tetap berjalan di server.
  enablePrerenderSourceMaps: false,
  experimental: { cpus: 2 },
}

export default nextConfig
