/**
 * Search-focused copy for each service page (/services/<slug>).
 * Body content (description, use cases, outcome) comes from
 * src/content/pages/services.json; this file adds the title, meta
 * description, H1 and a short "answer block" used by Google and AI search.
 */
export interface ServiceSeo {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
}

export const serviceSeo: ServiceSeo[] = [
  {
    slug: 'website-design',
    title: 'Website Design in Waterloo & Ontario | Automation God',
    description:
      'Fast, mobile-friendly websites for businesses in Waterloo and across Ontario, built to bring in enquiries. First 3 months free. Book a free call.',
    h1: 'Website Design & Development in Waterloo, Ontario',
    answer:
      'Automation God designs and builds fast, mobile-friendly websites for businesses in Waterloo and across Ontario. Every site includes contact or booking forms, on-page SEO basics and a layout built to turn visitors into enquiries. You get a clear scope and price before work starts, and your first 3 months are free.',
  },
  {
    slug: 'custom-software',
    title: 'Custom Software Development in Ontario | Automation God',
    description:
      'Custom software, web apps, dashboards and customer portals built around how your Ontario business works. Based in Waterloo. First 3 months free.',
    h1: 'Custom Software Development in Waterloo, Ontario',
    answer:
      "Automation God builds custom software for businesses in Waterloo and across Ontario: internal tools, dashboards, customer portals and integrations between the apps you already use. When off-the-shelf software doesn't fit your process, we build what does, with a clear scope and timeline agreed before any work begins.",
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation for Ontario Businesses | Automation God',
    description:
      'Automate follow-ups, data entry, quotes, invoices and reports. Workflow automation for businesses in Waterloo and across Ontario. 3 months free.',
    h1: 'Workflow Automation in Waterloo & Ontario',
    answer:
      'Automation God automates the repetitive work that slows Ontario businesses down: follow-ups, data entry, quotes, invoices, reports and handoffs between apps. We map how work moves through your business, then connect your tools so routine steps run on their own. Based in Waterloo, working remotely across Ontario.',
  },
  {
    slug: 'ai-assistants',
    title: 'AI Chatbots & Assistants in Ontario | Automation God',
    description:
      'AI chatbots and assistants trained on your business that answer questions, capture leads and book appointments 24/7. Waterloo, serving Ontario.',
    h1: 'AI Assistants & Chatbots for Businesses in Ontario',
    answer:
      'Automation God builds AI assistants and chatbots trained on your own business information. On your website they answer common questions, capture leads and book appointments at any hour. Inside your business they help your team find information and draft emails and documents. Based in Waterloo, serving businesses across Ontario.',
  },
  {
    slug: 'booking-and-ordering',
    title: 'Online Booking Systems in Ontario | Automation God',
    description:
      'Online booking, scheduling and ordering with payments and automatic reminders for businesses in Waterloo and across Ontario. 3 months free.',
    h1: 'Online Booking & Ordering Systems in Ontario',
    answer:
      'Automation God sets up online booking, scheduling and ordering systems for businesses in Waterloo and across Ontario. Customers book or order and pay online at any time, and automatic confirmations and reminders cut down on missed appointments. You spend less time on the phone and more time serving customers.',
  },
  {
    slug: 'crm-and-follow-up',
    title: 'CRM & Customer Follow-Up Automation | Automation God',
    description:
      'Keep every lead and customer in one place and automate follow-up texts and emails. CRM setup for businesses in Waterloo and across Ontario.',
    h1: 'CRM & Customer Follow-Up for Ontario Businesses',
    answer:
      'Automation God sets up simple customer management (CRM) systems for businesses in Waterloo and across Ontario. Every lead and customer lives in one place, and automatic follow-up texts and emails make sure no enquiry is forgotten and past customers are invited back.',
  },
  {
    slug: 'automated-reviews',
    title: 'Automated Google Review Collection | Automation God',
    description:
      'Automatically ask every happy customer for a Google review by text or email. Review automation for businesses in Waterloo and across Ontario.',
    h1: 'Automated Google Review Collection in Ontario',
    answer:
      'Automation God sets up automated review collection for businesses in Waterloo and across Ontario. After each job or sale, customers get a friendly, well-timed text or email asking for a Google review, and unhappy customers can send private feedback instead. Once set up, it runs on its own.',
  },
  {
    slug: 'website-care-plans',
    title: 'Website Care Plans: Hosting & Updates | Automation God',
    description:
      'Hosting, security updates, backups, monitoring and content changes for one monthly fee. Website care for businesses in Waterloo and Ontario.',
    h1: 'Website Care Plans in Waterloo, Ontario',
    answer:
      "Automation God's website care plans keep your site fast, secure and up to date for one monthly fee. We handle hosting, domain management, security updates, backups, uptime monitoring and content changes for businesses in Waterloo and across Ontario, so you never have to worry about a broken page.",
  },
  {
    slug: 'seo',
    title: 'SEO Services in Waterloo & Ontario | Automation God',
    description:
      'SEO for businesses in Waterloo and across Ontario: technical fixes, Google Business Profile setup, content and monthly reporting. 3 months free.',
    h1: 'SEO Services in Waterloo, Ontario',
    answer:
      'Automation God helps businesses in Waterloo and across Ontario show up when customers search. We fix technical SEO issues, improve page content, set up and optimize your Google Business Profile, and report progress every month, so more of the right people find you on Google and in AI search.',
  },
];

export const serviceSeoBySlug: Record<string, ServiceSeo> = Object.fromEntries(
  serviceSeo.map((s) => [s.slug, s]),
);

/** Cities named on the site and in structured data. */
export const ontarioCities = [
  'Waterloo',
  'Kitchener',
  'Cambridge',
  'Guelph',
  'Toronto & the GTA',
  'Hamilton',
  'London',
  'Ottawa',
];
