import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <EmptyState message="Halaman tidak ditemukan." />
      <Link to="/" className="text-indigo-600 hover:underline">Kembali ke beranda</Link>
    </div>
  )
}
