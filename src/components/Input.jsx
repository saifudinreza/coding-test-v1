export default function Input({ label, error, id, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
      <input
        id={id}
        className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
