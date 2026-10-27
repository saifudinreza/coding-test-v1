// [BARU - #6] Ikon garis tipis sebagai SVG inline, supaya tidak perlu library ikon.
// Semua ikon dekoratif (aria-hidden); teks di sebelahnya yang memberi makna.

function Icon({ children, className = 'h-4 w-4' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
}

export function ArrowLeftIcon(props) {
  return <Icon {...props}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>
}

export function CheckIcon(props) {
  return <Icon {...props}><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>
}

export function SearchIcon(props) {
  return <Icon {...props}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></Icon>
}

export function StarIcon(props) {
  return <Icon {...props}><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" fill="currentColor" stroke="none" /></Icon>
}

export function AlertIcon(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5M12 16.5h.01" /></Icon>
}

export function LockIcon(props) {
  return <Icon {...props}><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 018 0v2.5" /></Icon>
}

export function BagIcon(props) {
  return <Icon {...props}><path d="M5 8h14l-1 12H6zM9 8V6.5a3 3 0 016 0V8" /></Icon>
}

// [BARU - #8] Tanda + / − untuk Accordion.
export function PlusIcon(props) {
  return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>
}

export function MinusIcon(props) {
  return <Icon {...props}><path d="M5 12h14" /></Icon>
}
