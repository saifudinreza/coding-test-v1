import Card from '../components/Card.jsx'
import useAuth from '../hooks/useAuth.js'

export default function HomePage() {
  // [UBAH] Placeholder lama diganti sapaan sesuai status login.
  const { user } = useAuth()

  return (
    <Card className="space-y-3">
      <h1 className="text-2xl font-bold">
        {user ? `Halo, ${user.username}!` : 'Selamat datang'}
      </h1>
      <p className="text-slate-600">
        {user
          ? `Kamu login sebagai ${user.email}.`
          : 'Silakan login atau register lewat menu di kanan atas.'}
      </p>
    </Card>
  )
}
