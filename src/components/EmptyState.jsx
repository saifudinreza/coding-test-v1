// [UBAH - #6] Bentuk arch kosong sebagai ilustrasi + pesan. `children` untuk aksi
// opsional, mis. tombol "Hapus pencarian" atau link kembali ke beranda.
export default function EmptyState({ message = 'Data tidak ditemukan.', children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-10 text-center">
      <div aria-hidden="true" className="h-28 w-24 rounded-t-full rounded-b-2xl bg-sage-soft" />
      <p className="text-sm text-ink-muted">{message}</p>
      {children}
    </div>
  )
}
