// [BARU - #8] Kerangka berdenyut selama detail produk dimuat. Bentuknya sama dengan
// halaman asli (3 kolom di desktop) supaya tampilan tidak "melompat" saat data datang.
export default function ProductDetailSkeleton() {
  return (
    <div role="status" className="grid animate-pulse gap-10 lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] lg:gap-12">
      <span className="sr-only">Memuat detail produk...</span>
      <div aria-hidden="true" className="space-y-5 lg:pt-8">
        <div className="h-7 w-24 rounded-full bg-sage-soft" />
        <div className="h-10 w-4/5 rounded-2xl bg-sage-soft" />
        <div className="h-10 w-3/5 rounded-2xl bg-sage-soft" />
        <div className="h-8 w-28 rounded-full bg-sage-soft" />
        <div className="h-4 w-40 rounded-full bg-sage-soft" />
      </div>
      <div aria-hidden="true" className="order-first mx-auto aspect-[4/5] w-full max-w-sm rounded-t-full rounded-b-3xl bg-sage-soft lg:order-none" />
      <div aria-hidden="true" className="space-y-4 lg:pt-8">
        <div className="h-5 w-full rounded-full bg-sage-soft" />
        <div className="h-5 w-full rounded-full bg-sage-soft" />
        <div className="h-5 w-2/3 rounded-full bg-sage-soft" />
      </div>
    </div>
  )
}
