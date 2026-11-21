'use client'

/** Menentukan data keadaan tampilan dan menyediakan fungsi untuk mengaksesnya dari komponen. */

import { createContext, useContext } from 'react'
import type { ProjectCategory } from '@/types/portfolio'

export type ProjectFilter = 'all' | ProjectCategory

/** Menyimpan pilihan tampilan yang perlu dipertahankan ketika pengguna berpindah halaman. */
export type AppState = {
  projectFilter: ProjectFilter
  setProjectFilter: (filter: ProjectFilter) => void
  /** Slug proyek yang sedang dibuka. Nilai null membuat tampilan memilih proyek pertama dalam daftar. */
  selectedProject: string | null
  setSelectedProject: (slug: string | null) => void
  activeExperience: number
  setActiveExperience: (index: number) => void
}

export const AppStateContext = createContext<AppState | null>(null)

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside <AppStateProvider>')
  return ctx
}
