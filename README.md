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
- Hanya bisa dibuka setelah login (*protected route*). User yang sudah login tidak bisa membuka halaman login/register lagi (*guest route*).

**Penanganan state**
| Kondisi | Tampilan |
|---|---|
| Loading | Skeleton kartu yang berdenyut |
| Error (jaringan / server) | Pesan error + tombol **Coba lagi** |
| Data kosong | Empty state + tombol **Hapus pencarian** |
| Data tidak valid | Produk tanpa `id`/`title` dibuang; harga/rating kosong tampil `-`; gambar rusak diganti placeholder |

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
4. Untuk melihat tampilan error: matikan internet, muat ulang halaman, lalu klik **Coba lagi** setelah internet menyala.
5. Coba juga skenario gagal: register dengan email yang sama (*"User sudah terdaftar"*) dan login dengan password salah (*"Email atau password salah"*).

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

Alur autentikasi:
`LoginPage` / `RegisterPage` → `useAuth()` (`AuthProvider`) → `authService` → `localStorage`

### Struktur folder
```
src/
  components/   Komponen UI reusable (Button, Input, Card, ProductCard, SearchBar,
                Pagination, ErrorMessage, EmptyState, skeleton, layout, ikon)
  pages/        Halaman: Home, Login, Register, Products, 404
  hooks/        AuthProvider + useAuth, useProducts
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
- **Pencarian dijalankan saat Enter / klik Cari**, bukan setiap huruf diketik, untuk menghemat request.
- **Design tokens** di `index.css`: komponen memakai kelas seperti `bg-ink` dan `font-display`, bukan kode warna langsung, sehingga tema mudah diubah di satu tempat.

## Desain UI

Tema bersih dan lapang terinspirasi dari gaya halaman produk modern: judul display besar (font **Outfit**), teks body **Inter**, latar abu kehijauan dengan cahaya lembut, tombol dan input berbentuk pil, serta bentuk *arch* sebagai bingkai gambar produk. Responsif dari lebar 360px hingga desktop. Detail lengkap ada di [`design.md`](design.md).

Aksesibilitas yang diperhatikan: kontras teks memenuhi WCAG AA, pesan error terhubung ke input untuk screen reader, tombol ikon memiliki label, dan animasi menghormati pengaturan *reduce motion*.

## Keterbatasan dan Pengembangan Selanjutnya

- Autentikasi masih simulasi di browser: data user hanya ada di browser tersebut dan bukan pengganti backend yang aman.
- Belum ada automated test (unit / integration).
- Ide fitur lanjutan: halaman detail produk, filter kategori, dan menyimpan halaman/pencarian di URL agar bisa dibagikan.

## Riwayat Pengerjaan

Setiap tahap dikerjakan lewat issue dan pull request:
- [#1](https://github.com/saifudinreza/coding-test-v1/issues/1) Pondasi project
- [#2](https://github.com/saifudinreza/coding-test-v1/issues/2) Register, login, logout → [PR #3](https://github.com/saifudinreza/coding-test-v1/pull/3)
- [#4](https://github.com/saifudinreza/coding-test-v1/issues/4) Halaman produk dan protected route → [PR #5](https://github.com/saifudinreza/coding-test-v1/pull/5)
- [#6](https://github.com/saifudinreza/coding-test-v1/issues/6) UI improvement → [PR #7](https://github.com/saifudinreza/coding-test-v1/pull/7)
