/** Menyimpan riwayat yang diberikan pemilik portfolio dari bagian Experience LinkedIn. */

import type { Experience, Localized } from '@/types/portfolio'

const L = (en: string, id: string): Localized => ({ en, id })
const palembang = 'Palembang, Sumatera Selatan, Indonesia'

export const experiences: Experience[] = [
  {
    id: 'hmif-unsri',
    role: L('Staff of Information Technology Development', 'Staf Pengembangan Teknologi Informasi'),
    company: 'Himpunan Mahasiswa Informatika – Universitas Sriwijaya',
    stage: L('Student organization', 'Organisasi mahasiswa'),
    location: palembang,
    start: '2024-02',
    end: '2024-12',
    summary: L('Supported student research events and contributed to UI/UX initiatives.', 'Mendukung kegiatan riset mahasiswa dan berkontribusi pada kegiatan UI/UX.'),
    responsibilities: [
      L('Led the event division for the 2024 Webinar on Research Concentration.', 'Memimpin divisi acara Webinar Konsentrasi Riset 2024.'),
      L('Helped prepare proposals, competition procedures and judging criteria for the SRIFOTON 2024 UI/UX Design competition.', 'Membantu menyusun proposal, mekanisme lomba, dan kriteria penilaian kompetisi UI/UX Design SRIFOTON 2024.'),
      L('Contributed to the UI/UX design of the 2024 HMIF UNSRI website.', 'Berkontribusi pada desain UI/UX situs HMIF UNSRI 2024.'),
      L('Received a Staff of the Month notable mention for June 2024.', 'Meraih Staff of the Month kategori Notable Mention pada Juni 2024.'),
    ],
    highlights: [],
    gallery: [],
    techStack: [],
    hardSkills: [L('UI/UX design', 'Desain UI/UX'), L('Event planning', 'Perencanaan acara')],
    softSkills: [L('Team coordination', 'Koordinasi tim')],
    resources: [],
  },
  {
    id: 'gdgoc-unsri',
    role: L('Frontend Development Member', 'Anggota Frontend Development'),
    company: 'Google Developer Group on Campus: Universitas Sriwijaya',
    stage: L('Developer community', 'Komunitas developer'),
    start: '2025-01',
    end: '2025-11',
    summary: L('Developed web projects through a structured frontend learning program.', 'Mengembangkan proyek web melalui program pembelajaran frontend terstruktur.'),
    responsibilities: [
      L('Completed the internal Tailwind CSS, ES6 JavaScript and React learning path.', 'Menyelesaikan jalur belajar internal Tailwind CSS, JavaScript ES6, dan React.'),
      L('Built and shipped more than ten web projects during the program.', 'Membangun dan merilis lebih dari sepuluh proyek web selama program.'),
      L('Collaborated with backend teams on REST API integration and managed version control through GitHub.', 'Berkolaborasi dengan tim backend untuk integrasi REST API dan mengelola versi melalui GitHub.'),
      L('Helped mentor participants on React concepts and implementation.', 'Membantu mendampingi peserta dalam memahami dan menerapkan React.'),
    ],
    highlights: [{ value: '10+', label: L('Web projects in the program', 'Proyek web selama program') }],
    gallery: [],
    techStack: ['JavaScript ES6', 'React', 'Tailwind CSS', 'REST API', 'GitHub'],
    hardSkills: [L('Frontend development', 'Pengembangan frontend'), L('API integration', 'Integrasi API')],
    softSkills: [L('Mentoring', 'Pendampingan'), L('Cross-team collaboration', 'Kolaborasi lintas tim')],
    resources: [],
  },
  {
    id: 'teaching-assistant',
    role: L('Teaching Assistant', 'Asisten Pengajar'),
    stage: L('Teaching', 'Pengajaran'),
    location: palembang,
    start: '2025-09',
    end: '2026-05',
    summary: L('Supported students in programming, mobile development and pattern recognition practicums.', 'Mendampingi mahasiswa dalam praktikum pemrograman, pengembangan mobile, dan pengenalan pola.'),
    responsibilities: [
      L('Assisted Basic Programming sessions in 2026.', 'Mendampingi praktikum Pemrograman Dasar pada 2026.'),
      L('Assisted Mobile Development and Pattern Recognition sessions in 2025.', 'Mendampingi praktikum Pengembangan Mobile dan Pengenalan Pola pada 2025.'),
      L('Guided students through lab exercises and helped troubleshoot technical issues.', 'Memandu latihan praktikum dan membantu mahasiswa menyelesaikan kendala teknis.'),
    ],
    highlights: [],
    gallery: [],
    techStack: [],
    hardSkills: [L('Troubleshooting', 'Pemecahan masalah teknis')],
    softSkills: [L('Teaching and mentoring', 'Pengajaran dan pendampingan')],
    resources: [],
  },
  {
    id: 'internet-programming-lab',
    role: L('Laboratory Assistant', 'Asisten Laboratorium'),
    company: 'The Internet Programming Laboratory',
    stage: L('Laboratory', 'Laboratorium'),
    location: palembang,
    start: '2025-09',
    end: '2026-07',
    summary: L('Supported Internet Programming practicums and two certification programs.', 'Mendukung praktikum Pemrograman Internet dan dua program sertifikasi.'),
    responsibilities: [
      L('Helped manage and document lab facilities and learning resources.', 'Membantu mengelola dan mendokumentasikan fasilitas serta sumber belajar laboratorium.'),
      L('Contributed to the preparation of practicum modules.', 'Berkontribusi dalam penyiapan modul praktikum.'),
      L('Helped organize NVIDIA Certification Batch 1 in April 2026 and Zahir Accounting Certification Batch 2 in July 2026.', 'Membantu menyelenggarakan NVIDIA Certification Batch 1 pada April 2026 dan Zahir Accounting Certification Batch 2 pada Juli 2026.'),
      L('Coordinated participant administration and training and selection logistics with faculty.', 'Mengoordinasikan administrasi peserta serta operasional pelatihan dan seleksi bersama dosen.'),
    ],
    highlights: [{ value: '2', label: L('Certification programs supported', 'Program sertifikasi yang didukung') }],
    gallery: [],
    techStack: [],
    hardSkills: [L('Practicum documentation', 'Dokumentasi praktikum')],
    softSkills: [L('Program coordination', 'Koordinasi program')],
    resources: [],
  },
  {
    id: 'bank-sumsel-babel',
    role: L('Operations & Services', 'Operasional & Pelayanan'),
    company: 'Bank Sumsel Babel',
    stage: L('Banking operations', 'Operasional perbankan'),
    location: palembang,
    start: '2025-12',
    end: '2026-01',
    summary: L('Supported banking operations and gathered requirements for EDC monitoring.', 'Mendukung operasional bank dan menggali kebutuhan pemantauan EDC.'),
    responsibilities: [
      L('Interviewed senior staff to map workflows and job functions.', 'Mewawancarai staf senior untuk memetakan alur kerja dan fungsi pekerjaan.'),
      L('Helped reconcile daily EDC data and track equipment status across divisions.', 'Membantu rekonsiliasi data EDC harian dan pelacakan status perangkat lintas divisi.'),
      L('Supported monthly and year-end bookkeeping and classified transaction documents.', 'Mendukung pembukuan bulanan dan akhir tahun serta mengelompokkan dokumen transaksi.'),
      L('Helped recap incoming foreign transactions and document inbound mail.', 'Membantu merekap transaksi luar negeri masuk dan mendokumentasikan surat masuk.'),
    ],
    highlights: [],
    gallery: [],
    techStack: [],
    hardSkills: [L('Requirements analysis', 'Analisis kebutuhan'), L('Data reconciliation', 'Rekonsiliasi data')],
    softSkills: [L('Stakeholder interviews', 'Wawancara pemangku kepentingan')],
    resources: [{ kind: 'project', label: L('Monitoring EDC', 'Monitoring EDC'), href: '/projects?project=monitoring-edc' }],
  },
]

// Ringkasan awal memakai pengalaman dengan akhir paling baru tanpa mengubah urutan timeline.
export const latestExperienceIndex = experiences.reduce(
  (latest, experience, index) =>
    (experience.end ?? '9999-12') >= (experiences[latest].end ?? '9999-12') ? index : latest,
  0,
)
