import { Outlet, Link, useLocation } from 'react-router';
import { Home, ShoppingBag, Heart, Package, MapPin, ShoppingCart, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Root() {
  const location = useLocation();
  const { cart } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/wishlist', label: 'Wishlist' },
    { path: '/orders', label: 'Orders' },
  ];

  const mobileNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: ShoppingBag, label: 'Shop' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/orders', icon: Package, label: 'Orders' },
  ];

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-off-white flex flex-col font-body">
      {/* Premium Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-off-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-charcoal tracking-tight">
                  InstaWear
                </h1>
                <p className="text-xs text-stone-500 tracking-wide -mt-0.5">Fashion in Minutes</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(({ path, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-charcoal'
                        : 'text-stone-600 hover:text-charcoal'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-charcoal"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Location */}
              <button className="hidden md:flex items-center gap-2 text-sm text-stone-600 hover:text-charcoal transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, MH</span>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 hover:bg-stone-50 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-charcoal" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-charcoal text-off-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-stone-50 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-charcoal" />
                ) : (
                  <Menu className="w-6 h-6 text-charcoal" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-stone-200/50 bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map(({ path, label }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-stone-100 text-charcoal'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-charcoal'
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-charcoal text-stone-300 pt-16 pb-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-off-white rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-charcoal" />
                </div>
                <h3 className="text-lg font-display font-bold text-off-white">InstaWear</h3>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">
                Hyperlocal fashion quick-commerce. Find your perfect fit, delivered in minutes.
              </p>
              <p className="text-xs text-stone-500 italic">
                "Not Every Good Fit Is Your Fit."
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-off-white mb-4 uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="hover:text-off-white transition-colors">All Products</Link></li>
                <li><Link to="/products?category=T-Shirts" className="hover:text-off-white transition-colors">T-Shirts</Link></li>
                <li><Link to="/products?category=Dresses" className="hover:text-off-white transition-colors">Dresses</Link></li>
                <li><Link to="/products?category=Jeans" className="hover:text-off-white transition-colors">Jeans</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-off-white mb-4 uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-off-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-off-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-off-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Partner Stores</a></li>
                <li><a href="#" className="hover:text-off-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>&copy; 2026 InstaWear. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-stone-200/50 sticky bottom-0 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {mobileNavItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors relative ${
                  isActive
                    ? 'text-charcoal'
                    : 'text-stone-500'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-charcoal rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
