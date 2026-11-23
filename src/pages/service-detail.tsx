import { Link } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { services, home } from 'virtual:content';
import Seo, { SITE_URL } from '@/components/Seo';
import ServiceArea from '@/components/ServiceArea';
import { serviceSeo, serviceSeoBySlug } from '@/lib/service-seo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

function CyanDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />;
}

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const seo = serviceSeoBySlug[slug];
  const svc = services.services.find((s) => s.slug === slug);
  if (!seo || !svc) return null;

  const path = `/services/${slug}`;
  const related = serviceSeo.filter((s) => s.slug !== slug).slice(0, 4);
  const titleFor = (s: string) => services.services.find((x) => x.slug === s)?.title ?? s;

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        crumbs={[
          { name: 'Services', path: '/services' },
          { name: svc.title, path },
        ]}
        jsonLd={[
          {
            '@type': 'Service',
            '@id': `${SITE_URL}${path}#service`,
            name: svc.title,
            serviceType: svc.title,
            description: seo.answer,
            url: `${SITE_URL}${path}`,
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'AdministrativeArea', name: 'Ontario' },
            offers: {
              '@type': 'Offer',
              name: 'First 3 months free',
              price: '0',
              priceCurrency: 'CAD',
            },
          },
        ]}
      />

      <main className="bg-[hsl(var(--background))]">
        {/* Hero */}
        <section className="relative py-14 md:py-20 overflow-hidden">
          <div className="relative container mx-auto px-6 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono tracking-wider text-[hsl(var(--muted-foreground))]">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/services" className="hover:text-primary">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-primary">{svc.title}</span>
            </nav>
            <motion.div initial="hidden" animate="visible" className="flex flex-col gap-5">
              <motion.h1 variants={fadeUp} custom={0} className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] break-words">
                {seo.h1}
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] leading-relaxed">
                {seo.answer}
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/book" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110">
                  Book a Free Call
                </Link>
                <Link to="/services" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-white border border-[hsl(var(--border))] rounded transition-all duration-200 hover:border-primary hover:text-primary">
                  All Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <CyanDivider />

        {/* Details */}
        <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight mb-4">{svc.tagline}</h2>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">{svc.description}</p>
              <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
                <p className="text-xs font-mono tracking-widest text-primary/80 uppercase">What you get</p>
                <p className="text-white font-semibold mt-1">{svc.outcome}</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-black text-white tracking-tight mb-4">What we can build for you</h2>
              <ul className="flex flex-col gap-3">
                {svc.useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-3 text-[hsl(var(--foreground))]">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CyanDivider />

        {/* How it works */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-4xl font-black text-white tracking-tight mb-8">How It Works</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {home.tools.items.map((step) => (
                <li key={step.id} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <span className="text-xs font-mono tracking-widest text-primary uppercase">{step.tag}</span>
                  <h3 className="font-heading text-lg font-bold text-white mt-2 mb-2">{step.name}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[hsl(var(--muted-foreground))]">
              <span className="text-white font-semibold">All services are free for your first 3 months.</span> Refer another business and get an extra 6 months free.{' '}
              <Link to="/services" className="text-primary hover:underline underline-offset-4">See the offer and FAQ</Link>.
            </p>
          </div>
        </section>

        <CyanDivider />

        <ServiceArea />

        <CyanDivider />

        {/* Related */}
        <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight mb-6">Related Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-white font-semibold transition-colors hover:border-primary"
                >
                  {titleFor(r.slug)}
                  <ArrowRight className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
