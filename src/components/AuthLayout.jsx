// [BARU - #6] Kerangka bersama halaman Login dan Register: form di kiri, panel visual
// di kanan. Panel disembunyikan di bawah lebar `lg` supaya form tetap lega di HP.
import ArchPanel from './ArchPanel.jsx'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <section className="mx-auto flex w-full max-w-sm flex-col justify-center gap-8 lg:mx-0">
        <div className="space-y-4">
          <h1 className="font-display text-[2.5rem] font-extrabold leading-[0.95] tracking-tight lg:text-[4rem]">
            {title}
          </h1>
          <p className="text-sm text-ink-muted">{subtitle}</p>
        </div>
        {children}
      </section>
      <ArchPanel className="hidden min-h-[32rem] lg:block" />
    </div>
  )
}
