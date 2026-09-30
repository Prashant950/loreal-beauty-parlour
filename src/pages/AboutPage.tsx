import {
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  Scissors,
  CheckCircle2,
  MapPin,
  Clock,
  Coffee,
  Wifi,
  Car,
  VolumeX,
  Droplets
} from 'lucide-react'
import type { Settings } from '../data/content'
import { salonFeatures } from '../data/content'
import { Img, Stars, AnimatedCount } from '../components/ui'

const amenities = [
  { icon: VolumeX, title: "Private VIP Suites", desc: "Dedicated quiet cabins for bridal makeovers, hijabi clients & private treatments." },
  { icon: Coffee, title: "Artisanal Beverage Bar", desc: "Complimentary cappuccino, green teas, and chilled mocktails during your session." },
  { icon: Droplets, title: "UV Sterilization", desc: "Medical autoclave sterilization for scissors, combs, and metallic implements." },
  { icon: Car, title: "Valet & Ample Parking", desc: "Stress-free dedicated parking space right at B-Block Indira Nagar chauraha." },
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Stay productive or stream your favorite music during long hair color treatments." },
  { icon: ShieldCheck, title: "Single-Use Disposables", desc: "Fresh disposable towels, neck strips, and cutting capes for every client." }
]

export function AboutPage({
  s,
  onNavigate
}: {
  s: Settings
  onNavigate: (page: string) => void
}) {
  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Our Heritage & Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            About {s.name}
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Pioneering luxury hair aesthetics and personalized beauty in Indira Nagar, Lucknow with international standards.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 space-y-24">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-champagne uppercase text-xs tracking-widest font-semibold">
              The Loreal Salon Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory leading-tight">
              Where Parisian Precision Meets Warm Lucknow Hospitality
            </h2>
            <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
              Founded with a singular vision, <strong className="text-champagne">{s.name}</strong> was established to give clients in Lucknow access to genuine, high-fashion hair styling and skin care without compromise.
            </p>
            <p className="text-ivory/70 text-sm leading-relaxed">
              Every stylist at our Indira Nagar salon is trained rigorously in L'Oréal Professionnel color theory, balayage gradation, and scalp wellness. We believe a salon appointment shouldn't just be an errand—it should be an inspiring ritual of rejuvenation.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <div className="border-l-2 border-champagne pl-4">
                <p className="font-serif text-3xl text-champagne font-bold">
                  <AnimatedCount to={s.rating} decimals={1} suffix="★" />
                </p>
                <p className="text-xs text-ivory/60">Google Rated Salon</p>
              </div>
              <div className="border-l-2 border-champagne pl-4">
                <p className="font-serif text-3xl text-champagne font-bold">
                  <AnimatedCount to={s.reviewCount} suffix="+" />
                </p>
                <p className="text-xs text-ivory/60">Verified Client Reviews</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden border border-gold/30 shadow-2xl">
              <Img
                src="/images/hero-1.jpg"
                alt="Salon Interior Ambience"
                label="L'Oréal Salon Interior"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-white/10 p-4 shadow-xl hidden sm:block">
              <div className="flex items-center gap-2">
                <Award className="text-gold" size={24} />
                <span className="text-xs font-semibold text-ivory">Certified L'Oréal Partner Salon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hygiene & Product Authenticity Pledge */}
        <section className="bg-card border border-white/10 p-8 sm:p-12">
          <div className="max-w-3xl mb-12">
            <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-2">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              Our 100% Quality & Hygiene Pledge
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 mt-3">
              We never cut corners on product safety or hygiene. Everything that touches your skin or hair is fresh, sanitized, and authentic.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salonFeatures.map((f, i) => (
              <div key={i} className="p-5 bg-noir/60 border border-white/[0.06] rounded-sm">
                <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-champagne mb-3">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-base font-serif font-semibold text-ivory">{f.title}</h3>
                <p className="text-xs text-ivory/65 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Salon Amenities */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-2">
              Comfort & Experience
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
              Elevated Salon Amenities
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-ivory/70">
              Designed for your comfort during both quick styling sessions and comprehensive bridal rituals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-card/70 border border-white/10 p-6 flex flex-col justify-between hover:border-gold/40 transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 bg-white/[0.04] border border-gold/30 rounded-full flex items-center justify-center text-champagne mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-ivory">{item.title}</h3>
                    <p className="text-xs text-ivory/65 mt-2.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Strip */}
        <div className="bg-gradient-to-r from-card via-[#211D1A] to-card border border-gold/40 p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
            Ready to Experience Loreal Unisex Salon?
          </h2>
          <p className="mt-3 text-sm text-ivory/70 max-w-xl mx-auto">
            Book your appointment online today or visit us in Indira Nagar, Lucknow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('book')}
              className="btn btn-gold text-xs !py-3.5 !px-8"
            >
              Book Appointment Now
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="btn btn-line text-xs !py-3.5 !px-8 hover:border-gold"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
