# Issue: UI Improvement Seluruh Aplikasi

## Tujuan
Merapikan tampilan seluruh aplikasi agar bersih, lapang, dan konsisten, mengikuti tema di `design.md`. Tidak ada perubahan logic atau fitur; hanya tampilan.

## Tema Singkat
- **Kesan:** bersih, lapang, "premium tapi ramah".
- **Tipografi:** judul display sangat besar dan tebal (`Outfit`), teks pendukung kecil dan ringan (`Inter`).
- **Warna:** dasar netral (putih, abu kehijauan), teks hampir hitam, aksen `mint` untuk aksi/sukses dan `coral` untuk error.
- **Bentuk:** tombol dan input berbentuk pil, kartu sudut besar, bentuk "arch" (atas melengkung penuh) sebagai bingkai visual.
- **Latar:** gradasi abu-hijau muda dengan cahaya kuning-hijau lembut di pojok.

Detail warna, ukuran font, radius, dan contoh token Tailwind ada di `design.md`.

## Ruang Lingkup
1. **Fondasi tema:** token warna dan font di `index.css` (Tailwind `@theme`), font Google di `index.html`, latar halaman.
2. **Komponen dasar:** `Button` (primary pil hitam + varian ghost), `Input`, `Card`, `ErrorMessage`, `EmptyState`, `Loader` (skeleton untuk grid produk), dan komponen dekoratif baru bila perlu.
3. **Header/Layout:** ringan tanpa garis tebal, nama aplikasi memakai font display, tetap rapi di layar kecil.
4. **Login & Register:** layout 2 kolom (form + panel visual dekoratif berbentuk arch), judul display dengan aksen, notice sukses dan error sesuai tema. Panel disembunyikan di mobile.
5. **Products:** judul display dengan jumlah hasil, search bar pil, kartu produk dengan gambar di dalam arch, pagination panah bulat, serta tampilan loading/error/kosong yang sesuai tema.
6. **Home dan 404:** disesuaikan dengan tema.

**Tidak termasuk:** fitur baru (detail produk, filter kategori), perubahan logic, hook, service, atau validasi.

## Aturan
- Pakai token tema; jangan menulis warna hex langsung di komponen.
- Jangan tambah library UI. Ikon dan hiasan cukup SVG inline.
- Hiasan diberi `aria-hidden="true"` dan tidak boleh menutupi form atau teks.
- Info di panel dekoratif harus benar; jangan membuat testimoni atau angka user palsu.
- Kontras teks minimal WCAG AA, teks tidak di bawah 12px.
- Animasi hanya transisi halus 150–200ms dan menghormati `prefers-reduced-motion`.
- Jangan memakai nama, gambar, atau aset dari shot referensi Dribbble.

## Kriteria Selesai
- [ ] Token warna dan font terpasang dan dipakai di seluruh komponen.
- [ ] Semua komponen dasar memakai gaya baru.
- [ ] Login dan Register tampil 2 kolom di desktop dan 1 kolom rapi di mobile.
- [ ] Halaman Products memakai kartu, search, pagination, dan state (loading, error, kosong) bergaya baru.
- [ ] Header tidak terpotong di lebar 360px.
- [ ] Semua alur lama tetap berjalan (register, login, logout, pencarian, pagination, retry).
- [ ] `npm run build` dan `npm run lint` lolos tanpa error.
