import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, Tag, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, placeOrder, clearCart } = useApp();
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, Mumbai, MH 400001');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon === 'NEWUSER50' ? 50 : appliedCoupon === 'FLAT100' ? 100 : 0;
  const deliveryFee = subtotal > 999 ? 0 : 39;
  const total = subtotal - discount + deliveryFee;

  const handleApplyCoupon = () => {
    const validCoupons = ['NEWUSER50', 'FLAT100', 'FREESHIP'];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setAppliedCoupon(couponCode.toUpperCase());
      toast.success('Coupon applied successfully!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handlePlaceOrder = () => {
    const orderId = placeOrder(deliveryAddress);
    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/orders/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pb-20 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-stone-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-stone-300" />
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-3">Your cart is empty</h2>
          <p className="text-stone-600 mb-8 text-lg">Discover styles that fit your vibe</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-3 bg-charcoal text-off-white px-8 py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all group"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-2">Shopping Cart</h1>
        <p className="text-stone-600 mb-12">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all"
              >
                <div className="flex gap-6">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">{item.brand}</p>
                        <h3 className="font-semibold text-charcoal text-lg mb-2 truncate">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
                          <span>Size: <span className="font-medium text-charcoal">{item.selectedSize}</span></span>
                          <span>·</span>
                          <span>Color: <span className="font-medium text-charcoal">{item.selectedColor}</span></span>
                        </div>
                        <p className="text-xs text-stone-500 mt-2">{item.storeName}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="p-2 hover:bg-stone-50 rounded-lg transition-colors h-fit"
                      >
                        <Trash2 className="w-5 h-5 text-stone-400 hover:text-red-600 transition-colors" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200">
                      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="px-4 py-2 hover:bg-stone-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-2 font-medium border-x border-stone-200">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="px-4 py-2 hover:bg-stone-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-charcoal">₹{item.price * item.quantity}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-stone-400 line-through">
                            ₹{item.originalPrice * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 sticky top-24">
              <h2 className="text-2xl font-display font-bold text-charcoal mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-3">Have a coupon?</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 bg-charcoal text-off-white rounded-xl font-medium hover:bg-charcoal-light transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-700 mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-700 rounded-full" />
                    Coupon "{appliedCoupon}" applied
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
                <div className="flex justify-between text-stone-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-700">
                  <span>Delivery</span>
                  <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && subtotal < 999 && (
                  <p className="text-xs text-stone-500">
                    Add ₹{999 - subtotal} more for free delivery
                  </p>
                )}
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-lg font-semibold text-charcoal">Total</span>
                <span className="text-3xl font-display font-bold text-charcoal">₹{total}</span>
              </div>

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-charcoal text-off-white py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all flex items-center justify-center gap-3 group"
                >
                  <Lock className="w-5 h-5" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Delivery Address</label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-charcoal text-off-white py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all"
                  >
                    Place Order · ₹{total}
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full text-stone-600 hover:text-charcoal transition-colors py-2"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-stone-200 text-center">
                <p className="text-sm text-stone-500">
                  Estimated delivery: <span className="font-medium text-charcoal">30-45 minutes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
