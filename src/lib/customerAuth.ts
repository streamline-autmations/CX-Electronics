import { createClient } from '@supabase/supabase-js'

// Separate Supabase client for customer auth.
// Uses a different localStorage key so customer sessions never touch the admin session.
export const customerSupabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: false,
      autoRefreshToken: true,
      storageKey: 'cxx-customer-auth',
    },
  },
)
