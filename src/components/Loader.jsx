// [UBAH - #6] Spinner umum dengan warna tema. Untuk grid produk dipakai
// ProductGridSkeleton supaya bentuk halaman tidak "melompat" saat data datang.
export default function Loader({ label = 'Memuat...' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-ink-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-sage-soft border-t-ink" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
