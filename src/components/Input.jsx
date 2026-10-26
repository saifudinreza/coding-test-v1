// [UBAH - #6] Input berbentuk pil. Fokus memberi ring mint, error memberi garis coral.
// aria-invalid + aria-describedby membuat pesan error ikut dibacakan screen reader.
export default function Input({ label, error, id, className = '', ...props }) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={id} className="block pl-5 text-xs font-medium text-ink-muted">{label}</label>}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`w-full rounded-full border bg-surface px-5 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition duration-150 focus:outline-none focus:ring-2 ${
          error ? 'border-coral focus:ring-coral/25' : 'border-line focus:border-mint focus:ring-mint/25'
        } ${className}`}
        {...props}
      />
      {error && <p id={errorId} className="pl-5 text-xs text-coral-ink">{error}</p>}
    </div>
  )
}
