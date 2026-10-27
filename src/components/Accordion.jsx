// [BARU - #8] Accordion: daftar bagian yang bisa dibuka/tutup (tanda + / −).
// Tiap bagian independen (boleh terbuka lebih dari satu). Tombol judul memakai
// aria-expanded + aria-controls sehingga bisa dipakai lewat keyboard dan screen reader.
//
// items: [{ id, title, content }]   defaultOpen: array id yang terbuka di awal
import { useId, useState } from 'react'
import { MinusIcon, PlusIcon } from './Icons.jsx'

export default function Accordion({ items, defaultOpen = [] }) {
  const [openIds, setOpenIds] = useState(defaultOpen)
  const baseId = useId() // awalan unik supaya id elemen tidak bentrok bila Accordion dipakai >1

  function toggle(id) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div className="divide-y divide-line">
      {items.map((item) => {
        const open = openIds.includes(item.id)
        const buttonId = `${baseId}-${item.id}-button`
        const panelId = `${baseId}-${item.id}-panel`

        return (
          <section key={item.id}>
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-ink-muted transition duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                {item.title}
                {open ? <MinusIcon className="h-4 w-4 shrink-0" /> : <PlusIcon className="h-4 w-4 shrink-0" />}
              </button>
            </h2>
            {/* Trik grid-rows 0fr -> 1fr membuat tinggi panel beranimasi halus tanpa menghitung tinggi.
                `inert` mencegah isi panel yang tertutup bisa difokus lewat Tab. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-sm leading-relaxed text-ink">{item.content}</div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
