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

/** Visible FAQs on each service page (also sent as FAQPage structured data). */
export const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  "website-design": [
    {
      "q": "How long does it take to build a website?",
      "a": "It depends on the number of pages and features. After a free discovery call we agree on a clear scope and timeline in writing before any work begins, so you know exactly when your site will be ready."
    },
    {
      "q": "Will my website work on phones and show up on Google?",
      "a": "Yes. Every site is built mobile-first, loads quickly and includes on-page SEO basics such as titles, descriptions, structured data and a sitemap, so Google can understand and index it."
    },
    {
      "q": "Can I update the website myself later?",
      "a": "Yes. We can set up simple editing for text and photos, or handle changes for you through a website care plan if you would rather not touch it."
    }
  ],
  "custom-software": [
    {
      "q": "What kind of custom software do you build?",
      "a": "Internal tools, dashboards, customer portals, booking and scheduling systems, and integrations that connect the apps you already use. If a spreadsheet or manual process is slowing you down, it is usually a good candidate."
    },
    {
      "q": "Is custom software only for big companies?",
      "a": "No. Many small businesses get the most value, because a simple tool built around their process can save hours every week. We start small, prove the value, then grow it."
    },
    {
      "q": "How do you make sure it fits my business?",
      "a": "We start by mapping how your work actually flows, agree a clear scope, then build in stages and review it with you along the way, so the result matches how you work."
    }
  ],
  "workflow-automation": [
    {
      "q": "What tasks can be automated?",
      "a": "Common examples are follow-up emails and texts, data entry between apps, quote and invoice creation, appointment reminders, scheduled reports and routing new leads to the right person."
    },
    {
      "q": "Do I need to change the tools I already use?",
      "a": "Usually not. We connect the apps you already have, such as your email, calendar, spreadsheets, accounting or CRM, so work flows between them automatically."
    },
    {
      "q": "What if an automation breaks?",
      "a": "We set up alerts for failures and stay available after launch to fix and improve what we built, so problems are caught early."
    }
  ],
  "ai-assistants": [
    {
      "q": "What can an AI assistant do for my business?",
      "a": "It can answer common questions about your services, hours and pricing, capture contact details, book appointments and help your team find information or draft emails, all trained on your own business information."
    },
    {
      "q": "Will the chatbot give wrong answers?",
      "a": "We limit it to your approved information and set clear rules for what it should not answer, such as legal or medical advice, so it hands those questions to you instead of guessing."
    },
    {
      "q": "Can it work on my website and messaging apps?",
      "a": "Yes. The assistant can run on your website and can be connected to other channels where your customers already reach you."
    }
  ],
  "booking-and-ordering": [
    {
      "q": "Can customers pay or leave a deposit when they book?",
      "a": "Yes. Booking and ordering can take payments or deposits online, which helps reduce no-shows and last-minute cancellations."
    },
    {
      "q": "Will I get reminders and confirmations?",
      "a": "Customers get automatic confirmations and reminders by email or text, and you see every booking or order in one calendar or list."
    },
    {
      "q": "Does it work with my existing website?",
      "a": "Yes. We can add booking or ordering to your current website or build it into a new one."
    }
  ],
  "crm-and-follow-up": [
    {
      "q": "Do I need a CRM for a small business?",
      "a": "If enquiries live in your inbox, phone and notes, a simple CRM keeps every lead and customer in one place so nobody is forgotten. We keep it as simple as your business needs."
    },
    {
      "q": "What follow-ups can be automated?",
      "a": "Replies to new enquiries, reminders on open quotes, thank-you messages after a job, rebooking reminders and win-back messages for past customers."
    },
    {
      "q": "Can it connect to my email and website forms?",
      "a": "Yes. Website forms, email and booking tools can feed straight into your CRM so new leads appear automatically."
    }
  ],
  "automated-reviews": [
    {
      "q": "Is it allowed to ask customers for Google reviews?",
      "a": "Yes, asking every customer for an honest review is allowed. We do not offer incentives or stop unhappy customers from posting, which keeps you within Google's review rules."
    },
    {
      "q": "How do NFC and QR review stands work?",
      "a": "Customers tap their phone on a small NFC stand or scan a QR code at your counter, and it opens your Google review page directly. No searching or typing needed."
    },
    {
      "q": "Can replies to reviews be automated?",
      "a": "Yes. New reviews get a reply drafted in your tone that you can approve, or send automatically for simple positive reviews."
    }
  ],
  "website-care-plans": [
    {
      "q": "What is included in a website care plan?",
      "a": "Hosting and domain management, security updates, backups, uptime monitoring, content changes and direct support when something breaks, for one monthly fee."
    },
    {
      "q": "Can you look after a website you did not build?",
      "a": "Often yes. We review the site first and tell you honestly whether we can maintain it as it is or recommend improvements."
    },
    {
      "q": "What happens if my site goes down?",
      "a": "Uptime monitoring alerts us, and we work to restore the site and fix the cause as part of the plan."
    }
  ],
  "seo": [
    {
      "q": "How long does SEO take to show results?",
      "a": "Technical fixes and Google Business Profile improvements can help within weeks, while rankings for competitive searches usually build over several months. We report progress every month."
    },
    {
      "q": "Do you help with Google Business Profile and Google Maps?",
      "a": "Yes. We set up and optimize your Google Business Profile, which is often the biggest factor for appearing in local map results."
    },
    {
      "q": "Do you also help with AI search like ChatGPT?",
      "a": "Yes. Clear service pages, structured data and an llms.txt file make it easier for AI assistants to understand and recommend your business."
    }
  ]
};
