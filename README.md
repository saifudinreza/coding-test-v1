# Coding Test v1: Katalog Produk dengan Autentikasi

Aplikasi web sederhana untuk coding test posisi **Front-End Engineer**. User bisa **register**, **login**, lalu menjelajahi **katalog produk dari [DummyJSON](https://dummyjson.com/docs/products)** dengan pencarian dan pagination. Dibangun dengan **React + Tailwind CSS**, tanpa backend sendiri.

## Fitur

**Autentikasi (simulasi, tanpa backend)**
- Register dengan username, email, dan password. Email yang sudah terdaftar ditolak.
- Login dengan email dan password; status login bertahan setelah halaman di-refresh.
- Logout satu klik dari header.
- Password disimpan sebagai **hash bcrypt**, bukan teks asli.
- Validasi form di sisi client: field wajib, format email, password minimal 6 karakter saat register.

**Katalog produk (DummyJSON)**
- Grid kartu produk: gambar, nama, harga, rating.
- Pencarian produk dan pagination (12 produk per halaman).
- **Halaman detail produk** (`/products/:id`): gambar besar dalam bentuk arch, judul, harga, rating, brand, kategori, stok, serta accordion Description / Details / Reviews. Tombol **Kembali** membawa user ke halaman dan pencarian yang sama seperti sebelumnya.
- Hanya bisa dibuka setelah login (*protected route*). User yang sudah login tidak bisa membuka halaman login/register lagi (*guest route*).

**Penanganan state**
| Kondisi | Tampilan |
|---|---|
| Loading | Skeleton kartu yang berdenyut |
| Error (jaringan / server) | Pesan error + tombol **Coba lagi** |
| Data kosong | Empty state + tombol **Hapus pencarian** |
| Data tidak valid | Produk tanpa `id`/`title` dibuang; harga/rating/brand kosong tampil `-`; gambar rusak diganti placeholder |
| Produk tidak ditemukan (detail) | Pesan "Produk tidak ditemukan." + tombol kembali (dibedakan dari error jaringan lewat status 404) |

## Menjalankan Aplikasi

Prasyarat: **Node.js 20.19+ atau 22.12+** dan npm.

```bash
git clone https://github.com/saifudinreza/coding-test-v1.git
cd coding-test-v1
npm install
npm run dev        # buka http://localhost:5173
```

Perintah lain:
```bash
npm run build      # build production ke folder dist/
npm run preview    # menjalankan hasil build
npm run lint       # cek kualitas kode dengan ESLint
```

### Cara mencoba
Belum ada akun bawaan; data user tersimpan di browser masing-masing.
1. Buka `/register`, isi username, email, dan password (minimal 6 karakter).
2. Setelah berhasil, login dengan email dan password tadi; kamu langsung masuk ke `/products`.
3. Cari produk (mis. `phone`), pindah halaman, atau cari kata acak untuk melihat empty state.
4. Klik salah satu kartu untuk membuka detail produk; buka-tutup accordion; lalu klik **Kembali ke daftar produk** (halaman dan pencarian tetap). Coba juga `/products/99999` untuk melihat "Produk tidak ditemukan."
5. Untuk melihat tampilan error: matikan internet, muat ulang halaman, lalu klik **Coba lagi** setelah internet menyala.
6. Coba juga skenario gagal: register dengan email yang sama (*"User sudah terdaftar"*) dan login dengan password salah (*"Email atau password salah"*).

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| **React 19** (JavaScript) | Library UI |
| **Vite** | Build tool dan dev server |
| **Tailwind CSS 4** | Styling dengan design tokens (`@theme`) |
| **Fetch API** | Request ke DummyJSON (tanpa Axios) |
| **ESLint** | Menjaga kualitas dan konsistensi kode |
| **Git + GitHub** | Version control; setiap fitur dikerjakan lewat issue, branch, dan pull request |

**Library tambahan dan alasannya**
- **`react-router-dom`**: routing antar halaman serta `ProtectedRoute` dan `GuestRoute` untuk membatasi akses halaman.
- **`bcryptjs`**: hashing password sebelum disimpan. Versi pure JavaScript sehingga berjalan di browser tanpa native build.

## Arsitektur

Prinsip utamanya: **logic dipisah dari UI**. Komponen hanya menerima props dan menampilkan; pengambilan data, validasi, dan state ada di lapisan sendiri.

```
pages/      Halaman: menyusun komponen sesuai state (loading / error / kosong / data)
   │
hooks/      State dan logic: useAuth, useProducts
   │
services/   Akses data: authService (localStorage), productService (DummyJSON)
   │
utils/      Fungsi murni: validasi form, normalisasi data produk, format harga/rating
```

Alur data halaman produk:
`ProductsPage` → `useProducts()` → `productService` (fetch) → `productNormalizer` (bersihkan data) → `ProductCard`

Alur data halaman detail:
`ProductDetailPage` → `useProductDetail(id)` → `productService.getProductById` → `normalizeProductDetail` → `Accordion` / `ArchImage` / `ReviewList`

Alur autentikasi:
`LoginPage` / `RegisterPage` → `useAuth()` (`AuthProvider`) → `authService` → `localStorage`

### Struktur folder
```
src/
  components/   Komponen UI reusable (Button, Input, Card, ProductCard, SearchBar,
                Pagination, Accordion, ReviewList, ErrorMessage, EmptyState, skeleton, layout, ikon)
  pages/        Halaman: Home, Login, Register, Products, ProductDetail, 404
  hooks/        AuthProvider + useAuth, useProducts, useProductDetail
  services/     apiClient (base URL DummyJSON), authService, productService
  utils/        validators, productNormalizer, formatters
  routes/       AppRoutes, ProtectedRoute, GuestRoute
  index.css     Design tokens (warna, font, bayangan)
```

## Keputusan Teknis

- **Auth tanpa backend.** Soal tidak meminta backend, jadi `authService` adalah *mock API* di `localStorage`. Bentuk request/response-nya meniru API sungguhan (`{ id, username, email, response }` atau `{ error }`), sehingga nanti cukup isi service-nya yang diganti tanpa menyentuh UI.
- **Pesan login gagal yang sama** untuk email tidak ditemukan dan password salah, agar tidak membocorkan email mana yang terdaftar.
- **Logout tanpa input ulang.** User sudah dikenali lewat sesi yang tersimpan, jadi cukup satu klik.
- **Normalisasi data produk** di `utils/productNormalizer.js` sebelum data sampai ke UI, sehingga data API yang tidak lengkap tidak membuat aplikasi crash.
- **Response basi diabaikan.** Jika user berpindah halaman dengan cepat, jawaban request lama tidak akan menimpa data halaman yang baru.
- **Halaman dan kata pencarian disimpan di URL** (`/products?q=phone&page=2`). Hasilnya tombol Kembali dari halaman detail mengembalikan user ke daftar yang sama, dan URL daftar bisa dibagikan.
- **404 dibedakan dari error jaringan.** `apiClient` menyimpan status HTTP pada error, sehingga id yang tidak ada menampilkan "Produk tidak ditemukan." (tanpa tombol "Coba lagi"), sedangkan gangguan jaringan menampilkan pesan error dengan tombol retry.
- **Accordion aksesibel:** memakai `<button>` dengan `aria-expanded`, bisa dioperasikan dengan keyboard, dan isi panel yang tertutup tidak bisa difokus (`inert`).
- **Animasi perpindahan halaman** murni CSS (tanpa library), dan otomatis mati jika user mengaktifkan *reduce motion*.
- **Pencarian dijalankan saat Enter / klik Cari**, bukan setiap huruf diketik, untuk menghemat request.
- **Design tokens** di `index.css`: komponen memakai kelas seperti `bg-ink` dan `font-display`, bukan kode warna langsung, sehingga tema mudah diubah di satu tempat.

## Desain UI

Tema bersih dan lapang terinspirasi dari gaya halaman produk modern: judul display besar (font **Outfit**), teks body **Inter**, latar abu kehijauan dengan cahaya lembut, tombol dan input berbentuk pil, serta bentuk *arch* sebagai bingkai gambar produk. Responsif dari lebar 360px hingga desktop. Detail lengkap ada di [`design.md`](design.md).

Aksesibilitas yang diperhatikan: kontras teks memenuhi WCAG AA, pesan error terhubung ke input untuk screen reader, tombol ikon memiliki label, dan animasi menghormati pengaturan *reduce motion*.

## Keterbatasan dan Pengembangan Selanjutnya

- Autentikasi masih simulasi di browser: data user hanya ada di browser tersebut dan bukan pengganti backend yang aman.
- Belum ada automated test (unit / integration).
- Ide fitur lanjutan: filter kategori dan galeri gambar pada halaman detail. Sengaja tidak ada keranjang atau tombol beli: proyek ini berhenti sampai detail produk.

## Riwayat Pengerjaan

Setiap tahap dikerjakan lewat issue dan pull request:
- [#1](https://github.com/saifudinreza/coding-test-v1/issues/1) Pondasi project
- [#2](https://github.com/saifudinreza/coding-test-v1/issues/2) Register, login, logout → [PR #3](https://github.com/saifudinreza/coding-test-v1/pull/3)
- [#4](https://github.com/saifudinreza/coding-test-v1/issues/4) Halaman produk dan protected route → [PR #5](https://github.com/saifudinreza/coding-test-v1/pull/5)
- [#6](https://github.com/saifudinreza/coding-test-v1/issues/6) UI improvement → [PR #7](https://github.com/saifudinreza/coding-test-v1/pull/7)
- [#8](https://github.com/saifudinreza/coding-test-v1/issues/8) Halaman detail produk
