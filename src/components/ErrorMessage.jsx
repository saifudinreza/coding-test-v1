import Button from './Button.jsx'

export default function ErrorMessage({ message = 'Terjadi kesalahan.', onRetry }) {
  return (
    <div role="alert" className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4 text-center">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && <Button onClick={onRetry}>Coba lagi</Button>}
    </div>
  )
}
