// [BARU] Halaman Login: email dan password.
// Alur: isi form -> validasi client -> useAuth().login -> tampilkan error
// ATAU pindah ke Home. Halaman ini juga menampilkan pesan sukses yang dikirim
// dari Register / Logout lewat state router.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Button from '../components/Button.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Highlight from '../components/Highlight.jsx'
import { ArrowRightIcon, CheckIcon } from '../components/Icons.jsx'
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
      navigate('/products') // [UBAH] sukses -> langsung ke halaman Products
    } catch {
      setServerError('Terjadi kesalahan pada sistem. Silakan coba lagi.')
    }
  }

  // [UBAH - #6] Tampilan memakai AuthLayout (form kiri, panel visual kanan).
  return (
    <AuthLayout
      title={<>Selamat<br />datang<br /><Highlight>kembali</Highlight></>}
      subtitle="Masuk dengan email dan password untuk melihat katalog produk."
    >
      {/* [PR #3 poin 1] Notice hijau disembunyikan saat ada error, agar tidak tampil bersamaan dengan error merah */}
      {!serverError && notice && (
        <p role="status" className="inline-flex w-fit items-center gap-2 rounded-full bg-mint/15 px-4 py-2 text-xs font-medium text-mint-ink">
          <CheckIcon className="h-3.5 w-3.5" />
          {notice}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input id="email" name="email" type="email" label="Email" placeholder="nama@email.com"
          value={values.email} onChange={handleChange} error={fieldErrors.email} />
        <Input id="password" name="password" type="password" label="Password" placeholder="Password kamu"
          value={values.password} onChange={handleChange} error={fieldErrors.password} />
        {serverError && <ErrorMessage message={serverError} />}
        <Button type="submit" disabled={loading} className="w-full">
          <CheckIcon />
          {loading ? 'Memproses...' : 'Login'}
        </Button>
      </form>
      <p className="text-sm text-ink-muted">
        Belum punya akun?{' '}
        <Link to="/register" className="group inline-flex items-center gap-1 font-medium text-ink">
          Register
          <ArrowRightIcon className="h-4 w-4 text-mint-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </p>
    </AuthLayout>
  )
}
