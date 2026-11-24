import Seo from '@/components/Seo';
import { Link } from 'react-router';
import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { home } from 'virtual:content';
import ServiceArea from '@/components/ServiceArea';
import SectorCarousel from '@/components/SectorCarousel';
import TrustSection from '@/components/TrustSection';
import { serviceImages } from '@/lib/service-images';

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const raw = target.replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    if (isNaN(num)) { setDisplay(target); return; }
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = target.match(/[^0-9.]*$/)?.[0] ?? '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      const formatted = num >= 100
        ? Math.round(current).toLocaleString()
        : current >= 10
          ? current.toFixed(1).replace(/\.0$/, '')
          : current.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return display;
}

// ── Grid background ───────────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))]" />
    </div>
  );
}

function CyanDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />;
}

// ── Hero stat with counter (self-contained, no content props) ─────────────────
function HeroStatItem({ idx }: { idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const stat = home.hero.stats[idx];
  const display = useCounter(stat.value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1, ease: 'easeOut' as const }}
      className="flex flex-col items-center gap-1"
    >
      <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-gold tracking-tight text-center">
        {display}
      </span>
      <span className="text-[10px] sm:text-xs text-center text-[hsl(var(--muted-foreground))] tracking-wider sm:tracking-widest uppercase font-mono">
        {stat.label}
      </span>
    </motion.div>
  );
}

const serviceHref: Record<string, string> = {
  'svc-1': '/services/custom-software',
  'svc-2': '/services/website-design',
  'svc-9': '/services/workflow-automation',
  'svc-10': '/services/ai-assistants',
  'svc-6': '/services/booking-and-ordering',
  'svc-7': '/services/crm-and-follow-up',
  'svc-4': '/services/automated-reviews',
  'svc-3': '/services/seo',
};

function ServicePhoto({ id, className }: { id: string; className: string }) {
  const slug = (serviceHref[id] ?? '').split('/').pop() ?? '';
  const img = serviceImages[slug];
  if (!img) return null;
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={img.src}
        alt={img.alt}
        width={900}
        height={600}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  return (
    <>
      <Seo
        title="Web, Software & AI Automation in Waterloo | Automation God"
        description="Websites, custom software, workflow automation and AI assistants for businesses in Waterloo and across Ontario. All services free for 3 months."
        path="/"
      />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col justify-start overflow-hidden">
          <GridBackground />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/60 via-transparent to-[hsl(var(--background))]" />
          </div>

          <div className="relative container mx-auto px-6 pt-12 md:pt-16 pb-14 md:pb-20">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' as const }} className="flex items-center gap-3 mb-8">
                <div className="h-px w-10 bg-gold" />
                <h1 className="text-xs font-mono tracking-widest text-gold uppercase">Web Design, Custom Software &amp; AI Automation in Waterloo, Ontario</h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }} className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl break-words font-black leading-[0.95] tracking-tight text-white mb-4">
                {home.hero.headline}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }} className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl break-words font-black leading-[0.95] tracking-tight text-primary mb-8">
                {home.hero.headlineAccent}
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' as const }} className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl leading-relaxed mb-10">
                {home.hero.subheadline}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' as const }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 md:mb-20">
                <Link to="/book" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.4)]">
                  {home.hero.ctaPrimary}
                </Link>
                <Link to="/services" className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-sm tracking-wide text-white border border-[hsl(var(--border))] rounded transition-all duration-200 hover:border-primary hover:text-primary">
                  {home.hero.ctaSecondary}
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-[hsl(var(--border))]">
                <HeroStatItem idx={0} />
                <HeroStatItem idx={1} />
                <HeroStatItem idx={2} />
                <HeroStatItem idx={3} />
              </motion.div>
            </div>
          </div>
        </section>

        <CyanDivider />

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8 md:mb-12">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="text-xs font-mono tracking-widest text-gold uppercase">{home.services.label}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {home.services.headline}
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[hsl(var(--muted-foreground))] max-w-xl text-lg">
                {home.services.subheadline}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {home.services.items.filter(s => s.size === 'large').map((svc, i) => (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="md:col-span-2 group relative p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.15)]">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ServicePhoto id={svc.id} className="-mx-8 -mt-8 mb-6 h-48 md:h-56" />
                  <h3 className="font-heading text-2xl font-bold text-white mb-3 tracking-tight"><Link to={serviceHref[svc.id] ?? "/services"} className="after:absolute after:inset-0">{svc.title}</Link></h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed">{svc.outcome}</p>
                </motion.div>
              ))}

              {home.services.items.filter(s => s.size === 'small').map((svc, i) => (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: 'easeOut' as const }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.15)]">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ServicePhoto id={svc.id} className="-mx-6 -mt-6 mb-4 h-36" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2 tracking-tight"><Link to={serviceHref[svc.id] ?? "/services"} className="after:absolute after:inset-0">{svc.title}</Link></h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{svc.outcome}</p>
                </motion.div>
              ))}

              {home.services.items.filter(s => s.size === 'medium').map((svc, i) => (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: 'easeOut' as const }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative p-7 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.15)]">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-9 h-9 rounded border border-primary/30 flex items-center justify-center mb-5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2 tracking-tight"><Link to={serviceHref[svc.id] ?? "/services"} className="after:absolute after:inset-0">{svc.title}</Link></h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{svc.outcome}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CyanDivider />

        <SectorCarousel />

        <CyanDivider />

        <TrustSection />

        <CyanDivider />

        {/* ── TOOLS ────────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8 md:mb-12">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="text-xs font-mono tracking-widest text-gold uppercase">{home.tools.label}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight">
                {home.tools.headline}
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {home.tools.items.map((tool, i) => (
                <motion.div key={tool.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--cyan-glow)/0.15)]">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold text-white tracking-tight">{tool.name}</h3>
                    <span className="text-xs font-mono tracking-widest text-primary border border-primary/30 rounded px-2 py-1 uppercase">{tool.tag}</span>
                  </div>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed ">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CyanDivider />

        <ServiceArea />

        <CyanDivider />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' as const }} className="max-w-xl">
                <div className="h-px w-16 bg-primary mb-6" />
                <h2 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  {home.cta.headline}
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
                  {home.cta.subheadline}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' as const }} className="flex flex-col items-start lg:items-end gap-4 shrink-0">
                <Link to="/book" className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 sm:py-5 font-semibold text-base tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_hsl(var(--cyan-glow)/0.5)] sm:whitespace-nowrap">
                  {home.cta.ctaLabel}
                </Link>
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono tracking-wide">
                  {home.cta.note}
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
