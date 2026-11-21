'use client'

/** Menghubungkan daftar proyek, filter, dan panel detail dengan pilihan pengguna. */

import { useEffect, useState } from 'react'
import { PageHeading } from '@/components/layout/PageContainer'
import { useAppState, type ProjectFilter } from '@/components/providers/app-state'
import { Drawer } from '@/components/ui/Drawer'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CATEGORY_META, CATEGORY_ORDER } from '@/constants/categories'
import { projects } from '@/data/projects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useI18n } from '@/i18n/context'
import { ProjectDetailPane } from './ProjectDetailPane'
import { ProjectListItem } from './ProjectListItem'

const FILTERS: ProjectFilter[] = ['all', ...CATEGORY_ORDER]

function setProjectUrl(slug?: string) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set('project', slug)
  else url.searchParams.delete('project')
  window.history.replaceState(null, '', url)
}

export function ProjectsView() {
  const { t } = useI18n()
  const { projectFilter, setProjectFilter, selectedProject, setSelectedProject } = useAppState()
  const isDesktop = useMediaQuery('(min-width: 768px)', true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const filtered = projects.filter((project) => projectFilter === 'all' || project.category === projectFilter)
  const selected = filtered.find((project) => project.slug === selectedProject)
  const current = selected ?? filtered[0]

  function select(slug: string) {
    setSelectedProject(slug)
    setMobileOpen(!isDesktop)
    setProjectUrl(slug)
  }

  function closeMobile() {
    if (!mobileOpen) return
    setMobileOpen(false)
    setProjectUrl()
  }

  function filter(value: ProjectFilter) {
    if (value === projectFilter) return
    setProjectFilter(value)
    // Pertahankan pilihan yang masih cocok dan bersihkan tautan jika proyek tersaring.
    if (value !== 'all' && selected?.category !== value) {
      setSelectedProject(null)
      setProjectUrl()
    }
  }

  // Tautan dari Experience dapat membuka proyek di luar kategori yang terakhir dipilih.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('project')
    const project = projects.find((candidate) => candidate.slug === slug)
    if (!project) return
    if (projectFilter !== 'all' && projectFilter !== project.category) setProjectFilter('all')
    setSelectedProject(project.slug)
    setMobileOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto h-full max-w-[1560px] md:p-4 lg:px-8 lg:py-5">
      <div className="grid h-full min-h-0 overflow-hidden bg-night/80 md:grid-cols-[minmax(17rem,31%)_minmax(0,1fr)] md:rounded-[var(--radius-card)] md:border md:border-line">
        <section aria-labelledby="projects-title" className="flex h-full min-h-0 min-w-0 flex-col bg-surface/55 md:border-r md:border-line">
          <header className="shrink-0 border-b border-line px-4 pt-4 pb-3 lg:px-5">
            <PageHeading id="projects-title" className="mb-3">{t.projects.title}</PageHeading>
            <SegmentedControl
              label={t.projects.filterLabel}
              value={projectFilter}
              onChange={filter}
              size="sm"
              className="max-w-full flex-wrap rounded-2xl"
              options={FILTERS.map((value) => ({
                value,
                label: value === 'all' ? t.projects.all : value === 'frontend' ? 'FE' : CATEGORY_META[value].label,
                ariaLabel: value === 'frontend' ? CATEGORY_META[value].label : undefined,
              }))}
            />
          </header>
          <div key={projectFilter} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
            {filtered.length > 0 ? (
              <ul aria-label={t.projects.listLabel} className="divide-y divide-line">
                {filtered.map((project) => (
                  <li key={project.slug} className="py-0.5">
                    <ProjectListItem
                      project={project}
                      selected={isDesktop ? project.slug === current?.slug : project.slug === selected?.slug}
                      opensDialog={!isDesktop}
                      onSelect={() => select(project.slug)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p role="status" className="px-3 py-6 text-sm leading-relaxed text-mist">
                {t.projects.empty} {t.projects.emptyHint}
              </p>
            )}
          </div>
        </section>

        {/* Gulir detail dipisahkan supaya posisi daftar tetap sama saat berpindah proyek. */}
        {isDesktop && (
          <section aria-labelledby={current ? 'project-title' : undefined} className="hidden h-full min-h-0 min-w-0 md:block">
            {current && <ProjectDetailPane key={current.slug} project={current} />}
          </section>
        )}
      </div>

      {!isDesktop && (
        <Drawer open={mobileOpen && Boolean(selected)} onClose={closeMobile} labelledBy="project-title">
          {selected && <ProjectDetailPane key={selected.slug} project={selected} onBack={closeMobile} />}
        </Drawer>
      )}
    </div>
  )
}
