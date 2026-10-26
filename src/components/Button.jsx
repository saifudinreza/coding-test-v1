export default function Button({ className = '', ...props }) {
  return (
    <button
      className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
