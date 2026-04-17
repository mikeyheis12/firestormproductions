import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Flame, Mail, Phone, MapPin, Camera, Linkedin as LinkedinIcon, Youtube as YoutubeIcon } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Firestorm Production' },
      { name: 'description', content: 'Get in touch with Firestorm Production. Where drama meets dialogue, and stories speak fire.' },
      { property: 'og:title', content: 'Contact — Firestorm Production' },
      { property: 'og:description', content: 'Get in touch with Firestorm Production.' },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.19_35_/_10%)_0%,transparent_60%)]" />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-gold-muted uppercase"
          >
            <Flame className="h-3 w-3" /> Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Let's make something <span className="text-gradient-gold">unforgettable.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Tell us about your project, your event, or your wildest creative idea. We reply within one business day.
          </motion.p>
        </div>
      </section>

      <section className="relative px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { icon: Mail, label: 'Email', value: 'hello@firestorm.production', href: 'mailto:hello@firestorm.production' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
            { icon: MapPin, label: 'Studio', value: 'Mumbai, India', href: '#' },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-7 text-center transition-all hover:border-primary/40"
            >
              <c.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
              <div className="text-xs tracking-widest text-gold-muted uppercase">{c.label}</div>
              <div className="mt-1 text-base font-medium text-foreground">{c.value}</div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto mt-12 flex max-w-md items-center justify-center gap-6"
        >
          {[Instagram, Linkedin, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:text-primary">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <p className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
            "Where drama meets dialogue, and stories speak fire."
          </p>
          <p className="mt-3 text-xs tracking-widest text-gold-muted uppercase">— Firestorm Production</p>
        </motion.div>
      </section>
    </div>
  );
}
