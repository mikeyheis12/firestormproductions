import type { QuoteFormData, Estimate } from './estimate-engine';

export interface QuoteLead {
  id: string;
  formData: QuoteFormData;
  estimate: Estimate;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

const STORAGE_KEY = 'vion_quotes';

export function saveQuote(formData: QuoteFormData, estimate: Estimate): QuoteLead {
  const lead: QuoteLead = {
    id: crypto.randomUUID(),
    formData,
    estimate,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  const existing = getAllQuotes();
  existing.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return lead;
}

export function getAllQuotes(): QuoteLead[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function updateQuoteStatus(id: string, status: QuoteLead['status']): void {
  const quotes = getAllQuotes();
  const q = quotes.find(q => q.id === id);
  if (q) {
    q.status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  }
}
