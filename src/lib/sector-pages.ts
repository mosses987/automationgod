/**
 * Detail pages for flagship sectors (one per group). Photos are free-to-use
 * stock images from Unsplash, saved in /public/sectors.
 */
export interface Feature {
  id: string;
  title: string;
  image: string;
  alt: string;
  /** Default explanation; a sector can override it. */
  text: string;
}

export const features: Record<string, Feature> = {
  'nfc-tap': {
    id: 'nfc-tap',
    title: 'Tap-to-review NFC stand',
    image: '/sector-images/nfc-tap.jpg',
    alt: 'Customer tapping a phone on a countertop reader',
    text: 'A small NFC card or stand at your counter. Customers tap their phone on it and land straight on your Google review page. No searching, no typing.',
  },
  'qr-scan': {
    id: 'qr-scan',
    title: 'QR code reviews, menus and forms',
    image: '/sector-images/qr-scan.jpg',
    alt: 'Hand holding a smartphone displaying a QR code',
    text: 'A QR code on receipts, invoices, tables or your window opens your review page, menu or booking form in a single scan.',
  },
  reviews: {
    id: 'reviews',
    title: 'Automatic review requests and replies',
    image: '/sector-images/reviews.jpg',
    alt: 'Smartphone showing a star rating',
    text: 'After each visit or job, customers get a friendly text asking for a review. New reviews get a thoughtful reply drafted for you, ready to approve or send automatically.',
  },
  booking: {
    id: 'booking',
    title: 'Online booking with reminders',
    image: '/sector-images/booking.jpg',
    alt: 'Laptop and phone showing an appointment booking calendar',
    text: 'Customers pick a time online at any hour, pay a deposit if you want one, and get automatic reminders that cut down no-shows.',
  },
  website: {
    id: 'website',
    title: 'A website that brings in customers',
    image: '/sector-images/website.jpg',
    alt: 'Laptop showing a business website',
    text: 'A fast, mobile-friendly website with your services, photos and a clear way to contact or book you, built to be found on Google.',
  },
  'ai-chat': {
    id: 'ai-chat',
    title: 'AI assistant that answers 24/7',
    image: '/sector-images/ai-chat.jpg',
    alt: 'Smartphone showing a chat conversation',
    text: 'A chat assistant trained on your business. It answers common questions, collects contact details and books appointments while you work.',
  },
  automation: {
    id: 'automation',
    title: 'Workflow automation',
    image: '/sector-images/automation.jpg',
    alt: 'Laptop showing a business dashboard with charts',
    text: 'Repetitive paperwork runs by itself: forms, reminders, quotes, invoices and reports flow between your tools without retyping.',
  },
  crm: {
    id: 'crm',
    title: 'Customer follow-up (CRM)',
    image: '/sector-images/crm.jpg',
    alt: 'Person working on a laptop managing customer emails',
    text: 'Every lead and customer in one place, with automatic follow-up messages so nobody is forgotten and past customers are invited back.',
  },
  'local-search': {
    id: 'local-search',
    title: 'Found on Google Maps and local search',
    image: '/sector-images/local-search.jpg',
    alt: 'Hand holding a phone showing a map with a business pin',
    text: 'Google Business Profile setup and local SEO so people searching near you find your business first.',
  },
  'online-ordering': {
    id: 'online-ordering',
    title: 'Online ordering and delivery',
    image: '/sector-images/online-ordering.jpg',
    alt: 'Person ordering food on a smartphone at a table',
    text: 'Customers order and pay online for pickup or delivery, and you get a clean order list instead of phone calls.',
  },
};

export interface SectorPage {
  slug: string;
  /** Group heading from sectors.ts, used to list related sectors. */
  group?: string;
  /** Square-ish thumbnail used on the Sectors index. */
  thumb: string;
  /** Extra sector-specific services shown as a checklist. */
  extras?: string[];
  /** Visible FAQ (also sent as FAQPage structured data). */
  faqs?: { q: string; a: string }[];
  /** Must match a sector name in sectors.ts. */
  name: string;
  image: string;
  imageAlt: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Feature ids in display order, each with an optional sector-specific explanation. */
  items: { id: string; text?: string }[];
}

const customPages: Omit<SectorPage, 'thumb' | 'group' | 'extras'>[] = [
  {
    slug: 'physiotherapist',
    name: 'Physiotherapist',
    image: '/sector-images/physiotherapist.jpg',
    imageAlt: 'Physiotherapist treating a patient\'s knee in a clinic',
    h1: 'Websites & Automation for Physiotherapy Clinics in Ontario',
    title: 'Physiotherapy Clinic Websites & Booking | Automation God',
    description: 'Online booking, digital intake, recall reminders and review automation for physiotherapy clinics in Waterloo and across Ontario. 3 months free.',
    intro: 'Fewer no-shows, less paperwork and more five-star reviews. We set up the tools that keep your clinic full and your front desk calm.',
    items: [
      { id: 'booking', text: 'Patients book by treatment type and therapist, any time of day. Reminders by text and email cut missed appointments.' },
      { id: 'automation', text: 'Digital intake and consent forms completed before the visit, plus automatic recall reminders and home-exercise programs sent after treatment.' },
      { id: 'nfc-tap', text: 'An NFC stand at reception lets happy patients tap their phone and leave a Google review on the way out.' },
      { id: 'reviews', text: 'Review requests go out after each visit. Replies are drafted in a professional tone and never include private health details.' },
      { id: 'ai-chat', text: 'Answers questions about services, direct billing, parking and hours, and books a first visit, without giving medical advice.' },
      { id: 'website', text: 'A clear clinic website with treatments, therapist profiles and a "Book now" button on every page.' },
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    image: '/sector-images/restaurant.jpg',
    imageAlt: 'Warmly lit restaurant dining room with set tables',
    h1: 'Websites, Online Ordering & Reviews for Restaurants in Ontario',
    title: 'Restaurant Websites, Ordering & Reviews | Automation God',
    description: 'Restaurant websites, table reservations, online ordering, QR menus and review automation across Ontario. First 3 months free.',
    intro: 'Fill more tables and get more orders without paying delivery-app fees. We build the online side of your restaurant.',
    items: [
      { id: 'website', text: 'A mouth-watering website with your menu, photos, hours and a one-tap reservation and order button.' },
      { id: 'booking', text: 'Table reservations with party size, time slots, confirmations and reminders, and a waitlist for busy nights.' },
      { id: 'online-ordering', text: 'Pickup and delivery orders straight from your website, so you keep the margin instead of paying commission.' },
      { id: 'qr-scan', text: 'A QR code on each table opens the menu, and one on the receipt opens your Google review page.' },
      { id: 'nfc-tap', text: 'A small NFC stand on the table or at the till: guests tap their phone and land on your review page.' },
      { id: 'reviews', text: 'Every new Google review gets a warm, on-brand reply drafted instantly. Slow responses cost you stars.' },
      { id: 'ai-chat', text: 'Answers menu, hours, allergy and parking questions at any time, and takes reservation requests.' },
    ],
  },
  {
    slug: 'plumber',
    name: 'Plumber',
    image: '/sector-images/plumber.jpg',
    imageAlt: 'Plumber repairing pipes under a sink',
    h1: 'Websites & Booking Systems for Plumbers in Ontario',
    title: 'Plumber Websites, Booking & Reviews | Automation God',
    description: 'Websites, online job booking, automatic quotes and Google review automation for plumbers in Waterloo and across Ontario. 3 months free.',
    intro: 'Win the "plumber near me" search, capture every call and turn finished jobs into five-star reviews.',
    items: [
      { id: 'local-search', text: 'Google Business Profile and local SEO so you show up when someone searches "plumber near me" in your area.' },
      { id: 'ai-chat', text: 'An assistant that answers 24/7, asks for the address and the problem, and sends emergency requests straight to your phone.' },
      { id: 'booking', text: 'Customers request a visit online, upload a photo of the problem and pick a time that suits you.' },
      { id: 'automation', text: 'Quotes turn into invoices automatically, and open quotes get a follow-up so jobs do not slip away.' },
      { id: 'qr-scan', text: 'A QR code on every invoice and van door takes customers to your review page in one scan.' },
      { id: 'reviews', text: 'A review request text goes out after each completed job, and replies are drafted for you.' },
    ],
  },
  {
    slug: 'beauty-salon',
    name: 'Beauty Salon',
    image: '/sector-images/beauty-salon.jpg',
    imageAlt: 'Hair stylist smiling while styling a client\'s hair',
    h1: 'Booking, Websites & Review Automation for Beauty Salons in Ontario',
    title: 'Salon Websites, Online Booking & Reviews | Automation God',
    description: 'Online booking with deposits, rebooking reminders, review automation and websites for hair and beauty salons across Ontario. 3 months free.',
    intro: 'Keep every chair booked, reduce no-shows and bring clients back on schedule.',
    items: [
      { id: 'booking', text: 'Clients book by service and stylist, with deposits for long appointments and reminders that reduce no-shows.' },
      { id: 'nfc-tap', text: 'An NFC stand at the front desk: after a great cut, clients tap their phone and leave a review on the spot.' },
      { id: 'reviews', text: 'Automatic review requests and drafted replies, so your Google profile stays active and friendly.' },
      { id: 'crm', text: 'Rebooking reminders sent at the right time for each service, plus birthday offers and win-back messages.' },
      { id: 'website', text: 'A beautiful site with your price list, team and photo gallery, and a "Book now" button everywhere.' },
      { id: 'local-search', text: 'Show up on Google Maps when people search for a salon near them.' },
    ],
  },
  {
    slug: 'pet-groomer',
    name: 'Pet Groomer',
    image: '/sector-images/pet-groomer.jpg',
    imageAlt: 'Groomer trimming a small white dog',
    h1: 'Booking & Reminders for Pet Groomers in Ontario',
    title: 'Pet Groomer Websites & Booking | Automation God',
    description: 'Online booking, rebooking reminders, pet profiles and review automation for pet groomers across Ontario. 3 months free.',
    intro: 'Make rebooking effortless so the same happy pets come back every six weeks.',
    items: [
      { id: 'booking', text: 'Owners book by pet size and service, with reminders so nobody forgets the appointment.' },
      { id: 'crm', text: 'A profile for every pet with breed, coat notes and history, and rebooking reminders every 6 to 8 weeks.' },
      { id: 'automation', text: 'Vaccination record reminders and "ready for pickup" texts sent automatically.' },
      { id: 'qr-scan', text: 'A QR code on the pickup counter takes happy owners to your Google review page.' },
      { id: 'reviews', text: 'Review requests after every groom, with cute photo-friendly follow-ups and drafted replies.' },
      { id: 'website', text: 'A friendly website with services, prices and before-and-after photos.' },
    ],
  },
  {
    slug: 'auto-repair',
    name: 'Auto Repair',
    image: '/sector-images/auto-repair.jpg',
    imageAlt: 'Mechanic working in an auto repair garage',
    h1: 'Websites & Booking for Auto Repair Shops in Ontario',
    title: 'Auto Repair Shop Websites & Booking | Automation God',
    description: 'Online booking, digital estimates, service reminders and review automation for auto repair shops across Ontario. 3 months free.',
    intro: 'Book more jobs, get estimates approved faster and bring customers back for every service interval.',
    items: [
      { id: 'booking', text: 'Customers book drop-off times online, choosing the service and entering their vehicle.' },
      { id: 'automation', text: 'Digital estimates sent by text and approved with one tap, plus oil-change and tire-swap reminders.' },
      { id: 'ai-chat', text: 'Answers pricing, hours and "can you fit me in this week?" questions around the clock.' },
      { id: 'qr-scan', text: 'A QR code on every invoice and at the counter opens your review page.' },
      { id: 'reviews', text: 'Review requests after pickup and drafted replies that handle both praise and complaints well.' },
      { id: 'local-search', text: 'Rank for "auto repair near me" with a tuned Google Business Profile.' },
    ],
  },
  {
    slug: 'fitness-studio',
    name: 'Fitness Studio',
    image: '/sector-images/fitness-studio.jpg',
    imageAlt: 'Personal trainer coaching a client in a gym',
    h1: 'Class Booking & Member Automation for Fitness Studios in Ontario',
    title: 'Fitness Studio Websites & Class Booking | Automation God',
    description: 'Class booking, waitlists, membership reminders and review automation for fitness studios across Ontario. 3 months free.',
    intro: 'Fill every class, keep members engaged and win back the ones who drift away.',
    items: [
      { id: 'booking', text: 'Class schedules, online sign-ups, waitlists and reminders that cut late cancellations.' },
      { id: 'website', text: 'A high-energy website with class timetable, trainer profiles and membership sign-up.' },
      { id: 'crm', text: 'Automatic messages for new members, missed weeks and expiring memberships.' },
      { id: 'automation', text: 'Membership renewals, billing reminders and attendance reports without spreadsheets.' },
      { id: 'nfc-tap', text: 'An NFC card at the front desk: members tap after class and leave a review in seconds.' },
      { id: 'reviews', text: 'Review requests after milestones, with replies drafted in your studio\'s voice.' },
    ],
  },
  {
    slug: 'florist',
    name: 'Florist',
    image: '/sector-images/florist.jpg',
    imageAlt: 'Florist arranging colourful flowers at a flower stall',
    h1: 'Online Ordering & Websites for Florists in Ontario',
    title: 'Florist Websites & Online Ordering | Automation God',
    description: 'Online flower ordering with same-day delivery, occasion reminders and review automation for florists across Ontario. 3 months free.',
    intro: 'Take orders around the clock and remind customers about every birthday and anniversary.',
    items: [
      { id: 'online-ordering', text: 'Shop online with delivery date and postal-code checks, gift messages and secure payment.' },
      { id: 'website', text: 'A beautiful website with bouquets, seasonal collections and wedding enquiries.' },
      { id: 'crm', text: 'Occasion reminders ("Mom\'s birthday is next week") bring customers back to order again.' },
      { id: 'qr-scan', text: 'A QR code on the delivery card and in the shop opens your review page.' },
      { id: 'reviews', text: 'Review requests after delivery and drafted replies, especially useful around Valentine\'s Day and Mother\'s Day.' },
      { id: 'local-search', text: 'Show up for "flower delivery near me" and "florist in your city".' },
    ],
  },
  {
    slug: 'photographer',
    name: 'Photographer',
    image: '/sector-images/photographer.jpg',
    imageAlt: 'Photographer reviewing photos on a laptop next to a camera',
    h1: 'Websites & Booking for Photographers in Ontario',
    title: 'Photographer Websites & Online Booking | Automation God',
    description: 'Portfolio websites, session booking with deposits, contracts and review automation for photographers across Ontario. 3 months free.',
    intro: 'Show your best work, book sessions with deposits and let the admin run itself.',
    items: [
      { id: 'website', text: 'A portfolio website that loads fast and shows your best galleries by session type.' },
      { id: 'booking', text: 'Clients pick a session type and date online, pay a deposit and get reminders.' },
      { id: 'automation', text: 'Contracts with e-signature, questionnaires and a private gallery delivered automatically.' },
      { id: 'crm', text: 'Follow-ups for enquiries, anniversary session reminders and referral requests.' },
      { id: 'reviews', text: 'A review request after the gallery is delivered, with drafted replies.' },
      { id: 'local-search', text: 'Rank for "family photographer" or "wedding photographer" in your city.' },
    ],
  },
  {
    slug: 'accountant',
    name: 'Accountant',
    image: '/sector-images/accountant.jpg',
    imageAlt: 'Accountant meeting with a client at a table with a laptop',
    h1: 'Websites & Client Automation for Accountants in Ontario',
    title: 'Accountant Websites & Client Portals | Automation God',
    description: 'Websites, appointment booking, document checklists and deadline reminders for accountants and tax preparers across Ontario. 3 months free.',
    intro: 'Collect documents faster, reduce back-and-forth and stay on top of every deadline.',
    items: [
      { id: 'website', text: 'A professional website explaining your services, fees and how to get started.' },
      { id: 'booking', text: 'Clients book consultations online, with intake questions asked before the meeting.' },
      { id: 'automation', text: 'Tax-season document checklists, secure upload and automatic deadline reminders.' },
      { id: 'crm', text: 'A simple client list with follow-ups for renewals, year-end and new-client onboarding.' },
      { id: 'ai-chat', text: 'Answers common questions about documents and deadlines, and books a call.' },
      { id: 'reviews', text: 'Review requests after a filing is complete and professional drafted replies.' },
    ],
  },
  {
    slug: 'law-firm',
    name: 'Law Firm',
    image: '/sector-images/law-firm.jpg',
    imageAlt: 'Lawyer in a bright office speaking with a client',
    h1: 'Websites & Client Intake for Law Firms in Ontario',
    title: 'Law Firm Websites & Client Intake | Automation God',
    description: 'Law firm websites, consultation booking, secure intake and review automation for lawyers across Waterloo and Ontario. 3 months free.',
    intro: 'Be found for the cases you want, and make every first contact smooth and professional.',
    items: [
      { id: 'website', text: 'A credible website with a page for each practice area, lawyer profiles and a clear consultation button.' },
      { id: 'booking', text: 'Prospective clients book a consultation online at a time that suits both of you.' },
      { id: 'automation', text: 'Secure intake forms and document upload feed straight into your case tracking, with conflict-check details captured up front.' },
      { id: 'ai-chat', text: 'Answers general questions about your practice, hours and process, and never gives legal advice.' },
      { id: 'crm', text: 'Follow-up on enquiries and past clients so referrals and repeat work keep coming.' },
      { id: 'local-search', text: 'Rank for your practice areas in your city with a tuned Google Business Profile.' },
    ],
  },
  {
    slug: 'real-estate-agent',
    name: 'Real Estate Agent',
    image: '/sector-images/real-estate-agent.jpg',
    imageAlt: 'Real estate agent speaking with a couple holding a folder',
    h1: 'Websites & Lead Follow-Up for Real Estate Agents in Ontario',
    title: 'Real Estate Agent Websites & Lead Follow-Up | Automation God',
    description: 'Real estate websites, listing pages, showing booking and automatic lead follow-up for agents across Ontario. 3 months free.',
    intro: 'Capture every lead and follow up in minutes, not days.',
    items: [
      { id: 'website', text: 'A personal-brand website with listings, neighbourhood guides and a home-valuation form.' },
      { id: 'crm', text: 'Every enquiry lands in one place and gets an instant, personal follow-up sequence.' },
      { id: 'booking', text: 'Buyers book showings and consultations online, with calendar reminders.' },
      { id: 'ai-chat', text: 'Answers buyer and seller questions at any hour and captures contact details.' },
      { id: 'reviews', text: 'Review requests after closing, with drafted replies for your Google profile.' },
      { id: 'local-search', text: 'Rank for "realtor in your city" and neighbourhood searches.' },
    ],
  },
];

import { sectorGroups } from './sectors';
import { sectorIntros } from './sector-intros';
import { sectorVocab } from './sector-vocab';
import { sectorAlts } from './sector-alts';

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Sector-specific explanation for each feature card. */
const cardText: Record<string, (v: { lower: string; customers: string; visit: string; visits: string }) => string> = {
  website: (v) => `A fast, mobile-friendly website that shows ${v.customers} what your ${v.lower} business offers, with photos, prices and one clear button to book or ask for a quote.`,
  booking: (v) => `${cap(v.customers)} choose a time for their next ${v.visit} online at any hour. Confirmations and reminders go out automatically, so fewer ${v.visits} are missed.`,
  reviews: (v) => `After every ${v.visit}, ${v.customers} get a friendly text asking for a Google review. Each new review gets a reply drafted for you to approve.`,
  'qr-scan': (v) => `A QR code on your invoices, receipts and counter takes ${v.customers} straight to your review page, booking form or price list for ${v.visits}.`,
  'nfc-tap': (v) => `An NFC stand at your front desk: after a ${v.visit}, ${v.customers} tap their phone and land on your Google review page.`,
  'local-search': (v) => `Google Business Profile setup and local SEO, so ${v.customers} searching "${v.lower} near me" find your business first.`,
  crm: (v) => `Every enquiry from ${v.customers} lands in one place, with automatic follow-ups after each ${v.visit} so repeat business doesn't slip away.`,
  automation: (v) => `Forms, reminders and paperwork around each ${v.visit} run on their own, so you spend less time on admin and more time with ${v.customers}.`,
  'ai-chat': (v) => `A chat assistant trained on your ${v.lower} business answers common questions from ${v.customers} at any hour and passes real enquiries to you.`,
  'online-ordering': (v) => `${cap(v.customers)} order and pay online for pickup or delivery, and you get a clean list of ${v.visits} instead of phone calls.`,
};

function faqsFor(name: string, items: { id: string }[], extras: string[]): { q: string; a: string }[] {
  const [customers, visit, visits] = sectorVocab[name] ?? ['customers', 'visit', 'visits'];
  const lower = name.toLowerCase();
  const built = items.map((i) => features[i.id]?.title.toLowerCase()).filter(Boolean).slice(0, 4).join(', ');
  const extra = extras.length ? ` We can also add ${extras.map((e) => e.charAt(0).toLowerCase() + e.slice(1)).join(' and ')}.` : '';
  return [
    {
      q: `What can Automation God build for a ${lower} business?`,
      a: `For ${lower} businesses we typically set up ${built}.${extra} Everything is shaped around how your ${visits} actually work, and all services are free for the first 3 months.`,
    },
    {
      q: `How do I get more Google reviews from ${customers}?`,
      a: `Ask at the right moment: right after a good ${visit}. We set up an automatic text or email after every ${visit}, plus a QR code or NFC tap stand, so ${customers} can leave a review in seconds. Replies to new reviews are drafted for you.`,
    },
    {
      q: `Do you work with ${lower} businesses outside Waterloo?`,
      a: `Yes. Automation God is based in Waterloo, Ontario, and works with ${lower} businesses anywhere in the province, including Kitchener, Cambridge, Guelph, Toronto, Hamilton, London and Ottawa. Most setup happens remotely, with a free call first.`,
    },
  ];
}

export const slugify = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Which feature cards each group of sectors gets (in order). */
const groupFeatures: Record<string, string[]> = {
  'Home & Property Services': ['website', 'booking', 'reviews', 'qr-scan', 'local-search', 'crm'],
  'Beauty & Personal Care': ['booking', 'nfc-tap', 'reviews', 'website', 'crm', 'local-search'],
  'Pet Services': ['booking', 'crm', 'reviews', 'qr-scan', 'website', 'local-search'],
  Automotive: ['booking', 'automation', 'ai-chat', 'qr-scan', 'reviews', 'local-search'],
  'Education, Fitness & Childcare': ['booking', 'website', 'automation', 'crm', 'nfc-tap', 'reviews'],
  'Food & Hospitality': ['website', 'online-ordering', 'qr-scan', 'nfc-tap', 'reviews', 'ai-chat'],
  'Retail & Local Services': ['website', 'booking', 'automation', 'reviews', 'qr-scan', 'ai-chat'],
  'Events & Travel': ['website', 'booking', 'automation', 'crm', 'reviews', 'local-search'],
  'Finance, Tax & Insurance': ['website', 'booking', 'automation', 'crm', 'ai-chat', 'reviews'],
  'Legal & Immigration': ['website', 'booking', 'automation', 'ai-chat', 'crm', 'local-search'],
  'Real Estate': ['website', 'crm', 'booking', 'ai-chat', 'reviews', 'local-search'],
  'Health & Clinics': ['booking', 'automation', 'nfc-tap', 'reviews', 'ai-chat', 'website'],
};

const practiceGroups = new Set(['Legal & Immigration', 'Health & Clinics']);
const customByName = Object.fromEntries(customPages.map((c) => [c.name, c]));

/** Every sector gets a page: custom copy where written, generated from its group otherwise. */
export const allSectorPages: SectorPage[] = sectorGroups.flatMap((g) =>
  g.sectors.map((sec): SectorPage => {
    const slug = slugify(sec.name);
    const base = {
      group: g.name,
      thumb: `/sector-images/thumb/${slug}.jpg`,
    };
    const custom = customByName[sec.name];
    if (custom) return { ...custom, ...base, faqs: faqsFor(sec.name, custom.items, sec.extras) };
    const lower = sec.name.toLowerCase();
    const noun = practiceGroups.has(g.name) ? 'Practices' : 'Businesses';
    return {
      slug,
      name: sec.name,
      ...base,
      image: `/sector-images/${slug}.jpg`,
      imageAlt: sectorAlts[slug] || `${sec.name} at work`,
      h1: `Websites, Booking & Automation for ${sec.name} ${noun} in Ontario`,
      title: `${sec.name} Websites & Booking | Automation God`,
      description: `Websites, online booking, review automation and AI tools for ${lower} ${noun.toLowerCase()} in Waterloo and across Ontario. First 3 months free.`,
      intro: sectorIntros[sec.name] ?? `Websites, booking and automation built for ${lower} businesses.`,
      items: groupFeatures[g.name].map((id) => {
        const [customers, visit, visits] = sectorVocab[sec.name] ?? ['customers', 'visit', 'visits'];
        return { id, text: cardText[id]?.({ lower, customers, visit, visits }) };
      }),
      extras: sec.extras,
      faqs: faqsFor(sec.name, groupFeatures[g.name].map((id) => ({ id })), sec.extras),
    };
  }),
);

export const sectorPageBySlug: Record<string, SectorPage> = Object.fromEntries(allSectorPages.map((p) => [p.slug, p]));
export const sectorPageByName: Record<string, SectorPage> = Object.fromEntries(allSectorPages.map((p) => [p.name, p]));
export const sectorSlugs = allSectorPages.map((p) => p.slug);
