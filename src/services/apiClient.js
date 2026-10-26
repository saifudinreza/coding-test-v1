export const BASE_URL = 'https://dummyjson.com'

export async function apiGet(path, params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}${path}${query ? `?${query}` : ''}`)
  if (!res.ok) throw new Error(`Permintaan gagal (${res.status})`)
  return res.json()
}
