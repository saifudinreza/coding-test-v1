import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProductsPage from '../pages/ProductsPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import GuestRoute from './GuestRoute.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* [BARU] Route halaman auth; GuestRoute mengalihkan user yang sudah login ke Home */}
        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* [BARU] Halaman khusus user login; ProtectedRoute mengantar tamu ke /login */}
        <Route element={<ProtectedRoute />}>
          <Route path="products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
