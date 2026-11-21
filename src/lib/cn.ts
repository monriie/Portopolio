/** Menggabungkan nama kelas yang memiliki nilai dan mengabaikan nilai kosong tanpa paket tambahan. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
