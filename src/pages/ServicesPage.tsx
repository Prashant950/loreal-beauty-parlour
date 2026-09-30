import { useState, useMemo } from 'react'
import {
  Sparkles,
  Search,
  Clock,
  CheckCircle2,
  CalendarCheck,
  HelpCircle,
  Phone,
  Info,
  X
} from 'lucide-react'
import type { Service, Settings } from '../data/content'
import { Img, Stars, Reveal } from '../components/ui'

interface ServicesPageProps {
  services: Service[]
  s: Settings
  onBookService: (serviceName: string) => void
}

const faqs = [
  {
    q: "How do I choose between Inoa and Majirel hair color?",
    a: "L'Oréal Inoa is 100% ammonia-free and powered by Oil Delivery System (ODS2), making it ideal for sensitive scalps and long-lasting glossy sheen. Majirel offers deep, rich dimensional coverage. Our Master Colorists analyze your hair porosity and scalp condition during your free pre-service consultation."
  },
  {
    q: "How long does a Keratin or Hair Botox treatment last?",
    a: "With sulfate-free aftercare shampoo (such as L'Oréal Vitamino or Absolut Repair), the treatment keeps hair silky, frizz-free, and manageable for 4 to 6 months."
  },
  {
    q: "Do I need an advance appointment for Bridal Makeovers?",
    a: "Yes, we recommend reserving your bridal or pre-bridal package at least 2-4 weeks in advance so we can reserve dedicated VIP suites and schedule patch/skin trials."
  },
  {
    q: "Are men's grooming and haircuts available in separate sections?",
    a: "Yes, our salon features dedicated, well-equipped stations for men's styling, beard sculpting, and facial treatments with master male stylists."
  }
]

export function ServicesPage({ services, s, onBookService }: ServicesPageProps) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalService, setActiveModalService] = useState<Service | null>(null)

  const categories = useMemo(() => {
    const list = Array.from(new Set(services.map((s) => s.category)))
    return ['All', ...list]
  }, [services])

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchCat = selectedCat === 'All' || svc.category === selectedCat
      const matchSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch && svc.active
    })
  }, [services, selectedCat, searchQuery])

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            L'Oréal Professionnel Menu & Price List
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            Services & Beauty Rituals
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every service is tailored with bespoke consultation, genuine L'Oréal Paris formulations, and sterilized luxury tools.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2">
            {categories.map((cat) => {
              const active = selectedCat === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
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

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder="Search treatments, haircut, color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-white/15 px-4 py-2.5 pl-10 text-xs text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ivory/40 hover:text-ivory"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Count Indicator */}
        <div className="mb-6 flex items-center justify-between text-xs text-ivory/60">
          <span>Showing {filteredServices.length} tailored services</span>
          <span className="text-champagne font-medium">100% Genuine L'Oréal Formulations</span>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <article
              key={svc.id}
              className="group bg-card border border-white/10 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Service Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Img
                    src={svc.image}
                    alt={svc.name}
                    label={svc.category}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-noir/80 backdrop-blur-sm px-2.5 py-1 text-[11px] text-champagne border border-white/10">
                    {svc.category}
                  </div>
                  {svc.badge && (
                    <div className="absolute top-3 right-3 bg-gold text-noir text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {svc.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-ivory group-hover:text-champagne transition-colors">
                    {svc.name}
                  </h3>

                  <p className="text-xs text-ivory/70 mt-2.5 leading-relaxed">
                    {svc.description}
                  </p>

                  {svc.details && (
                    <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                      {svc.details.slice(0, 3).map((det, i) => (
                        <li key={i} className="text-[11px] text-ivory/60 flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-champagne shrink-0" />
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 mt-2">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-ivory/40 uppercase">Price Starting</span>
                    <span className="font-serif text-2xl font-bold text-champagne">{svc.price}</span>
                    <span className="text-xs text-ivory/50 ml-1.5">({svc.duration})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(svc)}
                      aria-label="More details"
                      className="p-2 text-ivory/60 hover:text-champagne border border-white/10 hover:border-gold transition-colors"
                    >
                      <Info size={16} />
                    </button>
                    <button
                      onClick={() => onBookService(svc.name)}
                      className="btn btn-gold text-xs !py-2 !px-4"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-card border border-white/10 p-8">
            <Sparkles size={36} className="mx-auto text-champagne mb-3" />
            <h3 className="text-2xl font-serif text-ivory">No services found matching "{searchQuery}"</h3>
            <p className="text-xs text-ivory/60 mt-2">Try clearing your search filter or selecting 'All' categories.</p>
            <button
              onClick={() => {
                setSelectedCat('All')
                setSearchQuery('')
              }}
              className="btn btn-gold text-xs mt-6"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SERVICE FAQ SECTION */}
        {/* ========================================================================= */}
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-serif font-bold text-ivory">
                Common Questions About Our Services
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-white/10 p-6 rounded-sm">
                  <h4 className="text-base font-serif font-semibold text-champagne flex items-start gap-2.5">
                    <HelpCircle size={18} className="shrink-0 mt-0.5 text-gold" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory/75 mt-3 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-card via-[#211D1A] to-card border border-gold/40 p-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-ivory">Need Personal Consultation?</h3>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 max-w-lg mx-auto">
                Call our salon front desk for a complimentary hair texture diagnosis and bridal package customizer.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a href={`tel:${s.phone}`} className="btn btn-gold text-xs !py-3">
                  <Phone size={15} /> Call {s.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* SERVICE DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="relative w-full max-w-xl bg-card border border-gold/40 p-6 sm:p-8 text-ivory shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 text-ivory/60 hover:text-champagne p-2"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <span className="text-xs text-champagne uppercase tracking-wider font-semibold">
              {activeModalService.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mt-1">
              {activeModalService.name}
            </h3>

            <div className="mt-4 flex items-center gap-4 text-xs text-ivory/70 pb-4 border-b border-white/10">
              <span className="text-champagne font-bold text-lg font-serif">{activeModalService.price}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {activeModalService.duration}
              </span>
            </div>

            <p className="mt-4 text-sm text-ivory/80 leading-relaxed">
              {activeModalService.description}
            </p>

            {activeModalService.details && (
              <div className="mt-6 bg-noir/50 p-4 border border-white/5">
                <h5 className="text-xs font-semibold text-champagne uppercase tracking-wider mb-3">
                  What's Included in This Ritual:
                </h5>
                <ul className="space-y-2">
                  {activeModalService.details.map((d, i) => (
                    <li key={i} className="text-xs text-ivory/75 flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  const svcName = activeModalService.name
                  setActiveModalService(null)
                  onBookService(svcName)
                }}
                className="btn btn-gold text-xs flex-1 !py-3"
              >
                <CalendarCheck size={16} /> Book This Service
              </button>
              <button
                onClick={() => setActiveModalService(null)}
                className="btn btn-line text-xs !py-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
