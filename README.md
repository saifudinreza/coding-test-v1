# Coding Test v1

Pondasi project Front-End Coding Test: React + Tailwind CSS. Fitur (login, data dari [DummyJSON](https://dummyjson.com/docs)) ditambahkan di issue terpisah.

## Menjalankan
```bash
npm install
npm run dev      # development server
npm run build    # build production
npm run lint     # cek kode dengan ESLint
```

## Stack
- **React 19 + Vite** (JavaScript)
- **Tailwind CSS 4** lewat plugin `@tailwindcss/vite`
- **React Router** (library tambahan): routing antar halaman, dipakai juga untuk protected route nanti
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
