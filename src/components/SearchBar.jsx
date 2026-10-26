// [BARU] Kotak pencarian. Pencarian dijalankan saat menekan Enter / tombol Cari,
// bukan setiap huruf diketik.
//
// Analogi: seperti bertanya ke petugas toko. Kamu selesaikan kalimatmu dulu baru
// bertanya, bukan menyela setiap kali mengucapkan satu huruf. Ini juga menghemat
// request ke server.
import { useState } from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'

export default function SearchBar({ initialValue = '', onSearch }) {
  // Teks yang sedang diketik disimpan di sini (lokal) dan baru "dilaporkan" ke
  // parent saat form dikirim.
  const [text, setText] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault() // cegah browser me-reload halaman
    // trim() membuang spasi di ujung; pencarian kosong = tampilkan semua produk lagi.
    onSearch(text.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2" role="search">
      <div className="flex-1">
        <Input id="product-search" type="search" placeholder="Cari produk..."
          value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <Button type="submit">Cari</Button>
    </form>
  )
}
