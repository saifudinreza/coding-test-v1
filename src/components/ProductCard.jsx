// [BARU] Kartu satu produk. Murni tampilan: hanya menerima data lewat props.
//
// Analogi: ini seperti kartu etalase di toko. Dia hanya menampilkan apa yang
// diberikan; tidak tahu dari mana barangnya datang.
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatPrice, formatRating } from '../utils/formatters.js'
import Card from './Card.jsx'
import { StarIcon } from './Icons.jsx'

export default function ProductCard({ product }) {
  // [BARU - #8] Posisi daftar saat ini (mis. /products?page=3&q=phone) dikirim ke halaman
  // detail lewat state router, supaya tombol "Kembali" membawa user ke daftar yang sama.
  const location = useLocation()
  // Gambar bisa gagal dimuat meski URL-nya ada (link mati). Kita catat kegagalannya
  // lewat onError supaya bisa menampilkan kotak abu-abu pengganti, bukan ikon rusak.
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = product.thumbnail && !imageFailed

  return (
    // [UBAH - #8] Seluruh kartu menjadi link ke halaman detail (bisa diklik dan difokus
    // dengan keyboard). `group` dipindah ke Link supaya efek hover tetap berjalan.
    <Link
      to={`/products/${product.id}`}
      state={{ from: `${location.pathname}${location.search}` }}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
    {/* [UBAH - #6] Kartu naik sedikit + bayangan halus saat hover */}
    <Card className="flex h-full flex-col gap-3 p-3 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-soft">
      {/* [UBAH - #6] Gambar dibingkai bentuk arch (atas melengkung penuh) berlatar sage-soft */}
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-full rounded-b-2xl bg-sage-soft">
        {showImage ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy" // gambar baru dimuat saat hampir terlihat -> halaman terasa lebih cepat
            onError={() => setImageFailed(true)}
            // mix-blend-multiply membuat latar putih foto DummyJSON menyatu dengan warna arch
            className="mt-6 h-4/5 w-4/5 object-contain mix-blend-multiply transition duration-200 group-hover:scale-105"
          />
        ) : (
          <span className="text-xs text-ink-muted">Tidak ada gambar</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
        <h2 className="line-clamp-2 text-sm font-medium">{product.title}</h2>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-display text-xl sm:text-2xl">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-xs font-medium">
            <StarIcon className="h-3.5 w-3.5 text-ink" />
            <span className="sr-only">Rating</span>
            {formatRating(product.rating)}
          </span>
        </div>
      </div>
    </Card>
    </Link>
  )
}
