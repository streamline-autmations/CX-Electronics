import { useEffect, useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { getProductImageUrl } from '../../lib/supabase'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import type { ProductWithCategory } from '../../lib/supabase'

export function Wishlist() {
  const { ids, toggle } = useWishlist()
  const { addItem } = useCart()
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ids.length === 0) { setProducts([]); return }
    setLoading(true)
    supabase
      .from('products')
      .select(
        'id, name, name_zh, slug, retail_price, bulk_price, bulk_min_qty, is_bulk_available, images, thumbnail_url, active, featured, stock_status, variants, created_at, updated_at, description, description_zh, category_id, categories(id, name, name_zh, slug)',
      )
      .in('id', ids)
      .eq('active', true)
      .then(({ data }) => {
        setProducts((data ?? []) as unknown as ProductWithCategory[])
        setLoading(false)
      })
  }, [ids.join(',')])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-6 h-6 border-2 border-[#E63939] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (ids.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <Heart className="w-10 h-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/60 font-semibold">Your wishlist is empty</p>
        <p className="text-sm text-white/30 mt-1">
          Tap the heart icon on any product to save it here.
        </p>
        <Link to="/shop" className="inline-block mt-4 text-[#E63939] hover:underline text-sm font-medium">
          Browse products →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-white text-lg">Wishlist ({ids.length})</h2>

      <div className="space-y-3">
        {products.map((product) => {
          const imgSrc = product.images[0]
            ? getProductImageUrl(product.images[0], 120)
            : product.thumbnail_url ?? ''
          const isOutOfStock = product.stock_status === 'out_of_stock'

          return (
            <div
              key={product.id}
              className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-4 flex items-center gap-4 transition-colors"
            >
              {/* Thumbnail */}
              <Link to={`/shop/${product.slug}`} className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden">
                  {imgSrc ? (
                    <img src={imgSrc} alt={product.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No image</div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/shop/${product.slug}`} className="block">
                  {product.categories && (
                    <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">
                      {product.categories.name}
                    </p>
                  )}
                  <p className="font-semibold text-white text-sm leading-snug truncate">{product.name}</p>
                  <p className="text-[#E63939] font-extrabold mt-0.5">R{product.retail_price.toFixed(2)}</p>
                </Link>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    if (isOutOfStock) return
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.retail_price,
                      quantity: 1,
                      image: product.thumbnail_url ?? '',
                      orderType: 'retail',
                    })
                  }}
                  disabled={isOutOfStock}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${
                    isOutOfStock
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-[#E63939] hover:bg-[#C82020] text-white'
                  }`}
                  title={isOutOfStock ? 'Out of stock' : 'Add to cart'}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isOutOfStock ? 'Unavailable' : 'Add'}</span>
                </button>

                <button
                  onClick={() => toggle(product.id)}
                  className="w-8 h-8 flex items-center justify-center text-[#E63939] hover:text-red-400 transition-colors"
                  title="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 fill-[#E63939]" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
