export default function EmptyState({ message = 'Data tidak ditemukan.' }) {
  return <p className="py-8 text-center text-sm text-slate-500">{message}</p>
}
