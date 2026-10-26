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
