// [BARU - #6] Aksen judul: oval mint melingkari satu kata, meniru hiasan di referensi.
// Oval hanya hiasan (aria-hidden), jadi teks tetap terbaca normal oleh screen reader.
// `className` dipakai untuk menambah jarak (mis. ml-2) saat kata ini didahului kata lain
// di baris yang sama, supaya oval tidak menabrak huruf di sebelah kiri.
export default function Highlight({ children, className = '' }) {
  return (
    <span className={`relative inline-block px-1 ${className}`}>
      {children}
      <svg aria-hidden="true" viewBox="0 0 200 80" preserveAspectRatio="none"
        className="pointer-events-none absolute -left-1.5 -top-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.75rem)] text-mint">
        <ellipse cx="100" cy="40" rx="97" ry="35" fill="none" stroke="currentColor" strokeWidth="3"
          vectorEffect="non-scaling-stroke" transform="rotate(-3 100 40)" />
      </svg>
    </span>
  )
}
