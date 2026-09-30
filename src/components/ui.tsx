import { motion, useReducedMotion } from 'framer-motion'
import { Camera, Star, Check, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const AnimatedCount = ({
  to,
  decimals = 0,
  duration = 1800,
  suffix = '',
  prefix = ''
}: {
  to: number
  decimals?: number
  duration?: number
  suffix?: string
  prefix?: string
}) => {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setVal(easeProgress * to)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [started, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export const Reveal = ({
  children,
  className = '',
  delay = 0,
  y = 24
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const Stars = ({ n = 5, size = 16, className = 'text-champagne' }: { n?: number; size?: number; className?: string }) => (
  <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: n }, (_, i) => (
      <Star key={i} size={size} fill="currentColor" />
    ))}
  </span>
)

export const Img = ({
  src,
  alt,
  label,
  className = ''
}: {
  src?: string
  alt: string
  label?: string
  className?: string
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          // If image fails, replace with elegant styled fallback
          const target = e.currentTarget
          target.style.display = 'none'
          if (target.parentElement) {
            target.parentElement.classList.add('bg-charcoal', 'flex', 'items-center', 'justify-center')
          }
        }}
        className={`object-cover w-full h-full ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#211D1A] to-[#141210] border border-white/5 text-champagne/80 ${className}`}
    >
      <Camera size={26} strokeWidth={1.2} />
      <span className="text-xs text-ivory/60 px-3 text-center tracking-wider uppercase font-medium">
        {label ?? 'Salon photo'}
      </span>
    </div>
  )
}

export const Badge = ({ children, variant = 'gold' }: { children: ReactNode; variant?: 'gold' | 'dark' | 'outline' }) => {
  const styles = {
    gold: 'bg-gold/20 text-champagne border border-gold/40',
    dark: 'bg-noir/80 text-ivory border border-white/15 backdrop-blur-sm',
    outline: 'border border-gold/50 text-champagne'
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full ${styles[variant]}`}>
      <Sparkles size={12} className="text-champagne" />
      {children}
    </span>
  )
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-noir/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-card border border-white/15 p-6 sm:p-8 shadow-2xl my-8 text-ivory max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory/60 hover:text-champagne p-2 transition-colors"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
        {title && <h3 className="text-2xl sm:text-3xl font-serif text-ivory mb-4 pr-8">{title}</h3>}
        {children}
      </div>
    </div>
  )
}

export const navigateTo = (page: string, params?: Record<string, string>) => {
  window.dispatchEvent(
    new CustomEvent('change-page', {
      detail: { page, ...params }
    })
  )
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const Sec = ({ id, title, sub, children, dark = false, tone = '' }: { id?: string; title: string; sub?: string; children: ReactNode; dark?: boolean; tone?: string }) => (
  <section id={id} className={`px-4 sm:px-6 py-20 md:py-24 ${dark ? 'bg-noir text-ivory' : tone || 'bg-[#12100E]'}`}>
    <div className="mx-auto max-w-7xl">
      <Reveal className="max-w-2xl mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-ivory leading-tight">{title}</h2>
        {sub && <p className={`mt-4 leading-relaxed ${dark ? 'text-ivory/70' : 'text-ivory/65'}`}>{sub}</p>}
      </Reveal>
      {children}
    </div>
  </section>
)

export const triggerBooking = (service?: string, stylist?: string) => {
  window.dispatchEvent(
    new CustomEvent('open-booking-modal', {
      detail: { service, stylist }
    })
  )
}

export const goBook = (service?: string) => {
  triggerBooking(service)
}

