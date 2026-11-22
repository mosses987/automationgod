import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { results } from 'virtual:content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

export default function ResultsPage() {
  return (
    <>
      <Helmet>
        <title>Client Results &amp; Case Studies — Real ROI from AI Automation | Automation God</title>
        <meta name="description" content="Real ROI from real Canadian clients. See how Automation God saved businesses thousands of hours and millions in labour costs through AI-powered automation systems." />
        <meta property="og:title" content="Client Results &amp; Case Studies — Automation God" />
        <meta property="og:description" content="Real ROI from real clients. Thousands of hours saved, millions in labour costs eliminated. See the case studies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://automationgod.ca/results" />
        <meta property="og:image" content="https://automationgod.ca/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://automationgod.ca/og-image.svg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://automationgod.ca/results#webpage',
          name: 'Client Results & Case Studies — Automation God',
          url: 'https://automationgod.ca/results',
          description: 'Real ROI from real Canadian clients. Case studies showing how AI automation systems save thousands of hours and millions in labour costs.',
          isPartOf: { '@id': 'https://automationgod.ca/#website' },
          about: { '@id': 'https://automationgod.ca/#organization' },
        }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

        {/* ── Hero ── */}
        <section className="relative pt-24 pb-16 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] mt-[-80px]" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-medium tracking-widest text-primary uppercase mb-4"
            >
              {results.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.08, ease: 'easeOut' as const } } }}
              className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            >
              {results.hero.headline}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.16, ease: 'easeOut' as const } } }}
              className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
            >
              {results.hero.subheadline}
            </motion.p>
          </div>
        </section>

        {/* ── Aggregate Stats ── */}
        <section className="py-16 px-6 border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {results.stats.map((stat) => (
              <motion.div key={stat.id} variants={fadeUp} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Case Studies ── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="font-heading text-3xl md:text-4xl font-black text-white mb-16 text-center"
            >
              Case studies
            </motion.h2>

            <div className="flex flex-col gap-16">
              {results.caseStudies.map((cs, idx) => (
                <motion.article
                  key={cs.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={stagger}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-6 border-b border-[hsl(var(--border))]">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold tracking-widest text-primary uppercase px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
                        {cs.industry}
                      </span>
                      <motion.h3 variants={fadeUp} className="text-lg font-semibold text-white">
                        {cs.company}
                      </motion.h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>{cs.timeframe}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
                    <div className="px-8 py-8 flex flex-col gap-6">
                      <div>
                        <p className="text-xs font-semibold tracking-widest text-[hsl(var(--muted-foreground))] uppercase mb-2">
                          The challenge
                        </p>
                        <motion.p variants={fadeUp} className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                          {cs.challenge}
                        </motion.p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-widest text-[hsl(var(--muted-foreground))] uppercase mb-2">
                          The solution
                        </p>
                        <motion.p variants={fadeUp} className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                          {cs.solution}
                        </motion.p>
                      </div>
                    </div>

                    <div className="px-8 py-8">
                      <p className="text-xs font-semibold tracking-widest text-[hsl(var(--muted-foreground))] uppercase mb-6">
                        The results
                      </p>
                      <motion.ul variants={stagger} className="flex flex-col gap-5">
                        {cs.results.map((r) => (
                          <motion.li key={r.id} variants={fadeUp} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-heading font-bold text-white text-lg leading-tight block">
                                {r.metric}
                              </span>
                              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                {r.description}
                              </span>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>

                  <div className="px-8 py-4 border-t border-[hsl(var(--border))] flex justify-end">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      Case {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 px-6 bg-[hsl(var(--secondary))] border-y border-[hsl(var(--border))]">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="font-heading text-2xl md:text-3xl font-black text-white mb-12 text-center"
            >
              In their own words
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {results.testimonials.map((t) => (
                <motion.blockquote
                  key={t.id}
                  variants={fadeUp}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 flex flex-col gap-6"
                >
                  <span className="text-5xl font-heading text-primary/30 leading-none select-none">&ldquo;</span>
                  <p className="text-[hsl(var(--foreground))] leading-relaxed -mt-4">
                    {t.quote}
                  </p>
                  <footer className="mt-auto pt-4 border-t border-[hsl(var(--border))]">
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.company}</p>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-5xl font-black text-white mb-4"
            >
              {results.cta.headline}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[hsl(var(--muted-foreground))] text-lg mb-10 leading-relaxed"
            >
              {results.cta.subheadline}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-8 py-4 font-heading font-bold text-sm tracking-wide text-[hsl(var(--background))] bg-primary rounded-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_hsl(var(--cyan-glow)/0.45)]"
              >
                {results.cta.buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </main>
    </>
  );
}
