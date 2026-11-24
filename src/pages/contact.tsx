import { useState, type FormEvent } from 'react';
import { sendForm } from '@/lib/send-form';
import Seo from '@/components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Mail, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { contact } from 'virtual:content';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '');
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      await sendForm({
        formName: 'contact',
        title: 'Contact Us',
        name,
        email,
        message: message || 'New contact form submission',
        fields: { Subject: subject },
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
        title="Contact Automation God | Waterloo, Ontario"
        description="Contact Automation God in Waterloo, Ontario about websites, SEO, custom software or automation. Email mosses@automationgod.ca. We reply within one business day."
        path="/contact"
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

        {/* ── Hero ── */}
        <section className="relative pt-12 md:pt-20 pb-10 md:pb-12 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="w-[600px] h-[360px] rounded-full bg-primary/5 blur-[120px] mt-[-60px]" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-medium tracking-widest text-gold uppercase mb-4"
            >
              {contact.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.08, ease: 'easeOut' as const } } }}
              className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            >
              {contact.hero.headline}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.16, ease: 'easeOut' as const } } }}
              className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed"
            >
              {contact.hero.subheadline}
            </motion.p>
          </div>
        </section>

        {/* ── Two-column: info + form ── */}
        <section className="py-12 md:py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left: contact info (2 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-2 flex flex-col gap-10"
            >
              <div>
                <motion.h2 variants={fadeUp} className="font-heading text-xl font-black text-white mb-6">
                  {contact.info.heading}
                </motion.h2>
                <motion.ul variants={stagger} className="flex flex-col gap-5">
                  <motion.li variants={fadeUp} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-0.5">Email</p>
                      <a
                        href={"mailto:" + contact.info.email}
                        className="text-white text-sm font-medium hover:text-primary transition-colors"
                      >
                        {contact.info.email}
                      </a>
                    </div>
                  </motion.li>
                  <motion.li variants={fadeUp} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-0.5">Location</p>
                      <p className="text-white text-sm font-medium">{contact.info.location}</p>
                    </div>
                  </motion.li>
                  <motion.li variants={fadeUp} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-0.5">Response time</p>
                      <p className="text-white text-sm font-medium">{contact.info.responseTime}</p>
                    </div>
                  </motion.li>
                </motion.ul>
              </div>

              {/* Quick links */}
              <div>
                <motion.p variants={fadeUp} className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-4">
                  Quick links
                </motion.p>
<motion.ul variants={stagger} className="flex flex-col gap-3">
                  <motion.li variants={fadeUp}>
                    <Link to="/book" className="group flex items-start gap-3 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                          {contact.info.links[0].label}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">
                          {contact.info.links[0].description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeUp}>
                    <Link to="/services" className="group flex items-start gap-3 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                          {contact.info.links[1].label}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">
                          {contact.info.links[1].description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeUp}>
                    <Link to="/projects" className="group flex items-start gap-3 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-primary/40 hover:bg-primary/5 transition-all duration-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                          {contact.info.links[2].label}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">
                          {contact.info.links[2].description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                    </Link>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>

            {/* Right: form (3 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
                <h2 className="font-heading text-xl font-black text-white mb-8">
                  {contact.form.heading}
                </h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center text-center gap-4 py-10"
                    role="status"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-black text-white">
                      {contact.form.successHeading}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs leading-relaxed">
                      {contact.form.successMessage}
                    </p>
                    <Link
                      to="/book"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Book a discovery call <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
                        <label htmlFor="contact-name" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Full name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          placeholder={contact.form.namePlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-email" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder={contact.form.emailPlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a subject</option>
                        {contact.form.subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-message" className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        placeholder={contact.form.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <p role="alert" className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
                        {errorMsg || contact.form.errorMessage}
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
                          {contact.form.submittingText}
                        </>
                      ) : (
                        <>
                          {contact.form.submitText}
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
