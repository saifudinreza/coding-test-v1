// [BARU] Context untuk berbagi state auth ke seluruh aplikasi.
// Dipisah dari AuthProvider supaya file komponen hanya mengekspor komponen
// (aturan react-refresh di ESLint).
import { createContext } from 'react'

export const AuthContext = createContext(null)
