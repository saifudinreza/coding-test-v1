// [BARU - #8] Gambar produk besar di dalam bentuk arch (atas melengkung penuh),
// seperti referensi di design.md. Gambar kosong atau gagal dimuat diganti teks pengganti.
// Pemakai memberi `key` (mis. id produk) agar status "gagal" ter-reset saat produk berganti.
import { useState } from 'react'

export default function ArchImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm items-end justify-center overflow-hidden rounded-t-full rounded-b-3xl bg-sage">
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          // mix-blend-multiply: latar putih foto DummyJSON menyatu dengan warna arch
          className="h-[88%] w-[88%] object-contain mix-blend-multiply"
        />
      ) : (
        <span className="self-center text-sm text-ink">Tidak ada gambar</span>
      )}
    </div>
  )
}
