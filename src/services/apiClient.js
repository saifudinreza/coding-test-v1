export const BASE_URL = 'https://dummyjson.com'

export async function apiGet(path, params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}${path}${query ? `?${query}` : ''}`)
  if (!res.ok) {
    // [UBAH - #8] Simpan kode status di error supaya pemanggil bisa membedakan
    // "tidak ditemukan" (404) dari error lain. Pesan lama tidak berubah.
    const error = new Error(`Permintaan gagal (${res.status})`)
    error.status = res.status
    throw error
  }
  return res.json()
}
