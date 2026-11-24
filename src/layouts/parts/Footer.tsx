import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: '/services', label: 'Services' },
    { href: '/sectors', label: 'Sectors' },
    { href: '/projects', label: 'Projects' },
    { href: '/book', label: 'Book a Call' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ];

  const serviceLinks = [
    { href: '/services/website-design', label: 'Website Design' },
    { href: '/services/custom-software', label: 'Custom Software' },
    { href: '/services/workflow-automation', label: 'Workflow Automation' },
    { href: '/services/ai-assistants', label: 'AI Assistants & Chatbots' },
    { href: '/services/booking-and-ordering', label: 'Online Booking' },
    { href: '/services/crm-and-follow-up', label: 'CRM & Follow-Up' },
    { href: '/services/automated-reviews', label: 'Review Automation' },
    { href: '/services/website-care-plans', label: 'Website Care Plans' },
    { href: '/services/seo', label: 'SEO' },
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
              <img src="/brand/logo-mark-180.png" alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
              <span className="font-heading font-black text-base tracking-widest text-white uppercase">
                Automation<span className="text-primary">God</span>
              </span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Websites, custom software, workflow automation, AI assistants, reviews and SEO for your business. Based in Waterloo, serving all of Ontario.
            </p>
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

        {/* Services */}
        <nav aria-label="Services" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs text-[hsl(var(--muted-foreground))] hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
          Serving Waterloo, Kitchener, Cambridge, Guelph, Toronto, Hamilton, London, Ottawa and all of Ontario ·{' '}
          <a href="mailto:mosses@automationgod.ca" className="hover:text-primary">mosses@automationgod.ca</a>
        </p>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            © {currentYear} Automation God — automationgod.ca
          </p>
        </div>
      </div>
    </footer>
  );
}
