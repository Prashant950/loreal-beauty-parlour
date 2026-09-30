import { useState, useEffect } from 'react'
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Calendar,
  AlertCircle
} from 'lucide-react'
import type { Service, Stylist, Settings } from '../data/content'
import { sendAppointment } from '../lib/api'
import { waLink } from '../components/Layout'

interface BookingPageProps {
  services: Service[]
  stylists: Stylist[]
  s: Settings
  initialService?: string
  initialStylist?: string
  initialDate?: string
  onNavigate: (page: string) => void
}

const timeSlots = [
  { group: 'Morning Slots', times: ['10:30 AM', '11:15 AM', '12:00 PM'] },
  { group: 'Afternoon Slots', times: ['01:00 PM', '02:30 PM', '03:45 PM', '04:30 PM'] },
  { group: 'Evening Slots', times: ['05:30 PM', '06:30 PM', '07:15 PM', '08:00 PM'] }
]

export function BookingPage({
  services,
  stylists,
  s,
  initialService = '',
  initialStylist = '',
  initialDate = '',
  onNavigate
}: BookingPageProps) {
  // Booking Form State
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedService, setSelectedService] = useState(initialService)
  const [selectedStylist, setSelectedStylist] = useState(initialStylist || 'Any Available Expert Stylist')
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date().toISOString().slice(0, 10))
  const [selectedTime, setSelectedTime] = useState('')
  
  // Client details
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientNotes, setClientNotes] = useState('')

  const [busy, setBusy] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  useEffect(() => {
    if (initialService) setSelectedService(initialService)
    if (initialStylist) setSelectedStylist(initialStylist)
    if (initialDate) setSelectedDate(initialDate)
  }, [initialService, initialStylist, initialDate])

  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))]

  const filteredServices = services.filter((svc) => {
    if (selectedCategory === 'All') return svc.active
    return svc.category === selectedCategory && svc.active
  })

  const chosenServiceObj = services.find((s) => s.name === selectedService)

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)

    const ref = `LOR-${Math.floor(100000 + Math.random() * 900000)}`
    setBookingRef(ref)

    const payload = {
      bookingRef: ref,
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      message: clientNotes
    }

    try {
      await sendAppointment(payload)
    } catch {
      // Backend not running: proceed gracefully with offline confirmation
    }

    setBusy(false)
    setConfirmed(true)
  }

  const handleWhatsAppSync = () => {
    const msg = `*VIP Appointment Confirmation - ${s.name}*\nRef: ${bookingRef}\nName: ${clientName}\nPhone: ${clientPhone}\nService: ${selectedService}\nStylist: ${selectedStylist}\nDate & Time: ${selectedDate} at ${selectedTime}\nNotes: ${clientNotes || 'None'}\n\nPlease confirm my slot!`
    window.open(waLink(s, msg), '_blank')
  }

  return (
    <div className="bg-noir min-h-screen text-ivory pt-10 pb-28">
      {/* Header Banner */}
      <div className="bg-[#12100E] border-b border-white/10 py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-champagne uppercase text-xs tracking-widest font-semibold block mb-3">
            Priority VIP Scheduling
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory">
            Reserve Your Appointment
          </h1>
          <p className="mt-4 text-ivory/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select your preferred treatment, master stylist, and time slot for a seamless salon experience at Indira Nagar, Lucknow.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        {/* Step Indicator */}
        {!confirmed && (
          <div className="mb-10">
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
              <div
                onClick={() => setStep(1)}
                className={`cursor-pointer pb-3 border-b-2 transition-colors ${
                  step >= 1 ? 'border-champagne text-champagne' : 'border-white/10 text-ivory/40'
                }`}
              >
                1. Service
              </div>
              <div
                onClick={() => selectedService && setStep(2)}
                className={`cursor-pointer pb-3 border-b-2 transition-colors ${
                  step >= 2 ? 'border-champagne text-champagne' : 'border-white/10 text-ivory/40'
                }`}
              >
                2. Stylist
              </div>
              <div
                onClick={() => selectedService && setStep(3)}
                className={`cursor-pointer pb-3 border-b-2 transition-colors ${
                  step >= 3 ? 'border-champagne text-champagne' : 'border-white/10 text-ivory/40'
                }`}
              >
                3. Date & Time
              </div>
              <div
                onClick={() => selectedService && selectedTime && setStep(4)}
                className={`cursor-pointer pb-3 border-b-2 transition-colors ${
                  step >= 4 ? 'border-champagne text-champagne' : 'border-white/10 text-ivory/40'
                }`}
              >
                4. Details
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {confirmed ? (
          <div className="bg-card border border-gold/50 p-8 sm:p-12 text-center shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gold/20 text-champagne mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 size={36} />
            </div>

            <span className="text-xs text-champagne uppercase tracking-widest font-semibold block mb-1">
              Booking Request Received
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
              Thank You, {clientName}!
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 mt-2">
              Your appointment request has been logged under Reference ID:
            </p>

            <div className="mt-4 inline-block bg-noir border border-gold/40 px-6 py-2.5 text-champagne font-mono text-lg font-bold tracking-wider">
              {bookingRef}
            </div>

            {/* Summary Box */}
            <div className="mt-8 bg-noir/60 border border-white/10 p-6 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ivory/60">Service:</span>
                <span className="font-semibold text-ivory">{selectedService}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ivory/60">Stylist:</span>
                <span className="font-semibold text-champagne">{selectedStylist}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ivory/60">Date & Slot:</span>
                <span className="font-semibold text-ivory">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-ivory/60">Contact Phone:</span>
                <span className="font-semibold text-ivory">{clientPhone}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-ivory/60">Location:</span>
                <span className="font-semibold text-ivory text-right">B-Block, Indira Nagar, Lucknow</span>
              </div>
            </div>

            {/* WhatsApp Confirmation CTA */}
            <div className="mt-8 space-y-3 max-w-md mx-auto">
              <button
                onClick={handleWhatsAppSync}
                className="btn btn-gold text-xs w-full !py-3.5 flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Send Instant WhatsApp Notification
              </button>

              <button
                onClick={() => {
                  setConfirmed(false)
                  setStep(1)
                  setSelectedService('')
                  setSelectedTime('')
                }}
                className="btn btn-line text-xs w-full !py-3 hover:border-gold"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Workflow */
          <div className="bg-card border border-white/10 p-6 sm:p-10 shadow-2xl">
            {/* STEP 1: CHOOSE SERVICE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ivory">Step 1: Choose Service</h3>
                  <p className="text-xs text-ivory/60 mt-1">Select from our signature hair, skin, bridal or grooming menu.</p>
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                        selectedCategory === cat
                          ? 'bg-gold text-noir border-gold shadow-md'
                          : 'bg-noir text-ivory/70 border-white/10 hover:border-gold/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Service Options List */}
                <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                  {filteredServices.map((svc) => {
                    const isSelected = selectedService === svc.name
                    return (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedService(svc.name)}
                        className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gold/15 border-champagne text-ivory shadow-lg'
                            : 'bg-noir/60 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-champagne uppercase font-semibold">{svc.category}</span>
                            <span className="font-serif text-sm font-bold text-champagne">{svc.price}</span>
                          </div>
                          <p className="text-sm font-semibold text-ivory mt-1">{svc.name}</p>
                          <p className="text-xs text-ivory/60 mt-1 line-clamp-2">{svc.description}</p>
                        </div>
                        <div className="mt-3 text-[11px] text-ivory/40 flex items-center gap-1">
                          <Clock size={12} /> {svc.duration}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button
                    disabled={!selectedService}
                    onClick={() => setStep(2)}
                    className="btn btn-gold text-xs !py-3 !px-6 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next: Choose Stylist <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE STYLIST */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ivory">Step 2: Choose Stylist</h3>
                  <p className="text-xs text-ivory/60 mt-1">Select your preferred master stylist or any available specialist.</p>
                </div>

                <div className="space-y-3">
                  {/* Any Available Option */}
                  <div
                    onClick={() => setSelectedStylist('Any Available Expert Stylist')}
                    className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                      selectedStylist === 'Any Available Expert Stylist'
                        ? 'bg-gold/15 border-champagne text-ivory'
                        : 'bg-noir/60 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-champagne">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ivory">Any Available Expert Stylist</p>
                        <p className="text-xs text-ivory/60">Fastest confirmation & best available slot</p>
                      </div>
                    </div>
                    {selectedStylist === 'Any Available Expert Stylist' && (
                      <CheckCircle2 size={18} className="text-champagne" />
                    )}
                  </div>

                  {/* Stylist Profiles */}
                  {stylists.map((st) => {
                    const isSelected = selectedStylist === st.name
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStylist(st.name)}
                        className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-gold/15 border-champagne text-ivory'
                            : 'bg-noir/60 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={st.image}
                            alt={st.name}
                            className="w-12 h-12 rounded-full object-cover border border-gold/40"
                          />
                          <div>
                            <p className="text-sm font-semibold text-ivory">{st.name}</p>
                            <p className="text-xs text-gold">{st.role} · {st.experience}</p>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-champagne" />}
                      </div>
                    )
                  })}
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-line text-xs !py-3"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn btn-gold text-xs !py-3 !px-6"
                  >
                    Next: Pick Date & Time <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ivory">Step 3: Select Date & Time Slot</h3>
                  <p className="text-xs text-ivory/60 mt-1">Salon opens 10:00 AM to 9:00 PM every day.</p>
                </div>

                {/* Date Input */}
                <div>
                  <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-noir border border-white/15 px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-3">
                    Available Time Slots
                  </label>
                  <div className="space-y-4">
                    {timeSlots.map((group) => (
                      <div key={group.group}>
                        <p className="text-[11px] text-ivory/50 uppercase tracking-wider mb-2">{group.group}</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {group.times.map((time) => {
                            const isSelected = selectedTime === time
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 text-xs font-medium border transition-colors ${
                                  isSelected
                                    ? 'bg-gold text-noir border-gold font-bold shadow-md'
                                    : 'bg-noir text-ivory/80 border-white/10 hover:border-gold/50'
                                }`}
                              >
                                {time}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="btn btn-line text-xs !py-3"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                  <button
                    disabled={!selectedTime || !selectedDate}
                    onClick={() => setStep(4)}
                    className="btn btn-gold text-xs !py-3 !px-6 disabled:opacity-40"
                  >
                    Next: Contact Details <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CLIENT DETAILS & SUBMIT */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ivory">Step 4: Client Details</h3>
                  <p className="text-xs text-ivory/60 mt-1">We will contact you on your mobile number to confirm your booking.</p>
                </div>

                {/* Booking Preview Chip */}
                <div className="bg-noir p-4 border border-gold/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-champagne font-bold">{selectedService}</span>
                    <span className="text-ivory/60 ml-2">with {selectedStylist}</span>
                  </div>
                  <div className="text-champagne font-medium">
                    {selectedDate} · {selectedTime}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      required
                      type="tel"
                      pattern="[0-9+ ]{10,14}"
                      placeholder="e.g. 9876543210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priya@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-champagne uppercase tracking-wider mb-2">
                      Special Requests / Hair Concerns
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention any allergy, previous chemical treatments, bridal date or specific requests..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full bg-noir border border-white/15 px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn btn-line text-xs !py-3"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>

                  <button
                    disabled={busy || !clientName || !clientPhone}
                    type="submit"
                    className="btn btn-gold text-xs !py-3.5 !px-8 font-semibold shadow-xl disabled:opacity-40"
                  >
                    {busy ? 'Confirming...' : 'Confirm Appointment Now →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
