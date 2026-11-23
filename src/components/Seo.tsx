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
  description:
    'Web design, custom software, workflow automation, AI assistants, online booking, CRM, review automation and SEO for businesses in Waterloo, Ontario.',
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

interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/services". */
  path: string;
  /** Extra JSON-LD nodes for this page (merged into one @graph). */
  jsonLd?: Record<string, unknown>[];
}

export default function Seo({ title, description, path, jsonLd = [] }: SeoProps) {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
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
      },
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
      <meta property="og:image:alt" content="Automation God: Web Design, SEO, Custom Software & Automation in Waterloo, Ontario" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
    </Helmet>
  );
}
