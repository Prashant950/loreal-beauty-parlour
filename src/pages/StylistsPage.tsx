import {
  Sparkles,
  Award,
  Star,
  CalendarCheck,
  CheckCircle2,
  Instagram,
  Scissors
} from 'lucide-react'
import type { Stylist, Settings } from '../data/content'
import { Img, Stars } from '../components/ui'

interface StylistsPageProps {
  stylists: Stylist[]
  s: Settings
  onBookWithStylist: (stylistName: string) => void
}

export function StylistsPage({ stylists, s, onBookWithStylist }: StylistsPageProps) {
  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            L'Oréal Professionnel Academy Certified
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            Our Master Stylists & Artists
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our team brings over a decade of high-fashion expertise, specialized coloring certifications, and personalized consultation to every client.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {stylists.map((st) => (
            <article
              key={st.id}
              className="bg-card border border-white/15 p-8 flex flex-col justify-between group hover:border-gold/60 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Profile Top */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/10">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gold/50 shrink-0 group-hover:border-champagne transition-colors shadow-lg">
                    <Img src={st.image} alt={st.name} label={st.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="text-center sm:text-left">
                    <span className="inline-block px-3 py-1 bg-gold/20 text-champagne text-[11px] font-semibold tracking-wider uppercase border border-gold/30 rounded-full">
                      {st.experience}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-ivory mt-2">
                      {st.name}
                    </h2>
                    <p className="text-xs text-gold font-medium mt-0.5">{st.role}</p>

                    <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs">
                      <Stars n={5} size={14} />
                      <span className="font-semibold text-ivory">{st.rating}</span>
                      <span className="text-ivory/50">({st.reviewsCount} clients)</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="py-6">
                  <h4 className="text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                    Professional Background
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory/75 leading-relaxed">
                    {st.bio}
                  </p>

                  <h4 className="text-xs font-semibold text-champagne uppercase tracking-wider mt-6 mb-3">
                    Signature Specialties:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {st.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="bg-noir px-3 py-1 text-xs text-ivory/90 border border-white/10 rounded-sm flex items-center gap-1.5"
                      >
                        <Scissors size={12} className="text-gold" />
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onBookWithStylist(st.name)}
                  className="btn btn-gold text-xs w-full !py-3 font-semibold"
                >
                  <CalendarCheck size={16} />
                  Book Appointment with {st.name.split(' ')[0]}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Join our team / Consultation Banner */}
        <div className="mt-20 max-w-4xl mx-auto bg-[#12100E] border border-white/10 p-8 sm:p-10 text-center">
          <Sparkles className="mx-auto text-gold mb-3" size={28} />
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">
            Looking for a Bespoke Hair Consultation?
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto">
            Book a complimentary 10-minute consultation with our Art Directors before starting your Balayage, Keratin or Bridal makeover.
          </p>
          <div className="mt-6">
            <button
              onClick={() => onBookWithStylist('Any Available Senior Stylist')}
              className="btn btn-gold-outline text-xs !py-3 !px-6"
            >
              Book Consultation Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
