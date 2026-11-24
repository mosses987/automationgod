import { Link } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import { trustSectors } from '@/lib/service-images';

/** "Built for Real Businesses" photo strip and trust points, shared by Home and Services. */
export default function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-[hsl(var(--secondary))]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-xs font-mono tracking-widest text-gold uppercase">Why Automation God</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
            Built for Real Businesses
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
            Restaurants, trades, salons, clinics, law firms and shops across Ontario. We build the tools that fit how
            your kind of business actually works.
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-10">
          {trustSectors.map((t) => (
            <li key={t.slug}>
              <Link
                to={`/sectors/${t.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-[hsl(var(--border))] transition-colors hover:border-primary"
              >
                <img
                  src={`/sector-images/thumb/${t.slug}.jpg`}
                  alt={`${t.name} we build for`}
                  width={480}
                  height={360}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8 text-sm font-semibold text-white">
                  {t.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ['All services free for 3 months', 'Try us with no cost for your first three months.'],
            ['No contracts, no strings', 'Cancel anytime. Continue only if it works for you.'],
            ['Clear scope and price first', "We agree exactly what's included before any work begins."],
            ['Based in Waterloo, Ontario', 'Working with businesses across the province, in person or remotely.'],
          ].map(([title, text]) => (
            <li key={title} className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm">
          <Link to="/sectors" className="text-primary hover:underline underline-offset-4">See all 85 industries we serve →</Link>
        </p>
      </div>
    </section>
  );
}
