import { MapPin } from 'lucide-react';
import { ontarioCities } from '@/lib/service-seo';

/** "Serving Waterloo and all of Ontario" block, shared by several pages. */
export default function ServiceArea() {
  return (
    <section className="py-12 md:py-16 bg-[hsl(var(--background))]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-primary" />
          <span className="text-xs font-mono tracking-widest text-primary uppercase">Service Area</span>
          <div className="h-px w-10 bg-primary" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          Serving Waterloo and All of Ontario
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base md:text-lg leading-relaxed mb-8">
          Automation God is based in Waterloo, Ontario, and works with businesses anywhere in the province. Most of
          our work happens remotely, so location is never a barrier.
        </p>
        <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
          {[...ontarioCities, 'Anywhere in Ontario'].map((city) => (
            <li
              key={city}
              className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-sm text-[hsl(var(--foreground))]"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
