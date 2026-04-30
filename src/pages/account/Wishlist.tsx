import { Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

// Wishlist is stored in localStorage for now.
// Full Supabase sync comes after the admin user + products are set up.
export function Wishlist() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
      <Heart className="w-10 h-10 text-white/20 mx-auto mb-3" />
      <p className="text-white/60 font-semibold">Your wishlist is empty</p>
      <p className="text-sm text-white/30 mt-1">
        Tap the <ShoppingCart className="w-3 h-3 inline" /> heart icon on any product to save it here.
      </p>
      <Link to="/shop" className="inline-block mt-4 text-[#E63939] hover:underline text-sm font-medium">
        Browse products →
      </Link>
    </div>
  )
}
