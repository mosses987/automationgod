import { Link } from 'react-router';
import Seo from '@/components/Seo';

// Plain-language privacy policy. Review it (or have a professional review it)
// before relying on it; update it if you add new tools that collect data.
const UPDATED = 'November 23, 2026';

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | Automation God"
        description="How Automation God collects, uses and protects personal information submitted through automationgod.ca, in line with Canadian privacy law."
        path="/privacy"
        crumbs={[{ name: 'Privacy Policy', path: '/privacy' }]}
      />
      <main className="bg-[hsl(var(--background))] py-14 md:py-20">
        <article className="container mx-auto px-6 max-w-3xl text-[hsl(var(--muted-foreground))] leading-relaxed [&_h2]:font-heading [&_h2]:text-white [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-black [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1">
          <h1 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm font-mono">Last updated: {UPDATED}</p>

          <p>
            Automation God ("we", "us") is based in Waterloo, Ontario, Canada. This policy explains what personal
            information we collect through automationgod.ca, why we collect it and how we protect it, in line with
            Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong className="text-white">Contact and booking forms:</strong> your name, email address and anything
              you choose to tell us, such as your company, role, team size or project details.
            </li>
            <li>
              <strong className="text-white">Analytics cookies (only if you accept):</strong> information about how
              you use the website, such as pages visited. If you decline, these cookies are not set.
            </li>
            <li>
              <strong className="text-white">Basic technical data:</strong> our hosting provider may process your IP
              address and browser information to deliver the site securely.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your message or booking request.</li>
            <li>To prepare a plan or quote you asked for and to deliver services you agree to.</li>
            <li>To understand how the website is used so we can improve it (analytics, with your consent).</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>Service providers</h2>
          <p>
            We use trusted providers to run the website and handle messages, including Cloudflare (website hosting
            and security), Web3Forms (delivering form submissions to our email) and Microsoft 365 (email). These
            providers may store or process data outside Canada, including in the United States.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiries and client communications only as long as needed to respond, provide our services and
            meet legal or accounting requirements, then delete them.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold about you, or withdraw consent,
            by emailing{' '}
            <a href="mailto:mosses@automationgod.ca" className="text-primary hover:underline">
              mosses@automationgod.ca
            </a>
            . You can change your cookie choice at any time by clearing cookies for this site.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a href="mailto:mosses@automationgod.ca" className="text-primary hover:underline">
              mosses@automationgod.ca
            </a>{' '}
            or use our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </article>
      </main>
    </>
  );
}
