import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, Wifi, Shield, Watch, Sun, Plug, Smartphone,
  ArrowRight, ChevronLeft, ChevronRight, ShoppingCart,
  Truck, Tag, BadgeCheck, MapPin,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../../components/store/Navbar'
import { Footer } from '../../components/store/Footer'

// ── Hero slides ──────────────────────────────────────────────
const HERO_SLIDES = [
  {
    image: '/hero/hero-1.jpg',
    eyebrow: 'New Stock In',
    title: 'Powering South Africa',
    titleAccent: 'Since 2022',
    sub: 'Wholesale Electronics • Chargers • Cables • Adapters — Direct from Dragon City',
  },
  {
    image: '/hero/hero-2.jpg',
    eyebrow: 'Security First',
    title: 'CCTV & 4K Surveillance',
    titleAccent: 'Protect Your Business',
    sub: 'IP Cameras, NVRs, Dome Kits — Trade Pricing Available for Installers',
  },
  {
    image: '/hero/hero-3.jpg',
    eyebrow: 'Off-Grid Ready',
    title: 'Solar Lamps & WiFi',
    titleAccent: 'Built for Africa',
    sub: 'Solar Street Lamps, Power Banks, Routers — Bulk Deals for Resellers',
  },
]

// ── Categories ───────────────────────────────────────────────
const CATEGORIES = [
  {
    slug: 'chargers',
    label: 'Chargers & Cables',
    icon: Plug,
    desc: 'USB-C, Lightning, Fast Charge',
    img: '/products/usb-c-charger.jpg',
  },
  {
    slug: 'cctv',
    label: 'CCTV & Security',
    icon: Shield,
    desc: '4K Cameras & NVR Kits',
    img: '/products/cctv-camera.jpg',
  },
  {
    slug: 'routers',
    label: 'Routers & Networking',
    icon: Wifi,
    desc: 'WiFi 6, LTE, Mesh Systems',
    img: '/products/wifi-router.jpg',
  },
  {
    slug: 'smartwatches',
    label: 'Smartwatches',
    icon: Watch,
    desc: 'Fitness & Health Tracking',
    img: '/products/smartwatch.jpg',
  },
  {
    slug: 'solar',
    label: 'Solar Lamps & Lighting',
    icon: Sun,
    desc: 'Off-Grid Street Lighting',
    img: '/products/solar-lamp.jpg',
  },
  {
    slug: 'accessories',
    label: 'Phone & Laptop Accessories',
    icon: Smartphone,
    desc: 'Cases, Stands, Adapters',
    img: '/products/car-charger.jpg',
  },
]

// ── Best Sellers (placeholder demo) ─────────────────────────
const BEST_SELLERS = [
  { id: 'p1', name: 'USB-C Fast Charger 65W', price: 149, bulk: 99, image: '/products/usb-c-charger.jpg', tag: 'Best Seller' },
  { id: 'p2', name: '4K CCTV Camera Kit', price: 899, bulk: 749, image: '/products/cctv-camera.jpg', tag: '-15%' },
  { id: 'p3', name: 'WiFi 6 Mesh Router', price: 449, image: '/products/wifi-router.jpg' },
  { id: 'p4', name: 'Solar Street Lamp 60W', price: 699, bulk: 549, image: '/products/solar-lamp.jpg', tag: 'Hot' },
  { id: 'p5', name: '100W Power Bank Pro', price: 299, image: '/products/power-bank.jpg' },
  { id: 'p6', name: 'Smartwatch Fitness Tracker', price: 399, bulk: 329, image: '/products/smartwatch.jpg', tag: 'New' },
  { id: 'p7', name: 'Premium HDMI Cable 2m', price: 89, image: '/products/hdmi-cable.jpg' },
  { id: 'p8', name: 'Dual USB Car Charger', price: 129, bulk: 89, image: '/products/car-charger.jpg' },
]

// ── Trust badges ─────────────────────────────────────────────
const TRUST = [
  { icon: Truck, title: 'Fast JHB Delivery', sub: 'Same-day in Gauteng' },
  { icon: Tag, title: 'Wholesale Prices', sub: 'Direct importer pricing' },
  { icon: BadgeCheck, title: 'Quality Guaranteed', sub: 'All products tested' },
  { icon: MapPin, title: 'Click & Collect', sub: 'Dragon City, Fordsburg' },
]

// ─────────────────────────────────────────────────────────────
export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroCarousel />
      <TrustBar />
      <FeaturedCategories />
      <BestSellers />
      <WhyChooseCXX />
      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = HERO_SLIDES[index]

  function go(delta: number) {
    setIndex((i) => (i + delta + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <section className="relative bg-[#111827] overflow-hidden">
      {/* Slides */}
      <div className="relative h-[460px] sm:h-[520px] lg:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Background image */}
            <img
              src={slide.image || '/placeholder.svg'}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/85 to-transparent" />
            {/* Decorative bolt */}
            <div className="absolute right-0 top-0 h-full w-1/2 hidden md:flex items-center justify-end pointer-events-none">
              <Zap
                className="w-[480px] h-[480px] text-[#E63939] opacity-15 translate-x-20"
                strokeWidth={1}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-[#E63939]/15 border border-[#E63939]/40 rounded-full px-4 py-1.5 text-xs text-[#E63939] font-bold mb-5 uppercase tracking-widest">
                <Zap className="w-3 h-3 fill-[#E63939]" />
                {slide.eyebrow}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-5 text-balance">
                {slide.title}
                <br />
                <span className="text-[#E63939]">{slide.titleAccent}</span>
              </h1>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl text-pretty">
                {slide.sub}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#E63939] hover:bg-[#C82020] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#E63939]/30 text-sm"
                >
                  Shop Retail
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/bulk"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors border border-white/20 text-sm backdrop-blur-sm"
                >
                  Browse Bulk Deals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-[#E63939] backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-[#E63939] backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-[#E63939]' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {TRUST.map(({ icon: Icon, title, sub }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-5"
            >
              <div className="w-11 h-11 bg-[#FEE9E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#E63939]" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-[#E63939] uppercase tracking-widest mb-2">
            Browse By Category
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-balance">
            Featured Categories
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-pretty">
            From chargers to CCTV — explore our most popular product lines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(({ slug, label, desc, icon: Icon, img }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/shop?category=${slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 hover:border-[#E63939]/40 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative">
                  <img
                    src={img || '/placeholder.svg'}
                    alt={label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5 text-[#E63939]" />
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">{label}</h3>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E63939] group-hover:gap-2 transition-all">
                    Shop Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
function BestSellers() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-[#E63939] uppercase tracking-widest mb-2">
              Top Picks
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-[#E63939] hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BEST_SELLERS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-[#E63939]/40 hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  src={p.image || '/placeholder.svg'}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-[#E63939] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {p.tag}
                  </span>
                )}
                {p.bulk && (
                  <span className="absolute top-3 right-3 bg-[#111827] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    Bulk from R{p.bulk}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                  {p.name}
                </h3>

                <div className="mt-auto flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-400 leading-none">Retail</p>
                    <p className="text-lg font-extrabold text-[#E63939] leading-tight">
                      R{p.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-[#E63939] hover:bg-[#C82020] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                    aria-label={`Add ${p.name} to cart`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-2 border-[#E63939] text-[#E63939] hover:bg-[#E63939] hover:text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
function WhyChooseCXX() {
  return (
    <section className="py-16 bg-[#111827] relative overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/3 hidden md:flex items-center justify-end pointer-events-none opacity-10">
        <Zap className="w-[420px] h-[420px] text-[#E63939]" strokeWidth={1} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold text-[#E63939] uppercase tracking-widest mb-3">
              Why Choose CXX
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-balance">
              Trusted by retailers, traders &amp; installers across SA
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-pretty">
              CXX Electronics is a direct importer based in Dragon City, Fordsburg.
              We supply chargers, CCTV, networking, solar &amp; smart accessories at
              true wholesale prices — backed by quality testing and fast nationwide delivery.
            </p>
            <Link
              to="/bulk"
              className="inline-flex items-center gap-2 bg-[#E63939] hover:bg-[#C82020] text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#E63939]/30 text-sm"
            >
              Get a Bulk Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[460px]">
            {TRUST.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-colors"
              >
                <div className="w-10 h-10 bg-[#E63939]/15 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#E63939]" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{title}</p>
                <p className="text-xs text-white/50 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
