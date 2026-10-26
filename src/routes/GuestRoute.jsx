// [BARU - PR #3 poin 3] Pembungkus route khusus tamu: halaman di dalamnya
// (/login, /register) hanya untuk user yang BELUM login. Jika sudah login
// dan membuka URL-nya manual, langsung diarahkan ke Home.
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

export default function GuestRoute() {
  const { user } = useAuth()
  // `replace` agar halaman login tidak menumpuk di riwayat (tombol Back tidak balik ke sana).
  return user ? <Navigate to="/" replace /> : <Outlet />
}
