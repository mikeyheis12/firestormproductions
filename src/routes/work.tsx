import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Flame, Play, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export const Route = createFileRoute('/work')({
  head: () => ({
    meta: [
      { title: 'Our Work — Firestorm Production' },
      { name: 'description', content: 'Selected productions, events, and edits by Firestorm Production.' },
      { property: 'og:title', content: 'Our Work — Firestorm Production' },
      { property: 'og:description', content: 'Selected productions, events, and edits by Firestorm Production.' },
    ],
  }),
  component: WorkPage,
});

const PROJECTS = [
  { title: 'Ember Nights', category: 'Event Organisation', year: '2025', desc: 'A 2,000-guest immersive music festival — staging, logistics, and full social rollout.' },
  { title: 'Forge & Flame', category: 'Brand Film', year: '2025', desc: 'Cinematic launch film for a heritage jewellery house. Shot across three cities.' },
  { title: 'Static Bloom', category: 'Music Video', year: '2024', desc: 'Indie alt-rock visual narrative with practical pyro and a single oner finale.' },
  { title: 'Northwind', category: 'Corporate Documentary', year: '2024', desc: 'Founder-led story film for a clean-energy company. End-to-end production.' },
  { title: 'Rooftop Diaries', category: 'Social Series', year: '2024', desc: '12-episode short-form series built for vertical platforms.' },
  { title: 'The Last Reel', category: 'Short Film', year: '2023', desc: 'Festival-circuit short. Selected at three international festivals.' },
];

function WorkPage() {
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
            <Flame className="h-3 w-3" /> Selected Work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Frames that <span className="text-gradient-gold">left a mark.</span>
          </motion.h1>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card group overflow-hidden rounded-xl"
            >
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-secondary to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.19_35_/_15%)_0%,transparent_70%)]" />
                <Play className="relative h-10 w-10 text-primary opacity-70 transition-all group-hover:scale-110 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between text-xs tracking-widest text-gold-muted uppercase">
                  <span>{p.category}</span><span>{p.year}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
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
          <Link
            to="/quote"
            className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-gold"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
