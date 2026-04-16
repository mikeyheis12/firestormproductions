import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Users, DollarSign, Clock, ShieldAlert } from 'lucide-react';
import Header from '../components/Header';
import { getAllQuotes, updateQuoteStatus, type QuoteLead } from '../lib/quote-store';
import { formatINR } from '../lib/estimate-engine';
import { useAuth } from '../hooks/use-auth';

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { title: 'Admin Dashboard — Firestorm Production' },
      { name: 'description', content: 'Manage production leads and quotes.' },
    ],
  }),
  component: AdminPage,
});

const STATUSES: QuoteLead['status'][] = ['New', 'Contacted', 'Closed'];
const STATUS_COLORS: Record<string, string> = {
  New: 'bg-primary/20 text-primary',
  Contacted: 'bg-chart-4/20 text-chart-4',
  Closed: 'bg-muted text-muted-foreground',
};

function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [quotes, setQuotes] = useState<QuoteLead[]>([]);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setQuotes(getAllQuotes()); }, []);

  const filtered = quotes.filter(q => {
    if (filterType !== 'All' && q.formData.projectType !== filterType) return false;
    if (filterStatus !== 'All' && q.status !== filterStatus) return false;
    if (search && !q.formData.name.toLowerCase().includes(search.toLowerCase()) &&
        !q.formData.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const changeStatus = (id: string, status: QuoteLead['status']) => {
    updateQuoteStatus(id, status);
    setQuotes(getAllQuotes());
  };

  const stats = {
    total: quotes.length,
    newLeads: quotes.filter(q => q.status === 'New').length,
    avgBudget: quotes.length
      ? formatINR(Math.round(quotes.reduce((s, q) => s + (q.estimate.minBudget + q.estimate.maxBudget) / 2, 0) / quotes.length))
      : '₹0',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Lead Dashboard</h1>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: 'Total Leads', value: stats.total },
            { icon: Clock, label: 'New Leads', value: stats.newLeads },
            { icon: DollarSign, label: 'Avg Budget', value: stats.avgBudget },
          ].map(s => (
            <div key={s.label} className="glass-card flex items-center gap-4 rounded-xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Types</option>
            {['Ad Film', 'Corporate Video', 'Social Media Content', 'Music Video', 'Short Film', 'Other'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Status</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Leads */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <p className="text-muted-foreground">{quotes.length === 0 ? 'No leads yet. Share the quote link to start collecting leads.' : 'No leads match your filters.'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden rounded-xl"
              >
                <button
                  onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground">{q.formData.name}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{q.formData.projectType} • {formatINR(q.estimate.minBudget)}–{formatINR(q.estimate.maxBudget)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(q.createdAt).toLocaleDateString()}</span>
                  {expanded === q.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {expanded === q.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="border-t border-border px-5 pb-5 pt-4"
                  >
                    <div className="grid gap-4 text-sm sm:grid-cols-2">
                      <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{q.formData.email}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{q.formData.phone}</span></div>
                      <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{q.formData.company || '—'}</span></div>
                      <div><span className="text-muted-foreground">Duration:</span> <span className="text-foreground">{q.formData.duration}</span></div>
                      <div><span className="text-muted-foreground">Shoot Days:</span> <span className="text-foreground">{q.formData.shootDays}</span></div>
                      <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground">{q.formData.location}</span></div>
                      <div><span className="text-muted-foreground">Talent:</span> <span className="text-foreground">{q.formData.talentRequired}</span></div>
                      <div><span className="text-muted-foreground">Crew:</span> <span className="text-foreground">{q.formData.crewSize}</span></div>
                      <div className="sm:col-span-2"><span className="text-muted-foreground">Production:</span> <span className="text-foreground">{q.formData.productionElements.join(', ')}</span></div>
                      <div className="sm:col-span-2"><span className="text-muted-foreground">Post-Production:</span> <span className="text-foreground">{q.formData.postProduction.join(', ')}</span></div>
                      <div><span className="text-muted-foreground">Budget Range:</span> <span className="text-foreground">{q.formData.budgetRange}</span></div>
                      <div><span className="text-muted-foreground">Deadline:</span> <span className="text-foreground">{q.formData.deadline}</span></div>
                      <div><span className="text-muted-foreground">Timeline:</span> <span className="text-foreground">{q.estimate.minWeeks}–{q.estimate.maxWeeks} weeks</span></div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {STATUSES.map(s => (
                        <button
                          key={s}
                          onClick={() => changeStatus(q.id, s)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                            q.status === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
