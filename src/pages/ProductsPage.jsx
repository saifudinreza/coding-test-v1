// [BARU] Halaman Products: "pelayan" yang menyusun tampilan dari data si manajer (useProducts).
//
// Halaman ini tidak memanggil API sendiri. Dia hanya bertanya ke hook:
// "sedang loading? ada error? produknya mana?" lalu menampilkan komponen yang cocok.
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Highlight from '../components/Highlight.jsx'
import Pagination from '../components/Pagination.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductGridSkeleton from '../components/ProductGridSkeleton.jsx'
import SearchBar from '../components/SearchBar.jsx'
import useProducts from '../hooks/useProducts.js'

export default function ProductsPage() {
  const { products, total, loading, error, query, page, totalPages, setPage, search, retry } = useProducts()

  // Hanya SATU dari empat kondisi ini yang tampil pada satu waktu. Urutannya penting:
  // loading dicek pertama, lalu error, lalu kosong, terakhir baru data normal.
  let content
  if (loading) {
    // [UBAH - #6] Skeleton kartu menggantikan spinner
    content = <ProductGridSkeleton />
  } else if (error) {
    // Tombol "Coba lagi" di dalam ErrorMessage memanggil retry() dari hook.
    content = <ErrorMessage message={error} onRetry={retry} />
  } else if (products.length === 0) {
    // Pesan berbeda tergantung penyebabnya: user mencari sesuatu, atau memang tidak ada data.
    content = (
      <EmptyState message={query ? `Tidak ada produk untuk "${query}".` : 'Belum ada produk.'}>
        {/* [BARU - #6] Jalan keluar cepat dari pencarian yang tidak menemukan apa pun */}
        {query && <Button variant="outline" onClick={() => search('')}>Hapus pencarian</Button>}
      </EmptyState>
    )
  } else {
    content = (
      <div className="space-y-10">
        {/* Grid responsif: 2 kolom di HP, 3 di tablet, 4 di layar lebar */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            // key = id unik, supaya React tahu kartu mana yang berubah saat daftar berganti
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    )
  }

  // [BARU - #6] Teks ringkasan di bawah judul, mis. `23 hasil untuk "phone"`.
  let summary = 'Memuat produk...'
  if (!loading) {
    if (error) summary = 'Produk belum bisa dimuat.'
    else summary = query ? `${total} hasil untuk "${query}"` : `${total} produk dari DummyJSON`
  }

  return (
    <div className="space-y-10">
      {/* [UBAH - #6] Judul display besar dengan aksen; search bar di kanan (desktop) atau di bawah (HP) */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <h1 className="font-display text-[2.25rem] font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-[4rem]">
            Temukan<br />produk <Highlight className="ml-2">favorit</Highlight>
          </h1>
          <p className="text-sm text-ink-muted" aria-live="polite">{summary}</p>
        </div>
        {/* key={query} memaksa kotak pencarian dibuat ulang saat pencarian berubah dari luar */}
        <SearchBar key={query} initialValue={query} onSearch={search} className="w-full lg:max-w-md" />
      </div>
      {content}
    </div>
  )
}
