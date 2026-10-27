// [BARU - #8] Hook useProductDetail: "manajer" untuk satu produk, polanya sama
// dengan useProducts (loading dihitung dari "nomor tiket", jawaban basi diabaikan).
import { useEffect, useState } from 'react'
import { getProductById } from '../services/productService.js'
import { normalizeProductDetail } from '../utils/productNormalizer.js'

export default function useProductDetail(id) {
  const [attempt, setAttempt] = useState(0) // naik 1 setiap kali user klik "Coba lagi"
  const [result, setResult] = useState({ key: null, product: null, notFound: false, error: '' })

  // Tiket permintaan: berubah kalau id atau percobaan ulang berubah.
  const key = `${id}|${attempt}`
  const loading = result.key !== key

  useEffect(() => {
    let ignore = false // jawaban untuk id lama tidak boleh menimpa id yang baru

    getProductById(id)
      .then((data) => {
        if (ignore) return
        const product = normalizeProductDetail(data)
        // Response tidak valid (tanpa id/title) diperlakukan sama seperti tidak ditemukan.
        setResult({ key, product, notFound: !product, error: '' })
      })
      .catch((err) => {
        if (ignore) return
        if (err?.status === 404) {
          // Id memang tidak ada: BUKAN error jaringan, jadi tidak perlu tombol "Coba lagi".
          setResult({ key, product: null, notFound: true, error: '' })
        } else {
          setResult({
            key,
            product: null,
            notFound: false,
            error: 'Gagal memuat detail produk. Periksa koneksi internet lalu coba lagi.',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [key, id])

  return {
    product: result.product,
    loading,
    // Selama loading, hasil lama disembunyikan agar tidak berkedip bersama skeleton.
    notFound: loading ? false : result.notFound,
    error: loading ? '' : result.error,
    retry: () => setAttempt((n) => n + 1),
  }
}
