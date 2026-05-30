import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Star, MapPin, Heart, ShoppingCart, Truck, RotateCcw, Shield, ArrowLeft, Check } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useApp();

  const product = mockProducts.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(product?.size[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.color[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-charcoal mb-3">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-stone-600 hover:text-charcoal transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Added to cart', {
      description: `${product.name} (${selectedSize}, ${selectedColor})`,
    });
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const similarProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-charcoal transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shop</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24 h-fit"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-6 right-6 bg-charcoal text-off-white px-4 py-2 rounded-full font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <p className="text-sm text-stone-500 uppercase tracking-widest mb-3">{product.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-gold text-gold'
                            : 'fill-stone-200 text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-charcoal">{product.rating}</span>
                  <span className="text-stone-500">(250+ reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-display font-bold text-charcoal">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-stone-400 line-through">₹{product.originalPrice}</span>
                    <span className="bg-stone-100 text-charcoal px-3 py-1.5 rounded-full text-sm font-semibold">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-off-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{product.storeName}</h3>
                  <p className="text-sm text-stone-600 mb-3">
                    {product.distance} km away · Delivery in 30-45 mins
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="text-sm font-medium text-charcoal">{product.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-charcoal">Select Size</h3>
                <button className="text-sm text-stone-600 hover:text-charcoal transition-colors underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.size.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`aspect-square rounded-xl border-2 transition-all font-medium ${
                      selectedSize === size
                        ? 'border-charcoal bg-charcoal text-off-white'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-charcoal mb-4">
                Color: <span className="font-normal text-stone-600">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.color.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
                      selectedColor === color
                        ? 'border-charcoal bg-charcoal text-off-white'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-charcoal mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 py-3 hover:bg-stone-50 transition-colors font-medium"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 font-semibold border-x border-stone-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-6 py-3 hover:bg-stone-50 transition-colors font-medium"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-stone-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-charcoal text-off-white py-5 rounded-full font-semibold hover:bg-charcoal-light transition-all flex items-center justify-center gap-3 text-lg group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                disabled={isInWishlist}
                className={`p-5 rounded-full border-2 transition-all ${
                  isInWishlist
                    ? 'border-charcoal bg-charcoal text-off-white'
                    : 'border-stone-200 hover:border-charcoal bg-white'
                }`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
              {[
                { icon: Truck, label: 'Fast Delivery', desc: '30-45 mins' },
                { icon: RotateCcw, label: 'Easy Returns', desc: '7-day return' },
                { icon: Shield, label: 'Secure Payment', desc: '100% secure' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center">
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-charcoal" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-charcoal mb-0.5">{feature.label}</p>
                  <p className="text-xs text-stone-500">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="pt-8 border-t border-stone-200">
              <h3 className="font-semibold text-charcoal mb-4">Product Details</h3>
              <ul className="space-y-2 text-stone-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-charcoal" />
                  <span>Premium quality fabric</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-charcoal" />
                  <span>Available in multiple sizes and colors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-charcoal" />
                  <span>Machine washable</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-charcoal" />
                  <span>Delivered from local boutique near you</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/products/${p.id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group block"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-xl mb-3 bg-stone-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-stone-500 uppercase tracking-wider">{p.brand}</p>
                      <h3 className="font-medium text-charcoal line-clamp-2 group-hover:text-stone-600 transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-charcoal">₹{p.price}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">₹{p.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
