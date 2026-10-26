// [BARU] Kartu satu produk. Murni tampilan: hanya menerima data lewat props.
//
// Analogi: ini seperti kartu etalase di toko. Dia hanya menampilkan apa yang
// diberikan; tidak tahu dari mana barangnya datang.
import { useState } from 'react'
import { formatPrice, formatRating } from '../utils/formatters.js'
import Card from './Card.jsx'

export default function ProductCard({ product }) {
  // Gambar bisa gagal dimuat meski URL-nya ada (link mati). Kita catat kegagalannya
  // lewat onError supaya bisa menampilkan kotak abu-abu pengganti, bukan ikon rusak.
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = product.thumbnail && !imageFailed

  return (
    <Card className="flex flex-col gap-2">
      {showImage ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy" // gambar baru dimuat saat hampir terlihat -> halaman terasa lebih cepat
          onError={() => setImageFailed(true)}
          className="aspect-square w-full rounded-md bg-slate-100 object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400">
          Tidak ada gambar
        </div>
      )}
      <h2 className="line-clamp-2 text-sm font-medium">{product.title}</h2>
      <div className="mt-auto flex items-center justify-between text-sm">
        <span className="font-semibold">{formatPrice(product.price)}</span>
        <span className="text-slate-500">★ {formatRating(product.rating)}</span>
      </div>
    </Card>
  )
}
