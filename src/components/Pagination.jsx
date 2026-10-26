// [BARU] Tombol pindah halaman: "Sebelumnya" dan "Berikutnya".
//
// Analogi: seperti pembatas halaman di buku. Komponen ini tidak tahu isi bukunya;
// dia hanya tahu kita di halaman berapa dari total berapa, dan memberi tahu
// parent kalau user ingin pindah (lewat onChange).
import Button from './Button.jsx'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons.jsx'

export default function Pagination({ page, totalPages, onChange }) {
  // Hanya ada 1 halaman -> tidak ada yang perlu dipindah, jadi sembunyikan sama sekali.
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4">
      {/* [UBAH - #6] Tombol bulat berisi panah, meniru panah navigasi di referensi.
          aria-label wajib karena tombolnya tidak punya teks. */}
      {/* disabled di halaman pertama/terakhir: mencegah pindah ke halaman yang tidak ada */}
      <Button variant="outline" size="icon" aria-label="Halaman sebelumnya"
        onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <ArrowLeftIcon className="h-5 w-5" />
      </Button>
      <span className="text-sm text-ink-muted">Halaman {page} dari {totalPages}</span>
      <Button variant="outline" size="icon" aria-label="Halaman berikutnya"
        onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
    </nav>
  )
}
