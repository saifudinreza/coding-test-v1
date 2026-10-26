// [UBAH - #6] Tombol berbentuk pil dengan beberapa varian:
// - primary: pil hitam, untuk satu aksi utama per area
// - outline: pil putih bergaris, untuk aksi sekunder (retry, pagination)
// - ghost:   tanpa latar, untuk aksi ringan (logout, link)
const VARIANTS = {
  primary: 'bg-ink text-white hover:bg-ink/85',
  outline: 'border border-ink/15 bg-surface text-ink hover:border-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
}

const SIZES = {
  md: 'px-5 py-2.5',
  icon: 'h-11 w-11', // tombol bulat berisi ikon saja
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
}
