// [BARU] Service produk: "kurir" yang pergi ke DummyJSON mengambil data produk.
//
// Analogi: service ini seperti kurir. Kurir cuma tahu satu hal: pergi ke alamat
// yang tepat dan membawa barangnya pulang. Dia TIDAK peduli barangnya mau
// dipajang seperti apa di etalase (itu urusan komponen UI).
// Karena itu di sini tidak ada React sama sekali, murni ambil data.
import { apiGet } from './apiClient.js'

// Berapa produk per halaman. Disimpan sebagai konstanta supaya hook dan service
// memakai angka yang sama (kalau mau ganti jadi 20, cukup ubah di satu tempat).
export const PAGE_SIZE = 12

// Mengambil daftar produk biasa.
// `skip` = "lewati sebanyak ini produk dari awal". Halaman 1 -> skip 0,
// halaman 2 -> skip 12, halaman 3 -> skip 24, dan seterusnya (diatur oleh hook).
export function getProducts({ limit = PAGE_SIZE, skip = 0 } = {}) {
  return apiGet('/products', { limit, skip })
}

// [BARU - #8] Mengambil SATU produk lengkap berdasarkan id.
// Id yang tidak ada dibalas DummyJSON dengan status 404 (error.status === 404).
// encodeURIComponent mengamankan id dari URL (mis. "../" atau spasi) karena id
// diambil langsung dari alamat yang bisa diketik user.
export function getProductById(id) {
  return apiGet(`/products/${encodeURIComponent(id)}`)
}

// Mencari produk berdasarkan kata kunci `q`.
// Bentuk response-nya sama persis dengan getProducts, jadi UI tidak perlu
// membedakan keduanya.
export function searchProducts({ q, limit = PAGE_SIZE, skip = 0 }) {
  return apiGet('/products/search', { q, limit, skip })
}
