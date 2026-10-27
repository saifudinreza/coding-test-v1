// [BARU - #8] Daftar ulasan produk. Murni tampilan: menerima array ulasan yang sudah
// dibersihkan oleh normalizer. Ulasan kosong -> pesan ramah, bukan area kosong.
import { formatDate } from '../utils/formatters.js'
import { StarIcon } from './Icons.jsx'

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-ink-muted">Belum ada ulasan.</p>
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review, index) => (
        // Ulasan DummyJSON tidak punya id, jadi key digabung dari beberapa field + urutan.
        <li key={`${review.reviewerName}-${review.date}-${index}`} className="space-y-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium">{review.reviewerName}</span>
            {review.rating !== null && (
              <span className="inline-flex items-center gap-1 text-xs">
                <StarIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Rating</span>
                {review.rating}
              </span>
            )}
          </div>
          {review.comment && <p className="text-ink-muted">{review.comment}</p>}
          <p className="text-xs text-ink-muted">{formatDate(review.date)}</p>
        </li>
      ))}
    </ul>
  )
}
