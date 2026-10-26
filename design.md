# Design Reference: UI Improvement Login/Register & Products

Acuan visual untuk merapikan halaman **Login/Register** dan **Products**. Diambil dari bedah shot Dribbble *"Kōhaku Product Page"* karya Tran Mau Tri Tam. Shot ini dipakai sebagai **inspirasi gaya**, bukan untuk ditiru 1:1: jangan pakai nama, gambar, atau aset dari shot tersebut.

---

## 1. Bedah UI Referensi

### Kesan keseluruhan
Bersih, lapang, dan "premium tapi ramah". Rahasianya ada di tiga hal:
1. **Kontras ukuran yang ekstrem:** judul sangat besar dan tebal, sedangkan teks pendukung kecil dan tipis.
2. **Ruang kosong yang banyak:** setiap elemen punya jarak lega, tidak ada yang berdesakan.
3. **Warna sangat terbatas:** dasar netral (putih, abu kehijauan), teks hampir hitam, plus 1–2 warna aksen kecil.

### Struktur layout (3 kolom)
```
┌────────────────────────────────────────────────────────────┐
│  KIRI: informasi     │  TENGAH: visual    │  KANAN: detail  │
│  - Judul display     │  - Bentuk lengkung │  - Panah ← →    │
│  - Harga             │    (arch) di       │  - Accordion    │
│  - Deskripsi singkat │    belakang produk │    Description  │
│  - Tombol utama + ♡  │  - Chip melayang   │    Nutrition    │
│                      │  - Tombol bulat ↓  │    Ingredients  │
└────────────────────────────────────────────────────────────┘
```
Kolom tengah adalah pusat perhatian; kiri dan kanan "mengapit" dengan teks yang ringan.

### Elemen yang menonjol
| Elemen | Ciri | Kenapa efektif |
|---|---|---|
| Judul display | 3 baris, sangat tebal, rapat (line-height kecil), huruf geometris | Langsung jadi titik fokus mata |
| Hiasan judul | Lingkaran oval hijau di sekitar 1 kata, panah hijau, badge bulat merah | Memberi kesan playful tanpa ramai |
| Harga | Besar, tipis (regular), hitam | Jelas terbaca tapi tidak bersaing dengan judul |
| Tombol utama | Pil hitam penuh, teks putih kecil, ikon ✓ di kiri | Satu ajakan aksi yang tegas |
| Tombol sekunder | Ikon hati tanpa latar | Tidak mencuri perhatian dari tombol utama |
| Bentuk arch | Persegi dengan atas melengkung penuh, warna abu kebiruan | Membingkai produk, memberi kedalaman |
| Chip melayang | Kartu putih kecil, sudut membulat, bayangan halus, avatar bulat | Memberi rasa "hidup" dan social proof |
| Garis dekoratif | Garis putih tipis melingkar, bola-bola kecil | Gerak visual, tetap halus |
| Accordion | Judul abu, tanda + / −, garis pemisah tipis | Rapi, info tambahan tidak memenuhi layar |
| Latar | Gradasi abu-hijau sangat muda, cahaya kuning-hijau di pojok kanan | Hangat dan modern tanpa terasa kosong |

---

## 2. Design Tokens

### Warna (perkiraan dari referensi)
| Token | Hex | Pemakaian |
|---|---|---|
| `ink` | `#111111` | Teks utama, tombol utama |
| `ink-muted` | `#5B6166` | Teks pendukung, label accordion |
| `surface` | `#FFFFFF` | Kartu, panel |
| `canvas` | `#EEF2F1` | Latar halaman |
| `sage` | `#A9B8BC` | Bentuk arch, latar gambar produk |
| `sage-soft` | `#DCE4E4` | Latar gambar yang lebih terang, hover |
| `mint` | `#4DB396` | Aksen: garis dekoratif, focus ring, sukses |
| `coral` | `#F05A3C` | Aksen kecil: badge, error, ikon hati aktif |
| `glow` | `#F3F6C0` | Cahaya gradasi di pojok latar |
| `line` | `#E3E7E7` | Garis pemisah, border input |

Aturan: **maksimal satu warna aksen per area**. Mint untuk hal positif/aksi, coral hanya untuk error atau penanda kecil.

### Tipografi
Font di referensi adalah sans geometris yang tebal. Alternatif gratis di Google Fonts:
- **Display (judul):** `Outfit` weight 700–800, atau `Plus Jakarta Sans` 800.
- **Body:** `Inter` atau `Plus Jakarta Sans` weight 400–500.

| Gaya | Ukuran (mobile → desktop) | Weight | Line-height |
|---|---|---|---|
| Display | 40px → 64px | 800 | 0.95 |
| H2 | 24px → 32px | 700 | 1.1 |
| Harga | 24px → 32px | 400 | 1.2 |
| Body | 14px | 400 | 1.5 |
| Caption / chip | 12px | 500 | 1.4 |

Jangan pakai teks di bawah 12px. Referensi memakai teks sangat kecil; untuk keterbacaan kita naikkan sedikit.

### Bentuk, jarak, bayangan
- **Radius:** tombol dan input `rounded-full` (pil); kartu `rounded-3xl`; chip `rounded-2xl`; bentuk arch `rounded-t-full`.
- **Jarak:** kelipatan 4px. Antar-seksi 48–64px, antar-elemen dalam kartu 12–16px.
- **Bayangan:** hanya satu gaya halus, misalnya `0 8px 24px rgb(17 17 17 / 0.08)`. Dipakai untuk chip melayang dan kartu saat hover.
- **Ikon:** garis tipis (stroke 1.5–2px), ukuran 16–20px. Bisa pakai SVG inline supaya tidak perlu library baru.

### Contoh token Tailwind v4 (di `src/index.css`)
```css
@import "tailwindcss";

@theme {
  --color-ink: #111111;
  --color-ink-muted: #5b6166;
  --color-canvas: #eef2f1;
  --color-sage: #a9b8bc;
  --color-sage-soft: #dce4e4;
  --color-mint: #4db396;
  --color-coral: #f05a3c;
  --color-glow: #f3f6c0;
  --color-line: #e3e7e7;
  --font-display: "Outfit", sans-serif;
  --font-sans: "Inter", sans-serif;
}
```
Dengan ini kelas seperti `bg-canvas`, `text-ink`, `font-display` bisa langsung dipakai.

---

## 3. Komponen Dasar (perbarui yang sudah ada)

| Komponen | Arah baru |
|---|---|
| `Button` (primary) | Pil hitam (`bg-ink text-white rounded-full`), padding lega, ikon opsional di kiri. Hover sedikit lebih terang, aktif sedikit mengecil. |
| `Button` (ghost/icon) | Tanpa latar, ikon saja atau teks + panah →. Dipakai untuk aksi sekunder. |
| `Input` | Pil putih, border `line`, label kecil di atas. Focus: ring `mint`. Error: border dan teks `coral`. |
| `Card` | Putih, `rounded-3xl`, tanpa border tebal; bayangan hanya saat hover. |
| `ErrorMessage` | Latar putih, garis kiri atau ikon `coral`, tombol "Coba lagi" bergaya ghost/pil. |
| `EmptyState` | Ilustrasi sederhana berbentuk arch abu + teks ramah + tombol reset pencarian. |
| `Loader` | Skeleton kartu (blok `sage-soft` yang berdenyut) lebih baik daripada spinner untuk grid produk. |
| `Chip` (baru) | Kartu putih kecil melayang, avatar/ikon bulat + 1–2 baris teks kecil. |

---

## 4. Halaman Login / Register

### Layout desktop (2 kolom)
```
┌───────────────────────────────┬──────────────────────────────┐
│  KIRI: form                   │  KANAN: panel visual          │
│                               │                              │
│  Selamat                      │   latar gradasi canvas→glow  │
│  datang ~kembali~ →           │   ┌──────────┐               │
│                               │   │  arch    │  ◖ chip info  │
│  teks pendukung kecil         │   │  sage    │               │
│                               │   └──────────┘               │
│  ( Email              )       │   garis dekoratif tipis      │
│  ( Password           )       │                              │
│  [ ✓ Login           ]  →Daftar│                              │
└───────────────────────────────┴──────────────────────────────┘
```
- **Judul display** 2–3 baris, satu kata diberi aksen: oval `mint` di sekeliling kata atau panah → di akhir baris (meniru hiasan referensi, cukup pakai SVG/border).
- **Form** sempit (maks ~360px), input pil, tombol utama pil hitam lebar penuh.
- **Link pindah halaman** ("Belum punya akun? Register →") sebagai tombol ghost dengan panah.
- **Panel visual** hanya dekoratif: bentuk arch `sage`, 1–2 chip melayang berisi info yang **benar**, misalnya "Data tersimpan aman (bcrypt)" atau "200+ produk dari DummyJSON". Jangan membuat testimoni atau angka user palsu.
- **Notice sukses** (mis. "User berhasil ditambahkan") tampil sebagai chip `mint` kecil di atas form; error sebagai teks `coral` di bawah field atau di atas tombol.

### Mobile
Panel visual disembunyikan atau dijadikan strip dekoratif tipis di atas; form memenuhi lebar dengan jarak samping 16px.

---

## 5. Halaman Products

### Header halaman
```
Temukan                                   ( 🔍 Cari produk...   ) [Cari]
produk ~favorit~ →
teks kecil: "194 produk dari DummyJSON"
```
- Judul display besar di kiri dengan satu aksen `mint`.
- Search bar pil di kanan (desktop) atau di bawah judul (mobile).
- Teks kecil jumlah hasil; saat mencari: "23 hasil untuk "phone"".

### Kartu produk (`ProductCard`)
```
┌───────────────────────┐
│ ╭───────────────────╮ │
│ │   latar sage-soft │ │  ← gambar di dalam bentuk arch (rounded-t-full)
│ │     [gambar]      │ │
│ ╰───────────────────╯ │
│  Nama Produk (2 baris)│
│  $9.99           ★ 4.6│  ← harga besar weight 400, rating chip kecil
│  [ + ]            ♡   │  ← opsional, aksi kecil
└───────────────────────┘
```
- Gambar ditaruh di atas latar `sage-soft` berbentuk arch, mirip produk di referensi.
- Harga sebagai elemen kedua terbesar setelah gambar.
- Rating sebagai chip kecil putih dengan bintang.
- Hover: kartu naik sedikit (`-translate-y-1`) + bayangan halus.
- Grid: 2 kolom mobile, 3 tablet, 4 desktop; jarak 16–24px.

### Pagination
Meniru panah di referensi: dua tombol bulat bergaris (`←` `→`) dengan teks "Halaman 2 dari 17" di tengah. Tombol nonaktif jadi pudar.

### State
| State | Tampilan |
|---|---|
| Loading | Grid skeleton 8 kartu (blok arch + 2 garis teks berdenyut) |
| Error | Kartu putih di tengah, ikon `coral`, pesan, tombol pil "Coba lagi" |
| Kosong | Bentuk arch abu kosong + "Tidak ada produk untuk "xyz"" + tombol "Hapus pencarian" |

### Opsional: halaman detail produk
Kalau nanti dibuat, layout 3 kolom referensi bisa dipakai hampir langsung: kiri judul + harga + tombol, tengah gambar di dalam arch, kanan accordion (Description, Brand, Stock).

---

## 6. Header (Layout)
- Latar transparan di atas `canvas`, tanpa garis bawah tebal.
- Logo/nama aplikasi memakai `font-display`.
- Saat login: link "Products", nama user dalam chip kecil, tombol Logout gaya ghost.
- Mobile: pastikan tidak terpotong; nama user bisa disembunyikan, sisakan link dan tombol.

---

## 7. Aturan Implementasi
- Gunakan Tailwind dan token di bagian 2; jangan menulis warna hex langsung di komponen.
- Jangan tambah library UI. Ikon dan hiasan cukup SVG inline; font lewat Google Fonts di `index.html`.
- Hiasan (garis, bola, chip dekoratif) diberi `aria-hidden="true"` dan tidak boleh menutupi form atau teks.
- Kontras teks minimal WCAG AA: teks `ink-muted` hanya di atas latar terang.
- Animasi cukup transisi halus 150–200ms (hover, fokus); hormati `prefers-reduced-motion`.
- Semua halaman tetap nyaman di lebar 360px.
