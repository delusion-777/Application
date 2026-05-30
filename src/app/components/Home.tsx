import { Link } from 'react-router';
import { ArrowRight, Sparkles, Clock, MapPin, Star, Shield, Truck, Heart, Package } from 'lucide-react';
import { mockStores, mockProducts } from '../data/mockData';
import { motion } from 'motion/react';

export function Home() {
  const featuredProducts = mockProducts.filter(p => p.isOverstock).slice(0, 6);
  const trendingProducts = mockProducts.filter(p => p.rating >= 4.5).slice(0, 8);

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-off-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-90" />

        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=90"
            alt="Fashion Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm tracking-wide">Hyperlocal Fashion · Delivered in Minutes</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight tracking-tight">
              Not Every Good Fit<br />
              Is <span className="italic text-gold-muted">Your</span> Fit.
            </h1>

            <p className="text-xl sm:text-2xl text-stone-300 mb-4 max-w-2xl font-light leading-relaxed">
              What looks good on everyone isn't always made for you.
            </p>
            <p className="text-lg sm:text-xl text-stone-400 mb-12 max-w-2xl font-light">
              Wear what feels like you. Delivered in 30 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 bg-off-white text-charcoal px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-all duration-300 hover:gap-4"
              >
                Discover Your Style
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                Find Nearby Stores
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              <div>
                <div className="text-3xl font-display font-bold mb-1">30 min</div>
                <div className="text-sm text-stone-400 uppercase tracking-wider">Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold mb-1">500+</div>
                <div className="text-sm text-stone-400 uppercase tracking-wider">Local Stores</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold mb-1">50K+</div>
                <div className="text-sm text-stone-400 uppercase tracking-wider">Styles</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Discovery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-charcoal" />
              <span className="text-sm font-medium tracking-wide">AI-Powered Styling</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-6">
              Curated Just for You
            </h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Our AI understands your style preferences, body type, and local trends to recommend pieces that actually fit your life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 bg-charcoal text-off-white text-xs font-medium px-3 py-1.5 rounded-full">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{product.distance} km away</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{product.brand}</div>
                    <h3 className="font-medium text-charcoal group-hover:text-stone-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-charcoal">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Stores */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-3">
                Fashion Near You
              </h2>
              <p className="text-lg text-stone-600 font-light">Discover boutiques and stores in your neighborhood</p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-charcoal hover:gap-3 transition-all font-medium"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStores.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-charcoal mb-3">{store.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <MapPin className="w-4 h-4" />
                      <span>{store.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="font-medium text-charcoal">{store.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-6">
              Trending in Your Area
            </h2>
            <p className="text-lg text-stone-600 font-light">
              What's popular among fashion lovers near you right now
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3 bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.isOverstock && (
                      <div className="absolute top-3 left-3 bg-charcoal text-off-white text-xs font-medium px-2.5 py-1 rounded-full">
                        Deal
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{product.brand}</div>
                    <h4 className="text-sm font-medium text-charcoal line-clamp-2 group-hover:text-stone-600 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-charcoal">₹{product.price}</span>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-charcoal text-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Fashion in 30 Minutes
            </h2>
            <p className="text-lg text-stone-300 font-light">
              Hyperlocal quick-commerce meets luxury fashion
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                icon: MapPin,
                title: 'Discover',
                description: 'Browse curated styles from nearby stores and our exclusive deals',
              },
              {
                icon: Sparkles,
                title: 'Personalize',
                description: 'Get AI-powered recommendations based on your unique style',
              },
              {
                icon: Package,
                title: 'Order',
                description: 'Select your perfect fit and checkout in seconds',
              },
              {
                icon: Truck,
                title: 'Receive',
                description: 'Get it delivered to your door in 30-45 minutes',
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold-muted/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-gold/20">
                  <step.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-stone-400 font-light leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-6">
              Loved by Fashion Enthusiasts
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Finally, a platform that understands my style. The AI recommendations are eerily accurate!",
                author: "Priya S.",
                location: "Mumbai",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              },
              {
                quote: "30-minute delivery for fashion? Game changer. I ordered a dress for an event and it arrived before I finished my makeup.",
                author: "Rahul M.",
                location: "Bangalore",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              },
              {
                quote: "Love supporting local boutiques while getting the convenience of quick delivery. InstaWear is brilliant.",
                author: "Aisha K.",
                location: "Delhi",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.author}</div>
                    <div className="text-sm text-stone-500">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal text-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Find Your Perfect Fit
            </h2>
            <p className="text-xl text-stone-300 mb-12 font-light">
              Start your personalized fashion journey today
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-off-white text-charcoal px-10 py-5 rounded-full font-semibold hover:bg-stone-100 transition-all duration-300 text-lg group hover:gap-4"
            >
              Explore Now
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
