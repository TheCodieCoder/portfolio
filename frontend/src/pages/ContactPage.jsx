import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { profile } from '../data/portfolioData';
import { submitContact } from '../utils/api';
import { validateContactForm } from '../services/validation';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      toast.error('Please fix the form errors.');
      return;
    }

    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: 'Email', href: `mailto:${profile.email}`, value: profile.email },
    { label: 'LinkedIn', href: profile.linkedin, value: 'LinkedIn Profile' },
    { label: 'GitHub', href: profile.github, value: 'GitHub Profile' },
  ];

  return (
    <section className="min-h-screen section-padding pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</span>
          <h1 className="heading-display mt-3">Let&apos;s Connect</h1>
          <p className="mt-4 text-ink-muted text-lg max-w-xl mx-auto">
            Have a question or opportunity? Send a message — I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <aside className="lg:col-span-2 space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="block glass-panel rounded-2xl p-5 hover:shadow-glow transition-shadow"
                data-cursor="hover"
              >
                <p className="text-xs uppercase tracking-wider text-accent font-semibold">{link.label}</p>
                <p className="mt-1 text-ink font-medium">{link.value}</p>
              </a>
            ))}
            <div className="glass-panel rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold">Phone</p>
              <p className="mt-1 text-ink font-medium">{profile.phone}</p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-panel rounded-3xl p-6 md:p-8 space-y-5"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-glass-border text-ink focus:ring-2 focus:ring-accent outline-none"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-glass-border text-ink focus:ring-2 focus:ring-accent outline-none"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-glass-border text-ink focus:ring-2 focus:ring-accent outline-none"
              />
              {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-glass-border text-ink focus:ring-2 focus:ring-accent outline-none resize-none"
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading} data-cursor="hover">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactPage;
