import { Link, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import Button from './Button.jsx'

export default function Layout() {
  // [UBAH] Header sekarang bergantung pada status login.
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    const result = await logout()
    // Setelah logout, ke halaman Login membawa pesan "User berhasil logout".
    navigate('/login', { state: { message: result.response } })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-semibold">Coding Test</Link>
          {/* [BARU] Sudah login: nama + tombol Logout (langsung keluar). Belum: link Login/Register. */}
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span>{user.username}</span>
              <Button onClick={handleLogout} disabled={loading}>Logout</Button>
            </div>
          ) : (
            <nav className="flex gap-3 text-sm">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </nav>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
