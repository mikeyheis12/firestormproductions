import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Flame, Calendar, Truck, Wallet, Share2, Scissors, Palette, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Services — Firestorm Production' },
      { name: 'description', content: 'Event organisation, logistics, financials, socials, edits, and creative design — Firestorm Productions brings the heat.' },
      { property: 'og:title', content: 'Services — Firestorm Production' },
      { property: 'og:description', content: 'From designing visuals to organising entire events, Firestorm Productions brings the heat.' },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Calendar, title: 'Event Organisation', desc: 'End-to-end event planning — from concept and venue scouting to run-of-show and on-the-day execution.' },
  { icon: Truck, title: 'Logistical Support', desc: 'Transport, gear, vendors, permits, crew flow. We handle the moving parts so the show stays still.' },
  { icon: Wallet, title: 'Financial Support', desc: 'Transparent budgeting, vendor negotiation, and spend tracking that keeps your production cost-honest.' },
  { icon: Share2, title: 'Socials Organisation', desc: 'Content calendars, reels, behind-the-scenes capture, and platform-native rollouts that build buzz.' },
  { icon: Scissors, title: 'High-Quality Edits', desc: 'Cinematic colour, sharp cuts, sound design — edits engineered for retention and emotion.' },
  { icon: Palette, title: 'Creative Designing', desc: 'Posters, key art, motion graphics, and brand systems that make your event impossible to scroll past.' },
];

function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.19_35_/_10%)_0%,transparent_60%)]" />

      <section className="relative px-6 pt-32 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-gold-muted uppercase"
          >
            <Flame className="h-3 w-3" /> What We Do
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Turning ideas into <span className="text-gradient-gold">unforgettable events.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            From designing visuals to organising entire events, Firestorm Productions brings the heat.
          </motion.p>
        </div>
      </section>

      <section className="relative px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card group relative rounded-xl p-7 transition-all hover:border-primary/40"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-gold/10 ring-1 ring-primary/30">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">⚡ {s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <p className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
            "If you can imagine it, we can produce it."
          </p>
          <p className="mt-3 text-xs tracking-widest text-gold-muted uppercase">— Firestorm Production</p>
        </motion.div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Have a vision? <span className="text-gradient-gold">Let's build it.</span>
          </h2>
          <Link
            to="/quote"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-gold"
          >
            Get an Instant Estimate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
