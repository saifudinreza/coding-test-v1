// [BARU - #8] Halaman detail produk (/products/:id).
// Sama seperti ProductsPage: halaman hanya bertanya ke hook ("loading? error? tidak
// ketemu? datanya mana?") lalu menampilkan SATU dari empat kondisi.
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Accordion from '../components/Accordion.jsx'
import ArchImage from '../components/ArchImage.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { ArrowLeftIcon, StarIcon } from '../components/Icons.jsx'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton.jsx'
import ReviewList from '../components/ReviewList.jsx'
import useProductDetail from '../hooks/useProductDetail.js'
import { formatPrice, formatRating, formatStock, formatText } from '../utils/formatters.js'

// Baris "label: nilai" untuk bagian Details.
function DetailRow({ label, value, capitalize = false }) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={`text-right font-medium ${capitalize ? 'capitalize' : ''}`}>{value}</dd>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { product, loading, error, notFound, retry } = useProductDetail(id)

  // Kembali ke daftar yang sama seperti sebelumnya (halaman + kata pencarian), yang
  // dikirim ProductCard lewat state router. Dibuka langsung lewat URL -> ke /products.
  const backTo = location.state?.from ?? '/products'
  const goBack = () => navigate(backTo)

  let content
  if (loading) {
    content = <ProductDetailSkeleton />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={retry} />
  } else if (notFound) {
    content = (
      <EmptyState message="Produk tidak ditemukan.">
        <Button variant="outline" onClick={goBack}>Kembali ke daftar produk</Button>
      </EmptyState>
    )
  } else {
    const inStock = product.stock !== null && product.stock > 0
    // Stok: hijau kalau tersedia, coral kalau habis, abu-abu kalau datanya tidak valid.
    const stockTone = product.stock === null ? 'text-ink-muted' : inStock ? 'text-mint-ink' : 'text-coral-ink'

    content = (
      // Mobile: gambar dulu (order-first), lalu info, lalu accordion. Desktop: 3 kolom.
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] lg:items-center lg:gap-12">
        <section className="space-y-5">
          {product.category && (
            <span className="inline-flex rounded-full bg-surface px-3 py-1 text-xs font-medium capitalize">
              {product.category.replace(/-/g, ' ')}
            </span>
          )}
          <h1 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight [overflow-wrap:anywhere] lg:text-5xl">
            {product.title}
          </h1>
          <p className="font-display text-3xl">{formatPrice(product.price)}</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 font-medium text-ink">
              <StarIcon className="h-3.5 w-3.5" />
              <span className="sr-only">Rating</span>
              {formatRating(product.rating)}
            </span>
            <span>Brand: {formatText(product.brand)}</span>
          </p>
          <p className={`text-sm font-medium ${stockTone}`}>{formatStock(product.stock)}</p>
        </section>

        <div className="order-first lg:order-none">
          <ArchImage key={product.id} src={product.image} alt={product.title} />
        </div>

        <div className="rounded-3xl bg-surface px-6 py-2">
          <Accordion
            defaultOpen={['description']}
            items={[
              {
                id: 'description',
                title: 'Description',
                content: product.description ? <p>{product.description}</p> : <p className="text-ink-muted">-</p>,
              },
              {
                id: 'details',
                title: 'Details',
                content: (
                  <dl>
                    <DetailRow label="Brand" value={formatText(product.brand)} />
                    <DetailRow label="Kategori" value={formatText(product.category.replace(/-/g, ' '))} capitalize />
                    <DetailRow label="Stok" value={formatStock(product.stock)} />
                    <DetailRow label="Garansi" value={formatText(product.warranty)} />
                    <DetailRow label="Pengiriman" value={formatText(product.shipping)} />
                  </dl>
                ),
              },
              {
                id: 'reviews',
                title: `Reviews (${product.reviews.length})`,
                content: <ReviewList reviews={product.reviews} />,
              },
            ]}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={goBack} className="-ml-3">
        <ArrowLeftIcon /> Kembali ke daftar produk
      </Button>
      {content}
    </div>
  )
}
