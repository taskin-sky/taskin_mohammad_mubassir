import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaHeart,
  FaUser,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCopy,
} from 'react-icons/fa';
import { blogPosts } from '../../data/blogData';
import toast from 'react-hot-toast';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      setLikesCount(foundPost.likes);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      toast.success('Thanks for liking this post!');
    } else {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8 transition-colors"
          >
            <FaArrowLeft size={16} />
            Back to Blog
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <Link to={`/blog?category=${post.category}`}>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FaUser size={14} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt size={14} />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock size={14} />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEye size={14} />
                <span>{post.views} views</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden"
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-6xl text-white">📝</span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            {post.tags.map((tag, idx) => (
              <Link key={idx} to={`/blog?search=${tag}`}>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-100 dark:bg-red-900 text-red-600'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
              }`}
            >
              <FaHeart className={liked ? 'fill-current' : ''} />
              <span>{likesCount}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaShare />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <FaFacebook className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <FaTwitter className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <FaLinkedin className="text-blue-700" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <FaCopy />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
