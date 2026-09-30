import { useState } from 'react'
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Instagram,
  Heart
} from 'lucide-react'
import type { GalleryItem, BeforeAfter, Settings } from '../data/content'
import { galleryCategories } from '../data/content'
import { Img } from '../components/ui'

interface GalleryPageProps {
  gallery: GalleryItem[]
  beforeAfter: BeforeAfter[]
  s: Settings
  onBookService: (serviceName?: string) => void
}

export function GalleryPage({ gallery, beforeAfter, s, onBookService }: GalleryPageProps) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null)
  const [sliderPos, setSliderPos] = useState<Record<string, number>>({
    'ba-1': 50,
    'ba-2': 50
  })

  const filteredGallery = gallery.filter((item) => {
    if (selectedCat === 'All') return true
    return item.category === selectedCat
  })

  const handleSliderChange = (id: string, val: number) => {
    setSliderPos((prev) => ({ ...prev, [id]: val }))
  }

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Portfolio & Lookbook
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            Artistry in Every Detail
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore authentic hair transformations, radiant bridal looks, and salon ambiance crafted at {s.name}.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* ========================================================================= */}
        {/* BEFORE & AFTER SECTION */}
        {/* ========================================================================= */}
        {beforeAfter.length > 0 && (
          <section className="mb-20">
            <div className="max-w-2xl mb-10">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-2">
                Comparative Results
              </span>
              <h2 className="text-3xl font-serif font-bold text-ivory">
                Real Client Transformations
              </h2>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2">
                Drag the divider on each card to compare the dramatic difference our specialized treatments make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {beforeAfter.map((ba) => {
                const pos = sliderPos[ba.id] ?? 50
                return (
                  <div
                    key={ba.id}
                    className="bg-card border border-white/15 p-5 flex flex-col justify-between shadow-xl"
                  >
                    {/* Interactive Comparison Slider */}
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/10 select-none">
                      <Img src={ba.after} alt={`${ba.title} After`} className="w-full h-full" />
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                      >
                        <Img src={ba.before} alt={`${ba.title} Before`} className="w-full h-full" />
                      </div>

                      <div
                        className="absolute inset-y-0 w-0.5 bg-champagne shadow-[0_0_10px_rgba(223,183,113,0.9)]"
                        style={{ left: `${pos}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-champagne text-noir font-bold flex items-center justify-center text-[10px] shadow-lg">
                          ↔
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={pos}
                        onChange={(e) => handleSliderChange(ba.id, Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                        aria-label={`Compare before and after for ${ba.title}`}
                      />

                      <div className="absolute top-3 left-3 bg-noir/80 px-2.5 py-0.5 text-[10px] text-ivory border border-white/20 uppercase font-semibold">
                        Before
                      </div>
                      <div className="absolute top-3 right-3 bg-gold px-2.5 py-0.5 text-[10px] text-noir uppercase font-bold">
                        After
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-5">
                      <span className="text-[11px] text-champagne font-semibold uppercase">{ba.category}</span>
                      <h3 className="text-xl font-serif font-bold text-ivory mt-1">{ba.title}</h3>
                      <p className="text-xs text-ivory/70 mt-2 leading-relaxed">{ba.description}</p>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-ivory/50">By {ba.stylist}</span>
                        <button
                          onClick={() => onBookService(ba.title)}
                          className="btn btn-gold text-[11px] !py-1.5 !px-3"
                        >
                          Book Similar Look
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* FILTERABLE GALLERY LOOKBOOK */}
        {/* ========================================================================= */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-2">
                Salon Lookbook
              </span>
              <h2 className="text-3xl font-serif font-bold text-ivory">
                Signature Cuts, Colors & Makeovers
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {galleryCategories.map((cat) => {
                const active = selectedCat === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                      active
                        ? 'bg-gold text-noir border-gold shadow-md'
                        : 'bg-card text-ivory/70 border-white/10 hover:border-gold/50'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Gallery Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative aspect-[4/3] bg-card border border-white/10 overflow-hidden cursor-pointer shadow-lg hover:border-gold/60 transition-all duration-300"
              >
                <Img
                  src={item.image}
                  alt={item.caption}
                  label={item.category}
                  className="group-hover:scale-105 transition-transform duration-700 w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-noir/70 border border-white/20 text-champagne">
                      <ZoomIn size={16} />
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-champagne uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-ivory mt-1">{item.caption}</h3>
                    {item.tags && (
                      <div className="flex gap-1.5 mt-2">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[10px] text-ivory/60 bg-white/10 px-2 py-0.5">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram Callout */}
        <div className="mt-20 bg-card border border-white/10 p-8 sm:p-12 text-center">
          <Instagram className="mx-auto text-champagne mb-4" size={32} />
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">
            Follow Our Daily Lookbook on Instagram
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto">
            Get daily hair inspiration, reel tutorials, and behind-the-scenes client stories at {s.handle}.
          </p>
          <div className="mt-6">
            <a
              href={s.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold text-xs !py-3 !px-6"
            >
              Follow {s.handle}
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/95 backdrop-blur-md"
          onClick={() => setActiveLightbox(null)}
        >
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 text-ivory hover:text-champagne p-3 z-50"
            aria-label="Close Lightbox"
          >
            <X size={26} />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[75vh] overflow-hidden border border-white/20 shadow-2xl flex items-center justify-center bg-noir">
              <Img
                src={activeLightbox.image}
                alt={activeLightbox.caption}
                label={activeLightbox.caption}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-champagne uppercase tracking-widest font-semibold">
                {activeLightbox.category}
              </span>
              <h3 className="text-xl font-serif text-ivory font-bold mt-1">
                {activeLightbox.caption}
              </h3>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    const caption = activeLightbox.caption
                    setActiveLightbox(null)
                    onBookService(caption)
                  }}
                  className="btn btn-gold text-xs !py-2 !px-5"
                >
                  Book This Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
