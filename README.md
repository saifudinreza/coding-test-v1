# Coding Test v1

Pondasi project Front-End Coding Test: React + Tailwind CSS. Fitur (login, data dari [DummyJSON](https://dummyjson.com/docs)) ditambahkan di issue terpisah.

## Menjalankan
```bash
npm install
npm run dev      # development server
npm run build    # build production
npm run lint     # cek kode dengan ESLint
```

## Auth (Register, Login, Logout)
Tidak ada backend: auth adalah **simulasi** di `src/services/authService.js` dengan data di `localStorage` (kunci `auth_users` dan `auth_session`). Password **di-hash dengan bcrypt** (library `bcryptjs`) sebelum disimpan; login membandingkannya dengan `bcrypt.compare`. Karena datanya tetap di browser, ini tetap simulasi dan bukan pengganti backend.

Cara mencoba:
1. Buka `/register`, isi username, email, password.
2. Setelah sukses, kamu diarahkan ke `/login`; masuk dengan email dan password tadi.
3. Klik **Logout** di header untuk langsung keluar; tidak perlu mengisi email atau password lagi karena user dikenali lewat sesi login.
4. Mendaftar ulang dengan email yang sama menampilkan "User sudah terdaftar"; login dengan data salah menampilkan "Email atau password salah".

Alur kode: halaman (`pages/`) -> `useAuth()` (`hooks/`) -> `authService` (`services/`). Halaman hanya mengurus form dan pesan; logic ada di hook dan service.

## Stack
- **React 19 + Vite** (JavaScript)
- **Tailwind CSS 4** lewat plugin `@tailwindcss/vite`
- **React Router** (library tambahan): routing antar halaman, dipakai juga untuk protected route nanti
- **bcryptjs** (library tambahan): hashing password di sisi browser (versi pure JavaScript, tanpa native build)
- **ESLint**: kualitas kode

## Struktur Folder
```
src/
  components/   # komponen UI reusable (Button, Input, Card, Loader, ErrorMessage, EmptyState, Layout)
  pages/        # komponen level halaman
  hooks/        # custom hooks (logic & state)
  services/     # pemanggilan API (apiClient.js: base URL DummyJSON)
  utils/        # helper umum
  data/         # dataset dummy lokal
  routes/       # konfigurasi router
```

Logic (API, data) dipisah dari komponen UI; komponen hanya menerima props.
