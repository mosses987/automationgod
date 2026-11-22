import { Link } from 'react-router';
import { Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: '/services', label: 'Services' },
    { href: '/tools', label: 'Tools' },
    { href: '/results', label: 'Results' },
    { href: '/book', label: 'Book a Call' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] mt-auto">
      {/* Cyan top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-heading font-black text-base tracking-widest text-white uppercase">
                Automation<span className="text-primary">God</span>
              </span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              AI & automation tools that eliminate waste, cut costs, and scale your business without hiring more people.
            </p>
            <span className="text-xs text-primary/60 tracking-widest uppercase font-mono">
              Powered by AI
            </span>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer links" className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-primary transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            © {currentYear} Automation God — automationgod.ca
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]/50 font-mono tracking-widest uppercase">
            System Online
          </p>
        </div>
      </div>
    </footer>
  );
}
