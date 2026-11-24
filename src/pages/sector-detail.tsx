import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Seo, { SITE_URL } from '@/components/Seo';
import ServiceArea from '@/components/ServiceArea';
import { features, sectorPageBySlug, allSectorPages } from '@/lib/sector-pages';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' as const } }),
};

export default function SectorDetailPage({ slug }: { slug: string }) {
  const page = sectorPageBySlug[slug];
  if (!page) return null;
  const path = `/sectors/${slug}`;
  const siblings = allSectorPages.filter((p) => p.group === page.group && p.slug !== slug);
  const others = (siblings.length >= 6 ? siblings : [...siblings, ...allSectorPages.filter((p) => p.group !== page.group)]).slice(0, 6);

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={path}
        crumbs={[
          { name: 'Sectors', path: '/sectors' },
          { name: page.name, path },
        ]}
        jsonLd={[
          {
            '@type': 'Service',
            '@id': `${SITE_URL}${path}#service`,
            name: `Websites and automation for ${page.name.toLowerCase()} businesses`,
            description: page.intro,
            url: `${SITE_URL}${path}`,
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'AdministrativeArea', name: 'Ontario' },
          },
          ...(page.faqs?.length
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${SITE_URL}${path}#faq`,
                  mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
                },
              ]
            : []),
        ]}
      />

      <main className="bg-[hsl(var(--background))]">
        {/* Hero with photo */}
        <section className="relative overflow-hidden">
          <img
            src={page.image}
            alt={page.imageAlt}
            width={1400}
            height={875}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/75 to-[hsl(var(--background))]/40" />
          <div className="relative container mx-auto px-6 max-w-4xl pt-24 pb-12 md:pt-40 md:pb-16">
            <nav aria-label="Breadcrumb" className="mb-5 text-xs font-mono tracking-wider text-[hsl(var(--muted-foreground))]">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/sectors" className="hover:text-primary">Sectors</Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{page.name}</span>
            </nav>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] break-words">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[hsl(var(--foreground))]/90 leading-relaxed max-w-2xl">{page.intro}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/book" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all hover:brightness-110">
                Book a Free Call
              </Link>
              <Link to="/sectors" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-white border border-white/30 rounded transition-all hover:border-primary hover:text-primary">
                All Sectors
              </Link>
            </div>
          </div>
        </section>

        {/* Feature cards with photos */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gold" />
              <h2 className="text-xs font-mono tracking-widest text-gold uppercase">What we can build for you</h2>
            </div>
            <p className="font-heading text-2xl md:text-4xl font-black text-white tracking-tight mb-8 md:mb-10">
              Everything a {page.name.toLowerCase()} business needs online
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.items.map((item, i) => {
                const f = features[item.id];
                return (
                  <motion.li
                    key={item.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={fadeUp}
                    className="flex flex-col overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                  >
                    <img
                      src={f.image}
                      alt={f.alt}
                      width={900}
                      height={600}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h3 className="font-heading text-lg font-bold text-white tracking-tight">{f.title}</h3>
                      <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{item.text ?? f.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            {page.extras && page.extras.length > 0 && (
              <div className="mt-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <h3 className="font-heading text-lg font-bold text-white tracking-tight mb-3">Also built for {page.name.toLowerCase()} businesses</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {page.extras.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-[hsl(var(--foreground))]">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-8 text-[hsl(var(--muted-foreground))]">
              <span className="font-semibold text-white">All services are free for your first 3 months.</span> Refer another business and get an extra 6 months free.{' '}
              <Link to="/services" className="text-primary hover:underline underline-offset-4">See the offer and all services</Link>.
            </p>
          </div>
        </section>

        {page.faqs && page.faqs.length > 0 && (
          <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
            <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="font-heading text-2xl md:text-4xl font-black text-white tracking-tight mb-6">
                {page.name}: Common Questions
              </h2>
              <div className="flex flex-col gap-3">
                {page.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] open:border-primary/50">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base">{f.q}</h3>
                      <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <ServiceArea />

        {/* Other sectors */}
        <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight mb-6">Related Industries</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/sectors/${o.slug}`}
                    className="group relative block overflow-hidden rounded-xl border border-[hsl(var(--border))] hover:border-primary transition-colors"
                  >
                    <img src={o.thumb} alt="" width={480} height={360} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8 text-sm font-semibold text-white">
                      {o.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-1 text-sm">
              <Link to="/sectors" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
                See all industries <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
