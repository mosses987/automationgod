import { useState, type FormEvent } from 'react';
import { sendForm } from '@/lib/send-form';
import Seo from '@/components/Seo';
import { motion } from 'motion/react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { book } from 'virtual:content';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const TEAM_SIZES = [
  '1–5 people',
  '6–20 people',
  '21–50 people',
  '51–200 people',
  '200+ people',
];

export default function BookPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const company = String(formData.get('company') ?? '').trim();
    const role = String(formData.get('role') ?? '').trim();
    const teamSize = String(formData.get('teamSize') ?? '');
    const goal = String(formData.get('goal') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      await sendForm({
        formName: 'book-discovery-call',
        title: 'Book a Discovery Call',
        name,
        email,
        message: goal || 'New discovery call request',
        fields: { Company: company, Role: role, 'Team size': teamSize },
      });
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Seo
        title="Book a Free Discovery Call | Automation God"
        description="Book a free 30-minute call with Automation God. Tell us what your business needs (a website, SEO, software or automation) and get a clear plan."
        path="/book"
        crumbs={[{ name: 'Book a Call', path: '/book' }]}
      />

      <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

        {/* ── Hero ── */}
        <section className="relative pt-12 md:pt-20 pb-10 md:pb-12 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[700px] h-[400px] rounded-full bg-primary/5 blur-[140px] mt-[-60px]" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-medium tracking-widest text-primary uppercase mb-4"
            >
              {book.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.08, ease: 'easeOut' as const } } }}
              className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            >
              {book.hero.headline}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.16, ease: 'easeOut' as const } } }}
              className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
            >
              {book.hero.subheadline}
            </motion.p>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <section className="py-8 px-6 border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {book.trust.map((t) => (
              <motion.div key={t.id} variants={fadeUp} className="text-center">
                <div className="font-heading text-xl md:text-2xl font-black text-primary mb-1">
                  {t.stat}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  {t.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Main content: two-column ── */}
        <section className="py-12 md:py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: What to expect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-2xl md:text-3xl font-black text-white mb-10"
              >
                {book.whatToExpect.heading}
              </motion.h2>
              <ul className="flex flex-col gap-8">
                {book.whatToExpect.items.map((item, idx) => (
                  <motion.li key={item.id} variants={fadeUp} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <span className="font-heading text-xs font-bold text-primary">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Time callout */}
              <motion.div
                variants={fadeUp}
                className="mt-12 flex items-center gap-3 px-5 py-4 rounded-xl border border-primary/20 bg-primary/5"
              >
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Calls are <span className="text-white font-semibold">30 minutes</span>. We respect your time — we'll end early if we've covered everything.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
                <h2 className="font-heading text-xl font-black text-white mb-1">
                  {book.form.heading}
                </h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
                  {book.form.subheading}
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center text-center gap-4 py-8"
                    role="status"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-black text-white">
                      {book.form.successHeading}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs leading-relaxed">
                      {book.form.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position: 'absolute', left: '-9999px' }}
                      aria-hidden="true"
                    />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="book-name" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Full name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="book-name"
                          name="name"
                          type="text"
                          required
                          placeholder={book.form.fields.namePlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="book-email" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Work email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="book-email"
                          name="email"
                          type="email"
                          required
                          placeholder={book.form.fields.emailPlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Company + Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="book-company" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Company
                        </label>
                        <input
                          id="book-company"
                          name="company"
                          type="text"
                          placeholder={book.form.fields.companyPlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="book-role" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Your role
                        </label>
                        <input
                          id="book-role"
                          name="role"
                          type="text"
                          placeholder={book.form.fields.rolePlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Team size */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="book-team-size" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                        {book.form.fields.teamSizeLabel}
                      </label>
                      <select
                        id="book-team-size"
                        name="teamSize"
                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select team size</option>
                        {TEAM_SIZES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Bottleneck / goal */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="book-goal" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                        {book.form.fields.goalLabel} <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="book-goal"
                        name="goal"
                        rows={4}
                        required
                        placeholder={book.form.fields.goalPlaceholder}
                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
                        {errorMsg || book.form.errorMessage}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 font-heading font-bold text-sm tracking-wide text-[hsl(var(--background))] bg-primary rounded-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_hsl(var(--cyan-glow)/0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-[hsl(var(--background))] border-t-transparent" />
                          {book.form.submittingText}
                        </>
                      ) : (
                        <>
                          {book.form.submitText}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}
