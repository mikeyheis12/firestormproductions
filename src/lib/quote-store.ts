import { supabase } from '@/integrations/supabase/client';
import type { QuoteFormData, Estimate } from './estimate-engine';

export interface QuoteLead {
  id: string;
  formData: QuoteFormData;
  estimate: Estimate;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

interface QuoteLeadRow {
  id: string;
  form_data: QuoteFormData;
  estimate: Estimate;
  status: string;
  created_at: string;
}

function rowToLead(row: QuoteLeadRow): QuoteLead {
  return {
    id: row.id,
    formData: row.form_data,
    estimate: row.estimate,
    status: (row.status as QuoteLead['status']) ?? 'New',
    createdAt: row.created_at,
  };
}

export async function saveQuote(formData: QuoteFormData, estimate: Estimate): Promise<QuoteLead> {
  const { data, error } = await supabase
    .from('quote_leads')
    .insert({
      form_data: formData as never,
      estimate: estimate as never,
      status: 'New',
    })
    .select()
    .single();

  if (error || !data) {
    throw error ?? new Error('Failed to save quote');
  }
  return rowToLead(data as unknown as QuoteLeadRow);
}

export async function getAllQuotes(): Promise<QuoteLead[]> {
  const { data, error } = await supabase
    .from('quote_leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data ?? []) as unknown as QuoteLeadRow[]).map(rowToLead);
}

export async function updateQuoteStatus(id: string, status: QuoteLead['status']): Promise<void> {
  const { error } = await supabase
    .from('quote_leads')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}
