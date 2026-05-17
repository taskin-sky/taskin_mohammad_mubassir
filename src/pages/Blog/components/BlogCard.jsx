import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaClock, FaEye, FaHeart, FaUser } from 'react-icons/fa';

const BlogCard = ({ post, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
    >
      {/* Image */}
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-50 transition-opacity z-10"></div>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-4xl text-white">📝</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <Link to={`/blog?category=${post.category}`}>
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold mb-3 hover:bg-blue-200 transition-colors">
            {post.category}
          </span>
        </Link>

        {/* Title */}
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <FaUser size={12} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt size={12} />
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock size={12} />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <Link key={idx} to={`/blog?search=${tag}`}>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs hover:bg-gray-200 transition-colors">
                #{tag}
              </span>
            </Link>
          ))}
        </div>

        {/* Stats and Read More */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FaEye size={14} />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FaHeart size={14} />
              <span>{post.likes}</span>
            </div>
          </div>
          <Link to={`/blog/${post.id}`}>
            <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1 text-sm">
              Read More
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;
