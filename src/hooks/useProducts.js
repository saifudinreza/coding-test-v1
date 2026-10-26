// [BARU] Hook useProducts: "manajer toko" yang mengurus semua hal soal produk.
//
// Analogi: halaman (ProductsPage) itu seperti pelayan, hanya mengantar dan
// memajang. Manajer toko (hook ini) yang memutuskan: kapan perlu minta barang
// ke kurir, sedang menunggu atau tidak, ada masalah atau tidak, halaman ke berapa.
// Pelayan cukup bertanya ke manajer: "sekarang kondisinya bagaimana?"
import { useEffect, useState } from 'react'
import { PAGE_SIZE, getProducts, searchProducts } from '../services/productService.js'
import { normalizeProducts } from '../utils/productNormalizer.js'

export default function useProducts() {
  const [query, setQuery] = useState('') // kata kunci pencarian yang sedang aktif
  const [page, setPage] = useState(1) // halaman aktif, dimulai dari 1
  const [attempt, setAttempt] = useState(0) // naik 1 setiap kali user klik "Coba lagi"

  // Hasil request terakhir. `key` mencatat "hasil ini jawaban untuk permintaan yang mana".
  const [result, setResult] = useState({ key: null, products: [], total: 0, error: '' })

  // "Nomor tiket" permintaan saat ini. Berubah kalau kata kunci, halaman, ATAU
  // percobaan ulang berubah. Efek di bawah jalan lagi setiap tiket berganti.
  const key = `${query}|${page}|${attempt}`

  // Loading tidak disimpan sebagai state sendiri, tapi DIHITUNG:
  // kalau hasil yang kita pegang belum cocok dengan tiket saat ini, berarti
  // jawabannya belum datang -> sedang loading.
  // Analogi: kamu pesan makanan nomor 7; selama yang ada di meja masih pesanan
  // nomor 6, kamu tahu pesananmu belum jadi.
  const loading = result.key !== key

  useEffect(() => {
    // `ignore` mencegah jawaban basi. Contoh: user klik halaman 2 lalu cepat
    // klik halaman 3. Jawaban halaman 2 yang telat datang tidak boleh menimpa
    // halaman 3. Saat efek dibersihkan (tiket berganti), ignore menjadi true.
    let ignore = false

    const skip = (page - 1) * PAGE_SIZE // halaman 1 -> 0, halaman 2 -> 12, dst.
    const request = query
      ? searchProducts({ q: query, limit: PAGE_SIZE, skip })
      : getProducts({ limit: PAGE_SIZE, skip })

    request
      .then((data) => {
        if (ignore) return
        setResult({
          key,
          // Data mentah dibersihkan dulu oleh "petugas QC" sebelum disimpan.
          products: normalizeProducts(data?.products),
          total: Number(data?.total) || 0, // total tidak valid -> 0, bukan NaN
          error: '',
        })
      })
      .catch(() => {
        if (ignore) return
        // Semua jenis kegagalan (internet mati, server error 500, dll.)
        // disatukan jadi satu pesan ramah untuk user.
        setResult({
          key,
          products: [],
          total: 0,
          error: 'Gagal memuat produk. Periksa koneksi internet lalu coba lagi.',
        })
      })

    return () => {
      ignore = true
    }
  }, [key, query, page])

  // Dipanggil SearchBar. Mencari kata baru selalu mulai dari halaman 1,
  // karena halaman 5 dari hasil lama tidak ada artinya untuk hasil baru.
  function search(term) {
    setQuery(term)
    setPage(1)
  }

  // Tombol "Coba lagi": cukup ganti tiket supaya request diulang.
  function retry() {
    setAttempt((n) => n + 1)
  }

  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE))

  return {
    products: result.products,
    total: result.total, // [BARU - #6] jumlah produk untuk teks ringkasan di header halaman
    // Selama loading, error lama disembunyikan agar tidak berkedip bersamaan dengan Loader.
    error: loading ? '' : result.error,
    loading,
    query,
    page,
    totalPages,
    setPage,
    search,
    retry,
  }
}
