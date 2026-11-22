import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Automation God home" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/brand/logo-mark-180.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-heading font-black text-base sm:text-lg tracking-widest text-white uppercase">
            Automation<span className="text-primary">God</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={[
                'text-sm font-medium tracking-wide transition-colors duration-200',
                location.pathname === item.href
                  ? 'text-primary'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/book"
            className="relative px-5 py-2 text-sm font-semibold tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_hsl(var(--cyan-glow)/0.5)]"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-3 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6 py-4 flex flex-col gap-1 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={[
                'text-base font-medium tracking-wide py-3 block',
                location.pathname === item.href ? 'text-primary' : 'text-[hsl(var(--muted-foreground))]',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 px-5 py-3 text-base font-semibold text-center text-[hsl(var(--background))] bg-primary rounded"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
