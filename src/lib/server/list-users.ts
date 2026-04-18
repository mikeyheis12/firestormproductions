import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import type { Database } from '@/integrations/supabase/types';

export interface AdminUser {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  role: 'admin' | 'user';
}

export const listUsers = createServerFn({ method: 'GET' }).handler(async () => {
  // Verify caller is admin via their auth token
  const authHeader = getRequestHeader('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.replace('Bearer ', '');

  const SUPABASE_URL = process.env.SUPABASE_URL!;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const userClient = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });

  const { data: claims, error: claimsError } = await userClient.auth.getClaims(token);
  if (claimsError || !claims?.claims?.sub) {
    throw new Error('Unauthorized');
  }
  const userId = claims.claims.sub;

  const { data: roleCheck } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();

  if (!roleCheck) {
    throw new Error('Forbidden: admin access required');
  }

  // List users (admin API)
  const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (usersError) throw usersError;

  const { data: rolesData } = await supabaseAdmin.from('user_roles').select('user_id, role');
  const adminIds = new Set((rolesData ?? []).filter(r => r.role === 'admin').map(r => r.user_id));

  const users: AdminUser[] = usersData.users.map(u => ({
    id: u.id,
    email: u.email ?? null,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    role: adminIds.has(u.id) ? 'admin' : 'user',
  }));

  return { users };
});
