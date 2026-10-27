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

// [BARU - #8] Teks apa pun -> string rapi; selain string (undefined, angka, dll.) -> ''.
// String kosong nanti ditampilkan sebagai "-" oleh UI (lihat formatText).
function toText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

// [BARU - #8] Membersihkan SATU ulasan. Ulasan rusak (bukan object, atau tanpa
// komentar DAN tanpa rating) dibuang. Email reviewer sengaja tidak dibawa:
// itu data pribadi dan tidak perlu ditampilkan.
function normalizeReview(raw) {
  if (!raw || typeof raw !== 'object') return null
  const comment = toText(raw.comment)
  const rating = toNumberOrNull(raw.rating)
  if (!comment && rating === null) return null
  return {
    reviewerName: toText(raw.reviewerName) || 'Anonim',
    rating,
    comment,
    date: toText(raw.date),
  }
}

// [BARU - #8] Membersihkan SATU produk untuk halaman detail. Memakai ulang
// normalizeProduct (aturan id/title/harga/rating yang sama), lalu menambah
// field detail. Mengembalikan null kalau produknya tidak layak tampil.
export function normalizeProductDetail(raw) {
  const base = normalizeProduct(raw)
  if (!base) return null

  // Gambar utama: gambar pertama dari `images`, kalau tidak ada pakai thumbnail.
  const images = Array.isArray(raw.images) ? raw.images.filter((src) => typeof src === 'string' && src) : []

  return {
    ...base,
    image: images[0] || base.thumbnail,
    brand: toText(raw.brand), // banyak produk DummyJSON tidak punya brand
    category: toText(raw.category),
    description: toText(raw.description),
    stock: toNumberOrNull(raw.stock),
    warranty: toText(raw.warrantyInformation),
    shipping: toText(raw.shippingInformation),
    reviews: Array.isArray(raw.reviews) ? raw.reviews.map(normalizeReview).filter(Boolean) : [],
  }
}

// Membersihkan DAFTAR produk. Aman dipanggil dengan data apa pun:
// kalau bukan array (response aneh), hasilnya array kosong, bukan error.
export function normalizeProducts(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(normalizeProduct).filter(Boolean) // filter(Boolean) membuang null
}
