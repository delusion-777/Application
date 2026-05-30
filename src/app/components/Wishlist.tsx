import { useNavigate, Link } from 'react-router';
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.size[0], product.color[0], 1);
    toast.success('Added to cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pb-20 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-stone-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-12 h-12 text-stone-300" />
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-3">Your wishlist is empty</h2>
          <p className="text-stone-600 mb-8 text-lg">Save styles you love for later</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-3 bg-charcoal text-off-white px-8 py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all group"
          >
            Browse Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-2">My Wishlist</h1>
          <p className="text-stone-600 text-lg">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  toast.success('Removed from wishlist');
                }}
                className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4 text-stone-600 hover:text-red-600 transition-colors" />
              </button>

              <Link
                to={`/products/${product.id}`}
                className="block mb-3"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3 bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-charcoal text-off-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="space-y-1.5 mb-3">
                  <p className="text-xs text-stone-500 uppercase tracking-wider">{product.brand}</p>
                  <h3 className="font-medium text-charcoal line-clamp-2 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-charcoal text-off-white py-3 rounded-full font-medium hover:bg-charcoal-light transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

