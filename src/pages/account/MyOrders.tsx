import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useCustomerAuth } from '../../context/CustomerAuthContext'

interface LocalOrder {
  id: string
  order_number: string
  status: string
  total: number
  created_at: string
  order_type: string
}

const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-yellow-500/20 text-yellow-400',
  paid:       'bg-blue-500/20 text-blue-400',
  processing: 'bg-purple-500/20 text-purple-400',
  shipped:    'bg-indigo-500/20 text-indigo-400',
  delivered:  'bg-green-500/20 text-green-400',
  cancelled:  'bg-white/10 text-white/40',
}

const ORDERS_KEY = 'cxx-my-orders'

export function MyOrders() {
  const { user } = useCustomerAuth()
  const [orders, setOrders] = useState<LocalOrder[]>([])

  useEffect(() => {
    if (!user) return
    try {
      const saved: LocalOrder[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]')
      setOrders(saved)
    } catch {
      setOrders([])
    }
  }, [user])

  if (orders.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <Package className="w-10 h-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/60 font-semibold">No orders yet</p>
        <p className="text-sm text-white/30 mt-1">Your orders appear here after checkout.</p>
        <Link to="/shop" className="inline-block mt-4 text-[#E63939] hover:underline text-sm font-medium">
          Start shopping →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-white text-lg">My Orders</h2>
      {orders.map((order) => (
        <Link key={order.id} to={`/order/${order.id}`} className="block">
          <div className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-white text-sm">{order.order_number}</p>
                <p className="text-xs text-white/30 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[order.status] ?? 'bg-white/10 text-white/40'}`}
                >
                  {order.status}
                </span>
                <p className="font-bold text-white">R{order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
