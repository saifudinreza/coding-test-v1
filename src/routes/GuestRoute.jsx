// [BARU - PR #3 poin 3] Pembungkus route khusus tamu: halaman di dalamnya
// (/login, /register) hanya untuk user yang BELUM login. Jika sudah login
// dan membuka URL-nya manual, langsung diarahkan ke Home.
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

export default function GuestRoute() {
  const { user } = useAuth()
  // `replace` agar halaman login tidak menumpuk di riwayat (tombol Back tidak balik ke sana).
  // [UBAH] Tujuannya sekarang /products (bukan Home), sama dengan tujuan setelah login.
  // Penting: begitu login berhasil, state `user` terisi dan komponen ini ikut
  // mengalihkan. Kalau tujuannya beda dengan navigate() di LoginPage, dua
  // perintah pindah halaman akan "berebut".
  return user ? <Navigate to="/products" replace /> : <Outlet />
}
