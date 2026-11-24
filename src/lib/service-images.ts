/** Photo for each service (free-to-use Unsplash photos saved in /public/sector-images). */
export const serviceImages: Record<string, { src: string; alt: string }> = {
  'website-design': { src: '/sector-images/website.jpg', alt: 'Laptop showing a business website' },
  'custom-software': { src: '/sector-images/automation.jpg', alt: 'Laptop showing a custom business dashboard' },
  'workflow-automation': { src: '/sector-images/bookkeeping-service.jpg', alt: 'Laptop and paperwork being replaced by automated workflows' },
  'ai-assistants': { src: '/sector-images/ai-chat.jpg', alt: 'Smartphone showing a chat assistant conversation' },
  'booking-and-ordering': { src: '/sector-images/booking.jpg', alt: 'Laptop and phone showing an online booking calendar' },
  'crm-and-follow-up': { src: '/sector-images/crm.jpg', alt: 'Person managing customer emails on a laptop' },
  'automated-reviews': { src: '/sector-images/nfc-tap.jpg', alt: 'Customer tapping a phone on a countertop reader to leave a review' },
  'website-care-plans': { src: '/sector-images/computer-repair.jpg', alt: 'Technician maintaining and repairing a computer' },
  seo: { src: '/sector-images/local-search.jpg', alt: 'Hand holding a phone showing a map with a business pin' },
  'anything-else': { src: '/sector-images/accountant.jpg', alt: 'Business owner meeting with a consultant at a table' },
};

/** Sectors shown in the "built for real businesses" photo strip. */
export const trustSectors = [
  { slug: 'restaurant', name: 'Restaurants' },
  { slug: 'plumber', name: 'Trades' },
  { slug: 'beauty-salon', name: 'Salons' },
  { slug: 'physiotherapist', name: 'Clinics' },
  { slug: 'law-firm', name: 'Law firms' },
  { slug: 'florist', name: 'Retail shops' },
];
