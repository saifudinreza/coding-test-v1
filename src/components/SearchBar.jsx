// [BARU] Kotak pencarian. Pencarian dijalankan saat menekan Enter / tombol Cari,
// bukan setiap huruf diketik.
//
// Analogi: seperti bertanya ke petugas toko. Kamu selesaikan kalimatmu dulu baru
// bertanya, bukan menyela setiap kali mengucapkan satu huruf. Ini juga menghemat
// request ke server.
import { useState } from 'react'
import Button from './Button.jsx'
import { SearchIcon } from './Icons.jsx'
import Input from './Input.jsx'

export default function SearchBar({ initialValue = '', onSearch, className = '' }) {
  // Teks yang sedang diketik disimpan di sini (lokal) dan baru "dilaporkan" ke
  // parent saat form dikirim.
  const [text, setText] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault() // cegah browser me-reload halaman
    // trim() membuang spasi di ujung; pencarian kosong = tampilkan semua produk lagi.
    onSearch(text.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`} role="search">
      {/* [UBAH - #6] Ikon kaca pembesar di dalam input pil */}
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <Input id="product-search" type="search" aria-label="Cari produk" placeholder="Cari produk..."
          className="pl-11" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <Button type="submit">Cari</Button>
    </form>
  )
}
