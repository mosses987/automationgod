import { Link, useLocation } from 'react-router';
import { Menu, X, Zap, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/use-cart';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/tools', label: 'Tools' },
    { href: '/results', label: 'Results' },
    // Results page is live at /results
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/airo-assets/images/logo/horizontal/dark"
            alt="Automation God"
            className="block h-auto max-h-10 w-auto max-w-[180px] object-contain self-center"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <span className="hidden items-center gap-2" style={{ display: 'none' }}>
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-heading font-black text-lg tracking-widest text-white uppercase">
              Automation<span className="text-primary">God</span>
            </span>
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
          <Link to="/cart" className="relative p-2 text-[hsl(var(--muted-foreground))] hover:text-white transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-[hsl(var(--background))] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/book"
            className="relative px-5 py-2 text-sm font-semibold tracking-wide text-[hsl(var(--background))] bg-primary rounded transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_hsl(var(--cyan-glow)/0.5)]"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={[
                'text-sm font-medium tracking-wide',
                location.pathname === item.href ? 'text-primary' : 'text-[hsl(var(--muted-foreground))]',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-5 py-2 text-sm font-semibold text-center text-[hsl(var(--background))] bg-primary rounded"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
