import { useCustomerAuth } from '../../context/CustomerAuthContext'

export function AccountProfile() {
  const { user } = useCustomerAuth()

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="font-bold text-white text-lg mb-5">Profile</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-white/40 font-semibold uppercase tracking-widest mb-1">Email</p>
            <p className="text-white font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs text-white/40 font-semibold uppercase tracking-widest mb-1">Member since</p>
            <p className="text-white">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
                : '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#E63939]/10 border border-[#E63939]/20 rounded-2xl p-5">
        <p className="text-sm text-white font-semibold mb-1">Shipping details</p>
        <p className="text-sm text-white/50">
          Your shipping details are saved automatically when you place an order and will pre-fill at checkout next time.
        </p>
      </div>
    </div>
  )
}
