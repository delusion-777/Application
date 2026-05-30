import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, MapPin, Star, X } from 'lucide-react';
import { mockProducts, categories, brands } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

export function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedBrand !== 'All',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-off-white pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-3">
            Discover Fashion
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Curated styles from nearby stores and exclusive deals
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 sticky top-20 z-40 bg-off-white/80 backdrop-blur-lg -mx-4 px-4 py-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal outline-none transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative px-5 py-3.5 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-2 font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-off-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white border border-stone-200 rounded-2xl p-6 space-y-6 overflow-hidden"
              >
                {/* Categories */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-charcoal">Category</h3>
                    {selectedCategory !== 'All' && (
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="text-sm text-stone-500 hover:text-charcoal transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-charcoal text-off-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-charcoal">Brand</h3>
                    {selectedBrand !== 'All' && (
                      <button
                        onClick={() => setSelectedBrand('All')}
                        className="text-sm text-stone-500 hover:text-charcoal transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedBrand === brand
                            ? 'bg-charcoal text-off-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-semibold text-charcoal mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal outline-none"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Nearest First</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-stone-600">
            <span className="font-semibold text-charcoal">{sortedProducts.length}</span> products found
          </p>
          {(selectedCategory !== 'All' || selectedBrand !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="text-sm text-stone-500 hover:text-charcoal transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-stone-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Search className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-2xl font-display font-bold text-charcoal mb-2">No products found</h3>
            <p className="text-stone-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="bg-charcoal text-off-white px-6 py-3 rounded-full font-medium hover:bg-charcoal-light transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.originalPrice && (
                        <div className="bg-charcoal text-off-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      {product.isOverstock && (
                        <div className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-2.5 py-1 rounded-full">
                          Deal
                        </div>
                      )}
                    </div>

                    {/* Hover Info */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 text-white text-xs bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-full w-fit">
                        <MapPin className="w-3 h-3" />
                        <span>{product.distance} km · {product.storeName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{product.brand}</div>
                    <h3 className="font-medium text-charcoal line-clamp-2 group-hover:text-stone-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-charcoal">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-stone-600">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
