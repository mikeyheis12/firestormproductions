import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '../components/Header';
import type { QuoteFormData } from '../lib/estimate-engine';
import { calculateEstimate } from '../lib/estimate-engine';
import { saveQuote } from '../lib/quote-store';

export const Route = createFileRoute('/quote')({
  head: () => ({
    meta: [
      { title: 'Get a Quote — Firestorm Production' },
      { name: 'description', content: 'Fill out our quick form and get an instant production estimate.' },
    ],
  }),
  component: QuotePage,
});

const STEPS = ['Basic Info', 'Project Type', 'Details', 'Production', 'Post-Production', 'Budget'];

const PROJECT_TYPES = ['Ad Film', 'Corporate Video', 'Social Media Content', 'Music Video', 'Short Film', 'Other'];
const DURATIONS = ['15 sec', '30 sec', '1 min', '3+ min'];
const SHOOT_DAYS = ['1', '2-3', '4+'];
const LOCATIONS = ['Studio', 'Outdoor', 'Multiple Locations'];
const CREW_SIZES = ['Small', 'Medium', 'Large'];
const PROD_ELEMENTS = ['Drone Shots', 'High-end Camera (RED/ARRI)', 'Lighting Setup', 'Set Design', 'Scriptwriting', 'Storyboarding'];
const POST_PROD = ['Basic Editing', 'Advanced Editing', 'Color Grading', 'VFX', 'Sound Design'];
const BUDGETS = ['₹50K – ₹1L', '₹1L – ₹5L', '₹5L+'];
const DEADLINES = ['Urgent', 'Normal', 'Flexible'];

function QuotePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormData>({
    name: '', email: '', phone: '', company: '',
    projectType: '',
    duration: '', shootDays: '', location: '', talentRequired: '', crewSize: '',
    productionElements: [],
    postProduction: [],
    budgetRange: '', deadline: '',
  });

  const set = <K extends keyof QuoteFormData>(key: K, val: QuoteFormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const toggleArray = (key: 'productionElements' | 'postProduction', val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }));
  };

  const canNext = (): boolean => {
    if (step === 0) return !!(form.name && form.email && form.phone);
    if (step === 1) return !!form.projectType;
    if (step === 2) return !!(form.duration && form.shootDays && form.location && form.talentRequired && form.crewSize);
    if (step === 3) return form.productionElements.length > 0;
    if (step === 4) return form.postProduction.length > 0;
    if (step === 5) return !!(form.budgetRange && form.deadline);
    return true;
  };

  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const estimate = calculateEstimate(form);
      const lead = await saveQuote(form, estimate);
      sessionStorage.setItem(`quote_${lead.id}`, JSON.stringify({
        id: lead.id, formData: lead.formData, estimate: lead.estimate,
      }));
      navigate({ to: '/results', search: { id: lead.id } });
    } catch (err) {
      console.error('Failed to save quote:', err);
      alert('Something went wrong saving your quote. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-2xl px-6 pt-28 pb-20">
        {/* Progress */}
        <div className="mb-10 flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
              <div className={`h-1 w-full rounded-full transition-colors ${i <= step ? 'bg-gradient-gold' : 'bg-secondary'}`} />
              <span className={`hidden text-[10px] tracking-wide uppercase sm:block ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>{s}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground">Tell us about yourself</h2>
                <p className="text-sm text-muted-foreground">We'll use this to prepare your personalized estimate.</p>
                <InputField label="Full Name" value={form.name} onChange={v => set('name', v)} placeholder="John Doe" />
                <InputField label="Email" value={form.email} onChange={v => set('email', v)} placeholder="john@company.com" type="email" />
                <InputField label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="+91 98765 43210" />
                <InputField label="Company (optional)" value={form.company} onChange={v => set('company', v)} placeholder="Company Name" />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground">What are you creating?</h2>
                <p className="text-sm text-muted-foreground">Select the type of production.</p>
                <OptionGrid options={PROJECT_TYPES} selected={form.projectType} onSelect={v => set('projectType', v)} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Project Details</h2>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Video Duration</label>
                  <OptionGrid options={DURATIONS} selected={form.duration} onSelect={v => set('duration', v)} cols={4} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Shoot Days</label>
                  <OptionGrid options={SHOOT_DAYS} selected={form.shootDays} onSelect={v => set('shootDays', v)} cols={3} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Location</label>
                  <OptionGrid options={LOCATIONS} selected={form.location} onSelect={v => set('location', v)} cols={3} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Talent Required</label>
                  <OptionGrid options={['Yes', 'No']} selected={form.talentRequired} onSelect={v => set('talentRequired', v)} cols={2} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Crew Size</label>
                  <OptionGrid options={CREW_SIZES} selected={form.crewSize} onSelect={v => set('crewSize', v)} cols={3} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground">Production Elements</h2>
                <p className="text-sm text-muted-foreground">Select all that apply.</p>
                <CheckboxGrid options={PROD_ELEMENTS} selected={form.productionElements} onToggle={v => toggleArray('productionElements', v)} />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground">Post-Production</h2>
                <p className="text-sm text-muted-foreground">What post-production services do you need?</p>
                <CheckboxGrid options={POST_PROD} selected={form.postProduction} onToggle={v => toggleArray('postProduction', v)} />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Budget & Timeline</h2>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Budget Range</label>
                  <OptionGrid options={BUDGETS} selected={form.budgetRange} onSelect={v => set('budgetRange', v)} cols={3} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">Deadline</label>
                  <OptionGrid options={DEADLINES} selected={form.deadline} onSelect={v => set('deadline', v)} cols={3} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < 5 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!canNext()}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Get Estimate <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable sub-components */

function InputField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function OptionGrid({ options, selected, onSelect, cols = 2 }: {
  options: string[]; selected: string; onSelect: (v: string) => void; cols?: number;
}) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(cols, options.length)}, 1fr)` }}>
      {options.map(o => (
        <button
          key={o}
          onClick={() => onSelect(o)}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
            selected === o
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-secondary/50 text-muted-foreground hover:border-muted-foreground'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CheckboxGrid({ options, selected, onToggle }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map(o => {
        const checked = selected.includes(o);
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
              checked
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-secondary/50 text-muted-foreground hover:border-muted-foreground'
            }`}
          >
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
              checked ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {checked && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            {o}
          </button>
        );
      })}
    </div>
  );
}
