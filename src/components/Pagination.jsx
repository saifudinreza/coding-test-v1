// [BARU] Tombol pindah halaman: "Sebelumnya" dan "Berikutnya".
//
// Analogi: seperti pembatas halaman di buku. Komponen ini tidak tahu isi bukunya;
// dia hanya tahu kita di halaman berapa dari total berapa, dan memberi tahu
// parent kalau user ingin pindah (lewat onChange).
import Button from './Button.jsx'

export default function Pagination({ page, totalPages, onChange }) {
  // Hanya ada 1 halaman -> tidak ada yang perlu dipindah, jadi sembunyikan sama sekali.
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4">
      {/* disabled di halaman pertama/terakhir: mencegah pindah ke halaman yang tidak ada */}
      <Button onClick={() => onChange(page - 1)} disabled={page <= 1}>Sebelumnya</Button>
      <span className="text-sm text-slate-600">Halaman {page} dari {totalPages}</span>
      <Button onClick={() => onChange(page + 1)} disabled={page >= totalPages}>Berikutnya</Button>
    </nav>
  )
}
