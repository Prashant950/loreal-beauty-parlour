import { useState } from 'react'
import {
  Star,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  X
} from 'lucide-react'
import type { Review, Settings } from '../data/content'
import { Stars } from '../components/ui'

interface ReviewsPageProps {
  reviews: Review[]
  s: Settings
}

export function ReviewsPage({ reviews, s }: ReviewsPageProps) {
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newName, setNewName] = useState('')
  const [newService, setNewService] = useState('')
  const [newText, setNewText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      name: newName,
      rating: newRating,
      text: newText,
      date: 'Just now',
      source: 'Verified Client',
      serviceTaken: newService || 'Salon Service',
      verified: true
    }
    setLocalReviews([newRev, ...localReviews])
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowReviewModal(false)
      setNewName('')
      setNewService('')
      setNewText('')
    }, 2000)
  }

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Client Testimonials & Ratings
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            What Lucknow Says About Us
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Rated {s.rating}★ across {s.reviewCount}+ Google reviews. Read authentic stories from women and men who trust {s.name}.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Rating Breakdown Strip */}
        <div className="bg-card border border-gold/30 p-8 sm:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="text-center md:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gold/15 border-2 border-gold flex flex-col items-center justify-center text-champagne">
              <span className="font-serif text-3xl font-bold">{s.rating}</span>
              <span className="text-[10px] text-ivory/60 uppercase">out of 5</span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Stars n={5} size={20} />
                <span className="text-champagne font-bold">5.0 Star Experience</span>
              </div>
              <p className="text-xs text-ivory/70 mt-1.5">
                Based on {s.reviewCount}+ verified reviews on Google Maps in Indira Nagar, Lucknow
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowReviewModal(true)}
              className="btn btn-gold text-xs !py-3 !px-6"
            >
              <MessageSquare size={16} /> Write a Review
            </button>
            <a
              href={s.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line text-xs !py-3 !px-6 hover:border-gold"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localReviews.map((r) => (
            <article
              key={r.id}
              className="bg-card border border-white/10 p-6 flex flex-col justify-between hover:border-gold/40 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Stars n={r.rating} size={15} />
                  <span className="text-[11px] text-ivory/40">{r.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ivory flex items-center gap-1.5">
                    <span>{r.name}</span>
                    {r.verified && <CheckCircle2 size={13} className="text-champagne" />}
                  </p>
                  {r.serviceTaken && (
                    <p className="text-[11px] text-champagne font-medium mt-0.5">{r.serviceTaken}</p>
                  )}
                </div>
                <span className="text-[10px] text-ivory/40 uppercase bg-white/5 px-2 py-1 border border-white/5">
                  {r.source}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-md"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-card border border-gold/40 p-6 sm:p-8 text-ivory shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-ivory/60 hover:text-champagne p-2"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 size={40} className="text-champagne mx-auto mb-3" />
                <h3 className="text-2xl font-serif text-ivory font-bold">Review Submitted!</h3>
                <p className="text-xs text-ivory/70 mt-2">Thank you for sharing your experience at {s.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <span className="text-xs text-champagne uppercase font-semibold">Your Feedback</span>
                  <h3 className="text-2xl font-serif font-bold text-ivory mt-1">Rate Your Salon Experience</h3>
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs text-ivory/70 mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`p-2 transition-transform hover:scale-110 ${
                          star <= newRating ? 'text-champagne' : 'text-white/20'
                        }`}
                      >
                        <Star size={24} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-ivory/70 mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Shalini Agarwal"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ivory/70 mb-1">Service Taken</label>
                  <input
                    type="text"
                    placeholder="e.g. French Balayage / Bridal Makeup"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ivory/70 mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell others what you loved about our stylists, haircut, or salon ambience..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gold text-xs w-full !py-3 font-semibold mt-4"
                >
                  Submit Salon Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
