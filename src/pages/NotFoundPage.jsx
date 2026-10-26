import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'

// [UBAH - #6] Angka 404 besar dengan font display + empty state bertema.
export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="text-center">
      <p className="font-display text-7xl font-extrabold tracking-tight sm:text-8xl">404</p>
      <EmptyState message="Halaman tidak ditemukan.">
        <Button variant="outline" onClick={() => navigate('/')}>Kembali ke beranda</Button>
      </EmptyState>
    </div>
  )
}
