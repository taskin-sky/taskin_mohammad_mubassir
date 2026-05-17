import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTag, FaNewspaper, FaFire } from 'react-icons/fa';
import { popularTags, recentPosts } from '../../../data/blogData';

const BlogSidebar = () => {
  const tags = popularTags();
  const recent = recentPosts();

  return (
    <div className="space-y-8">
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-serif font-bold mb-4">About the Author</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            TM
          </div>
          <div>
            <p className="font-semibold">Taskin Mubassir</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              MERN Stack Developer
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Passionate developer sharing insights about web development, machine
          learning, and technology. Building cool stuff and learning every day.
        </p>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <FaTag className="text-blue-600" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link key={index} to={`/blog?search=${tag.name}`}>
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 transition-colors">
                #{tag.name} ({tag.count})
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
          <FaNewspaper className="text-green-600" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recent.map((post, index) => (
            <Link key={index} to={`/blog/${post.id}`}>
              <div className="flex gap-3 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Featured Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <FaFire className="text-3xl mb-3" />
        <p className="text-lg font-serif italic mb-2">
          "Code is like humor. When you have to explain it, it's bad."
        </p>
        <p className="text-sm text-white text-opacity-80">- Cory House</p>
      </motion.div>
    </div>
  );
};

export default BlogSidebar;
