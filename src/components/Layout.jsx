import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import Button from './Button.jsx'

// [UBAH - #6] Gaya link berbentuk pil, dipakai untuk menu navigasi di header.
const navLinkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition duration-150 ${isActive ? 'bg-ink/5' : 'hover:bg-ink/5'}`

export default function Layout() {
  // [UBAH] Header sekarang bergantung pada status login.
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // [BARU - #8] Setiap pindah halaman, kembali ke atas. Tanpa ini, user yang membuka
  // detail dari kartu di bagian bawah daftar akan "mendarat" di tengah/bawah halaman.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  async function handleLogout() {
    const result = await logout()
    // Setelah logout, ke halaman Login membawa pesan "User berhasil logout".
    navigate('/login', { state: { message: result.response } })
  }

  return (
    <div className="min-h-screen">
      {/* [UBAH - #6] Header transparan di atas latar, tanpa garis bawah tebal */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          Coding Test<span className="text-mint">.</span>
        </Link>
        {/* [BARU] Sudah login: nama + tombol Logout (langsung keluar). Belum: link Login/Register. */}
        {user ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            {/* [BARU] Link Products hanya muncul untuk user login, sesuai pintu yang dijaga ProtectedRoute */}
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            {/* Chip nama user disembunyikan di HP supaya header tidak terpotong */}
            <span className="hidden items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-xs font-medium sm:inline-flex">
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-soft uppercase">
                {user.username.charAt(0)}
              </span>
              {user.username}
            </span>
            <Button variant="ghost" onClick={handleLogout} disabled={loading}>Logout</Button>
          </nav>
        ) : (
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            <NavLink to="/register" className={navLinkClass}>Register</NavLink>
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-10">
        {/* [BARU - #8] key = path: setiap pindah halaman, pembungkus ini dibuat ulang sehingga
            animasi animate-page-in berjalan lagi. Pindah halaman daftar (?page=2) memakai path
            yang sama, jadi tidak ikut beranimasi. */}
        <div key={pathname} className="animate-page-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
