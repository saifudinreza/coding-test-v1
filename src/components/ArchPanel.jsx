// [BARU - #6] Panel visual dekoratif: bentuk arch, garis melingkar, bola kecil,
// dan dua chip. Seluruh panel aria-hidden karena murni hiasan.
// Isi chip sengaja berupa fakta aplikasi ini (bukan testimoni atau angka palsu).
import Chip from './Chip.jsx'
import { BagIcon, LockIcon } from './Icons.jsx'

export default function ArchPanel({ className = '' }) {
  return (
    <div aria-hidden="true"
      className={`relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-surface via-sage-soft to-glow ${className}`}>
      <div className="absolute inset-x-[20%] bottom-0 top-[14%] rounded-t-full bg-sage" />

      <svg viewBox="0 0 400 520" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5"
        className="absolute inset-0 h-full w-full text-surface">
        <ellipse cx="205" cy="240" rx="150" ry="70" transform="rotate(-18 205 240)" vectorEffect="non-scaling-stroke" />
        <path d="M30 360c60-45 120 25 190-12s120-95 160-45" vectorEffect="non-scaling-stroke" />
      </svg>

      <span className="absolute left-[28%] top-[36%] h-5 w-5 rounded-full bg-surface shadow-soft" />
      <span className="absolute right-[24%] top-[60%] h-8 w-8 rounded-full bg-surface/90 shadow-soft" />

      <Chip className="absolute left-[6%] top-[20%]" icon={<LockIcon />}
        title="Password di-hash" text="Disimpan dengan bcrypt" />
      <Chip className="absolute bottom-[14%] right-[6%]" icon={<BagIcon />}
        title="Katalog produk" text="Data dari DummyJSON" />
    </div>
  )
}
