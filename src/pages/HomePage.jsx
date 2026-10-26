import { useNavigate } from 'react-router-dom'
import ArchPanel from '../components/ArchPanel.jsx'
import Button from '../components/Button.jsx'
import Highlight from '../components/Highlight.jsx'
import { ArrowRightIcon } from '../components/Icons.jsx'
import useAuth from '../hooks/useAuth.js'

export default function HomePage() {
  // [UBAH] Placeholder lama diganti sapaan sesuai status login.
  const { user } = useAuth()
  const navigate = useNavigate()

  // [UBAH - #6] Layout 2 kolom seperti halaman auth: teks + aksi di kiri, panel visual di kanan.
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <section className="space-y-6">
        <h1 className="font-display text-[2.5rem] font-extrabold leading-[0.95] tracking-tight [overflow-wrap:anywhere] lg:text-[4rem]">
          {user ? (
            <>Halo,<br /><Highlight>{user.username}</Highlight></>
          ) : (
            <>Jelajahi<br />katalog<br /><Highlight>produk</Highlight></>
          )}
        </h1>
        <p className="max-w-sm text-sm text-ink-muted">
          {user
            ? `Kamu login sebagai ${user.email}. Lihat katalog produk dari DummyJSON.`
            : 'Login atau buat akun untuk melihat katalog produk dari DummyJSON.'}
        </p>
        <div className="flex flex-wrap gap-3">
          {user ? (
            <Button onClick={() => navigate('/products')}>
              Lihat produk <ArrowRightIcon />
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>Login</Button>
              <Button variant="outline" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </div>
      </section>
      <ArchPanel className="hidden min-h-[30rem] lg:block" />
    </div>
  )
}
