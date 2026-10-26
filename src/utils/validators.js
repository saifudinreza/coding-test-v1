// [BARU] Validasi form di sisi client. Dipakai oleh halaman Register dan Login
// supaya aturan validasinya ada di satu tempat (bukan tersebar di komponen).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Menerima object nilai form, mengembalikan object error per field.
// Object kosong ({}) artinya semua field valid.
// Contoh: validateAuthForm({ email: '', password: 'abc' }) -> { email: 'Email wajib diisi' }
export function validateAuthForm(values) {
  const errors = {}

  // `username` hanya ada di form Register; di form Login field ini tidak dikirim,
  // jadi pengecekannya dilewati lewat `'username' in values`.
  if ('username' in values && !values.username.trim()) {
    errors.username = 'Username wajib diisi'
  }

  if (!values.email.trim()) {
    errors.email = 'Email wajib diisi'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Format email tidak valid'
  }

  if (!values.password) {
    errors.password = 'Password wajib diisi'
  }

  return errors
}
