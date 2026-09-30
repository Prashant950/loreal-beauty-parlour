import { useState } from 'react'
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Search,
  Info,
  X
} from 'lucide-react'
import type { Product, Settings } from '../data/content'
import { Img } from '../components/ui'
import { waLink } from '../components/Layout'

interface ProductsPageProps {
  products: Product[]
  s: Settings
}

export function ProductsPage({ products, s }: ProductsPageProps) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null)

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered = products.filter((p) => {
    if (selectedCat === 'All') return true
    return p.category === selectedCat
  })

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Official Salon Retail Counter
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            L'Oréal Professionnel Paris Catalog
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Maintain your salon results at home with 100% authentic, barcoded Serie Expert, Metal Detox, and Mythic Oil formulations.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-10">
          {categories.map((cat) => {
            const active = selectedCat === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-gold text-noir border-gold shadow-md'
                    : 'bg-card text-ivory/75 border-white/10 hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <article
              key={prod.id}
              className="bg-card border border-white/10 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-charcoal p-6 flex items-center justify-center">
                  <Img
                    src={prod.image}
                    alt={prod.name}
                    label={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.tag && (
                    <div className="absolute top-3 right-3 bg-gold text-noir text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {prod.tag}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-noir/80 px-2 py-0.5 text-[10px] text-champagne border border-white/10">
                    {prod.volume}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <span className="text-[10px] text-champagne uppercase tracking-wider font-semibold">
                    {prod.brand}
                  </span>
                  <h3 className="text-base font-serif font-semibold text-ivory mt-1 group-hover:text-champagne transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-ivory/65 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <ul className="mt-3 space-y-1">
                    {prod.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="text-[11px] text-ivory/60 flex items-center gap-1.5">
                        <CheckCircle2 size={11} className="text-champagne shrink-0" />
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-ivory/40 uppercase">Salon Price</span>
                    <span className="font-serif text-lg font-bold text-champagne">{prod.price}</span>
                  </div>

                  <a
                    href={waLink(
                      s,
                      `Hello ${s.name}, I would like to reserve/inquire about the product: ${prod.name} (${prod.price}). Is it currently in stock at Indira Nagar salon?`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-gold text-[11px] !py-2 !px-3"
                  >
                    <MessageCircle size={13} /> Reserve
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Authenticity Guarantee Callout */}
        <div className="mt-20 bg-[#12100E] border border-gold/30 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck size={36} className="text-champagne shrink-0" />
            <div>
              <h3 className="text-xl font-serif font-bold text-ivory">
                100% Genuine Barcoded Inventory Guarantee
              </h3>
              <p className="text-xs text-ivory/70 mt-1">
                Every bottle at our salon is sourced directly from L'Oréal Professionnel official distributors. Never worry about counterfeits or old stock.
              </p>
            </div>
          </div>
          <a
            href={waLink(s, "Hello, I want advice on which L'Oreal shampoo or mask suits my hair type.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-line text-xs whitespace-nowrap hover:border-gold"
          >
            Ask Stylist For Product Advice
          </a>
        </div>
      </div>
    </div>
  )
}
