import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CustomerUser {
  id: string
  email: string
  name: string
  created_at: string
}

interface StoredAccount extends CustomerUser {
  password: string
}

interface CustomerAuthContextType {
  user: CustomerUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string, name: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const SESSION_KEY = 'cxx-customer-session'
const ACCOUNTS_KEY = 'cxx-customer-accounts'

function getAccounts(): StoredAccount[] {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? '[]') } catch { return [] }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function getSession(): CustomerUser | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null') } catch { return null }
}

const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null)

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(getSession())
    setLoading(false)
  }, [])

  async function signUp(email: string, password: string, name: string): Promise<string | null> {
    const accounts = getAccounts()
    if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists'
    }
    const newUser: CustomerUser = {
      id: crypto.randomUUID(),
      email,
      name,
      created_at: new Date().toISOString(),
    }
    saveAccounts([...accounts, { ...newUser, password }])
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return null
  }

  async function signIn(email: string, password: string): Promise<string | null> {
    const accounts = getAccounts()
    const account = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!account) return 'No account found with this email'
    if (account.password !== password) return 'Incorrect password'
    const session: CustomerUser = {
      id: account.id,
      email: account.email,
      name: account.name,
      created_at: account.created_at,
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return null
  }

  async function signOut() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
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
