'use client'

/** Menyimpan kategori proyek, proyek terpilih, dan pengalaman aktif agar bertahan saat berpindah halaman. */

import { useMemo, useState, type ReactNode } from 'react'
import { AppStateContext, type ProjectFilter } from './app-state'

export function AppStateProvider({ children, initialExperience }: { children: ReactNode; initialExperience: number }) {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeExperience, setActiveExperience] = useState(initialExperience)

  // Objek konteks hanya dibuat ulang saat salah satu pilihan pengguna berubah.
  const value = useMemo(
    () => ({
      projectFilter,
      setProjectFilter,
      selectedProject,
      setSelectedProject,
      activeExperience,
      setActiveExperience,
    }),
    [projectFilter, selectedProject, activeExperience],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
