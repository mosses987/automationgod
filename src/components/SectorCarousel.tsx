import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { allSectorPages } from '@/lib/sector-pages';
import { sectorGroups } from '@/lib/sectors';

const shortLabel: Record<string, string> = {
  'Home & Property Services': 'Home & Property',
  'Beauty & Personal Care': 'Beauty',
  'Pet Services': 'Pets',
  Automotive: 'Automotive',
  'Education, Fitness & Childcare': 'Education & Fitness',
  'Food & Hospitality': 'Food & Drink',
  'Retail & Local Services': 'Retail',
  'Events & Travel': 'Events & Travel',
  'Finance, Tax & Insurance': 'Finance',
  'Legal & Immigration': 'Legal',
  'Real Estate': 'Real Estate',
  'Health & Clinics': 'Health',
};

/** Swipeable row of industry photo cards with group filters. */
export default function SectorCarousel() {
  const [group, setGroup] = useState('All');
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const items = group === 'All' ? allSectorPages : allSectorPages.filter((p) => p.group === group);

  const update = () => {
    const el = listRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    listRef.current?.scrollTo({ left: 0 });
    update();
  }, [group]);

  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 bg-[hsl(var(--background))]" aria-labelledby="industries-heading">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="text-xs font-mono tracking-widest text-gold uppercase">Industries We Serve</span>
            </div>
            <h2 id="industries-heading" className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight">
              Built for Your Kind of Business
            </h2>
            <p className="mt-3 text-[hsl(var(--muted-foreground))] max-w-xl">
              {allSectorPages.length} industries and counting. Swipe to find yours and see exactly what we can build for you.
            </p>
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canLeft}
              aria-label="Scroll industries left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] text-white transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-[hsl(var(--border))] disabled:hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canRight}
              aria-label="Scroll industries right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--border))] text-white transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-[hsl(var(--border))] disabled:hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Group filters */}
        <div className="no-scrollbar -mx-6 px-6 mb-5 flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter industries">
          {['All', ...sectorGroups.map((g) => g.name)].map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={group === g}
              onClick={() => setGroup(g)}
              className={[
                'shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors',
                group === g
                  ? 'border-primary bg-primary text-[hsl(var(--background))] font-semibold'
                  : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-primary hover:text-white',
              ].join(' ')}
            >
              {g === 'All' ? 'All' : shortLabel[g] ?? g}
            </button>
          ))}
        </div>

        {/* Cards */}
        <ul
          ref={listRef}
          onScroll={update}
          className="no-scrollbar -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
        >
          {items.map((p) => (
            <li key={p.slug} className="snap-start shrink-0 w-[62%] sm:w-[40%] md:w-[30%] lg:w-[22%] xl:w-[18%]">
              <Link
                to={`/sectors/${p.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-[hsl(var(--border))] transition-all duration-200 hover:border-primary hover:shadow-[0_0_24px_hsl(var(--cyan-glow)/0.2)]"
              >
                <img
                  src={p.thumb}
                  alt={p.imageAlt}
                  width={480}
                  height={360}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[4/5] w-full object-cover bg-[hsl(var(--card))] transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-[10px] font-mono tracking-widest text-gold uppercase">{shortLabel[p.group ?? ''] ?? p.group}</span>
                  <span className="mt-1 block font-heading text-lg font-bold text-white leading-tight">{p.name}</span>
                  <span className="mt-1 flex items-center gap-1 text-xs text-primary">
                    See what we build <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="snap-start shrink-0 w-[62%] sm:w-[40%] md:w-[30%] lg:w-[22%] xl:w-[18%]">
            <Link
              to="/sectors"
              className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/50 bg-[hsl(var(--card))] p-6 text-center transition-colors hover:border-primary"
            >
              <span className="font-heading text-lg font-bold text-white">See all {allSectorPages.length} industries</span>
              <ArrowRight className="h-6 w-6 text-primary" aria-hidden="true" />
            </Link>
          </li>
        </ul>
        <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))] md:hidden">Swipe to see more →</p>
      </div>
    </section>
  );
}
