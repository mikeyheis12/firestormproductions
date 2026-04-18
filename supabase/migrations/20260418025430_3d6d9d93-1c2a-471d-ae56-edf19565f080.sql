-- Create quote_leads table
CREATE TABLE public.quote_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_data JSONB NOT NULL,
  estimate JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a quote lead (public quote form)
CREATE POLICY "Anyone can submit a quote"
ON public.quote_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view quote leads
CREATE POLICY "Admins can view quote leads"
ON public.quote_leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update quote leads (status changes)
CREATE POLICY "Admins can update quote leads"
ON public.quote_leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Index on created_at for sorting
CREATE INDEX idx_quote_leads_created_at ON public.quote_leads (created_at DESC);