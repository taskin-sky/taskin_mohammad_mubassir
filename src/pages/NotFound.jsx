import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function NotFound() {
  const location = useLocation();
  const [suggestions, setSuggestions] = useState([]);
  const [countdown, setCountdown] = useState(10);

  // Get the path that wasn't found
  const notFoundPath = location.pathname;

  // Suggested pages based on common mistakes
  const allPages = [
    { path: '/', name: 'Home', keywords: ['home', 'index', 'main'] },
    {
      path: '/resume',
      name: 'Resume',
      keywords: ['resume', 'cv', 'curriculum', 'vitae'],
    },
    {
      path: '/projects',
      name: 'Projects',
      keywords: ['projects', 'work', 'portfolio', 'apps'],
    },
    {
      path: '/skills',
      name: 'Skills',
      keywords: ['skills', 'technologies', 'tech'],
    },
    { path: '/blog', name: 'Blog', keywords: ['blog', 'articles', 'posts'] },
    {
      path: '/activities',
      name: 'Activities',
      keywords: ['activities', 'hobbies', 'clubs'],
    },
    {
      path: '/contact',
      name: 'Contact',
      keywords: ['contact', 'reach', 'connect'],
    },
  ];

  useEffect(() => {
    // Find matching suggestions based on the path
    const pathLower = notFoundPath.toLowerCase();
    const matched = allPages.filter(
      (page) =>
        page.keywords.some((keyword) => pathLower.includes(keyword)) ||
        page.name.toLowerCase().includes(pathLower) ||
        pathLower.includes(page.name.toLowerCase())
    );
    setSuggestions(matched.slice(0, 3));

    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [notFoundPath]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold font-serif"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                4
              </span>
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                0
              </motion.span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                4
              </span>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 text-4xl opacity-50"
            >
              🧩
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute bottom-1/4 right-1/4 text-3xl opacity-50"
            >
              🔍
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-mono mb-8">
              Path: {notFoundPath}
            </p>
          </motion.div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Did you mean?
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestions.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaHome />
                Back to Home
              </motion.button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-600 dark:hover:border-blue-600 transition-colors flex items-center gap-2"
            >
              <FaArrowLeft />
              Go Back
            </button>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <FaEnvelope />
                Contact Support
              </motion.button>
            </Link>
          </motion.div>

          {/* Auto Redirect Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-500"
          >
            <p>
              You will be redirected to the homepage in
              <span className="font-bold text-blue-600 dark:text-blue-400 mx-1">
                {countdown}
              </span>
              seconds
            </p>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
              Quick Navigation
            </h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/resume"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Resume
              </Link>
              <Link
                to="/projects"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/skills"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Skills
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/activities"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Activities
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-xs text-gray-400 dark:text-gray-600"
          >
            <p>
              💡 Fun Fact: 404 errors are named after room 404 at CERN where the
              first web servers were located!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
