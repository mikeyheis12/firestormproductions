import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Camera, Palette, Sparkles } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Vion Production — Instant Production Estimates' },
      { name: 'description', content: 'Plan your production and get an instant estimate from Vion Production house.' },
      { property: 'og:title', content: 'Vion Production — Instant Production Estimates' },
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.12_75_/_6%)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(oklch(0.82 0.12 75 / 40%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.12 75 / 40%) 1px, transparent 1px)',
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
              <Play className="h-3 w-3" />
              Production Quote System
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
      </section>
    </div>
  );
}
