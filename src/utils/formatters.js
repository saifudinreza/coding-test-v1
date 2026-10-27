// [BARU] Pemformat tampilan: mengubah data mentah jadi teks yang enak dibaca.
// Dipisah dari komponen supaya mudah dipakai ulang dan mudah dites.

// Intl.NumberFormat adalah fitur bawaan browser untuk format mata uang,
// jadi tidak perlu library tambahan. DummyJSON memakai harga dalam dolar (USD).
const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

// 9.99 -> "$9.99". Harga kosong/tidak valid (null) -> "-" sebagai nilai cadangan.
export function formatPrice(price) {
  return price === null ? '-' : priceFormatter.format(price)
}

// 4.5 -> "4.5". Rating kosong (null) -> "-".
export function formatRating(rating) {
  return rating === null ? '-' : rating.toFixed(1)
}

// [BARU - #8] Teks kosong -> "-" sebagai nilai cadangan (mis. produk tanpa brand).
export function formatText(text) {
  return text ? text : '-'
}

// [BARU - #8] Label stok: 12 -> "Tersedia 12", 0 -> "Habis", tidak valid (null) -> "-".
export function formatStock(stock) {
  if (stock === null) return '-'
  return stock > 0 ? `Tersedia ${stock}` : 'Habis'
}

// [BARU - #8] "2025-04-30T09:41:02.053Z" -> "30 April 2025". Tanggal rusak -> "-".
// Intl.DateTimeFormat bawaan browser, jadi tidak butuh library tanggal.
const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatDate(isoString) {
  const date = new Date(isoString)
  return isoString && !Number.isNaN(date.getTime()) ? dateFormatter.format(date) : '-'
}
