import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Zap, Target, Database, MessageCircle, Map, CheckCircle2 } from 'lucide-react';
import { services } from 'virtual:content';

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="h-6 w-6 text-primary" />,
  target: <Target className="h-6 w-6 text-primary" />,
  database: <Database className="h-6 w-6 text-primary" />,
  'message-circle': <MessageCircle className="h-6 w-6 text-primary" />,
  map: <Map className="h-6 w-6 text-primary" />,
};

function CyanDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>{services.meta.title}</title>
        <meta name="description" content={services.meta.description} />
        <meta property="og:title" content={services.meta.title} />
        <meta property="og:description" content={services.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://automationgod.ca/services" />
        <meta property="og:image" content="https://automationgod.ca/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://automationgod.ca/og-image.svg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://automationgod.ca/services#webpage',
          name: services.meta.title,
          url: 'https://automationgod.ca/services',
          isPartOf: { '@id': 'https://automationgod.ca/#website' },
          about: { '@id': 'https://automationgod.ca/#organization' },
        }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative py-32 overflow-hidden bg-[hsl(var(--background))]">
          {/* Grid bg */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sgrid)" />
            </svg>
          </div>

          <div className="relative container mx-auto px-6 max-w-4xl">
            <motion.div initial="hidden" animate="visible" className="flex flex-col gap-6">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-xs font-mono tracking-widest text-primary uppercase">{services.hero.label}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
                {services.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl leading-relaxed">
                {services.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <CyanDivider />

        {/* ── SERVICES LIST ─────────────────────────────────────────────────── */}
        <section className="py-xxl bg-[hsl(var(--background))]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-6">
              {services.services.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' as const }}
                  className={[
                    'group relative rounded-xl border bg-[hsl(var(--card))] overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_hsl(var(--cyan-glow)/0.12)]',
                    i % 2 === 0 ? 'border-[hsl(var(--border))]' : 'border-[hsl(var(--border))]',
                  ].join(' ')}
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0">
                    {/* Left: overview */}
                    <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[hsl(var(--border))] flex flex-col gap-5">
                      <div className="w-12 h-12 rounded-lg border border-primary/30 flex items-center justify-center bg-primary/5">
                        {iconMap[svc.icon]}
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-black text-white tracking-tight mb-2">{svc.title}</h2>
                        <p className="text-sm text-primary font-mono tracking-wide mb-4">{svc.tagline}</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{svc.description}</p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-[hsl(var(--border))]">
                        <span className="text-xs font-mono tracking-widest text-primary/70 uppercase">Typical outcome</span>
                        <p className="text-white font-semibold text-sm mt-1">{svc.outcome}</p>
                      </div>
                    </div>

                    {/* Right: use cases */}
                    <div className="p-8 lg:p-10 flex flex-col gap-4">
                      <span className="text-xs font-mono tracking-widest text-[hsl(var(--muted-foreground))] uppercase mb-2">Common use cases</span>
                      <ul className="flex flex-col gap-3">
                        {svc.useCases.map((uc, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">{uc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <Link
                          to="/book"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-wide hover:underline underline-offset-4 transition-all"
                        >
                          Discuss this service →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CyanDivider />

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section className="py-xxl bg-[hsl(var(--secondary))]">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-14">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-xs font-mono tracking-widest text-primary uppercase">{services.pricing.label}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {services.pricing.headline}
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[hsl(var(--muted-foreground))] max-w-xl text-lg">
                {services.pricing.subheadline}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.pricing.tiers.map((tier, i) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
                  className={[
                    'relative flex flex-col rounded-xl border overflow-hidden transition-all duration-300',
                    tier.highlighted
                      ? 'border-primary bg-[hsl(var(--card))] shadow-[0_0_40px_hsl(var(--cyan-glow)/0.2)]'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]',
                  ].join(' ')}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                  {tier.highlighted && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-mono tracking-widest text-[hsl(var(--background))] bg-primary rounded px-2 py-1 uppercase font-bold">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col gap-6 flex-1">
                    <div>
                      <h3 className="font-heading text-xl font-black text-white tracking-tight mb-1">{tier.name}</h3>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono tracking-wide">{tier.tagline}</p>
                    </div>

                    <div className="flex items-end gap-2">
                      <span className={['font-heading text-4xl font-black tracking-tight', tier.highlighted ? 'text-primary' : 'text-white'].join(' ')}>
                        {tier.price}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono mb-1.5">/ {tier.period}</span>
                    </div>

                    <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{tier.description}</p>

                    <ul className="flex flex-col gap-2.5 flex-1">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-[hsl(var(--muted-foreground))]">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/book"
                      className={[
                        'mt-auto w-full py-3 text-sm font-semibold tracking-wide text-center rounded transition-all duration-200',
                        tier.highlighted
                          ? 'bg-primary text-[hsl(var(--background))] hover:brightness-110 hover:shadow-[0_0_20px_hsl(var(--cyan-glow)/0.4)]'
                          : 'border border-[hsl(var(--border))] text-white hover:border-primary hover:text-primary',
                      ].join(' ')}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CyanDivider />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-xxl bg-[hsl(var(--background))]">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="flex flex-col items-center gap-6"
            >
              <div className="h-px w-16 bg-primary" />
              <h2 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {services.cta.headline}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed max-w-xl">
                {services.cta.subheadline}
              </p>
              <Link
                to="/book"
                className="px-10 py-5 font-semibold text-base tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_hsl(var(--cyan-glow)/0.5)]"
              >
                {services.cta.ctaLabel}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
