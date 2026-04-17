import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Camera, Palette, Sparkles } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Firestorm Production — Instant Production Estimates' },
      { name: 'description', content: 'Plan your production and get an instant estimate from Firestorm Production.' },
      { property: 'og:title', content: 'Firestorm Production — Instant Production Estimates' },
      { property: 'og:description', content: 'Plan your production and get an instant estimate.' },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />

      {/* Video BG overlay */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.19_35_/_8%)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(oklch(0.72 0.19 35 / 30%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.19 35 / 30%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-gold-muted uppercase">
              <Flame className="h-3 w-3" />
              Firestorm Production
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Plan Your Production.{' '}
            <span className="text-gradient-gold">Get an Instant Estimate.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            From concept to screen — tell us your vision and receive a transparent budget range in minutes, not days.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 font-serif text-base italic text-gold-muted sm:text-lg"
          >
            "Where drama meets dialogue, and stories speak fire."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-gold"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { icon: Camera, title: 'Tell Us Your Vision', desc: 'Choose your project type, crew, equipment, and timeline.' },
            { icon: Sparkles, title: 'Instant Smart Estimate', desc: 'Our engine calculates a transparent budget range in seconds.' },
            { icon: Palette, title: 'Detailed Breakdown', desc: 'See exactly what\'s included and request a final quote.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-xl p-8"
            >
              <f.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* What We Do */}
        <div className="mx-auto mt-32 max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-gold-muted uppercase">
              <Flame className="h-3 w-3" /> What We Do
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Turning ideas into <span className="text-gradient-gold">unforgettable events.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              From designing visuals to organising entire events, Firestorm Productions brings the heat.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Event Organisation',
              'Logistical Support',
              'Financial Support',
              'Socials Organisation',
              'High-Quality Edits',
              'Creative Designing',
            ].map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card flex items-center gap-3 rounded-lg px-5 py-4"
              >
                <span className="text-lg">⚡</span>
                <span className="text-sm font-medium text-foreground">{s}</span>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center font-serif text-xl italic text-gold-muted sm:text-2xl">
            "If you can imagine it, we can produce it."
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-24 max-w-3xl text-center"
        >
          <p className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
            "Where drama meets dialogue, and stories speak fire."
          </p>
          <p className="mt-4 text-xs tracking-widest text-gold-muted uppercase">— Firestorm Production</p>
        </motion.div>
      </section>
    </div>
  );
}
