// [BARU] Penjaga pintu: halaman di dalamnya hanya boleh dibuka user yang SUDAH login.
//
// Analogi: seperti satpam di gedung. Kalau kamu punya kartu akses (sudah login),
// kamu dipersilakan masuk (<Outlet />). Kalau tidak, kamu diantar ke meja
// resepsionis (/login). Ini kebalikan dari GuestRoute, yang menolak orang yang
// sudah punya kartu akses masuk ke halaman login/register.
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

export default function ProtectedRoute() {
  const { user } = useAuth()
  // `replace` mengganti riwayat, bukan menambah: tombol Back tidak akan
  // membawa user kembali ke halaman terlarang lalu terpental lagi.
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
