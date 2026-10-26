// [BARU] Halaman Login: email dan password.
// Alur: isi form -> validasi client -> useAuth().login -> tampilkan error
// ATAU pindah ke Home. Halaman ini juga menampilkan pesan sukses yang dikirim
// dari Register / Logout lewat state router.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Input from '../components/Input.jsx'
import useAuth from '../hooks/useAuth.js'
import { validateAuthForm } from '../utils/validators.js'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [serverError, setServerError] = useState('')

  // Pesan dari halaman sebelumnya, mis. "User berhasil ditambahkan" / "User berhasil logout".
  const notice = location.state?.message

  // [PR #3 poin 6] Saat user mengetik ulang, error field itu langsung dihapus.
  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const errors = validateAuthForm(values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    // [PR #3 poin 7] try/catch menangkap error runtime (mis. localStorage diblokir)
    // supaya user melihat pesan ramah, bukan halaman rusak.
    try {
      // Contoh gagal: { error: 'Email atau password salah' }
      const result = await login(values)
      if (result.error) {
        setServerError(result.error)
        return
      }
      navigate('/') // sukses -> Home
    } catch {
      setServerError('Terjadi kesalahan pada sistem. Silakan coba lagi.')
    }
  }

  return (
    <Card className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-bold">Login</h1>
      {/* [PR #3 poin 1] Notice hijau disembunyikan saat ada error, agar tidak tampil bersamaan dengan error merah */}
      {!serverError && notice && (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-700">{notice}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <Input id="email" name="email" type="email" label="Email" value={values.email}
          onChange={handleChange} error={fieldErrors.email} />
        <Input id="password" name="password" type="password" label="Password" value={values.password}
          onChange={handleChange} error={fieldErrors.password} />
        {serverError && <ErrorMessage message={serverError} />}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Memproses...' : 'Login'}
        </Button>
      </form>
      <p className="text-sm">
        Belum punya akun? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
      </p>
    </Card>
  )
}
