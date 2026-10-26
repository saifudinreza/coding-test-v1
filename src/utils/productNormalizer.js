// [BARU] Pembersih data produk: "petugas QC" sebelum barang masuk etalase.
//
// Analogi: kurir (service) membawa barang dari gudang luar. Barangnya bisa saja
// rusak atau labelnya kosong. Sebelum dipajang, petugas QC memeriksa satu per
// satu: yang parah dibuang, yang kurang lengkap diberi label cadangan.
// Dengan begitu komponen UI selalu menerima data yang rapi dan tidak crash.

// Mengubah apa pun menjadi angka yang valid, atau null kalau tidak bisa.
// Number.isFinite menolak NaN dan Infinity; "abc" atau undefined -> null.
function toNumberOrNull(value) {
  const n = Number(value)
  return value !== null && value !== '' && Number.isFinite(n) ? n : null
}

// Membersihkan SATU produk. Mengembalikan null kalau produk tidak layak tampil.
export function normalizeProduct(raw) {
  // Bukan object (null, angka, string, dll.) -> buang.
  if (!raw || typeof raw !== 'object') return null

  // Tanpa id kita tidak bisa memberi `key` unik di React; tanpa title kartunya
  // tidak punya nama. Dua field ini wajib, kalau hilang produknya dibuang.
  const title = typeof raw.title === 'string' ? raw.title.trim() : ''
  if (raw.id == null || !title) return null

  return {
    id: raw.id,
    title,
    // Field berikut boleh kosong: UI akan menampilkan nilai cadangan.
    price: toNumberOrNull(raw.price),
    rating: toNumberOrNull(raw.rating),
    thumbnail: typeof raw.thumbnail === 'string' ? raw.thumbnail : '',
  }
}

// Membersihkan DAFTAR produk. Aman dipanggil dengan data apa pun:
// kalau bukan array (response aneh), hasilnya array kosong, bukan error.
export function normalizeProducts(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(normalizeProduct).filter(Boolean) // filter(Boolean) membuang null
}
