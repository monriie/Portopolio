/** Teks yang tersedia dalam setiap bahasa yang didukung aplikasi. */
export type Localized = { en: string; id: string }

/** Membatasi pilihan bahasa pada bahasa Inggris dan Indonesia. */
export type Locale = 'en' | 'id'

/** Menentukan kategori yang dipakai oleh penyaring dan tampilan proyek. */
export type ProjectCategory = 'qa' | 'ml' | 'frontend' | 'uiux'

/** Menentukan jenis tautan agar aplikasi dapat memilih ikon pendukungnya. */
export type ResourceKind = 'project' | 'live' | 'github' | 'pdf' | 'certificate' | 'case-study'

/** Menyatukan jenis sumber, label dua bahasa, dan alamat tujuan. */
export type Resource = {
  kind: ResourceKind
  label: Localized
  href: string
}

/** Menyimpan nilai hasil atau statistik beserta keterangan dua bahasa. */
export type Metric = {
  value: string
  label: Localized
}

/** Menyimpan alamat foto, teks alternatif untuk aksesibilitas, dan kredit opsional. */
export type GalleryImage = {
  src: string
  alt: Localized
  credit?: string
}

/** Mengelompokkan informasi pekerjaan yang digunakan oleh ringkasan dan panel detail pengalaman. */
export type Experience = {
  id: string
  role: Localized
  company?: string
  stage: Localized
  employmentType?: Localized
  location?: string
  /** Tanggal mulai ditulis sebagai tahun dan bulan yang dipisahkan tanda hubung. */
  start: string
  /** Nilai null menandakan pekerjaan masih berlangsung. */
  end: string | null
  summary: Localized
  responsibilities: Localized[]
  highlights: Metric[]
  gallery: GalleryImage[]
  techStack: string[]
  hardSkills: Localized[]
  softSkills: Localized[]
  resources: Resource[]
}

/** Pasangan label dan nilai untuk menjelaskan fakta sesuai kategori proyek. */
export type ProjectFact = { label: Localized; value: Localized }

/** Menyatukan identitas, studi kasus, hasil, teknologi, dan sumber pendukung sebuah proyek. */
export type Project = {
  /** Identitas unik yang digunakan untuk memilih proyek melalui alamat halaman. */
  slug: string
  title: string
  category: ProjectCategory
  tags: Localized[]
  year: number
  role: Localized
  /** Singkatan nama yang digunakan untuk membuat logo proyek. */
  monogram: string
  /** Alamat tangkapan layar bersifat opsional. Jika kosong, aplikasi membuat ilustrasi sampul. */
  image?: string
  imageAlt?: Localized
  tagline: Localized
  challenge: Localized
  solution: Localized
  impact: Localized
  metrics: Metric[]
  facts: ProjectFact[]
  tech: string[]
  links: Resource[]
}

/** Mengelompokkan keterampilan berdasarkan label yang tersedia dalam dua bahasa. */
export type SkillGroup = {
  id: string
  label: Localized
  skills: string[]
}

/** Menghubungkan bidang keahlian dengan kategori proyek dan penjelasannya. */
export type FocusArea = {
  category: ProjectCategory
  title: Localized
  description: Localized
}
