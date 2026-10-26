// [UBAH - #6] Kartu putih bersudut besar tanpa garis tepi. Padding diatur pemakai
// karena tiap kartu punya kebutuhan jarak yang berbeda.
export default function Card({ className = '', ...props }) {
  return <div className={`rounded-3xl bg-surface ${className}`} {...props} />
}
