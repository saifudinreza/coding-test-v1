// [BARU] Provider yang memegang state auth: siapa yang sedang login dan
// status loading. Halaman/komponen cukup memanggil useAuth(); mereka tidak
// perlu tahu detail localStorage (itu urusan authService).
import { useState } from 'react'
import * as authService from '../services/authService.js'
import { AuthContext } from './authContext.js'

export default function AuthProvider({ children }) {
  // Nilai awal diambil dari sesi tersimpan -> login bertahan setelah refresh.
  const [user, setUser] = useState(() => authService.getSession())
  const [loading, setLoading] = useState(false)

  // Pembungkus umum: set loading selama request berjalan, lalu kembalikan response.
  async function run(request) {
    setLoading(true)
    try {
      return await request()
    } finally {
      setLoading(false)
    }
  }

  // Semua fungsi mengembalikan response mentah ({ error } atau { response, ... })
  // supaya halaman bisa menampilkan pesannya sendiri.
  const register = (data) => run(() => authService.register(data))

  const login = (data) =>
    run(async () => {
      const result = await authService.login(data)
      // Hanya jika sukses (tidak ada `error`) simpan user ke state.
      if (!result.error) {
        setUser({ id: result.id, username: result.username, email: result.email })
      }
      return result
    })

  // Logout tanpa input apa pun: user sudah dikenali lewat sesi yang tersimpan.
  const logout = () =>
    run(async () => {
      const result = await authService.logout()
      if (!result.error) setUser(null)
      return result
    })

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
