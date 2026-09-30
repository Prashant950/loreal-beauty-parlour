import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Star, MapPin, Instagram, X, Sparkles, Scissors, Heart, Eye, Armchair, Navigation } from 'lucide-react'
import type { Settings, Service, GalleryItem, Review, BeforeAfter } from '../data/content'
import { galleryCategories } from '../data/content'
import { Img, Reveal, Sec, goBook } from './ui'

const Stars = ({ n = 5 }: { n?: number }) => <span className="inline-flex text-gold" aria-label={`${n} out of 5 stars`}>{Array.from({ length: n }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</span>

function Count({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0)
  useEffect(() => { if (!inView) return; let f = 0; const id = setInterval(() => { f++; setV(to * Math.min(f / 30, 1)); if (f >= 30) clearInterval(id) }, 30); return () => clearInterval(id) }, [inView, to])
  return <span ref={ref}>{v.toFixed(decimals)}</span>
}

export function Hero({ s }: { s: Settings }) {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-end bg-ink text-ivory overflow-hidden">
      {/* Hero photo: public/images/hero.jpg daalein */}
      <img src="/images/hero.jpg" alt="" aria-hidden onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className="relative mx-auto max-w-6xl w-full px-5 pb-28 lg:pb-24 pt-40">
        <p className="flex items-center gap-2 text-sm text-champagne"><MapPin size={16} />Indira Nagar, Lucknow</p>
        <h1 className="mt-5 text-5xl sm:text-6xl md:text-8xl leading-[1.02] max-w-4xl">Your Style. Your Confidence. Your Signature.</h1>
        <p className="mt-6 max-w-xl text-ivory/75 leading-relaxed">Experience professional beauty, hair and grooming services at {s.name}, Indira Nagar, Lucknow.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => goBook()} className="btn btn-gold">Book Your Appointment</button>
          <a href="#services" className="btn btn-line text-ivory">Explore Services</a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-sm"><Stars /><span>{s.rating}/5 Rating</span><span className="text-ivory/40">|</span><span>{s.reviewCount}+ Reviews</span></div>
      </div>
    </section>
  )
}

export const Trust = ({ s }: { s: Settings }) => (
  <section className="bg-sand px-5 py-14">
    <Reveal className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div><p className="font-serif text-6xl"><Count to={s.rating} decimals={1} /> <Stars /></p><p className="text-sm text-ink/60 mt-1"><Count to={s.reviewCount} />+ Google Reviews</p></div>
      <p className="font-serif text-2xl md:text-3xl max-w-md">Trusted by customers in Indira Nagar, Lucknow</p>
    </Reveal>
  </section>
)

export function Services({ items }: { items: Service[] }) {
  const active = items.filter((x) => x.active)
  const cats = ['All', ...Array.from(new Set(active.map((x) => x.category)))]
  const [cat, setCat] = useState('All')
  const list = active.filter((x) => cat === 'All' || x.category === cat)
  return (
    <Sec id="services" title="Beauty & Grooming, Designed Around You" sub="Professional salon services for women and men, delivered with care, precision and attention to detail.">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8" role="tablist">{cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`shrink-0 px-5 py-2 text-sm border min-h-[44px] transition-colors ${cat === c ? 'bg-ink text-ivory border-ink' : 'border-ink/20 hover:border-ink'}`}>{c}</button>)}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
        {list.map((x) => (
          <article key={x.name} className="bg-ivory p-6 flex flex-col group hover:bg-sand transition-colors">
            <div className="aspect-[4/3] mb-5 overflow-hidden"><Img src={x.image} alt={x.name} label={x.name} className="group-hover:scale-105 transition-transform duration-700" /></div>
            <p className="text-xs text-gold">{x.category}</p>
            <h3 className="text-2xl mt-1">{x.name}</h3>
            <p className="text-sm text-ink/60 mt-2 flex-1">{x.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink/60">{[x.price, x.duration].filter(Boolean).join(' · ')}</span>
              <button onClick={() => goBook(x.name)} className="text-gold hover:text-ink underline underline-offset-4 min-h-[44px]">Enquire Now</button>
            </div>
          </article>
        ))}
      </div>
    </Sec>
  )
}

export const Featured = ({ items }: { items: Service[] }) => {
  const f = items.filter((x) => x.active && x.featured)
  if (!f.length) return null
  return (
    <Sec title="Popular Salon Services" dark>
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-5 px-5">
        {f.map((x) => (
          <article key={x.name} className="snap-start shrink-0 w-[78%] sm:w-80 group">
            <div className="aspect-[3/4] overflow-hidden"><Img src={x.image} alt={x.name} label={x.name} className="group-hover:scale-105 transition-transform duration-700" /></div>
            <h3 className="text-2xl mt-4">{x.name}</h3>
            <p className="text-sm text-ivory/60 mt-1">{x.description}</p>
            {x.price && <p className="text-champagne text-sm mt-2">Starting {x.price}</p>}
            <button onClick={() => goBook(x.name)} className="btn btn-line mt-4 text-ivory !py-2">Book Now</button>
          </article>
        ))}
      </div>
    </Sec>
  )
}

export const About = ({ s }: { s: Settings }) => (
  <Sec id="about" title={`About ${s.name}`} tone="bg-sand">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Reveal><p className="text-lg leading-relaxed text-ink/75">{s.name} is a professional beauty and grooming destination in Indira Nagar, Lucknow, offering a comfortable and modern salon experience for both women and men.</p>
        <p className="mt-4 leading-relaxed text-ink/60">From personalised attention to careful styling, our focus is simple: help every client leave feeling like the best version of themselves.</p></Reveal>
      <Reveal delay={0.15} className="aspect-[4/5] md:aspect-square"><Img src="" alt="Interior of Loreal Unisex Salon" label="Salon interior photo" /></Reveal>
    </div>
  </Sec>
)

const why = [[Heart, 'Personalized Service'], [Scissors, 'Professional Beauty & Grooming'], [Sparkles, 'Modern Salon Experience'], [Eye, 'Attention to Detail'], [Armchair, 'Comfortable Environment'], [Navigation, 'Convenient Indira Nagar Location']] as const
export const Why = () => (
  <Sec title="Why Clients Choose Loreal Unisex Salon">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
      {why.map(([Icon, t], i) => <Reveal key={t} delay={i * 0.05}><Icon strokeWidth={1} size={34} className="text-gold" /><h3 className="text-2xl mt-4">{t}</h3></Reveal>)}
    </div>
  </Sec>
)

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [cat, setCat] = useState('All'); const [open, setOpen] = useState<GalleryItem | null>(null)
  const list = items.filter((x) => cat === 'All' || x.category === cat)
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])
  return (
    <Sec id="gallery" title="Style. Beauty. Transformation." tone="bg-sand">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">{['All', ...galleryCategories].map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`shrink-0 px-5 py-2 text-sm border min-h-[44px] ${cat === c ? 'bg-ink text-ivory border-ink' : 'border-ink/20'}`}>{c}</button>)}</div>
      <div className="columns-2 md:columns-3 gap-3">
        {list.map((x, i) => (
          <button key={x.caption + i} onClick={() => setOpen(x)} className={`mb-3 w-full block overflow-hidden group ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`} aria-label={`Open ${x.caption}`}><Img src={x.image} alt={x.caption} label={x.category} className="group-hover:scale-105 transition-transform duration-700" /></button>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.caption} className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-5" onClick={() => setOpen(null)}>
          <button className="absolute top-4 right-4 text-ivory p-3" aria-label="Close" onClick={() => setOpen(null)}><X /></button>
          <figure className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}><div className="aspect-[4/5] max-h-[80vh]"><Img src={open.image} alt={open.caption} label={open.caption} className="!object-contain" /></div><figcaption className="text-ivory/70 text-center mt-3 text-sm">{open.caption}</figcaption></figure>
        </div>
      )}
    </Sec>
  )
}

function Slider({ b }: { b: BeforeAfter }) {
  const [p, setP] = useState(50)
  return (
    <figure className="relative aspect-square overflow-hidden select-none">
      <Img src={b.after} alt={`${b.title} after`} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}><Img src={b.before} alt={`${b.title} before`} /></div>
      <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${p}%` }} />
      <input type="range" min={0} max={100} value={p} onChange={(e) => setP(+e.target.value)} aria-label={`${b.title} before and after`} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
      <figcaption className="absolute bottom-2 left-3 text-xs text-white drop-shadow">{b.title}</figcaption>
    </figure>
  )
}
export const BeforeAfterSection = ({ items }: { items: BeforeAfter[] }) => (
  <Sec title="See the Difference" sub={items.length ? undefined : 'Real before-and-after results from our salon will appear here soon.'}>
    {items.length > 0 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{items.map((b) => <Slider key={b.title} b={b} />)}</div>}
  </Sec>
)

export const InstagramSection = ({ s, items }: { s: Settings; items: GalleryItem[] }) => (
  <Sec title="Follow Our Latest Looks" sub={s.handle} dark>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">{items.slice(0, 6).map((x, i) => <div key={i} className="aspect-square overflow-hidden"><Img src={x.image} alt={x.caption} label="Instagram" /></div>)}</div>
    <a href={s.instagram} target="_blank" rel="noreferrer" className="btn btn-line text-ivory mt-8"><Instagram size={18} />Follow on Instagram</a>
  </Sec>
)

export const Reviews = ({ s, items }: { s: Settings; items: Review[] }) => (
  <Sec id="reviews" title="What Our Clients Say" tone="bg-sand">
    <p className="flex items-center gap-3 mb-8"><Stars /><span className="font-serif text-2xl">{s.rating} / 5</span><span className="text-sm text-ink/60">{s.reviewCount} Reviews</span></p>
    {items.length ? (
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">{items.map((r, i) => (
        <blockquote key={i} className="snap-start shrink-0 w-[85%] sm:w-96 bg-ivory p-6"><Stars n={r.rating} /><p className="mt-4 leading-relaxed">{r.text}</p><footer className="mt-4 text-sm text-ink/60">{r.name} · {r.date} · {r.source}</footer></blockquote>))}</div>
    ) : <a href={s.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-line">Read our reviews on Google</a>}
  </Sec>
)

export const Location = ({ s }: { s: Settings }) => (
  <Sec id="contact" title="Visit Our Salon">
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <h3 className="text-3xl">{s.name}</h3>
        <address className="not-italic mt-4 leading-relaxed text-ink/70">{s.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
        <p className="mt-4 text-sm text-ink/60">Google Plus Code: {s.plusCode}</p>
        <p className="mt-2"><a href={`tel:${s.phone}`} className="hover:text-gold">{s.phoneDisplay}</a></p>
        <div className="mt-4 text-sm text-ink/70">{s.hours.map((h, i) => <p key={i}>{typeof h === 'string' ? h : `${h.days}: ${h.timing}`}</p>)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-gold" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapsQuery)}`}>Get Directions</a>
          <a className="btn btn-line" href={`tel:${s.phone}`}>Call Salon</a>
        </div>
      </div>
      <iframe title="Loreal Unisex Salon on Google Maps" loading="lazy" className="w-full h-80 lg:h-full min-h-[320px] border-0" src={`https://www.google.com/maps?q=${encodeURIComponent(s.mapsQuery)}&output=embed`} />
    </div>
  </Sec>
)
