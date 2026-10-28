import {
  Droplets, Wrench, Sparkles, Snowflake, Gauge, ShieldCheck,
  Disc3, BatteryCharging, Car, Clock, BadgeCheck, Truck, Wallet,
} from 'lucide-react'

const ADDRESS = '164a Plymouth Grove, Manchester M13 0AF, United Kingdom'

export const COMPANY = {
  name: 'M Cars Service',
  phone: '+44 7490 917270',
  phoneHref: 'tel:+447490917270',
  whatsapp: 'https://wa.me/447490917270',
  address: ADDRESS,
  mapLink: 'https://share.google/ekZK3bujYQaoOoxZ6',
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(`M CARS service, ${ADDRESS}`)}&z=16&output=embed`,
}

export const FIRST_VISIT_DISCOUNT = 15 // percent off the first booking
export const OFFER_CODE = 'FIRST15'

export const SERVICES = [
  {
    id: 'oil-change',
    name: 'Oil & Filter Change',
    icon: Droplets,
    price: 89,
    duration: '45 min',
    desc: 'Quality engine oil, new oil filter and a 20-point safety check.',
    popular: true,
  },
  {
    id: 'general-service',
    name: 'Full Service',
    icon: Wrench,
    price: 189,
    duration: '2 hrs',
    desc: 'Oil, filters, plugs, fluid top-ups, brakes and suspension check.',
    popular: true,
  },
  {
    id: 'detailing',
    name: 'Full Car Valet',
    icon: Sparkles,
    price: 129,
    duration: '3 hrs',
    desc: 'Interior deep clean, exterior polish, wax and engine bay cleaning.',
  },
  {
    id: 'ac-service',
    name: 'Air Con Re-gas',
    icon: Snowflake,
    price: 79,
    duration: '1 hr',
    desc: 'Leak test, refrigerant re-gas, cabin filter and vent cleaning.',
  },
  {
    id: 'diagnostics',
    name: 'Engine Diagnostics',
    icon: Gauge,
    price: 49,
    duration: '30 min',
    desc: 'Full OBD scan, fault code report and expert advice on the fix.',
  },
  {
    id: 'brakes',
    name: 'Brake Service',
    icon: Disc3,
    price: 119,
    duration: '1.5 hrs',
    desc: 'Pad replacement, disc inspection and brake fluid change.',
  },
  {
    id: 'battery',
    name: 'Battery Check & Replace',
    icon: BatteryCharging,
    price: 29,
    duration: '20 min',
    desc: 'Battery and charging test, terminal cleaning, replacements available.',
  },
  {
    id: 'inspection',
    name: 'Pre-Purchase Inspection',
    icon: ShieldCheck,
    price: 99,
    duration: '1 hr',
    desc: 'Detailed inspection with a written report before you buy a used car.',
  },
]

export const PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Essential Care',
    price: 139,
    was: 165,
    tagline: 'Perfect for regular upkeep',
    features: ['Oil & filter change', 'Exterior wash', '20-point safety check', 'Tyre pressure & tread check'],
  },
  {
    id: 'pkg-premium',
    name: 'Premium Care',
    price: 299,
    was: 357,
    tagline: 'Our most-booked package',
    highlight: true,
    features: ['Everything in Essential', 'Full service', 'Air con re-gas', 'Interior vacuum & polish', 'Free collection & delivery'],
  },
  {
    id: 'pkg-ultimate',
    name: 'Ultimate Care',
    price: 479,
    was: 595,
    tagline: 'Showroom finish, inside and out',
    features: ['Everything in Premium', 'Full car valet', 'Engine diagnostics', 'Brake service', 'Priority booking'],
  },
]

export const ALL_BOOKABLE = [...SERVICES, ...PACKAGES]

export const TIME_SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM']

export const STEPS = [
  { icon: Car, title: 'Choose a service', text: 'Pick a service or package — prices are fixed and shown upfront.' },
  { icon: Clock, title: 'Pick a time', text: 'Select a date and slot that suits you.' },
  { icon: Truck, title: 'We handle the rest', text: 'Drop your car at our Plymouth Grove garage or ask about collection.' },
]

export const WHY_US = [
  { icon: BadgeCheck, title: 'Skilled Mechanics', text: 'Experienced technicians who work on all major makes and models.' },
  { icon: Wallet, title: 'Transparent Pricing', text: 'No hidden charges. You approve any extra work before we start it.' },
  { icon: ShieldCheck, title: 'Quality Parts', text: 'Genuine or OEM-quality parts fitted to manufacturer standards.' },
  { icon: Truck, title: 'Collection & Delivery', text: 'Busy day? Ask about collecting your car from home or work.' },
]

export const HIGHLIGHTS = [
  { title: 'All makes & models', text: 'Petrol, diesel and hybrid' },
  { title: 'Fixed prices', text: 'Shown before you book' },
  { title: 'Pay after service', text: 'No payment to book' },
  { title: 'Manchester M13', text: '164a Plymouth Grove' },
]

export const FAQS = [
  { q: 'Do I need to pay online when booking?', a: 'No. Booking is free — you pay only after the work is completed.' },
  { q: 'How long does a typical service take?', a: 'Most jobs are done the same day. Each service shows its estimated time so you can plan ahead.' },
  { q: 'Do you offer collection & delivery?', a: 'Yes, collection and delivery is included with the Premium and Ultimate packages. For other bookings, just ask when we call to confirm.' },
  { q: 'Can I reschedule or cancel?', a: 'Of course. Call or WhatsApp us at least 2 hours before your slot and we will rearrange it at no cost.' },
  { q: 'Which car brands do you work on?', a: 'All major makes — Ford, Vauxhall, Volkswagen, BMW, Audi, Mercedes, Toyota, Nissan, Kia, Hyundai and more, including hybrids.' },
]

export const formatPrice = (n) => `£${n.toLocaleString('en-GB')}`

// Local YYYY-MM-DD (toISOString would give the UTC date)
export const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
