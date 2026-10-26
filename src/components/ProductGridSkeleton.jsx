// [BARU - #6] Kerangka kartu berdenyut selama produk dimuat. Bentuknya sama dengan
// ProductCard, jadi halaman tidak "melompat" saat data asli muncul.
export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div role="status" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      <span className="sr-only">Memuat produk...</span>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden="true" className="flex animate-pulse flex-col gap-3 rounded-3xl bg-surface p-3">
          <div className="aspect-[4/5] rounded-t-full rounded-b-2xl bg-sage-soft" />
          <div className="mx-2 h-3 w-3/4 rounded-full bg-sage-soft" />
          <div className="mx-2 mb-2 h-5 w-1/3 rounded-full bg-sage-soft" />
        </div>
      ))}
    </div>
  )
}
