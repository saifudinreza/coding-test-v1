// [BARU - #6] Kartu kecil "melayang": ikon bulat + judul + teks pendek.
export default function Chip({ icon, title, text, className = '' }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-surface px-3 py-2.5 shadow-soft ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
        {icon}
      </span>
      <span className="text-xs leading-snug">
        <span className="block font-semibold">{title}</span>
        <span className="text-ink-muted">{text}</span>
      </span>
    </div>
  )
}
