import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { customerSupabase } from '../lib/customerAuth'

interface CustomerAuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string, name: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null)

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    customerSupabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = customerSupabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string): Promise<string | null> {
    const { error } = await customerSupabase.auth.signInWithPassword({ email, password })
    return error?.message ?? null
  }

  async function signUp(email: string, password: string, name: string): Promise<string | null> {
    const { data, error } = await customerSupabase.auth.signUp({ email, password })
    if (error) return error.message
    if (data.user) {
      await customerSupabase
        .from('customers')
        .upsert({ name, email }, { onConflict: 'email', ignoreDuplicates: true })
    }
    return null
  }

  async function signOut() {
    await customerSupabase.auth.signOut()
  }

  return (
    <CustomerAuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext)
  if (!ctx) throw new Error('useCustomerAuth must be inside CustomerAuthProvider')
  return ctx
}
