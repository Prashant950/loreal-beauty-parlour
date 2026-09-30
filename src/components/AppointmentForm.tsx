import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { Service, Settings } from '../data/content'
import { sendAppointment } from '../lib/api'
import { waLink } from './Layout'

const empty = { name: '', phone: '', email: '', service: '', date: '', time: '', message: '' }
const f = 'w-full bg-transparent border-b border-ivory/30 py-3 min-h-[44px] focus:border-champagne outline-none placeholder:text-ivory/40'

export default function AppointmentForm({ s, services }: { s: Settings; services: Service[] }) {
  const [v, setV] = useState(empty); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false)
  useEffect(() => { const h = (e: Event) => setV((p) => ({ ...p, service: (e as CustomEvent<string>).detail })); window.addEventListener('select-service', h); return () => window.removeEventListener('select-service', h) }, [])
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value })
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true)
    try { await sendAppointment(v) } catch {
      // Backend abhi connected nahi: request WhatsApp par bhej do.
      window.open(waLink(s, `Appointment request\nName: ${v.name}\nPhone: ${v.phone}\nService: ${v.service}\nDate: ${v.date} ${v.time}\n${v.message}`), '_blank')
    }
    setBusy(false); setDone(true)
  }
  return (
    <section id="book" className="bg-ink text-ivory px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl">Ready for Your Next Look?</h2>
        <p className="mt-4 text-ivory/70">Book your appointment at {s.name} and give yourself the time you deserve.</p>
        {done ? (
          <div role="status" className="mt-10 border border-champagne/40 p-8 text-center"><CheckCircle2 className="mx-auto text-champagne" size={40} strokeWidth={1.2} /><h3 className="text-3xl mt-4">Request received</h3><p className="mt-2 text-ivory/70">Thank you, {v.name}. We will contact you on {v.phone} to confirm your appointment.</p></div>
        ) : (
          <form onSubmit={submit} className="mt-10 grid md:grid-cols-2 gap-x-8 gap-y-6">
            <input required className={f} placeholder="Full name" aria-label="Full name" value={v.name} onChange={set('name')} />
            <input required type="tel" pattern="[0-9+ ]{10,14}" className={f} placeholder="Phone number" aria-label="Phone number" value={v.phone} onChange={set('phone')} />
            <input type="email" className={f} placeholder="Email (optional)" aria-label="Email" value={v.email} onChange={set('email')} />
            <select required className={`${f} bg-ink`} aria-label="Service" value={v.service} onChange={set('service')}><option value="">Select service</option>{services.filter((x) => x.active).map((x) => <option key={x.name}>{x.name}</option>)}</select>
            <input required type="date" min={new Date().toISOString().slice(0, 10)} className={f} aria-label="Preferred date" value={v.date} onChange={set('date')} />
            <input required type="time" className={f} aria-label="Preferred time" value={v.time} onChange={set('time')} />
            <textarea rows={3} className={`${f} md:col-span-2`} placeholder="Message" aria-label="Message" value={v.message} onChange={set('message')} />
            <button disabled={busy} className="btn btn-gold md:col-span-2">{busy ? 'Sending…' : 'Request Appointment'}</button>
          </form>
        )}
      </div>
    </section>
  )
}
