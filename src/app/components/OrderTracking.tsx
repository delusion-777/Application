import { useParams, useNavigate } from 'react-router';
import { MapPin, Clock, CheckCircle, Package, Truck, Home, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pb-20 md:pb-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-charcoal mb-3">Order not found</h2>
          <button
            onClick={() => navigate('/orders')}
            className="text-stone-600 hover:text-charcoal transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', icon: CheckCircle },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'preparing', label: 'Preparing', icon: Package },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-charcoal transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Orders</span>
        </button>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-stone-200 p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-charcoal mb-2">
                Order #{order.id}
              </h1>
              <p className="text-stone-600">{format(order.orderDate, 'PPp')}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-4xl font-display font-bold text-charcoal mb-1">₹{order.total}</p>
              <p className="text-stone-600">{order.items.length} items</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-6 border-t border-stone-200">
            <MapPin className="w-5 h-5 text-charcoal mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-charcoal mb-1">Delivery Address</p>
              <p className="text-stone-700">{order.deliveryAddress}</p>
            </div>
          </div>
        </motion.div>

        {/* Order Status Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-stone-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-display font-bold text-charcoal mb-8">Order Status</h2>

          <div className="relative">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="relative flex items-start mb-10 last:mb-0">
                  {/* Connector Line */}
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute left-5 top-12 w-0.5 h-full -ml-px transition-colors ${
                        isCompleted ? 'bg-charcoal' : 'bg-stone-200'
                      }`}
                    />
                  )}

                  <div className="relative flex items-start gap-6 w-full">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-charcoal text-off-white'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <p
                        className={`font-semibold mb-1 transition-colors ${
                          isCurrent
                            ? 'text-charcoal text-lg'
                            : isCompleted
                            ? 'text-charcoal'
                            : 'text-stone-400'
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <div className="flex items-center gap-2 text-sm text-stone-600 mt-2">
                          <Clock className="w-4 h-4" />
                          <span>Estimated delivery: {order.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    {isCurrent && (
                      <div className="flex items-center gap-2 text-sm bg-charcoal text-off-white px-4 py-2 rounded-full font-medium">
                        <div className="w-2 h-2 bg-off-white rounded-full animate-pulse" />
                        In Progress
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-stone-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-display font-bold text-charcoal mb-6">Order Items</h2>
          <div className="space-y-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-6 pb-6 border-b border-stone-200 last:border-b-0 last:pb-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">{item.brand}</p>
                  <h4 className="font-semibold text-charcoal text-lg mb-2">{item.name}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-2">
                    <span>Size: <span className="font-medium text-charcoal">{item.selectedSize}</span></span>
                    <span>Color: <span className="font-medium text-charcoal">{item.selectedColor}</span></span>
                    <span>Qty: <span className="font-medium text-charcoal">{item.quantity}</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-charcoal">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-charcoal text-off-white rounded-2xl p-8"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Need Help?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium mb-1">Customer Support</p>
                <p className="text-stone-300 text-sm">1800-123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium mb-1">Delivery Partner</p>
                <p className="text-stone-300 text-sm">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
