// [BARU] Service auth TIRUAN (mock API).
//
// Tidak ada backend, jadi "database" user disimpan di localStorage.
// Setiap fungsi menerima request dan mengembalikan response PERSIS seperti
// kontrak di issue #2 ({ id, username, email, response } atau { error }).
// Karena bentuknya sama dengan API sungguhan, nanti cukup mengganti isi
// fungsi di file ini dengan fetch() tanpa mengubah hook maupun halaman.
//
// [UBAH] Password sekarang di-hash dengan bcrypt (library bcryptjs):
// - register: password di-hash, yang disimpan hanya hash-nya.
// - login: password input dicocokkan ke hash dengan bcrypt.compare.
//   (Hash tidak bisa dibandingkan dengan `===`, karena bcrypt memakai salt acak
//   sehingga hash password yang sama selalu berbeda.)
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10 // tingkat kerja bcrypt; makin besar makin lambat & aman
const USERS_KEY = 'auth_users' // daftar semua user terdaftar
const SESSION_KEY = 'auth_session' // user yang sedang login (tanpa password)
const FAKE_DELAY_MS = 300 // meniru waktu tunggu jaringan agar state loading terlihat

// --- Helper localStorage -----------------------------------------------------

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    // Data rusak / bukan JSON valid: anggap kosong, jangan bikin aplikasi crash.
    return fallback
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Membungkus hasil dalam Promise + delay supaya perilakunya mirip request jaringan.
function respond(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), FAKE_DELAY_MS))
}

// [BARU] Cari user berdasarkan email lalu cocokkan password ke hash-nya.
// Mengembalikan user jika cocok, atau null jika email tidak ada / password salah.
async function verifyCredentials(users, email, password) {
  const user = users.find((u) => u.email === email)
  // [PR #3 poin 2] Data lama di localStorage bisa tidak punya passwordHash;
  // tanpa pengecekan ini bcrypt.compare melempar error "Illegal arguments".
  if (!user || !user.passwordHash) return null
  const match = await bcrypt.compare(password, user.passwordHash)
  return match ? user : null
}

// --- Fungsi publik -----------------------------------------------------------

// Dipakai saat aplikasi pertama dibuka: ambil user yang masih login
// (supaya status login bertahan setelah refresh halaman).
export function getSession() {
  return readJSON(SESSION_KEY, null)
}

// Register: request { username, email, password }
export async function register({ username, email, password }) {
  const users = readJSON(USERS_KEY, [])
  const normalizedEmail = email.trim().toLowerCase()

  // Email dianggap identitas unik. Kalau sudah ada -> response error sesuai kontrak.
  if (users.some((u) => u.email === normalizedEmail)) {
    return respond({ error: 'User sudah terdaftar' })
  }

  // id naik otomatis: 1 untuk user pertama, lalu 2, 3, dst.
  // [PR #3 poin 5] Pakai id TERBESAR + 1 (bukan id elemen terakhir) agar tidak
  // menghasilkan id ganda jika urutan array berubah atau ada user yang dihapus.
  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1,
    username: username.trim(),
    email: normalizedEmail,
    // [UBAH] Simpan HASH bcrypt, bukan password asli.
    passwordHash: await bcrypt.hash(password, SALT_ROUNDS),
  }
  writeJSON(USERS_KEY, [...users, newUser])

  // Response sukses TIDAK boleh berisi password.
  return respond({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    response: 'User berhasil ditambahkan',
  })
}

// Login: request { email, password }
export async function login({ email, password }) {
  const users = readJSON(USERS_KEY, [])
  const normalizedEmail = email.trim().toLowerCase()
  const found = await verifyCredentials(users, normalizedEmail, password)

  // Pesan sengaja sama untuk "email tidak ada" dan "password salah"
  // agar tidak membocorkan email mana yang terdaftar.
  if (!found) {
    return respond({ error: 'Email atau password salah' })
  }

  // Simpan sesi (tanpa password) agar user tetap login setelah refresh.
  const session = { id: found.id, username: found.username, email: found.email }
  writeJSON(SESSION_KEY, session)

  return respond({ ...session, response: 'User berhasil login' })
}

// Logout: tanpa input email/password. User yang sedang login sudah dikenali
// lewat sesi (SESSION_KEY) yang dibawanya, jadi cukup hapus sesi tersebut.
export async function logout() {
  localStorage.removeItem(SESSION_KEY)
  return respond({ response: 'User berhasil logout' })
}
