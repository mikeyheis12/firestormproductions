import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Flame, Film, Users, Award, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — Firestorm Production' },
      { name: 'description', content: 'Where drama meets dialogue, and stories speak fire. Meet the team behind Firestorm Production.' },
      { property: 'og:title', content: 'About Us — Firestorm Production' },
      { property: 'og:description', content: 'Where drama meets dialogue, and stories speak fire. Meet the team behind Firestorm Production.' },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Header />

      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.19_35_/_10%)_0%,transparent_60%)]" />

      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-gold-muted uppercase"
          >
            <Flame className="h-3 w-3" /> About Firestorm
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            We Build Worlds <span className="text-gradient-gold">Worth Watching.</span>
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-10 max-w-2xl border-l-2 border-primary px-6 py-3 text-left"
          >
            <p className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
              "Where drama meets dialogue, and stories speak fire."
            </p>
            <footer className="mt-3 text-xs tracking-widest text-gold-muted uppercase">— Firestorm Production</footer>
          </motion.blockquote>
        </div>
      </section>

      <section className="relative px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-8"
          >
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Our Story</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Firestorm Production was forged from a singular belief: that great storytelling is part craft, part chaos, and entirely cinematic. From ad films to music videos, short films to corporate spotlights — we approach every frame with the intensity of a final take.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-8"
          >
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Our Mission</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              To make production planning effortless and execution unforgettable. We pair an instant estimation engine with a craft-first creative team — so the budget conversation ends fast and the creative one can begin.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { icon: Film, title: '120+ Productions', desc: 'Delivered across formats and continents.' },
            { icon: Users, title: 'A Senior Crew', desc: 'Directors, DOPs, and editors with feature credits.' },
            { icon: Award, title: 'Award-winning Work', desc: 'Recognised at festivals and brand awards.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <f.icon className="mx-auto mb-3 h-7 w-7 text-primary" />
              <h3 className="mb-1 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Ready to light the <span className="text-gradient-gold">first frame?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Tell us your vision. We'll send back a transparent estimate in minutes.
          </p>
          <Link
            to="/quote"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-gold"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
