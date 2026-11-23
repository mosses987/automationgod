import { Helmet } from '@dr.pogodin/react-helmet';

export const SITE_URL = 'https://automationgod.ca';
export const SITE_NAME = 'Automation God';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Shared organization data, referenced by @id from every page's JSON-LD. */
export const organizationJsonLd = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-mark.png`,
  image: OG_IMAGE,
  email: 'mosses@automationgod.ca',
  // ADD: telephone: '+1-XXX-XXX-XXXX' once you have a business number (must match Google Business Profile).
  description:
    'Website design, custom software, workflow automation, AI assistants, online booking, CRM, review automation and SEO for businesses in Waterloo and across Ontario.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Waterloo',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  areaServed: [
    { '@type': 'City', name: 'Waterloo' },
    { '@type': 'City', name: 'Kitchener' },
    { '@type': 'City', name: 'Cambridge' },
    { '@type': 'City', name: 'Guelph' },
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Hamilton' },
    { '@type': 'City', name: 'London' },
    { '@type': 'City', name: 'Ottawa' },
    { '@type': 'AdministrativeArea', name: 'Ontario' },
  ],
  knowsAbout: [
    'Website Design',
    'Custom Software Development',
    'Workflow Automation',
    'AI Assistants',
    'Chatbots',
    'Online Booking Systems',
    'CRM',
    'Review Automation',
    'Search Engine Optimization',
  ],
};

export interface Crumb {
  name: string;
  path: string;
}

interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/services". */
  path: string;
  /** Breadcrumb trail after Home, e.g. [{ name: 'Services', path: '/services' }]. */
  crumbs?: Crumb[];
  /** Extra JSON-LD nodes for this page (merged into one @graph). */
  jsonLd?: Record<string, unknown>[];
}

const abs = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

export default function Seo({ title, description, path, crumbs = [], jsonLd = [] }: SeoProps) {
  const url = abs(path);
  const breadcrumb =
    crumbs.length > 0
      ? [
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              item: abs(c.path),
            })),
          },
        ]
      : [];
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'en-CA',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'en-CA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        ...(breadcrumb.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      },
      ...breadcrumb,
      ...jsonLd,
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Automation God: web design, custom software and AI automation in Waterloo, Ontario" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
    </Helmet>
  );
}
