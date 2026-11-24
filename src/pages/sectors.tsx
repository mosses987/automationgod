import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Search } from 'lucide-react';
import Seo, { SITE_URL } from '@/components/Seo';
import ServiceArea from '@/components/ServiceArea';
import { sectorGroups } from '@/lib/sectors';
import { allSectorPages, sectorPageByName } from '@/lib/sector-pages';

export default function SectorsPage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      sectorGroups
        .map((g) => ({
          ...g,
          sectors: q ? g.sectors.filter((sec) => `${sec.name} ${g.name}`.toLowerCase().includes(q)) : g.sectors,
        }))
        .filter((g) => g.sectors.length > 0),
    [q],
  );
  const total = allSectorPages.length;

  return (
    <>
      <Seo
        title="Websites & Automation by Industry in Ontario | Automation God"
        description="Websites, booking, review automation, AI assistants and workflow automation for restaurants, trades, salons, clinics, law firms and more across Ontario."
        path="/sectors"
        crumbs={[{ name: 'Sectors', path: '/sectors' }]}
        jsonLd={[
          {
            '@type': 'ItemList',
            '@id': `${SITE_URL}/sectors#sectors`,
            name: 'Industries we serve',
            itemListElement: allSectorPages.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              url: `${SITE_URL}/sectors/${p.slug}`,
            })),
          },
        ]}
      />

      <main className="bg-[hsl(var(--background))]">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <h1 className="text-xs font-mono tracking-widest text-gold uppercase">Solutions by Industry in Ontario</h1>
            </div>
            <p className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5">
              Built for Your Kind of Business.
            </p>
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
              From restaurants and trades to salons, clinics and law firms, we build the websites, booking systems, review
              tools, AI assistants and automations that fit how your business works. Pick your industry to see what we can
              do for you.
            </p>
            <label className="relative mt-8 block max-w-md">
              <span className="sr-only">Search industries</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${total} industries, e.g. restaurant, dentist`}
                className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-3 pl-11 pr-4 text-sm text-white placeholder:text-[hsl(var(--muted-foreground))] focus:border-primary focus:outline-none"
              />
            </label>
          </div>
        </section>

        {/* Groups */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col gap-10 md:gap-12">
            {groups.length === 0 && (
              <p className="text-[hsl(var(--muted-foreground))]">
                No industry matches "{query}". We work with all kinds of businesses,{' '}
                <Link to="/book" className="text-primary hover:underline">tell us about yours</Link>.
              </p>
            )}
            {groups.map((g) => {
              const GroupIcon = g.icon;
              return (
                <div key={g.name}>
                  <h2 className="flex items-center gap-2.5 font-heading text-xl md:text-2xl font-black text-white tracking-tight mb-4">
                    <GroupIcon className="h-5 w-5 text-gold" aria-hidden="true" />
                    {g.name}
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {g.sectors.map((sec) => {
                      const page = sectorPageByName[sec.name];
                      return (
                        <li key={sec.name}>
                          <Link
                            to={`/sectors/${page.slug}`}
                            className="group relative block overflow-hidden rounded-xl border border-[hsl(var(--border))] transition-all duration-200 hover:border-primary hover:shadow-[0_0_24px_hsl(var(--cyan-glow)/0.2)] focus-visible:border-primary focus-visible:outline-none"
                          >
                            <img
                              src={page.thumb}
                              alt={page.imageAlt}
                              width={480}
                              height={360}
                              loading="lazy"
                              className="aspect-[4/3] w-full object-cover bg-[hsl(var(--card))] transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" aria-hidden="true" />
                            <span className="absolute inset-x-0 bottom-0 p-3">
                              <span className="block font-heading text-sm md:text-base font-bold text-white leading-tight">{sec.name}</span>
                              <span className="mt-0.5 flex items-center gap-1 text-[11px] text-primary">
                                See what we can build <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Don't see your industry? We work with all kinds of businesses.{' '}
              <Link to="/book" className="text-primary hover:underline">Book a free call</Link> and tell us what you need.
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Photos via Unsplash.</p>
          </div>
        </section>

        <ServiceArea />
      </main>
    </>
  );
}
