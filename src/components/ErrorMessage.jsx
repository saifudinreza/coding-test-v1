// [UBAH - #6] Dua tampilan sesuai konteks:
// - tanpa onRetry: baris kecil di dalam form (mis. "Email atau password salah")
// - dengan onRetry: kartu di tengah halaman dengan tombol "Coba lagi"
import Button from './Button.jsx'
import { AlertIcon } from './Icons.jsx'

export default function ErrorMessage({ message = 'Terjadi kesalahan.', onRetry }) {
  if (!onRetry) {
    return (
      <p role="alert" className="flex items-start gap-2 rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral-ink">
        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
        {message}
      </p>
    )
  }

  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/10 text-coral-ink">
        <AlertIcon className="h-6 w-6" />
      </span>
      <p className="text-sm">{message}</p>
      <Button variant="outline" onClick={onRetry}>Coba lagi</Button>
    </div>
  )
}
