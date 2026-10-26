import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'

export default function HomePage() {
  return (
    <Card className="space-y-3">
      <h1 className="text-2xl font-bold">Pondasi project siap</h1>
      <p className="text-slate-600">React + Tailwind CSS sudah berjalan. Fitur akan ditambahkan di issue berikutnya.</p>
      <Button>Contoh tombol</Button>
    </Card>
  )
}
