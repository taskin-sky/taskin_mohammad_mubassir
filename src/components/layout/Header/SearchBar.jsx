import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '../../../context/SearchContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } =
    useSearch();

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        <FiSearch size={20} />
      </button>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <FiSearch className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects, blogs, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 ml-3 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                {searchQuery && (
                  <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing results for:{' '}
                    <span className="font-semibold">{searchQuery}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
