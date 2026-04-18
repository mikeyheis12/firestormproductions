import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, FileText, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { supabase } from '@/integrations/supabase/client';
import type { QuoteFormData, Estimate } from '../lib/estimate-engine';
import { formatINR } from '../lib/estimate-engine';

export const Route = createFileRoute('/results')({
  validateSearch: (search: Record<string, unknown>): { id: string } => ({
    id: (search.id as string) || '',
  }),
  head: () => ({
    meta: [
      { title: 'Your Estimate — Firestorm Production' },
      { name: 'description', content: 'View your personalized production estimate from Firestorm.' },
    ],
  }),
  component: ResultsPage,
});

interface Lead {
  id: string;
  formData: QuoteFormData;
  estimate: Estimate;
}

function ResultsPage() {
  const { id } = Route.useSearch();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Public read isn't allowed, so we fetch via the form data we just submitted.
    // Since RLS blocks SELECT for non-admins, we rely on sessionStorage as a one-shot cache.
    const cached = sessionStorage.getItem(`quote_${id}`);
    if (cached) {
      try {
        setLead(JSON.parse(cached));
      } catch { /* ignore */ }
      setLoading(false);
      return;
    }
    // Try to fetch (works only if admin)
    supabase
      .from('quote_leads')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const row = data as { id: string; form_data: QuoteFormData; estimate: Estimate };
          setLead({ id: row.id, formData: row.form_data, estimate: row.estimate });
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Header />
        <p className="text-muted-foreground">Loading your estimate...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Header />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Quote not found</h1>
          <Link to="/quote" className="mt-4 inline-block text-primary underline">Start a new quote</Link>
        </div>
      </div>
    );
  }

  const { estimate, formData } = lead;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <Link to="/quote" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> New Quote
        </Link>

        {/* Estimate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card glow-gold mb-8 rounded-2xl p-8 text-center"
        >
          <p className="mb-2 text-xs font-medium tracking-widest text-gold-muted uppercase">Estimated Budget Range</p>
          <h1 className="text-4xl font-bold text-gradient-gold sm:text-5xl">
            {formatINR(estimate.minBudget)} – {formatINR(estimate.maxBudget)}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Timeline: <span className="font-medium text-foreground">{estimate.minWeeks}–{estimate.maxWeeks} weeks</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formData.projectType} • {formData.duration} • {formData.crewSize} crew
          </p>
        </motion.div>

        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card mb-8 rounded-2xl p-8"
        >
          <h2 className="mb-5 text-lg font-semibold text-foreground">What's Included</h2>
          <div className="space-y-3">
            {estimate.breakdown.map((b: Estimate['breakdown'][number], i: number) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <span className="text-sm font-medium text-foreground">{b.label}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{b.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <FileText className="h-4 w-4" /> Request Final Quote
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
            <Phone className="h-4 w-4" /> Book a Call
          </button>
        </motion.div>
      </div>
    </div>
  );
}
