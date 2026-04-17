import { Link, useLocation } from '@tanstack/react-router';
import { Flame, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/use-auth';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user, isAdmin, signOut } = useAuth();

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
          <Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Services</Link>
          <Link to="/work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Work</Link>
          <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
          <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
          <Link to="/quote" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Get Quote</Link>
          {isAdmin && (
            <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Admin</Link>
          )}
          {user ? (
            <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
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
              <Link to="/services" onClick={() => setOpen(false)} className="text-sm text-foreground">Services</Link>
              <Link to="/work" onClick={() => setOpen(false)} className="text-sm text-foreground">Work</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="text-sm text-foreground">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="text-sm text-foreground">Contact</Link>
              <Link to="/quote" onClick={() => setOpen(false)} className="text-sm text-foreground">Get Quote</Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-sm text-foreground">Admin</Link>
              )}
              {user ? (
                <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-1.5 text-left text-sm text-foreground">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm text-foreground">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
