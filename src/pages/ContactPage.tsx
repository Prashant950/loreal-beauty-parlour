import { useState } from 'react'
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles
} from 'lucide-react'
import type { Settings } from '../data/content'
import { waLink } from '../components/Layout'

interface ContactPageProps {
  s: Settings
}

export function ContactPage({ s }: ContactPageProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [inquiryType, setInquiryType] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `*New Contact Inquiry - ${s.name}*\nName: ${name}\nPhone: ${phone}\nTopic: ${inquiryType}\nMessage: ${message}`
    window.open(waLink(s, msg), '_blank')
    setSent(true)
  }

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-24">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Visit & Connect
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            Contact & Salon Locator
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Conveniently located at B-Block Chauraha, right opposite Shri Sai Mandir in Indira Nagar, Lucknow.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div className="bg-card border border-white/10 p-8 shadow-xl">
              <h2 className="text-2xl font-serif font-bold text-ivory mb-6 flex items-center gap-2.5">
                <MapPin className="text-champagne" size={22} />
                <span>Salon Location & Address</span>
              </h2>

              <address className="not-italic space-y-2 text-ivory/80 text-sm sm:text-base leading-relaxed">
                {s.addressLines.map((line) => (
                  <span key={line} className="block font-medium text-ivory">{line}</span>
                ))}
              </address>

              <div className="mt-6 p-4 bg-noir/80 border border-gold/30 rounded-sm">
                <p className="text-xs text-champagne font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} /> Exact Landmark
                </p>
                <p className="text-xs text-ivory/80 mt-1">{s.landmark}</p>
                <p className="text-[11px] text-ivory/50 mt-1">Google Plus Code: {s.plusCode}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold text-xs !py-3 !px-6 shadow-md"
                >
                  <Navigation size={15} /> Get Driving Directions
                </a>
                <a
                  href={`tel:${s.phone}`}
                  className="btn btn-line text-xs !py-3 !px-6 hover:border-gold"
                >
                  <Phone size={15} /> {s.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-card border border-white/10 p-8 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-ivory mb-4 flex items-center gap-2.5">
                <Clock className="text-champagne" size={20} />
                <span>Operating Timings</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-ivory/70">Monday – Sunday:</span>
                  <span className="font-semibold text-champagne">10:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-ivory/70">Weekly Status:</span>
                  <span className="font-semibold text-ivory">Open All 7 Days</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-ivory/70">Walk-ins:</span>
                  <span className="text-ivory/80">Welcome (Appointments Recommended)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={waLink(s)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold-outline text-xs w-full !py-3"
                >
                  <MessageCircle size={15} /> Instant WhatsApp Support
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form & Map Embed */}
          <div className="space-y-8">
            {/* Quick Inquiry Form */}
            <div className="bg-card border border-white/10 p-8 shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-ivory mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-ivory/60 mb-6">
                Have questions regarding custom bridal packages, hair color correction or salon bookings?
              </p>

              {sent ? (
                <div className="p-6 bg-noir border border-gold/40 text-center">
                  <CheckCircle2 size={32} className="text-champagne mx-auto mb-2" />
                  <p className="text-base font-serif font-bold text-ivory">Message Dispatched!</p>
                  <p className="text-xs text-ivory/70 mt-1">Our front desk coordinator will respond promptly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Ananya"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        pattern="[0-9+ ]{10,14}"
                        placeholder="e.g. 9305710305"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                    >
                      <option>General Inquiry</option>
                      <option>Bridal Trousseau Package</option>
                      <option>Hair Color / Balayage Consultation</option>
                      <option>Hair Keratin / Botox Treatment</option>
                      <option>Men's Grooming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your inquiry or question here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-3.5 py-2.5 text-xs text-ivory focus:border-champagne outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold text-xs w-full !py-3 font-semibold"
                  >
                    <Send size={15} /> Send Inquiry via WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Map */}
            <div className="bg-card border border-white/10 p-4 shadow-xl">
              <div className="h-72 w-full overflow-hidden border border-white/10 bg-noir">
                <iframe
                  title="Loreal Unisex Salon Google Maps Embed"
                  src={s.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
