import Seo, { SITE_URL } from '@/components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { results } from 'virtual:content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

// Add new projects to this list. The grid adjusts automatically.
const projects = [
  {
    name: 'SRGC Developments Ltd',
    url: 'https://srgcdevelopments.ca/',
    host: 'srgcdevelopments.ca',
    category: 'Construction',
    image: '/project-images/hero.jpg',
    summary:
      'Website for an Ontario exterior finishing contractor, with a project gallery, service pages and a quote request form.',
  },
  {
    name: 'FreightFlow',
    url: '',
    host: '',
    category: 'Software',
    image: '/project-images/freightflow.png',
    summary:
      'Data management app for logistics companies: import Excel files, then search, filter, edit and export records.',
  },
];

export default function ResultsPage() {
  return (
    <>
      <Seo
        title="Projects: Websites & Software We've Built | Automation God"
        description="Websites and software built by Automation God in Waterloo, Ontario, including a contractor website for SRGC Developments and a logistics data app."
        path="/projects"
        crumbs={[{ name: 'Projects', path: '/projects' }]}
        jsonLd={[
          {
            '@type': 'ItemList',
            '@id': `${SITE_URL}/projects#projects`,
            name: 'Projects',
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'CreativeWork',
                name: p.name,
                description: p.summary,
                ...(p.url ? { url: p.url } : {}),
                image: `${SITE_URL}${p.image}`,
                creator: { '@id': `${SITE_URL}/#organization` },
              },
            })),
          },
        ]}
      />

      <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

        {/* ── Hero ── */}
        <section className="relative pt-12 md:pt-20 pb-10 md:pb-12 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] mt-[-80px]" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-medium tracking-widest text-gold uppercase mb-4"
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

        {/* ── Projects grid ── */}
        <section className="pb-12 md:pb-16 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p) => {
              const Card = p.url ? motion.a : motion.div;
              const linkProps = p.url
                ? { href: p.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Visit ${p.name} website` }
                : {};
              return (
              <Card
                key={p.name}
                variants={fadeUp}
                {...linkProps}
                className="group flex flex-col rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.15)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--secondary))]">
                  <img
                    src={p.image}
                    alt={`${p.name} website preview`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[hsl(var(--background))]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h2 className="font-heading text-lg font-bold text-white tracking-tight">{p.name}</h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{p.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{p.host || p.category}</span>
                    {p.url && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Visit site <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </Card>
              );
            })}
          </motion.div>
        </section>

        {/* ── Project details ── */}
        <section className="pb-12 md:pb-16 px-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 text-[hsl(var(--muted-foreground))] leading-relaxed">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-black text-white mb-2">SRGC Developments: contractor website</h2>
              <p>
                SRGC Developments is an Ontario exterior finishing contractor working on commercial and residential
                buildings, covering EIFS, stucco, coatings, masonry, siding, drywall, renovations, tiling and demolition.
                We designed and built their website with a page for each trade, a project gallery organized by city, a
                detailed quote request form and click-to-call buttons for visitors on their phones.
              </p>
              <p className="mt-2 text-sm">
                Services: <Link to="/services/website-design" className="text-primary hover:underline">Website Design &amp; Build</Link>
              </p>
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-black text-white mb-2">FreightFlow: logistics data app</h2>
              <p>
                FreightFlow is a data management app for logistics companies that outgrow spreadsheets. Teams import
                Excel and CSV files, map and validate the columns, then search, filter, edit and export records in one
                place, with an activity log of every change. New datasets and columns can be added without new code.
              </p>
              <p className="mt-2 text-sm">
                Services: <Link to="/services/custom-software" className="text-primary hover:underline">Custom Software</Link>
                {' · '}
                <Link to="/services/workflow-automation" className="text-primary hover:underline">Workflow Automation</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-12 md:py-16 px-6">
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
