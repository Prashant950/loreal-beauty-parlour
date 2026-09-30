export type Service = {
  _id?: string
  id: string
  name: string
  category: string
  description: string
  details?: string[]
  price: string
  duration: string
  image: string
  active: boolean
  featured?: boolean
  popular?: boolean
  badge?: string
}

export type Stylist = {
  id: string
  name: string
  role: string
  experience: string
  specialties: string[]
  bio: string
  image: string
  rating: number
  reviewsCount: number
  instagram?: string
}

export type Product = {
  id: string
  name: string
  category: string
  brand: string
  description: string
  benefits: string[]
  price: string
  volume: string
  image: string
  inStock: boolean
  tag?: string
}

export type GalleryItem = {
  _id?: string
  id: string
  image: string
  category: string
  caption: string
  featured?: boolean
  tags?: string[]
}

export type Review = {
  _id?: string
  id: string
  name: string
  rating: number
  text: string
  date: string
  source: string
  serviceTaken?: string
  verified?: boolean
  avatar?: string
}

export type BeforeAfter = {
  _id?: string
  id: string
  title: string
  category: string
  before: string
  after: string
  stylist: string
  description: string
}

export type HeroSlide = {
  id: number
  image: string
  tag: string
  title: string
  subtitle: string
  highlight: string
  primaryCta: { text: string; action: string }
  secondaryCta: { text: string; action: string }
}

export type Settings = {
  name: string
  hindiName: string
  tagline: string
  phone: string
  phoneDisplay: string
  whatsapp: string
  email: string
  addressLines: string[]
  plusCode: string
  landmark: string
  instagram: string
  handle: string
  facebook: string
  hours: { days: string; timing: string }[]
  rating: number
  reviewCount: number
  mapsQuery: string
  googleReviewsUrl: string
  googleMapsEmbedUrl: string
}

export const defaultSettings: Settings = {
  name: "L'Oréal Unisex Salon",
  hindiName: "लॉरियल यूनिसेक्स सैलून",
  tagline: "Lucknow's Premier Destination for Luxury Hair & Beauty Artistry",
  phone: "+919305710305",
  phoneDisplay: "093057 10305",
  whatsapp: "919305710305",
  email: "contact@lorealsalonlucknow.com",
  addressLines: [
    "B-Block Chauraha, In Front of Sai Mandir",
    "B Block, Indira Nagar",
    "Lucknow, Uttar Pradesh 226061"
  ],
  plusCode: "VXJM+3J Lucknow",
  landmark: "Opposite Shri Sai Mandir, B-Block Market, Indira Nagar",
  instagram: "https://www.instagram.com/loreal_professional_lko/",
  handle: "@loreal_professional_lko",
  facebook: "https://facebook.com",
  hours: [
    { days: "Monday – Sunday", timing: "10:00 AM – 9:00 PM" },
    { days: "Open All 7 Days", timing: "Google Verified Timings" }
  ],
  rating: 4.9,
  reviewCount: 180,
  mapsQuery: "Loreal Unisex Salon B Block Indira Nagar Lucknow",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Loreal+Unisex+Salon+Indira+Nagar+Lucknow",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Loreal+Unisex+Salon+B+Block+Indira+Nagar+Lucknow&output=embed"
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    tag: "L'ORÉAL PROFESSIONNEL CERTIFIED SALON",
    title: "Where Luxury Meets Iconic Hair & Beauty",
    subtitle: "Experience couture hair transformations, bespoke balayage, and serene aesthetic therapies at Lucknow's top-rated salon.",
    highlight: "Rated 4.9★ by 180+ Delighted Clients in Indira Nagar",
    primaryCta: { text: "Book VIP Appointment", action: "book" },
    secondaryCta: { text: "Explore Services", action: "services" }
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    tag: "SIGNATURE STYLING & COLORATION",
    title: "Transform Your Hair into Pure Artistry",
    subtitle: "Master stylists trained by L'Oréal Academy delivering precision cuts, gloss treatments, and radiant blow-drys.",
    highlight: "100% Genuine L'Oréal Professionnel & Kérastase Formulations",
    primaryCta: { text: "View Hair Menu", action: "services" },
    secondaryCta: { text: "Meet Stylists", action: "stylists" }
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    tag: "BRIDAL & OCCASION GLAMOUR",
    title: "Couture Bridal & HD Celebrity Makeover",
    subtitle: "Look breathtaking on your special day with our signature bridal trousseau styling, Airbrush makeup, and skincare glow.",
    highlight: "Exclusive Bridal Suites & Personalized Pre-Bridal Packages",
    primaryCta: { text: "Reserve Bridal Date", action: "book" },
    secondaryCta: { text: "View Bridal Gallery", action: "gallery" }
  },
  {
    id: 4,
    image: "/images/hero-4.jpg",
    tag: "KERATIN, BOTOX & FRENCH BALAYAGE",
    title: "French Balayage & Silk Hair Botox Rituals",
    subtitle: "Say goodbye to frizz and damage with deep restorative molecular hair therapies tailored to your unique hair texture.",
    highlight: "Long-lasting Shine, Frizz-free Silky Smoothness",
    primaryCta: { text: "Claim Hair Consultation", action: "book" },
    secondaryCta: { text: "See Transformations", action: "gallery" }
  }
]

export const defaultServices: Service[] = [
  // Hair Care & Styling
  {
    id: "hair-1",
    name: "Couture Haircut & Blow-Dry",
    category: "Hair Styling",
    description: "Personalized consultation, luxury hair wash with L'Oréal Serie Expert shampoo, precision cut, and salon blow-dry.",
    details: ["In-depth face shape consultation", "L'Oréal shampoo & conditioning massage", "Precision cut with texture refinement", "Signature bouncy blow-dry & serum"],
    price: "₹499",
    duration: "45 mins",
    image: "/images/hero-2.jpg",
    active: true,
    featured: true,
    popular: true,
    badge: "Most Booked"
  },
  {
    id: "hair-2",
    name: "French Balayage & Ombré Color",
    category: "Hair Color",
    description: "Hand-painted seamless sun-kissed gradients using ammonia-free L'Oréal Inoa or Majirel with gloss toner seal.",
    details: ["Strand test & customized shade design", "L'Oréal Blond Studio lightening", "Smartbond / Metal Detox protection", "Gloss toner with mirror shine finish"],
    price: "₹3,499",
    duration: "150 mins",
    image: "/images/hero-4.jpg",
    active: true,
    featured: true,
    popular: true,
    badge: "Trending"
  },
  {
    id: "hair-3",
    name: "L'Oréal Keratin Smoothing & Botox",
    category: "Hair Treatments",
    description: "Deep restorative protein treatment that eliminates up to 95% frizz, restores hair fiber elasticity, and gives glassy sheen.",
    details: ["Zero-damage formaline-safe formula", "Repairs chemical & heat damage", "Results last up to 4-6 months", "Includes take-home care guide"],
    price: "₹3,999",
    duration: "180 mins",
    image: "/images/hero-4.jpg",
    active: true,
    featured: true,
    badge: "Top Rated"
  },
  {
    id: "hair-4",
    name: "Absolut Repair Molecular Hair Spa",
    category: "Hair Spa",
    description: "Ultra-hydrating peptide and amino acid treatment for distressed, dry or colored hair with hot towel aromatherapy.",
    details: ["Aromatherapeutic scalp massage", "Concentrated molecular peptide infusion", "Steam conditioning lock-in", "Anti-frizz blowout"],
    price: "₹1,299",
    duration: "60 mins",
    image: "/images/products.jpg",
    active: true,
    popular: true
  },
  {
    id: "hair-5",
    name: "Global Hair Color (Ammonia Free)",
    category: "Hair Color",
    description: "Rich 100% grey coverage and vibrant multi-dimensional shine using L'Oréal Inoa ODS2 oil delivery technology.",
    details: ["No odor, scalp-friendly formula", "100% white hair coverage", "Color lock gloss mask", "Blow-dry styling"],
    price: "₹2,199",
    duration: "90 mins",
    image: "/images/hero-4.jpg",
    active: true
  },
  {
    id: "hair-6",
    name: "X-Tenso Permanent Hair Straightening",
    category: "Hair Treatments",
    description: "L'Oréal Professionnel X-Tenso Moisturist rebonding for poker-straight, sleek and manageable silk hair.",
    details: ["Nutri-Cationic technology", "Natural straight or pin-straight options", "Deep nourishing neutralizer", "Shine booster serum"],
    price: "₹4,499",
    duration: "210 mins",
    image: "/images/hero-2.jpg",
    active: true
  },

  // Skin & Facial
  {
    id: "skin-1",
    name: "24K Luxury Gold Radiance Facial",
    category: "Skin & Facial",
    description: "Pure 24K gold foil and bio-collagen infused luxury facial to reverse pollution dullness and restore youthful glass glow.",
    details: ["Double enzymatic cleanse", "Ultrasonic deep pore extraction", "24K Gold peptide massage", "Cryo cooling mask & SPF shield"],
    price: "₹2,499",
    duration: "75 mins",
    image: "/images/facial.jpg",
    active: true,
    featured: true,
    popular: true,
    badge: "Signature Glow"
  },
  {
    id: "skin-2",
    name: "Hydra-Dew Glass Skin Treatment",
    category: "Skin & Facial",
    description: "Multi-step dermal infusion of hyaluronic acid, antioxidants, and vortex suction for pore tightening and deep hydration.",
    details: ["Deep vortex cleansing", "Gentle fruit acid peel", "Hyaluronic serum infusion", "LED photon light therapy"],
    price: "₹2,999",
    duration: "60 mins",
    image: "/images/facial.jpg",
    active: true,
    featured: true
  },
  {
    id: "skin-3",
    name: "O3+ Bridal D-Tan & Brightening Facial",
    category: "Skin & Facial",
    description: "High-potency skin oxygenation therapy for instant tan removal, hyperpigmentation reduction, and luminous complexion.",
    details: ["Active oxygen peel", "Melanin control serum", "Brightening rubber mask", "Cooling jade roller massage"],
    price: "₹1,899",
    duration: "60 mins",
    image: "/images/facial.jpg",
    active: true
  },

  // Makeup & Bridal
  {
    id: "makeup-1",
    name: "HD Royal Bridal Makeover Package",
    category: "Bridal & Makeup",
    description: "Complete bridal trousseau package with HD / Airbrush makeup, luxury hair styling, dupatta draping, and jewelry setting.",
    details: ["HD / Airbrush long-wear makeup (MAC / Huda / Charlotte Tilbury)", "Bridal hair art with accessories & fresh florals", "Saree / Dupatta / Lehenga styling", "Premium eyelashes & nail styling"],
    price: "₹9,999",
    duration: "180 mins",
    image: "/images/hero-3.jpg",
    active: true,
    featured: true,
    badge: "VIP Bridal"
  },
  {
    id: "makeup-2",
    name: "Celebrity Party & Reception Glam",
    category: "Bridal & Makeup",
    description: "High-definition glamorous makeup tailored for cocktails, sangeet, anniversaries, and red-carpet festive occasions.",
    details: ["Flawless base matching your undertone", "Signature smokey or winged eye artistry", "Glam curls or sleek updo", "Setting spray for 16-hr wear"],
    price: "₹2,799",
    duration: "75 mins",
    image: "/images/hero-3.jpg",
    active: true,
    popular: true
  },

  // Men's Grooming
  {
    id: "men-1",
    name: "Executive Haircut & Beard Architecture",
    category: "Men's Grooming",
    description: "Precision fade/taper haircut, hot towel beard sculpting, razor detailing, and refreshing tea tree scalp wash.",
    details: ["Custom haircut & texturizing", "Beard outline with straight razor & balm", "Hot towel aromatic steam", "Styling with premium matte clay"],
    price: "₹599",
    duration: "45 mins",
    image: "/images/grooming.jpg",
    active: true,
    featured: true,
    popular: true,
    badge: "Men's Favorite"
  },
  {
    id: "men-2",
    name: "Men's Charcoal Detox Cleanup & Beard Spa",
    category: "Men's Grooming",
    description: "Deep clarifying charcoal blackhead removal, beard conditioning oil treatment, and revitalizing face massage.",
    details: ["Deep pores steam & extraction", "Activated charcoal purifying pack", "Beard softening steam massage", "Invigorating face toner & moisture"],
    price: "₹999",
    duration: "50 mins",
    image: "/images/grooming.jpg",
    active: true
  },

  // Beauty, Nails & Body Care
  {
    id: "beauty-1",
    name: "Luxury Rose & Honey Spa Pedicure / Manicure",
    category: "Beauty & Nails",
    description: "Dead Sea salt soak, sugar scrub, callus smoothing, hydrating mask, and relaxing paraffin massage with gel finish.",
    details: ["Aroma salt foot bath", "Cuticle care & nail shaping", "Exfoliating scrub & thermal mask", "Massage & chip-resistant polish"],
    price: "₹899",
    duration: "50 mins",
    image: "/images/hero-1.jpg",
    active: true
  },
  {
    id: "beauty-2",
    name: "Full Body Waxing (Rica Italian Wax)",
    category: "Beauty & Nails",
    description: "Colophony-free Rica wax from Italy for painless, smooth hair removal suitable for sensitive skin without redness.",
    details: ["Pre-wax soothing gel", "100% natural Rica wax", "Ingrown prevention care", "Post-wax calming chamomile lotion"],
    price: "₹1,499",
    duration: "60 mins",
    image: "/images/hero-1.jpg",
    active: true
  }
]

export const stylists: Stylist[] = [
  {
    id: "stylist-1",
    name: "Sunita Sharma",
    role: "Senior Art Director & Master Colorist",
    experience: "14+ Years Experience",
    specialties: ["French Balayage", "Bridal Makeovers", "Hair Botox", "Kérastase Rituals"],
    bio: "Certified by L'Oréal Professionnel Paris Academy. Has styled over 5,000 clients and brides with flawless precision and artistic eye.",
    image: "/images/stylist-1.jpg",
    rating: 4.95,
    reviewsCount: 142,
    instagram: "https://instagram.com"
  },
  {
    id: "stylist-2",
    name: "Julian Verma",
    role: "Master Stylist & Men's Grooming Specialist",
    experience: "10+ Years Experience",
    specialties: ["Precision Scissor Cuts", "Beard Architecture", "Keratin Smoothing", "Texture Design"],
    bio: "Trained in London and Mumbai, specializing in contemporary trend cuts, executive fades, and bespoke hair smoothing therapies.",
    image: "/images/stylist-2.jpg",
    rating: 4.9,
    reviewsCount: 118,
    instagram: "https://instagram.com"
  }
]

export const productsList: Product[] = [
  {
    id: "prod-1",
    name: "L'Oréal Professionnel Absolut Repair Oil",
    category: "Hair Oil & Serum",
    brand: "L'Oréal Professionnel",
    description: "10-in-1 multi-benefit leave-in oil serum enriched with Wheat Germ oil for damaged, split-end prone hair.",
    benefits: ["Nourishes & softens hair", "Reduces split ends by 77%", "Heat protection up to 230°C", "Non-greasy lightweight shine"],
    price: "₹1,350",
    volume: "90ml",
    image: "/images/products.jpg",
    inStock: true,
    tag: "Bestseller"
  },
  {
    id: "prod-2",
    name: "L'Oréal Vitamino Color Spectrum Shampoo",
    category: "Shampoo & Cleanser",
    brand: "L'Oréal Professionnel",
    description: "Color-protecting professional shampoo with Resveratrol to prevent color fade for up to 8 weeks.",
    benefits: ["Maintains salon color vibrancy", "Gentle sulfate-balanced cleanser", "UV and anti-oxidant shield", "Leaves hair 6x glossier"],
    price: "₹1,050",
    volume: "300ml",
    image: "/images/products.jpg",
    inStock: true,
    tag: "Color Safe"
  },
  {
    id: "prod-3",
    name: "L'Oréal Metal Detox Anti-Deposit Protector",
    category: "Hair Mask & Treatment",
    brand: "L'Oréal Professionnel",
    description: "Patented Glicoamine technology that neutralizes heavy metals in hair fiber to prevent breakage during coloring.",
    benefits: ["87% less breakage risk", "100% reliable color results", "Intense fiber nourishment", "Silky mirror finish"],
    price: "₹1,650",
    volume: "250ml",
    image: "/images/products.jpg",
    inStock: true,
    tag: "Salon Exclusive"
  },
  {
    id: "prod-4",
    name: "L'Oréal Mythic Oil Nourishing Mask",
    category: "Deep Conditioner",
    brand: "L'Oréal Professionnel",
    description: "Luxurious concentrated mask infused with Fairly Traded Argan Oil and Myrrh extract for thick, unruly hair.",
    benefits: ["Extreme discipline & softness", "Intense hydration without weight", "Paraben free", "Aromatic sensory fragrance"],
    price: "₹1,450",
    volume: "200ml",
    image: "/images/products.jpg",
    inStock: true
  }
]

export const defaultGallery: GalleryItem[] = [
  { id: "g1", image: "/images/hero-1.jpg", category: "Salon Interior", caption: "VIP Styling Lounge & Golden Mirror Stations", featured: true, tags: ["Interior", "Luxury", "Ambience"] },
  { id: "g2", image: "/images/hero-2.jpg", category: "Hair Styling", caption: "Voluminous Gloss Curls & Blowout", featured: true, tags: ["Curls", "Blowout", "Styling"] },
  { id: "g3", image: "/images/hero-3.jpg", category: "Bridal Makeup", caption: "Royal Indian HD Bridal Makeover with Kundan Jewels", featured: true, tags: ["Bridal", "HD Makeup", "Trousseau"] },
  { id: "g4", image: "/images/hero-4.jpg", category: "Hair Color", caption: "Caramel Golden Balayage Highlights", featured: true, tags: ["Balayage", "Highlights", "L'Oréal Inoa"] },
  { id: "g5", image: "/images/facial.jpg", category: "Skin & Spa", caption: "24K Gold Luxury Skin Rejuvenation Therapy", tags: ["Facial", "Glow", "Anti-Ageing"] },
  { id: "g6", image: "/images/grooming.jpg", category: "Men's Grooming", caption: "Executive Beard Architecture & Precision Fade", tags: ["Men", "Beard", "Fade"] },
  { id: "g7", image: "/images/products.jpg", category: "Products", caption: "Original L'Oréal Professionnel Serie Expert Showcase", tags: ["L'Oréal", "Haircare", "Authentic"] },
  { id: "g8", image: "/images/stylist-1.jpg", category: "Master Stylists", caption: "Senior Stylist Consultation & Custom Formulation", tags: ["Team", "Consultation", "Expertise"] }
]

export const galleryCategories = ["All", "Hair Styling", "Hair Color", "Bridal Makeup", "Skin & Spa", "Men's Grooming", "Salon Interior"]

export const defaultBeforeAfter: BeforeAfter[] = [
  {
    id: "ba-1",
    title: "Frizzy Dull Hair to Glass Silk Balayage",
    category: "Hair Transformation",
    before: "/images/hero-4.jpg",
    after: "/images/hero-2.jpg",
    stylist: "Sunita Sharma",
    description: "Client came with damaged, unmanaged brassy hair. Completed L'Oréal Metal Detox + French Balayage + Keratin Seal."
  },
  {
    id: "ba-2",
    title: "Tanned Tired Skin to 24K Glass Glow",
    category: "Skin Rejuvenation",
    before: "/images/facial.jpg",
    after: "/images/hero-3.jpg",
    stylist: "Sunita Sharma",
    description: "Pre-bridal intensive 3-session Hydra-Dew and 24K Gold Therapy restoring deep cellular hydration."
  }
]

export const defaultReviews: Review[] = [
  {
    id: "rev-1",
    name: "Ananya Mishra",
    rating: 5,
    text: "The best salon in Indira Nagar Lucknow by far! I got my French Balayage and Keratin treatment done here. The staff uses 100% genuine L'Oréal products. My hair has never felt softer or shinier. The ambience is truly 5-star!",
    date: "2 weeks ago",
    source: "Google Verified Review",
    serviceTaken: "French Balayage & Keratin",
    verified: true
  },
  {
    id: "rev-2",
    name: "Rohit Srivastava",
    rating: 5,
    text: "Outstanding men's grooming section. Julian understood exactly what haircut and beard shape suited my face. Very hygienic, disposable aprons, and fantastic scalp massage. Highly recommend to everyone in Lucknow!",
    date: "1 month ago",
    source: "Google Verified Review",
    serviceTaken: "Executive Cut & Beard Sculpting",
    verified: true
  },
  {
    id: "rev-3",
    name: "Pooja Trivedi",
    rating: 5,
    text: "Booked my bridal makeup and pre-bridal services here. They made me look like royalty! Sunita ji is a magician with makeup. No cakey base at all—natural, glowing and stayed intact till 4 AM. Thank you Loreal Unisex Salon!",
    date: "3 weeks ago",
    source: "Google Verified Review",
    serviceTaken: "HD Bridal Makeover Package",
    verified: true
  },
  {
    id: "rev-4",
    name: "Dr. Alok Verma",
    rating: 5,
    text: "Clean, polite staff, premium products, and great location right opposite Sai Mandir in B-Block. Very professional approach and transparent pricing without pushy upselling. 5/5 stars.",
    date: "1 month ago",
    source: "Google Verified Review",
    serviceTaken: "Hair Spa & Charcoal Cleanup",
    verified: true
  }
]

export const salonFeatures = [
  { title: "L'Oréal Certified Experts", desc: "Stylists certified by L'Oréal Professionnel Academy Paris" },
  { title: "100% Genuine Formulations", desc: "Direct manufacturer authentic haircare & skincare products" },
  { title: "Medical-Grade Hygiene", desc: "UV-sterilized tools, single-use robes & hospital-grade cleanliness" },
  { title: "Private VIP Suites", desc: "Dedicated quiet booths for bridal makeovers and hair therapies" },
  { title: "Complimentary Beverages", desc: "Enjoy freshly brewed artisanal espresso, green teas & mocktails" },
  { title: "Valet & Ample Parking", desc: "Hassle-free parking right in front of Sai Mandir B-Block" }
]
