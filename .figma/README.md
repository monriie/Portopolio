Berkas templat Figma

Folder ini menyimpan skrip dan konfigurasi dari templat Figma Make sebelumnya. Menjalankan portfolio di Windows memakai dev.cmd pada folder utama. Petunjuk penerapan proyek saat ini tersedia dalam README.md pada folder utama.

Skrip install memasang dependensi melalui pnpm. Skrip format menjalankan pemformat kode, langserver menjalankan layanan bahasa TypeScript, dan analyze-routes memanggil alat analisis rute milik Figma.

Skrip deploy dan deploy-preview membuat hasil produksi lalu memanggil alat penerapan Figma. Skrip tersebut memerlukan lingkungan Figma dan tidak digunakan oleh langkah penerapan Vercel dalam dokumentasi proyek ini.

Skrip dev masih memuat percobaan pembuatan peta impor admin dari templat Payload lama. Perintah itu sudah tidak tersedia dalam package.json. Kegagalannya dilewati sebelum perintah pengembangan dijalankan. Peluncur Windows dev.cmd tidak menggunakan skrip ini.

Berkas JSON dalam folder make menyimpan pengaturan templat dan dibiarkan mengikuti format yang dibaca oleh alat. Gambar ikon dan gambar pratinjau dapat dilayani oleh route aset lama apabila berkasnya tersedia.

Komentar dan keterangan folder ini menggunakan bahasa Indonesia. Nama perintah, kunci konfigurasi, dan penanda skrip tetap mengikuti format perangkat lunak yang membacanya.
