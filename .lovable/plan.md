

## Problem

The admin page currently only shows **quote leads** stored in browser localStorage. It does **not** show users who have signed up/logged in. That's why when someone logs in, they don't appear in admin.

Two separate issues are bundled here:
1. **No "Users" view** — signed-up users live in the backend auth system but aren't displayed anywhere.
2. **Quote leads are localStorage-only** — leads saved on one device/browser are invisible from another (so even quotes you'd expect to see won't show across devices).

## Plan

### 1. Add a "Users" tab to the Admin dashboard
- Create a backend function (edge function with service-role access) `list-users` that:
  - Verifies the caller is an admin (via `has_role`)
  - Returns the list of signed-up users from auth (id, email, created_at, last sign-in) plus their roles from `user_roles`
- Add a tabbed UI in `src/routes/admin.tsx`: **Users** | **Quote Leads**
- Users tab shows: email, signup date, last sign-in, role badge (admin / user)

### 2. Move Quote Leads to the database (so admin sees them across devices)
- Create a `quote_leads` table with columns matching `QuoteLead` (form_data jsonb, estimate jsonb, status, created_at)
- RLS: anyone can `INSERT` (public quote form), only admins can `SELECT` / `UPDATE`
- Update `src/lib/quote-store.ts` → use Supabase instead of localStorage
- Update `src/routes/quote.tsx` to save via Supabase, and `src/routes/admin.tsx` to fetch via Supabase

### 3. Minor polish
- Keep the existing stats cards but compute them from DB data
- Add loading + error states

## Files touched
- New: `supabase/migrations/<timestamp>_quote_leads_and_list_users.sql`
- New: `supabase/functions/list-users/index.ts`
- Edit: `src/lib/quote-store.ts` (Supabase-based, async)
- Edit: `src/routes/quote.tsx` (await save)
- Edit: `src/routes/admin.tsx` (tabs, fetch users + leads from DB)

