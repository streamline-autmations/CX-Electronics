import { createContext, useContext, useState, type ReactNode } from 'react'

const KEY = 'cxx-wishlist'

function read(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

interface WishlistContextType {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(read)

  function toggle(id: string) {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function has(id: string) {
    return ids.includes(id)
  }

  return (
    <WishlistContext.Provider value={{ ids, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider')
  return ctx
}
