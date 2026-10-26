// [BARU] Halaman Register: username, email, password.
// Alur: isi form -> validasi client -> useAuth().register -> tampilkan error
// ATAU pindah ke /login membawa pesan sukses.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Button from '../components/Button.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Highlight from '../components/Highlight.jsx'
import { ArrowRightIcon, CheckIcon } from '../components/Icons.jsx'
import Input from '../components/Input.jsx'
import useAuth from '../hooks/useAuth.js'
import { validateAuthForm } from '../utils/validators.js'

export default function RegisterPage() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ username: '', email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({}) // error validasi per field
  const [serverError, setServerError] = useState('') // error dari response API

  // Satu handler untuk semua input: pakai atribut `name` sebagai kunci state.
  // [PR #3 poin 6] Saat user mengetik ulang, error field itu langsung dihapus.
  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    // 1. Validasi dulu; kalau ada error, berhenti sebelum memanggil service.
    const errors = validateAuthForm(values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    // [PR #3 poin 7] try/catch menangkap error runtime (mis. localStorage diblokir).
    try {
      // 2. Panggil register. Contoh error: { error: 'User sudah terdaftar' }.
      const result = await register(values)
      if (result.error) {
        setServerError(result.error)
        return
      }

      // 3. Sukses: ke halaman login, pesan dikirim lewat state router.
      navigate('/login', { state: { message: result.response } })
    } catch {
      setServerError('Terjadi kesalahan pada sistem. Silakan coba lagi.')
    }
  }

  // [UBAH - #6] Tampilan memakai AuthLayout (form kiri, panel visual kanan).
  return (
    <AuthLayout
      title={<>Buat<br />akun<br /><Highlight>baru</Highlight></>}
      subtitle="Daftar dengan username, email, dan password. Password minimal 6 karakter."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input id="username" name="username" label="Username" placeholder="Nama tampilan"
          value={values.username} onChange={handleChange} error={fieldErrors.username} />
        <Input id="email" name="email" type="email" label="Email" placeholder="nama@email.com"
          value={values.email} onChange={handleChange} error={fieldErrors.email} />
        <Input id="password" name="password" type="password" label="Password" placeholder="Minimal 6 karakter"
          value={values.password} onChange={handleChange} error={fieldErrors.password} />
        {serverError && <ErrorMessage message={serverError} />}
        <Button type="submit" disabled={loading} className="w-full">
          <CheckIcon />
          {loading ? 'Memproses...' : 'Register'}
        </Button>
      </form>
      <p className="text-sm text-ink-muted">
        Sudah punya akun?{' '}
        <Link to="/login" className="group inline-flex items-center gap-1 font-medium text-ink">
          Login
          <ArrowRightIcon className="h-4 w-4 text-mint-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </p>
    </AuthLayout>
  )
}
