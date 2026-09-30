import { useState, useEffect, useRef } from 'react'
import {
  CalendarCheck,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Award,
  Clock,
  ArrowRight,
  Heart,
  CheckCircle2,
  Scissors,
  Eye,
  Armchair,
  ShoppingBag,
  Play,
  Pause
} from 'lucide-react'
import type { Settings, Service, Stylist, Product, Review, BeforeAfter, HeroSlide } from '../data/content'
import { heroSlides, salonFeatures } from '../data/content'
import { Reveal, Stars, Img, Badge, AnimatedCount } from '../components/ui'

interface HomePageProps {
  s: Settings
  services: Service[]
  stylists: Stylist[]
  products: Product[]
  reviews: Review[]
  beforeAfter: BeforeAfter[]
  onNavigate: (page: string, params?: Record<string, string>) => void
  onBookService: (serviceName?: string) => void
}

export function HomePage({
  s,
  services,
  stylists,
  products,
  reviews,
  beforeAfter,
  onNavigate,
  onBookService
}: HomePageProps) {
  // Hero Slider State (Exact 8 seconds continuous auto-slide)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const [quickService, setQuickService] = useState('')
  const [quickDate, setQuickDate] = useState('')

  // Continuous reliable 8-second auto-slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const activeSlideData = heroSlides[currentSlide]

  // Featured services for home
  const signatureServices = services.filter((s) => s.featured).slice(0, 6)
  const activeBa = beforeAfter[0]

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNavigate('book', { service: quickService, date: quickDate })
  }

  return (
    <div className="space-y-0">
      {/* ========================================================================= */}
      {/* 1. ULTRA-LUXURY HERO SECTION WITH AUTO-SLIDE HD BACKGROUNDS */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[85vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center bg-noir text-ivory overflow-hidden select-none"
      >
        {/* Background Slides with Crossfade and Subtle Zoom (100% Clear, Bright & Full HD) */}
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-[center_20%] sm:object-center transform transition-transform duration-[8000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Minimal light gradient for readability while keeping image fully visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          )
        })}

        {/* Hero Foreground Content - Positioned Higher Up & Optimized for Mobile */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 pt-8 pb-10 sm:py-14 lg:py-16">
          <div className="max-w-2xl sm:max-w-3xl">
            {/* Highlight Line - 100% Transparent Background */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#F5E6C8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] mb-2.5 sm:mb-4">
              <ShieldCheck size={16} className="text-gold shrink-0 drop-shadow" />
              <span className="font-medium tracking-wide drop-shadow">{activeSlideData.highlight}</span>
            </div>

            {/* Main Headline - Larger & Bold */}
            <h1 className="text-[30px] sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white font-bold leading-[1.12] sm:leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              {activeSlideData.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-white/95 leading-relaxed max-w-xl font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {activeSlideData.subtitle}
            </p>

            {/* Action Buttons - Stacked on Mobile, Side-by-Side on Desktop */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 max-w-xs sm:max-w-none">
              <button
                onClick={() => onNavigate(activeSlideData.primaryCta.action)}
                className="btn btn-gold text-xs sm:text-sm !py-2.5 sm:!py-3.5 !px-5 sm:!px-8 rounded-full shadow-2xl shadow-gold/40 hover:scale-105 transition-transform font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <CalendarCheck size={16} className="shrink-0" />
                <span className="whitespace-nowrap">{activeSlideData.primaryCta.text}</span>
              </button>

              <button
                onClick={() => onNavigate(activeSlideData.secondaryCta.action)}
                className="btn btn-line text-xs sm:text-sm !py-2.5 sm:!py-3.5 !px-5 sm:!px-7 rounded-full bg-black/40 backdrop-blur-sm border-white/40 hover:border-champagne hover:bg-black/60 text-white font-medium flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">{activeSlideData.secondaryCta.text}</span>
                <ArrowRight size={14} className="shrink-0" />
              </button>
            </div>

            {/* Trust Rating Badge */}
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 pt-3.5 sm:pt-4 border-t border-white/20 text-xs text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <div className="flex items-center gap-1.5">
                <Stars n={5} size={14} />
                <span className="font-bold text-white"><AnimatedCount to={s.rating} decimals={1} />/5</span>
              </div>
              <span className="text-white/50">•</span>
              <span className="font-medium"><AnimatedCount to={s.reviewCount} suffix="+" /> Reviews</span>
              <span className="text-white/50">•</span>
              <span className="text-champagne flex items-center gap-1 font-medium">
                <MapPin size={13} /> Indira Nagar, Lucknow
              </span>
            </div>
          </div>
        </div>

        {/* Slide Indicators & Controls - Hidden on Mobile, Shown on Desktop */}
        <div className="hidden sm:flex absolute bottom-6 right-6 z-20 items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="text-white/80 hover:text-white transition-colors p-0.5"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-6 bg-champagne'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="text-white/80 hover:text-white transition-colors p-0.5"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK APPOINTMENT STRIP */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#141210] via-[#1F1C18] to-[#141210] border-y border-gold/30 py-5 px-4 relative z-30 shadow-xl">
        <div className="mx-auto max-w-7xl">
          <form
            onSubmit={handleQuickBookSubmit}
            className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-champagne shrink-0">
                <CalendarCheck size={20} />
              </div>
              <div>
                <p className="font-serif text-lg text-ivory font-semibold">Fast Appointment Booking</p>
                <p className="text-xs text-champagne/80">Choose your service & preferred date for instant priority confirmation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-2xl">
              {/* Service Select */}
              <select
                value={quickService}
                onChange={(e) => setQuickService(e.target.value)}
                className="bg-[#181512] text-ivory text-xs px-3.5 py-3 border border-white/20 rounded-xl focus:border-champagne outline-none shadow-inner"
              >
                <option value="">Select Service (Hair, Skin, Bridal...)</option>
                {services.map((svc) => (
                  <option key={svc.id} value={svc.name}>
                    {svc.name} — {svc.price}
                  </option>
                ))}
              </select>

              {/* Date Input */}
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="bg-[#181512] text-ivory text-xs px-3.5 py-3 border border-white/20 rounded-xl focus:border-champagne outline-none shadow-inner"
              />

              {/* Submit CTA - strictly single line */}
              <button
                type="submit"
                className="btn btn-gold text-[11px] whitespace-nowrap !py-3 !px-4 w-full font-bold shadow-md rounded-full flex items-center justify-center gap-1.5"
              >
                <span>Continue Booking</span>
                <span className="text-sm leading-none">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TRUST & SALON CREDENTIALS METRICS */}
      {/* ========================================================================= */}
      <section className="bg-[#151311] py-16 px-4 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-white/[0.06] bg-[#1C1917]/70 rounded-xl shadow-lg hover:border-gold/30 transition-all">
              <p className="font-serif text-4xl sm:text-5xl text-champagne font-bold">
                <AnimatedCount to={4.9} decimals={1} suffix="★" />
              </p>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-medium">Google Rating (180+ Reviews)</p>
            </div>

            <div className="p-6 border border-white/[0.06] bg-[#1C1917]/70 rounded-xl shadow-lg hover:border-gold/30 transition-all">
              <p className="font-serif text-4xl sm:text-5xl text-champagne font-bold">
                <AnimatedCount to={100} suffix="%" />
              </p>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-medium">Authentic L'Oréal Products</p>
            </div>

            <div className="p-6 border border-white/[0.06] bg-[#1C1917]/70 rounded-xl shadow-lg hover:border-gold/30 transition-all">
              <p className="font-serif text-4xl sm:text-5xl text-champagne font-bold">
                <AnimatedCount to={15} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-medium">Years Artistry Experience</p>
            </div>

            <div className="p-6 border border-white/[0.06] bg-[#1C1917]/70 rounded-xl shadow-lg hover:border-gold/30 transition-all">
              <p className="font-serif text-4xl sm:text-5xl text-champagne font-bold">
                <AnimatedCount to={10} suffix="k+" />
              </p>
              <p className="text-xs sm:text-sm text-ivory/70 mt-2 font-medium">Delighted Women & Men</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE SERVICES SHOWCASE (HIGHLIGHTS ON HOME) */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 bg-[#12100E]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal className="max-w-2xl">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Crafted For Your Signature Look
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
                Signature Salon Services
              </h2>
              <p className="mt-4 text-ivory/70 text-sm sm:text-base leading-relaxed">
                From precision French Balayage to 24K Gold luxury facials and couture bridal styling.
              </p>
            </Reveal>

            <button
              onClick={() => onNavigate('services')}
              className="btn btn-gold-outline text-xs !py-3 !px-6 self-start md:self-end shrink-0"
            >
              <span>View Full Menu (40+ Services)</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureServices.map((svc) => (
              <article
                key={svc.id}
                className="group bg-card border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Img
                    src={svc.image}
                    alt={svc.name}
                    label={svc.category}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    {svc.badge && (
                      <span className="bg-gold text-noir text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase shadow-md">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-noir/80 backdrop-blur-sm px-2.5 py-1 text-xs text-champagne border border-white/10">
                    {svc.category}
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-serif font-semibold text-ivory group-hover:text-champagne transition-colors">
                      {svc.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-ivory/65 mt-2.5 leading-relaxed flex-1">
                    {svc.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-ivory/50 uppercase tracking-wider">Starting at</span>
                      <span className="font-serif text-xl font-bold text-champagne">{svc.price}</span>
                      <span className="text-xs text-ivory/40 ml-1.5">({svc.duration})</span>
                    </div>

                    <button
                      onClick={() => onBookService(svc.name)}
                      className="btn btn-gold text-xs !py-2 !px-4"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="btn btn-line text-xs hover:border-gold"
            >
              Explore All Categories & Price List →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ABOUT US TEASER & SALON EXPERIENCE */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 bg-noir relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Side */}
            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-gold/30 shadow-2xl">
                <Img
                  src="/images/hero-1.jpg"
                  alt="Interior of Loreal Unisex Salon Indira Nagar"
                  label="Salon Ambiance"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-card border border-gold/50 p-5 shadow-2xl backdrop-blur-md max-w-[260px]">
                <p className="font-serif text-2xl text-champagne font-bold">L'Oréal Paris</p>
                <p className="text-xs text-ivory/80 mt-1">Official Certified Salon Partner in Indira Nagar</p>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Experience True Salon Luxury
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory leading-tight">
                Where Beauty is Elevated into a Fine Art
              </h2>

              <p className="mt-6 text-ivory/80 text-sm sm:text-base leading-relaxed">
                Located conveniently at B-Block Chauraha (opposite Shri Sai Mandir), {s.name} brings world-class hair styling, balayage, and restorative skin rituals right to Indira Nagar, Lucknow.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {salonFeatures.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-card/60 border border-white/[0.06]">
                    <CheckCircle2 size={18} className="text-champagne shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-ivory">{feat.title}</p>
                      <p className="text-[11px] text-ivory/60 mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="btn btn-gold text-xs !py-3 !px-6 rounded-full shadow-lg flex items-center gap-1.5 font-bold whitespace-nowrap"
                >
                  <span>Discover Story</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate('stylists')}
                  className="btn btn-line text-xs !py-3 !px-6 rounded-full flex items-center gap-1.5 font-medium whitespace-nowrap"
                >
                  <span>Meet Stylists</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BEFORE & AFTER TRANSFORMATION PREVIEW */}
      {/* ========================================================================= */}
      {activeBa && (
        <section className="py-24 px-4 sm:px-6 bg-[#12100E] border-t border-white/[0.08]">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Real Client Transformations
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
                Witness The Transformation
              </h2>
              <p className="mt-4 text-ivory/70 text-sm">
                Drag the slider left or right to see real results crafted by our Master Stylists.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* Interactive Comparison Slider */}
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-white/15 select-none shadow-2xl">
                  {/* After Image (Full background) */}
                  <Img src={activeBa.after} alt={`${activeBa.title} After`} className="w-full h-full" />
                  
                  {/* Before Image (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <Img src={activeBa.before} alt={`${activeBa.title} Before`} className="w-full h-full" />
                  </div>

                  {/* Vertical Dividing Line */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-champagne shadow-[0_0_10px_rgba(223,183,113,0.8)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-champagne text-noir font-bold flex items-center justify-center text-xs shadow-lg">
                      ↔
                    </div>
                  </div>

                  {/* HTML Range Input for Accessibility & Touch */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Drag to compare before and after"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-noir/80 px-3 py-1 text-xs text-ivory border border-white/20 uppercase tracking-wider font-semibold">
                    Before
                  </div>
                  <div className="absolute top-4 right-4 bg-gold px-3 py-1 text-xs text-noir uppercase tracking-wider font-bold">
                    After
                  </div>
                </div>
              </div>

              {/* Transformation Info */}
              <div className="lg:col-span-4 bg-card p-6 border border-white/10">
                <span className="text-gold text-xs uppercase tracking-wider font-semibold">{activeBa.category}</span>
                <h3 className="text-2xl font-serif text-ivory font-bold mt-2">{activeBa.title}</h3>
                <p className="text-xs text-ivory/70 mt-3 leading-relaxed">{activeBa.description}</p>
                <p className="text-xs text-champagne mt-4 font-medium">Stylist: {activeBa.stylist}</p>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <button
                    onClick={() => onBookService(activeBa.title)}
                    className="btn btn-gold text-xs w-full"
                  >
                    Book This Transformation
                  </button>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="btn btn-line text-xs w-full hover:border-gold"
                  >
                    View All Lookbook Photos →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. MASTER STYLISTS PREVIEW */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 bg-noir">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal className="max-w-2xl">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Certified L'Oréal Art Directors
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
                Meet Our Master Stylists
              </h2>
              <p className="mt-4 text-ivory/70 text-sm sm:text-base">
                Our artists combine technical precision with customized aesthetic consultation.
              </p>
            </Reveal>

            <button
              onClick={() => onNavigate('stylists')}
              className="btn btn-gold-outline text-xs !py-3 !px-6 self-start md:self-end shrink-0"
            >
              <span>View All Stylist Profiles</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {stylists.map((st) => (
              <div
                key={st.id}
                className="bg-card border border-white/10 p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-gold/50 transition-all duration-300"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-full overflow-hidden border-2 border-gold/40 group-hover:border-champagne transition-colors">
                  <Img src={st.image} alt={st.name} label={st.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs text-champagne font-semibold">{st.experience}</span>
                  <h3 className="text-2xl font-serif font-bold text-ivory mt-1">{st.name}</h3>
                  <p className="text-xs text-gold/90 font-medium">{st.role}</p>
                  <p className="text-xs text-ivory/65 mt-2 line-clamp-2">{st.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {st.specialties.slice(0, 2).map((sp) => (
                      <span key={sp} className="bg-white/[0.05] border border-white/10 px-2 py-0.5 text-[10px] text-ivory/80">
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => onNavigate('book', { stylist: st.name })}
                      className="btn btn-gold text-xs !py-2 !px-4 w-full sm:w-auto"
                    >
                      Book With {st.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PRODUCTS TEASER */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 bg-[#12100E] border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Home Haircare Regime
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory leading-tight">
                Authentic L'Oréal Professionnel Paris Catalog
              </h2>
              <p className="mt-6 text-ivory/70 text-sm sm:text-base leading-relaxed">
                Take home salon-grade haircare formulated with patented molecular bond technology. Serie Expert, Metal Detox, Vitamino Color, and Mythic Oil available directly at our salon counter.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-ivory/80">
                  <CheckCircle2 size={18} className="text-champagne shrink-0" />
                  <span>100% Genuine Barcoded Inventory directly from L'Oréal</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ivory/80">
                  <CheckCircle2 size={18} className="text-champagne shrink-0" />
                  <span>Free in-salon hair diagnosis to match your exact scalp & hair needs</span>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => onNavigate('products')}
                  className="btn btn-gold text-xs !py-3.5 !px-7"
                >
                  <ShoppingBag size={16} />
                  Browse Product Catalog →
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden border border-white/15 shadow-2xl">
                <Img
                  src="/images/products.jpg"
                  alt="L'Oréal Professionnel Display"
                  label="Product Shelf"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. GOOGLE REVIEWS & TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 bg-noir">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal className="max-w-2xl">
              <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
                Client Love In Indira Nagar
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-ivory/70 text-sm sm:text-base">
                Real feedback from our valued customers across Lucknow.
              </p>
            </Reveal>

            <a
              href={s.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold-outline text-xs !py-3 !px-6 self-start md:self-end shrink-0"
            >
              <span>Write a Google Review</span>
              <Star size={15} fill="currentColor" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((r) => (
              <div
                key={r.id}
                className="bg-card border border-white/10 p-6 flex flex-col justify-between"
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
                    <p className="text-sm font-semibold text-ivory">{r.name}</p>
                    <p className="text-[11px] text-champagne">{r.serviceTaken}</p>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase bg-white/5 px-2 py-1">
                    Google
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('reviews')}
              className="btn btn-line text-xs hover:border-gold"
            >
              Read All Verified Customer Reviews →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SALON LOCATION & INTERACTIVE MAP EMBED */}
      {/* ========================================================================= */}
     
    </div>
  )
}
