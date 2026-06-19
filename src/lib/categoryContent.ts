// Unique, indexable copy for each category landing page (/category/:slug).
// This is the on-page content Google ranks — keep it accurate and specific to
// what CW Electronics actually stocks. No invented stats or claims.

export interface CategoryContent {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string[]
  /** Optional visible FAQ (also helps long-tail search). */
  faqs?: { q: string; a: string }[]
}

const SHOWROOM = 'China Cash and Carry, Crown Mines, Johannesburg'

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  cctv: {
    metaTitle: 'CCTV Cameras & Security Camera Systems in Johannesburg',
    metaDescription:
      'Buy CCTV cameras, AHD recording kits, DVR systems and solar 4G security cameras in Johannesburg. Retail & wholesale prices, nationwide delivery from CW Electronics.',
    eyebrow: 'Surveillance & Security',
    h1: 'CCTV Cameras & Security Systems',
    intro: [
      'Protect your home, shop or site with our range of CCTV cameras and complete security recording systems. We stock 2MP analogue bullet cameras, HiLook by Hikvision turret cameras, full 4-, 8- and 16-channel AHD/DVR kits, solar-powered 4G cameras, and the cables, power supplies and junction boxes that go with them.',
      `As a direct importer based at ${SHOWROOM}, CW Electronics sells to homeowners, installers and resellers — at retail, or at wholesale pricing from 6 units. Collect in-store or get it delivered anywhere in South Africa.`,
    ],
    faqs: [
      {
        q: 'Do you sell complete CCTV kits or just cameras?',
        a: 'Both. We stock standalone cameras as well as complete AHD/DVR recording kits (4, 8 and 16 channel) with everything you need to record and view footage on your phone.',
      },
      {
        q: 'Can I get wholesale pricing on CCTV for my installation business?',
        a: 'Yes — wholesale pricing kicks in from 6 units per product line. Contact us on WhatsApp for a bulk quote.',
      },
    ],
  },

  routers: {
    metaTitle: '4G LTE Routers & WiFi Networking in Johannesburg',
    metaDescription:
      'Shop 4G LTE routers, portable WiFi, range extenders and mini UPS for routers. Retail & wholesale networking gear with nationwide delivery from CW Electronics, Johannesburg.',
    eyebrow: 'Networking & Connectivity',
    h1: '4G LTE Routers & WiFi Networking',
    intro: [
      'Stay connected with our range of routers and networking gear — rechargeable LTE CPE 4G wireless routers, portable WiFi units, WiFi range extenders, and mini UPS units that keep your router and ONT online during load-shedding.',
      `Whether you need one router for home or a batch for resale, CW Electronics has retail and wholesale (6+ unit) pricing. Buy at our ${SHOWROOM} showroom or order online for delivery across South Africa.`,
    ],
  },

  cables: {
    metaTitle: 'CCTV, Power & Video Cables in Johannesburg',
    metaDescription:
      'Buy CCTV power & video cables, DC splitter cables, HDMI/VGA splitters and connectors. Retail & wholesale, nationwide delivery from CW Electronics, Johannesburg.',
    eyebrow: 'Cables & Connectors',
    h1: 'Cables, Splitters & Connectors',
    intro: [
      'Find the right cable for the job — pre-made CCTV power-and-video cables in 10m to 50m lengths, DC power splitter cables, HDMI and VGA splitters, and a range of connectors and adapters.',
      `CW Electronics imports directly, so you get fair retail prices and proper wholesale rates from 6 units. Collect at ${SHOWROOM} or have it shipped nationwide.`,
    ],
  },

  accessories: {
    metaTitle: 'Electronics Accessories & Gadgets in Johannesburg',
    metaDescription:
      'Two-way radios, HDMI splitters, projectors, endoscopes, power supplies and more. Retail & wholesale electronics accessories with nationwide delivery from CW Electronics.',
    eyebrow: 'Gadgets & Accessories',
    h1: 'Electronics Accessories & Gadgets',
    intro: [
      'A wide mix of useful electronics and gadgets — Baofeng two-way radios and walkie-talkies, HDMI splitters, LED multimedia projectors, USB endoscopes, switching power supplies, and plenty more.',
      `New stock lands regularly as we import directly. Shop at retail or grab wholesale pricing from 6 units, at our ${SHOWROOM} showroom or delivered across South Africa.`,
    ],
  },

  household: {
    metaTitle: 'Household Electronics & Appliances in Johannesburg',
    metaDescription:
      'Vacuum sealers, heat sealers, insulated tumblers and handy household electronics. Retail & wholesale prices, nationwide delivery from CW Electronics, Johannesburg.',
    eyebrow: 'Home & Living',
    h1: 'Household Electronics & Appliances',
    intro: [
      'Practical electronics and gear for the home and small business — vacuum sealer machines, impulse heat sealers for PE & PP bags, insulated stainless-steel travel mugs and tumblers, and more.',
      `CW Electronics is a direct importer at ${SHOWROOM}. Buy single items at retail or stock up at wholesale pricing from 6 units, with delivery nationwide.`,
    ],
  },

  tools: {
    metaTitle: 'Tools & Detectors in Johannesburg',
    metaDescription:
      'Handheld metal detectors, breathalyzers, rechargeable searchlights, heat sealers and more. Retail & wholesale, nationwide delivery from CW Electronics, Johannesburg.',
    eyebrow: 'Tools & Equipment',
    h1: 'Tools, Detectors & Equipment',
    intro: [
      'Useful tools and detection gear — handheld security metal detectors, digital breathalyzers, rechargeable searchlights, impulse heat sealers and other practical equipment for security, events and small business.',
      `Imported directly and priced fairly, with wholesale rates from 6 units. Collect at ${SHOWROOM} or order for delivery across South Africa.`,
    ],
  },

  automobile: {
    metaTitle: 'Car Dash Cams & Vehicle Electronics in Johannesburg',
    metaDescription:
      'Dash cams, car DVR recorders and vehicle electronics at retail & wholesale prices. Nationwide delivery from CW Electronics, Crown Mines, Johannesburg.',
    eyebrow: 'Vehicle Electronics',
    h1: 'Car Dash Cams & Vehicle Electronics',
    intro: [
      'Keep an eye on the road with our vehicle electronics — dual-lens dash cams with night vision, car DVR recorders with navigation and speed display, and related accessories.',
      `CW Electronics imports directly, so retail prices stay sharp and wholesale (6+ units) is available for resellers. Buy at ${SHOWROOM} or delivered nationwide.`,
    ],
  },

  'car-lights': {
    metaTitle: 'Car Lights & Vehicle Lighting in Johannesburg',
    metaDescription:
      'Shop car lights, vehicle bulbs and auto lighting accessories at CW Electronics. Retail & wholesale pricing, nationwide delivery from Johannesburg.',
    eyebrow: 'Vehicle Lighting',
    h1: 'Car Lights & Vehicle Lighting',
    intro: [
      'Browse car lights and practical vehicle lighting accessories for everyday replacements, resale stock and workshop use. This range is suited to drivers, traders and auto-related businesses looking for dependable stock at competitive pricing.',
      `CW Electronics imports directly and offers both retail sales and wholesale pricing from 6 units. Collect from ${SHOWROOM} or order for delivery anywhere in South Africa.`,
    ],
  },

  'flood-lights': {
    metaTitle: 'Flood Lights in Johannesburg | CW Electronics',
    metaDescription:
      'Buy flood lights for home, business and outdoor security use. Retail & wholesale prices with nationwide delivery from CW Electronics, Johannesburg.',
    eyebrow: 'Outdoor Lighting',
    h1: 'Flood Lights',
    intro: [
      'Our flood light range is suited to security lighting, outside work areas, shops, yards and general-purpose illumination. It is a strong fit for homeowners, installers and resellers needing practical lighting stock.',
      `CW Electronics supplies flood lights at retail and trade pricing from 6 units, with collection from ${SHOWROOM} or delivery across South Africa.`,
    ],
  },

  'hand-tools': {
    metaTitle: 'Hand Tools in Johannesburg | CW Electronics',
    metaDescription:
      'Shop hand tools for workshop, home and trade use at CW Electronics. Retail & wholesale pricing with nationwide delivery from Johannesburg.',
    eyebrow: 'Workshop Essentials',
    h1: 'Hand Tools',
    intro: [
      'Find practical hand tools for everyday work, installations, maintenance and resale. This category is ideal for workshops, traders and customers who need useful tools without overcomplicating the buy.',
      `As a direct importer at ${SHOWROOM}, CW Electronics offers sharp retail pricing and wholesale rates from 6 units, with delivery nationwide.`,
    ],
  },

  humidifiers: {
    metaTitle: 'Humidifiers in Johannesburg | CW Electronics',
    metaDescription:
      'Buy humidifiers for home, office and gift use at CW Electronics. Retail & wholesale pricing, with delivery across South Africa.',
    eyebrow: 'Home Comfort',
    h1: 'Humidifiers',
    intro: [
      'Browse humidifiers for bedrooms, offices, desks and gift ranges. These are practical home-comfort products for walk-in buyers as well as resellers who want lighter household electronics in their range.',
      `CW Electronics sells humidifiers at retail and offers wholesale pricing from 6 units, with collection at ${SHOWROOM} or delivery nationwide.`,
    ],
  },

  'mouse-keyboard-combos': {
    metaTitle: 'Mouse & Keyboard Combos in Johannesburg',
    metaDescription:
      'Shop mouse and keyboard combos for office, school and home setups. Retail & wholesale prices from CW Electronics, Johannesburg.',
    eyebrow: 'Computing Essentials',
    h1: 'Mouse & Keyboard Combos',
    intro: [
      'Our mouse and keyboard combos are a straightforward fit for desktop setups, school use, office replacement stock and resale counters. They are ideal for customers looking for simple plug-and-play value.',
      `CW Electronics offers retail pricing for single purchases and wholesale pricing from 6 units, with nationwide delivery or collection from ${SHOWROOM}.`,
    ],
  },

  'pest-repellents': {
    metaTitle: 'Pest Repellents in Johannesburg | CW Electronics',
    metaDescription:
      'Buy electronic pest repellents at CW Electronics. Retail & wholesale prices with nationwide delivery from Johannesburg.',
    eyebrow: 'Home Protection',
    h1: 'Pest Repellents',
    intro: [
      'Browse electronic pest repellents suited to homes, storerooms, shops and small business spaces. This category works well for customers who want simple preventative products and resellers building out a practical household range.',
      `CW Electronics supplies pest repellents at retail and wholesale pricing from 6 units, with collection from ${SHOWROOM} or delivery across South Africa.`,
    ],
  },

  torches: {
    metaTitle: 'Torches & Flashlights in Johannesburg',
    metaDescription:
      'Shop torches and flashlights for home, security and load-shedding use. Retail & wholesale prices from CW Electronics, Johannesburg.',
    eyebrow: 'Portable Lighting',
    h1: 'Torches & Flashlights',
    intro: [
      'Find torches and flashlights for security staff, households, vehicles, camping, emergency kits and load-shedding backup. This range is ideal for both individual buyers and resale counters.',
      `CW Electronics offers retail pricing and wholesale rates from 6 units, with collection from ${SHOWROOM} or delivery anywhere in South Africa.`,
    ],
  },

  'led-lights': {
    metaTitle: 'LED Lights in Johannesburg | CW Electronics',
    metaDescription:
      'Buy LED lights at CW Electronics for home, shop and resale use. Retail & wholesale pricing with nationwide delivery from Johannesburg.',
    eyebrow: 'Energy-Efficient Lighting',
    h1: 'LED Lights',
    intro: [
      'Browse LED lights for practical day-to-day lighting needs in homes, shops, work areas and resale channels. This category is suited to customers who want efficient, useful lighting at accessible pricing.',
      `CW Electronics sells LED lights at retail and offers wholesale pricing from 6 units, with collection at ${SHOWROOM} or nationwide delivery.`,
    ],
  },
}

/** Falls back to a sensible generic block for categories without bespoke copy. */
export function getCategoryContent(slug: string, name: string): CategoryContent {
  return (
    CATEGORY_CONTENT[slug] ?? {
      metaTitle: `${name} in Johannesburg | CW Electronics`,
      metaDescription: `Shop ${name.toLowerCase()} at CW Electronics — a direct electronics importer in Crown Mines, Johannesburg. Retail & wholesale pricing, nationwide delivery.`,
      eyebrow: 'Shop the Range',
      h1: name,
      intro: [
        `Browse our range of ${name.toLowerCase()} at CW Electronics, a direct electronics importer based at ${SHOWROOM}. Retail and wholesale pricing (from 6 units), with delivery across South Africa.`,
      ],
    }
  )
}
