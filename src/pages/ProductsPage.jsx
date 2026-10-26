// [BARU] Halaman Products: "pelayan" yang menyusun tampilan dari data si manajer (useProducts).
//
// Halaman ini tidak memanggil API sendiri. Dia hanya bertanya ke hook:
// "sedang loading? ada error? produknya mana?" lalu menampilkan komponen yang cocok.
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import Pagination from '../components/Pagination.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import useProducts from '../hooks/useProducts.js'

export default function ProductsPage() {
  const { products, loading, error, query, page, totalPages, setPage, search, retry } = useProducts()

  // Hanya SATU dari empat kondisi ini yang tampil pada satu waktu. Urutannya penting:
  // loading dicek pertama, lalu error, lalu kosong, terakhir baru data normal.
  let content
  if (loading) {
    content = <Loader label="Memuat produk..." />
  } else if (error) {
    // Tombol "Coba lagi" di dalam ErrorMessage memanggil retry() dari hook.
    content = <ErrorMessage message={error} onRetry={retry} />
  } else if (products.length === 0) {
    // Pesan berbeda tergantung penyebabnya: user mencari sesuatu, atau memang tidak ada data.
    content = (
      <EmptyState message={query ? `Tidak ada produk untuk "${query}".` : 'Belum ada produk.'} />
    )
  } else {
    content = (
      <>
        {/* Grid responsif: 2 kolom di HP, 3 di tablet, 4 di layar lebar */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            // key = id unik, supaya React tahu kartu mana yang berubah saat daftar berganti
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      {/* key={query} memaksa kotak pencarian dibuat ulang saat pencarian berubah dari luar */}
      <SearchBar key={query} initialValue={query} onSearch={search} />
      {content}
    </div>
  )
}
