import type { LucideIcon } from 'lucide-react';
import {
  Building2, Calculator, Camera, Car, GraduationCap, Hammer, PawPrint, Scale, Scissors, Stethoscope, Store, UtensilsCrossed,
} from 'lucide-react';

export interface Sector {
  name: string;
  /** Services specific to this sector, shown first. */
  extras: string[];
}

export interface SectorGroup {
  name: string;
  icon: LucideIcon;
  /** Services that apply to every sector in the group. */
  core: string[];
  sectors: Sector[];
}

const s = (name: string, extras: string[]): Sector => ({ name, extras });

export const sectorGroups: SectorGroup[] = [
  {
    name: 'Home & Property Services',
    icon: Hammer,
    core: [
      'Website with a quote request form',
      'Online booking and job scheduling',
      'Google review requests after every job (text, QR code or NFC card)',
      'Automatic follow-ups on open quotes',
      'Local SEO and Google Business Profile setup',
      'Simple CRM to track leads, jobs and invoices',
    ],
    sectors: [
      s('Landscaping', ['Before-and-after project gallery', 'Seasonal contract renewal reminders']),
      s('Lawn Care', ['Recurring service scheduling and billing', 'Daily job lists for your crews']),
      s('Snow Removal', ['Online seasonal contract sign-ups', 'Storm-day text alerts to customers']),
      s('Cleaning Service', ['Recurring bookings with reminders', 'Staff scheduling and job checklists']),
      s('House Cleaning', ['Instant online price calculator', 'Recurring cleaning bookings']),
      s('Carpet Cleaning', ['Online price estimator by room', 'Rebooking reminders every 6–12 months']),
      s('Handyman', ['Job requests with photo upload', 'Automatic quotes and invoices']),
      s('Plumber', ['24/7 AI assistant to capture emergency calls', 'Automatic quotes and invoices']),
      s('Electrician', ['Job and permit tracking dashboard', 'Quote requests with photo upload']),
      s('HVAC Contractor', ['Furnace and AC tune-up reminders', 'Maintenance plan sign-ups and billing']),
      s('Roofing Contractor', ['Inspection requests with photo upload', 'Project gallery by neighbourhood']),
      s('Painter', ['Estimate requests with photos', 'Colour consultation booking']),
      s('Moving Company', ['Online moving quote calculator', 'Booking with deposit payments']),
      s('General Contractor', ['Client portal with project updates', 'Subcontractor scheduling']),
      s('Renovation Contractor', ['Project gallery and client portal with progress photos', 'Change-order approvals online']),
      s('Flooring Store', ['Product catalogue website', 'In-home measurement booking']),
      s('Pest Control', ['Recurring treatment reminders', 'Service reports emailed automatically']),
      s('Locksmith', ['24/7 AI call and chat answering', 'Mobile site with click-to-call']),
    ],
  },
  {
    name: 'Beauty & Personal Care',
    icon: Scissors,
    core: [
      'Online booking with deposits',
      'Appointment reminders to cut no-shows',
      'Review requests at the counter (QR code or NFC card)',
      'Automatic replies to Google reviews',
      'Website with service menu and photo gallery',
      'Rebooking and loyalty reminders',
    ],
    sectors: [
      s('Barber Shop', ['Walk-in queue and online waitlist']),
      s('Nail Salon', ['Service menu with prices online', 'Staff calendars per technician']),
      s('Beauty Salon', ['Staff calendars and service durations', 'Gift card sales online']),
      s('Spa', ['Packages and gift cards sold online', 'Intake forms before the visit']),
      s('Massage Therapist', ['Online intake and consent forms', 'Automatic insurance receipts']),
      s('Eyelash Extensions', ['Fill reminders every 2–3 weeks']),
      s('Tattoo Shop', ['Consultation requests with reference image upload', 'Deposits and digital waivers']),
    ],
  },
  {
    name: 'Pet Services',
    icon: PawPrint,
    core: [
      'Online booking and reminders',
      'Pet and owner profiles in a simple CRM',
      'Review requests after each visit',
      'Website with services and pricing',
    ],
    sectors: [
      s('Pet Groomer', ['Rebooking reminders every 6–8 weeks']),
      s('Dog Daycare', ['Vaccination record uploads', 'Daily photo updates to owners']),
      s('Dog Trainer', ['Class and package bookings', 'Online course portal for homework']),
    ],
  },
  {
    name: 'Automotive',
    icon: Car,
    core: [
      'Online booking',
      'Service reminders by text and email',
      'Review requests after every visit',
      'Website and local SEO',
      'AI chat for prices and opening hours',
    ],
    sectors: [
      s('Auto Repair', ['Digital estimates approved by text', 'Vehicle service history per customer']),
      s('Auto Detailing', ['Package builder with online booking']),
      s('Tire Shop', ['Seasonal tire swap booking', 'Tire storage tracking']),
      s('Car Wash', ['Monthly membership subscriptions', 'QR loyalty program']),
      s('Driving School', ['Lesson booking and payments', 'Student progress tracking']),
    ],
  },
  {
    name: 'Education, Fitness & Childcare',
    icon: GraduationCap,
    core: [
      'Class and lesson booking',
      'Online registration and payments',
      'Automatic reminders to students, members or parents',
      'Website and local SEO',
      'Review requests',
    ],
    sectors: [
      s('Tutoring', ['Session scheduling and progress reports for parents']),
      s('Music School', ['Lesson calendars per teacher', 'Recital sign-ups']),
      s('Dance Studio', ['Class schedule and recital tickets']),
      s('Martial Arts School', ['Belt progress tracking', 'Membership billing']),
      s('Yoga Studio', ['Class passes and drop-ins', 'Waitlists for full classes']),
      s('Fitness Studio', ['Memberships and class waitlists']),
      s('Personal Trainer', ['Client portal with workout plans', 'Session packages']),
      s('Daycare', ['Waitlist and enrolment forms', 'Daily updates to parents']),
    ],
  },
  {
    name: 'Food & Hospitality',
    icon: UtensilsCrossed,
    core: [
      'Website with your menu and local SEO',
      'Online ordering for pickup and delivery',
      'Review requests by QR code or NFC card on tables and receipts',
      'Automatic replies to Google reviews',
      'AI chat for menu, hours and allergy questions',
    ],
    sectors: [
      s('Restaurant', ['Table reservations', 'QR code menus']),
      s('Cafe', ['Mobile order-ahead', 'Digital loyalty program']),
      s('Bakery', ['Custom cake order forms with deposits', 'Holiday pre-orders']),
      s('Caterer', ['Event quote calculator and menu builder']),
      s('Grocery Store', ['Online ordering with delivery or curbside pickup', 'Inventory sync with your store system']),
      s('Butcher Shop', ['Holiday pre-orders', 'Weekly specials by email or text']),
    ],
  },
  {
    name: 'Retail & Local Services',
    icon: Store,
    core: [
      'Website and local SEO',
      'Review requests at checkout',
      '"Ready for pickup" text notifications',
      'Online booking or quote requests',
      'AI chat for common questions',
    ],
    sectors: [
      s('Tailor', ['Fitting appointment booking']),
      s('Dry Cleaner', ['Pickup and delivery scheduling']),
      s('Shoe Repair', ['Repair status tracking for customers']),
      s('Florist', ['Online shop with same-day delivery']),
      s('Printing Service', ['Online file upload and instant quotes']),
      s('Computer Repair', ['Repair ticket tracking']),
      s('Phone Repair', ['Instant repair price lookup and booking']),
    ],
  },
  {
    name: 'Events & Travel',
    icon: Camera,
    core: [
      'Portfolio website',
      'Enquiry forms and booking with deposits',
      'Contracts with e-signature',
      'Review requests after each event',
    ],
    sectors: [
      s('Photographer', ['Session booking', 'Private client galleries']),
      s('Event Planner', ['Client planning portal']),
      s('Party Rental', ['Inventory availability calendar and online rentals']),
      s('Travel Agency', ['Trip enquiry forms', 'Automated itinerary emails']),
    ],
  },
  {
    name: 'Finance, Tax & Insurance',
    icon: Calculator,
    core: [
      'Secure document upload portal',
      'Online appointment booking',
      'Automatic deadline reminders',
      'CRM and client follow-up',
      'Website, local SEO and review requests',
    ],
    sectors: [
      s('Tax Preparation', ['Tax-season intake forms and document checklists']),
      s('Bookkeeping Service', ['Automated monthly reports']),
      s('Insurance Agency', ['Renewal reminders', 'Online quote requests']),
      s('Mortgage Broker', ['Renewal and rate reminders', 'Application document checklist']),
      s('Accountant', ['Client portal']),
      s('CPA Firm', ['Engagement letters with e-signature']),
      s('Financial Advisor', ['Meeting scheduling and annual review reminders']),
    ],
  },
  {
    name: 'Legal & Immigration',
    icon: Scale,
    core: [
      'Consultation booking',
      'Secure intake forms and document upload',
      'AI assistant for common questions (no legal advice)',
      'Case and client tracking',
      'Website, local SEO and review requests',
    ],
    sectors: [
      s('Lawyer', ['Practice-area pages that rank in search']),
      s('Law Firm', ['Lawyer profiles and practice-area pages']),
      s('Personal Injury Lawyer', ['Free case evaluation form']),
      s('Family Lawyer', ['Confidential online intake']),
      s('Real Estate Lawyer', ['Closing checklists and document collection']),
      s('Immigration Lawyer', ['Multilingual website', 'Document checklists per application type']),
      s('Immigration Consultant', ['Document checklists per application type', 'Automatic status update emails']),
      s('Notary Public', ['Appointment booking with a document list']),
      s('Paralegal', ['Online intake and appointment booking']),
    ],
  },
  {
    name: 'Real Estate',
    icon: Building2,
    core: [
      'Website and local SEO',
      'Lead capture with automatic CRM follow-up',
      'Online booking',
      'Review requests',
      'AI assistant for buyer and seller questions',
    ],
    sectors: [
      s('Real Estate Agent', ['Listing pages', 'Automatic new-listing alerts']),
      s('Real Estate Agency', ['Agent directory and listing pages']),
      s('Property Management', ['Tenant maintenance request portal', 'Rent reminders']),
      s('Home Inspector', ['Inspection booking and report delivery']),
      s('Real Estate Appraiser', ['Appraisal order forms']),
    ],
  },
  {
    name: 'Health & Clinics',
    icon: Stethoscope,
    core: [
      'Online booking',
      'Appointment reminders',
      'Digital intake forms',
      'Workflow automation for recalls and follow-ups',
      'Review requests and website with local SEO',
      'AI assistant for common questions',
    ],
    sectors: [
      s('Dentist', ['6-month recall reminders']),
      s('Chiropractor', ['Treatment plan reminders']),
      s('Physiotherapist', ['Home exercise program portal']),
      s('Optometrist', ['Eye exam recalls', '"Glasses ready" text notifications']),
      s('Veterinarian', ['Vaccination reminders']),
      s('Medical Clinic', ['Virtual walk-in waitlist', 'Patient intake automation']),
    ],
  },
];

/** Services for a sector: its specific ones first, then the group's core list. */
export function servicesFor(group: SectorGroup, sector: Sector): string[] {
  return [...new Set([...sector.extras, ...group.core])];
}
