import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2, ShoppingCart, Sparkles } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './Auth/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CardSlice';
function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch
  // Glowing gradient colors
  const gradientColors = [
    'from-pink-500 via-purple-500 to-indigo-500',
    'from-amber-500 via-orange-500 to-red-500',
    'from-emerald-500 via-teal-500 to-cyan-500'
  ];
  const [currentGradient, setCurrentGradient] = useState(0);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))

  }

  // Rotate gradient every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradientColors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, 'products'),
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff')
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(results);
    } catch (err) {
      setError("Couldn't fetch products 😢");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-40 py-28 px-4 sm:px-6 lg:px-8">
  {/* --- GLOWING SEARCH BAR --- */}
  <div className="max-w-2xl mx-auto">
    <motion.form
      onSubmit={handleSearch}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 10 }}
      className="relative"
    >
      {/* Animated gradient halo */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradientColors[currentGradient]} rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-all duration-700`}></div>

      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-gray-800/80 backdrop-blur-xl border border-gray-700 text-white placeholder-gray-400 pl-6 pr-14 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl transition-all duration-300"
          placeholder="What are you craving today?"
        />

        <button
          type="submit"
          className={`absolute right-2 p-2 rounded-full transition-all duration-500 ${searchTerm
            ? `bg-gradient-to-br ${gradientColors[currentGradient]} shadow-lg shadow-pink-500/30`
            : 'bg-gray-700 hover:bg-gray-600'
            }`}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <SearchIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </motion.form>

    {/* Floating sparkles when focused */}
    <AnimatePresence>
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex justify-center mt-2 space-x-1"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-pink-400" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* --- PRODUCT GRID --- */}
  <div className="mt-16">
    {error && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-pink-400 mb-8"
      >
        ⚠️ {error}
      </motion.div>
    )}

    <AnimatePresence>
      {products.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src={item.imageUrl || 'https://via.placeholder.com/300'}
                  alt={item.title}
                />
                <button
                  onClick={handleAddToCart(item)}
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    ₹{item.price || 'N/A'}
                  </span>
                  <span className="text-sm text-gray-400">⭐ {item.rating || '5.0'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : searchTerm && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-lg">No matches for "<span className="text-pink-400">{searchTerm}</span>"</div>
          <div className="mt-4 text-gray-500">Try something like "shoes" or "electronics"</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
  );
}

export default Search;