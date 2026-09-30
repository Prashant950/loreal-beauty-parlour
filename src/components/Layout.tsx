import { useEffect, useState } from 'react'
import {
  Menu,
  X,
  Phone,
  CalendarCheck,
  Instagram,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Scissors,
  Image,
  ShoppingBag,
  Home,
  MessageSquare
} from 'lucide-react'
import type { Settings } from '../data/content'
import { Stars } from './ui'

export interface NavProps {
  currentPage: string
  onPageChange: (page: string) => void
  s: Settings
  onOpenBooking: (service?: string) => void
}

export const navLinks = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services & Menu', icon: Scissors },
  { id: 'about', label: 'About Us', icon: Sparkles },
  { id: 'stylists', label: 'Master Stylists', icon: Award },
  { id: 'gallery', label: 'Gallery & Looks', icon: Image },
  { id: 'products', label: 'L\'Oréal Products', icon: ShoppingBag },
  { id: 'contact', label: 'Contact & Map', icon: MapPin },
]

export const waLink = (s: Settings, msg = `Hello ${s.name}, I would like to book a VIP appointment.`) =>
  `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(msg)}`

// Authentic Official WhatsApp Icon
export function RealWhatsAppIcon({ className = "w-5 h-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.301-.15-1.781-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.777.979-.952 1.18-.175.2-.35.225-.651.075-.3-.15-1.267-.467-2.414-1.489-.893-.797-1.496-1.781-1.671-2.081-.176-.3-.019-.462.131-.611.136-.134.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.631-.926-2.234-.243-.587-.49-.507-.676-.517-.175-.008-.375-.01-.576-.01s-.525.075-.8.375c-.276.3-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.119 3.236 5.133 4.54 2.155.932 2.99.948 4.053.791.701-.104 1.781-.727 2.031-1.43.25-.703.25-1.305.175-1.43-.075-.125-.276-.2-.576-.35z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.662 1.444 5.176L2 22l4.98-1.408C8.423 21.49 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.15c-1.614 0-3.12-.47-4.39-1.28l-.315-.202-3.23.913.927-3.14-.216-.334A8.107 8.107 0 0 1 3.85 12c0-4.494 3.656-8.15 8.15-8.15 4.494 0 8.15 3.656 8.15 8.15 0 4.494-3.656 8.15-8.15 8.15z" />
    </svg>
  )
}

export function Navbar({ currentPage, onPageChange, s, onOpenBooking }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#151311]/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)] border-b border-white/10 py-3'
            : 'bg-[#151311]/80 backdrop-blur-md border-b border-white/[0.08] py-3.5'
        }`}
      >
        <div className="w-full px-2 sm:px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Premium Business Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus:outline-none flex items-center gap-2.5 shrink-0 pl-1"
            aria-label="Go to home"
          >
            {/* Elegant Luxury Monogram Crest */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#2A241E] via-[#1A1715] to-[#12100E] border-2 border-[#DFB771]/80 flex items-center justify-center shadow-[0_0_15px_rgba(223,183,113,0.3)] group-hover:border-[#F5E6C8] group-hover:shadow-[0_0_20px_rgba(223,183,113,0.5)] transition-all duration-300">
              <div className="absolute inset-0.5 rounded-full border border-[#DFB771]/30 pointer-events-none" />
              <Sparkles size={8} className="absolute -top-1 text-[#F5E6C8] animate-pulse" />
              <span className="font-serif text-[#F5E6C8] text-lg sm:text-xl font-bold tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                L
              </span>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold tracking-[0.1em] text-ivory block leading-none group-hover:text-gold-light transition-colors drop-shadow-sm">
                  L'ORÉAL
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#DFB771] bg-[#DFB771]/15 px-1.5 py-0.5 rounded-sm border border-[#DFB771]/30">
                  PARIS
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[8px] sm:text-[9px] tracking-[0.24em] text-[#DFB771] uppercase font-sans font-semibold">
                  UNISEX SALON
                </span>
                <span className="text-[7px] text-white/30">•</span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.16em] text-ivory/60 uppercase font-sans font-medium">
                  LUCKNOW
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = currentPage === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-xs tracking-wider uppercase font-medium transition-all py-1.5 select-none ${
                    active
                      ? 'text-champagne font-bold'
                      : 'text-ivory/80 hover:text-champagne'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-champagne via-gold to-champagne rounded-full shadow-[0_0_8px_rgba(223,183,113,0.8)]" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Action Buttons (Desktop only) */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('book')}
              className={`btn btn-gold text-[10.5px] sm:text-[11px] whitespace-nowrap !py-2 !px-5 sm:!px-6 rounded-full tracking-wider font-bold shadow-md hover:shadow-gold/40 transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                currentPage === 'book' ? 'ring-2 ring-champagne ring-offset-2 ring-offset-[#151311]' : ''
              }`}
            >
              <CalendarCheck size={13} className="shrink-0" />
              <span className="whitespace-nowrap tracking-wider">Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Trigger Button (Clean Hamburguer Icon) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              className="p-2 text-ivory hover:text-champagne border border-white/15 rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OVER DRAWER (SLIDES FROM RIGHT TO LEFT) */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`xl:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`xl:hidden fixed top-0 right-0 bottom-0 w-[82%] max-w-[340px] z-50 bg-[#181512] border-l border-gold/30 shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center bg-gold/15">
                <span className="font-serif text-champagne text-base font-bold">L</span>
              </div>
              <div>
                <span className="font-serif text-lg tracking-wider text-ivory block font-semibold leading-none">
                  L'ORÉAL
                </span>
                <span className="text-[9px] tracking-widest text-champagne uppercase font-sans mt-0.5 block">
                  Indira Nagar, Lucknow
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-ivory/70 hover:text-champagne hover:rotate-90 transition-transform duration-200 bg-white/5 rounded-full border border-white/10"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = currentPage === link.id
              const Icon = link.icon
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-3 px-3.5 rounded-lg flex items-center justify-between text-left transition-all ${
                    active
                      ? 'bg-gold/15 text-champagne font-semibold border border-gold/30'
                      : 'text-ivory/80 hover:text-champagne hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={active ? 'text-champagne' : 'text-ivory/50'} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                  <ChevronRight size={15} className={active ? 'text-champagne' : 'text-ivory/30'} />
                </button>
              )
            })}
          </nav>
        </div>

        {/* Drawer Bottom CTAs */}
        <div className="pt-5 border-t border-white/10 space-y-2.5">
          <button
            onClick={() => handleNavClick('book')}
            className="btn btn-gold text-[11px] whitespace-nowrap !py-2.5 !px-4 w-full rounded-full shadow-lg flex items-center justify-center gap-1.5 font-bold tracking-wider uppercase"
          >
            <CalendarCheck size={14} className="shrink-0" />
            <span>Book Appointment</span>
          </button>

          <a
            href={waLink(s)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-line text-[11px] whitespace-nowrap !py-2.5 !px-4 w-full rounded-full flex items-center justify-center gap-2 text-[#25D366] border-[#25D366]/40 hover:border-[#25D366] font-medium"
          >
            <RealWhatsAppIcon size={15} className="text-[#25D366] shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="pt-2 text-center text-[11px] text-ivory/50">
            <p>Rated 4.9★ on Google · 180+ Reviews</p>
          </div>
        </div>
      </div>
    </>
  )
}

export function MobileBottomBar() {
  return null
}

export const WhatsAppFab = ({ s }: { s: Settings }) => (
  <a
    href={waLink(s)}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat directly on WhatsApp"
    className="fixed bottom-6 right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 p-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 group border-2 border-white/50 ring-4 ring-[#25D366]/25"
  >
    <RealWhatsAppIcon size={28} className="text-white drop-shadow group-hover:rotate-12 transition-transform duration-300" />
    
    {/* Subtle tooltip on hover */}
    <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#161412]/95 backdrop-blur-md text-ivory text-xs font-semibold whitespace-nowrap shadow-xl border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
      Chat on WhatsApp
    </span>
  </a>
)

export function Footer({
  s,
  onPageChange
}: {
  s: Settings
  onPageChange: (page: string) => void
}) {
  return (
    <footer className="bg-[#12100E] text-ivory/70 pt-16 pb-12 border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-sm mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-gold/15">
                <span className="font-serif text-champagne text-xl font-bold">L</span>
              </div>
              <div>
                <p className="font-serif text-2xl text-ivory font-bold">{s.name}</p>
                <p className="text-xs text-champagne uppercase tracking-widest">{s.hindiName}</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-ivory/70">
              Lucknow's distinguished sanctuary for couture hair transformations, bespoke balayage, and restorative skin aesthetics.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Stars n={5} size={15} />
              <span className="text-champagne font-semibold text-sm">{s.rating}★ on Google</span>
            </div>
          </div>

          {/* Quick Navigation Pages */}
          <div>
            <h4 className="text-ivory font-serif text-lg mb-5 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Explore Salon</span>
              <Sparkles size={14} className="text-champagne" />
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onPageChange(link.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-ivory/75 hover:text-champagne transition-colors flex items-center gap-1.5 text-sm group"
                  >
                    <ChevronRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-ivory font-serif text-lg mb-5 border-b border-white/10 pb-2">
              Salon Location
            </h4>
            <address className="not-italic space-y-2 text-ivory/75 leading-relaxed text-sm">
              {s.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
              <span className="block text-champagne text-xs pt-1">Landmark: {s.landmark}</span>
            </address>

            <div className="mt-5 space-y-2">
              <a
                href={`tel:${s.phone}`}
                className="flex items-center gap-2 text-champagne hover:text-white transition-colors text-sm font-medium"
              >
                <Phone size={15} />
                {s.phoneDisplay}
              </a>
              <a
                href={s.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/75 hover:text-champagne transition-colors text-sm"
              >
                <Instagram size={15} />
                {s.handle}
              </a>
            </div>
          </div>

          {/* Operating Hours & Google Rating */}
          <div>
            <h4 className="text-ivory font-serif text-lg mb-5 border-b border-white/10 pb-2 flex items-center gap-2">
              <Clock size={16} className="text-champagne" />
              <span>Salon Hours</span>
            </h4>
            <div className="space-y-3 text-sm">
              {s.hours.map((h, i) => (
                <div key={i} className="bg-[#181512] p-3 border border-white/[0.06] rounded-md">
                  <p className="text-ivory font-medium text-xs text-champagne">{h.days}</p>
                  <p className="text-ivory/80 text-sm mt-0.5">{h.timing}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={s.googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line text-xs w-full text-center !py-2.5 rounded-full hover:border-gold"
              >
                Read 180+ Google Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© 2026 {s.name}, Indira Nagar, Lucknow. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-champagne/90">
              <ShieldCheck size={14} /> 100% Authentic L'Oréal Products
            </span>
            <span>Unisex Salon</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
