import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { User, Package, Heart, LogOut } from 'lucide-react'
import { Navbar } from '../../components/store/Navbar'
import { Footer } from '../../components/store/Footer'
import { useCustomerAuth } from '../../context/CustomerAuthContext'

const accountNav = [
  { to: '/account/profile',  icon: User,    label: 'Profile' },
  { to: '/account/orders',   icon: Package, label: 'My Orders' },
  { to: '/account/wishlist', icon: Heart,   label: 'Wishlist' },
]

export function AccountLayout() {
  const { user, loading, signOut } = useCustomerAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
        <div className="w-7 h-7 border-2 border-[#E63939] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/account/login" replace />

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-6">

          {/* Sidebar */}
          <aside className="sm:w-56 flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="px-2 py-2 mb-3 border-b border-white/10">
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-0.5">Signed in as</p>
                <p className="text-sm font-semibold text-white truncate">{user.email}</p>
              </div>

              <nav className="space-y-0.5">
                {accountNav.map(({ to, icon: Icon, label }) => (
                  <NavLink key={to} to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E63939]/20 text-[#E63939]'
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`
                    }>
                    <Icon className="w-4 h-4" />
                    {label}
                  </NavLink>
                ))}
              </nav>

              <button onClick={signOut}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors mt-3 border-t border-white/10 pt-3">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
