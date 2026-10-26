// [BARU] Hook untuk mengakses state dan aksi auth dari komponen mana pun.
// Contoh: const { user, login, logout, loading } = useAuth()
import { useContext } from 'react'
import { AuthContext } from './authContext.js'

export default function useAuth() {
  const ctx = useContext(AuthContext)
  // Pengaman: memberi pesan jelas jika lupa membungkus aplikasi dengan <AuthProvider>.
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}
