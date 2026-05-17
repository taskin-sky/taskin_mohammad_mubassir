import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaHeart,
  FaTag,
  FaUser,
  FaArrowRight,
} from 'react-icons/fa';
import {
  blogPosts,
  categories,
  popularTags,
  recentPosts,
} from '../../data/blogData';
import AnimatedSection from '../../components/animations/AnimatedSection';
import BlogCard from './components/BlogCard';
import BlogSidebar from './components/BlogSidebar';
import NewsletterSignup from './components/NewsletterSignup';
import SEO from '../../components/SEO';

// Featured Post Component
const FeaturedPost = ({ post }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (!post) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden mb-12"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-8 md:p-12 text-white">
        <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm mb-4">
          Featured Post
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {post.title}
        </h2>
        <p className="text-white text-opacity-90 mb-6 max-w-2xl">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={14} />
            <span className="text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock size={14} />
            <span className="text-sm">{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye size={14} />
            <span className="text-sm">{post.views} views</span>
          </div>
        </div>
        <Link to={`/blog/${post.id}`}>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
            Read Article
            <FaArrowRight size={14} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category.name)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            selectedCategory === category.name
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
          <span
            className={`text-xs ${selectedCategory === category.name ? 'text-white' : 'text-gray-500'}`}
          >
            ({category.count})
          </span>
        </button>
      ))}
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-8">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search articles by title, category, or tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

// Results Count Component
const ResultsCount = ({ count, total, searchTerm, selectedCategory }) => {
  if (searchTerm || selectedCategory !== 'All') {
    return (
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          Found <span className="font-bold text-blue-600">{count}</span>{' '}
          {count === 1 ? 'article' : 'articles'}
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>
    );
  }
  return null;
};

// Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
        >
          <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-t-xl"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-3"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Blog() {
  const [posts] = useState(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get featured post (most viewed)
  const featuredPost = [...blogPosts].sort((a, b) => b.views - a.views)[0];

  // Filter posts based on category and search
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...posts];

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(
          (post) => post.category === selectedCategory
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }

      setFilteredPosts(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  }, [selectedCategory, searchTerm, posts]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SEO />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Blog
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Thoughts, learnings, and insights from my journey in web
                development and technology.
              </p>
            </div>
          </AnimatedSection>

          {/* Featured Post */}
          {!searchTerm && selectedCategory === 'All' && (
            <FeaturedPost post={featuredPost} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Results Count */}
              <ResultsCount
                count={filteredPosts.length}
                total={posts.length}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />

              {/* Blog Posts Grid */}
              {isLoading ? (
                <LoadingSkeleton />
              ) : filteredPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === index + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No articles found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <BlogSidebar />
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </>
  );
}
