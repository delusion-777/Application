import { useNavigate } from 'react-router';
import { Package, Clock, CheckCircle, Truck, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export function Orders() {
  const navigate = useNavigate();
  const { orders } = useApp();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'placed':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Order Placed' };
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Confirmed' };
      case 'preparing':
        return { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Preparing' };
      case 'out_for_delivery':
        return { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Out for Delivery' };
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' };
      default:
        return { icon: Package, color: 'text-stone-600', bg: 'bg-stone-50', label: status };
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center pb-20 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-stone-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <Package className="w-12 h-12 text-stone-300" />
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-3">No orders yet</h2>
          <p className="text-stone-600 mb-8 text-lg">Start your fashion journey today</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-3 bg-charcoal text-off-white px-8 py-4 rounded-full font-semibold hover:bg-charcoal-light transition-all group"
          >
            Shop Now
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
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-2">My Orders</h1>
          <p className="text-stone-600 text-lg">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        <div className="space-y-6">
          {orders.map((order, idx) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 hover:shadow-xl hover:shadow-stone-200/50 transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-display font-bold text-charcoal">
                        Order #{order.id}
                      </h3>
                      <span className={`${statusConfig.bg} ${statusConfig.color} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600">
                      {format(order.orderDate, 'PPp')}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-3xl font-display font-bold text-charcoal mb-1">₹{order.total}</p>
                    <p className="text-sm text-stone-600">{order.items.length} items</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 mb-6 pb-6 border-b border-stone-200">
                  <MapPin className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <p className="text-stone-700">{order.deliveryAddress}</p>
                </div>

                {/* Items Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {order.items.slice(0, 4).map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-stone-100"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-stone-600 truncate">{item.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-stone-200">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                    <span className="text-sm text-stone-700">
                      {order.status === 'delivered'
                        ? 'Delivered'
                        : `Arriving in ${order.estimatedDelivery}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">Track Order</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
