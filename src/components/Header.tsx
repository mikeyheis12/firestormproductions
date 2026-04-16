import { Link, useLocation } from '@tanstack/react-router';
import { Flame, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isHome ? 'bg-transparent' : 'glass-card'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <Flame className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            FIRESTORM<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link to="/quote" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Get Quote</Link>
          <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Admin</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card border-t border-border md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-6">
              <Link to="/" onClick={() => setOpen(false)} className="text-sm text-foreground">Home</Link>
              <Link to="/quote" onClick={() => setOpen(false)} className="text-sm text-foreground">Get Quote</Link>
              <Link to="/admin" onClick={() => setOpen(false)} className="text-sm text-foreground">Admin</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
