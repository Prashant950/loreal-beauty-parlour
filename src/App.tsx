import { useEffect, useState } from 'react'
import {
  defaultBeforeAfter,
  defaultGallery,
  defaultReviews,
  defaultServices,
  defaultSettings,
  productsList,
  stylists,
} from './data/content'
import type {
  BeforeAfter,
  GalleryItem,
  Product,
  Review,
  Service,
  Settings,
  Stylist
} from './data/content'
import { load } from './lib/api'
import { Navbar, Footer, WhatsAppFab } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { StylistsPage } from './pages/StylistsPage'
import { GalleryPage } from './pages/GalleryPage'
import { ProductsPage } from './pages/ProductsPage'
import { BookingPage } from './pages/BookingPage'
import { ReviewsPage } from './pages/ReviewsPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  const [s, setS] = useState<Settings>(defaultSettings)
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery)
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfter[]>(defaultBeforeAfter)
  const [products] = useState<Product[]>(productsList)
  const [stylistList] = useState<Stylist[]>(stylists)

  // Valid page identifiers
  const validPages = ['home', 'services', 'about', 'stylists', 'gallery', 'products', 'reviews', 'book', 'contact']

  const getPageFromLocation = (): string => {
    // Check pathname (e.g. /services -> services)
    const pathname = window.location.pathname.replace(/^\/+/, '').split('/')[0].toLowerCase()
    if (pathname && validPages.includes(pathname)) {
      return pathname
    }
    // Clean legacy hash if present (e.g. /#services -> /services)
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
    if (hash && validPages.includes(hash)) {
      window.history.replaceState(null, '', hash === 'home' ? '/' : `/${hash}`)
      return hash
    }
    return 'home'
  }

  // Page Routing State
  const [currentPage, setCurrentPage] = useState<string>(getPageFromLocation)
  const [bookingPrefills, setBookingPrefills] = useState<{
    service?: string
    stylist?: string
    date?: string
  }>({})

  // Load dynamic data if backend is present
  useEffect(() => {
    load('/settings', defaultSettings).then(setS)
    load('/services', defaultServices).then(setServices)
    load('/gallery', defaultGallery).then(setGallery)
    load('/reviews', defaultReviews).then(setReviews)
    load('/before-after', defaultBeforeAfter).then(setBeforeAfter)
  }, [])

  // Sync URL popstate (Back / Forward buttons) with page state
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromLocation()
      setCurrentPage(page)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Listen to custom page change and booking events
  useEffect(() => {
    const handlePageChange = (e: Event) => {
      const detail = (e as CustomEvent<{ page: string; service?: string; stylist?: string; date?: string }>).detail
      if (detail?.page) {
        handlePageNavigate(detail.page, {
          service: detail.service,
          stylist: detail.stylist,
          date: detail.date
        })
      }
    }

    const handleOpenBooking = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string; stylist?: string }>).detail
      handleBookService(detail?.service)
      if (detail?.stylist) {
        setBookingPrefills((prev) => ({ ...prev, stylist: detail.stylist }))
      }
    }

    window.addEventListener('change-page', handlePageChange)
    window.addEventListener('open-booking-modal', handleOpenBooking)

    return () => {
      window.removeEventListener('change-page', handlePageChange)
      window.removeEventListener('open-booking-modal', handleOpenBooking)
    }
  }, [])

  const handlePageNavigate = (page: string, params?: Record<string, string | undefined>) => {
    setCurrentPage(page)
    const targetPath = page === 'home' ? '/' : `/${page}`
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({ page }, '', targetPath)
    }
    if (params?.service || params?.stylist || params?.date) {
      setBookingPrefills({
        service: params.service,
        stylist: params.stylist,
        date: params.date
      })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBookService = (serviceName?: string) => {
    setBookingPrefills((prev) => ({ ...prev, service: serviceName }))
    handlePageNavigate('book')
  }

  const handleBookStylist = (stylistName: string) => {
    setBookingPrefills((prev) => ({ ...prev, stylist: stylistName }))
    handlePageNavigate('book')
  }

  return (
    <div className="min-h-screen flex flex-col bg-noir text-ivory selection:bg-gold selection:text-noir">
      {/* Sticky Luxury Header */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageNavigate}
        s={s}
        onOpenBooking={handleBookService}
      />

      {/* Main Page Body (Cleanly Separated Pages) */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            s={s}
            services={services}
            stylists={stylistList}
            products={products}
            reviews={reviews}
            beforeAfter={beforeAfter}
            onNavigate={handlePageNavigate}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            s={s}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            s={s}
            onNavigate={handlePageNavigate}
          />
        )}

        {currentPage === 'stylists' && (
          <StylistsPage
            stylists={stylistList}
            s={s}
            onBookWithStylist={handleBookStylist}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            gallery={gallery}
            beforeAfter={beforeAfter}
            s={s}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            s={s}
          />
        )}

        {currentPage === 'book' && (
          <BookingPage
            services={services}
            stylists={stylistList}
            s={s}
            initialService={bookingPrefills.service}
            initialStylist={bookingPrefills.stylist}
            initialDate={bookingPrefills.date}
            onNavigate={handlePageNavigate}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            s={s}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            s={s}
          />
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        s={s}
        onPageChange={handlePageNavigate}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFab s={s} />
    </div>
  )
}
