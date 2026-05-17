import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaHeart,
  FaTrash,
  FaReply,
  FaCalendarAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import AnimatedSection from '../../components/animations/AnimatedSection';
import SEO from '../../components/SEO';

// Message Component
const MessageCard = ({ message, index, onLike, onDelete, isAdmin }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(message.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {message.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {message.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FaCalendarAlt size={12} />
              <span>{formatDate(message.date)}</span>
            </div>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
            isLiked || message.liked
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          }`}
        >
          <FaHeart size={14} />
          <span className="text-xs">{message.likes + (isLiked ? 1 : 0)}</span>
        </button>
      </div>

      {/* Email (optional) */}
      {message.email && (
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
          <FaEnvelope size={12} />
          <span>{message.email}</span>
        </div>
      )}

      {/* Message Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {message.message}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <button className="text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
          <FaReply size={12} />
          Reply
        </button>

        {isAdmin && (
          <button
            onClick={() => onDelete(message.id)}
            className="text-xs text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <FaTrash size={12} />
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Add Message Form
const AddMessageForm = ({ onAddMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (formData.message.length < 5) {
      toast.error('Message must be at least 5 characters');
      return;
    }

    setIsSubmitting(true);

    // Simulate delay
    setTimeout(() => {
      onAddMessage({
        ...formData,
        date: new Date().toISOString(),
        likes: 0,
        liked: false,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      toast.success('Message added to guestbook!');
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
        Leave a Message
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Share your thoughts, feedback, or just say hello! I'd love to hear from
        you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email (optional)
            </label>
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaComment
              className="absolute left-3 top-3 text-gray-400"
              size={14}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formData.message.length}/500 characters
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Message'}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Stats Component
const GuestbookStats = ({ messages }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { label: 'Total Messages', value: messages.length, icon: '💬' },
    {
      label: 'Total Likes',
      value: messages.reduce((sum, m) => sum + m.likes, 0),
      icon: '❤️',
    },
    { label: 'Happy Visitors', value: messages.length, icon: '😊' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

// Loading Skeleton
const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Empty State
const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No messages yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Be the first to leave a message in the guestbook!
      </p>
    </motion.div>
  );
};

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('guestbook_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add some demo messages
      const demoMessages = [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          message:
            'Amazing portfolio! Love the design and animations. Keep up the great work! 🚀',
          date: '2024-01-15T10:30:00Z',
          likes: 5,
          liked: false,
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael@example.com',
          message:
            'Your projects are impressive. Especially the Blog-Mela platform. Would love to collaborate!',
          date: '2024-01-10T15:45:00Z',
          likes: 3,
          liked: false,
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          email: 'emily@example.com',
          message:
            'Great skills section! The interactive skill bars are really cool. Looking forward to more content.',
          date: '2024-01-05T09:20:00Z',
          likes: 7,
          liked: false,
        },
      ];
      setMessages(demoMessages);
      localStorage.setItem('guestbook_messages', JSON.stringify(demoMessages));
    }
    setIsLoading(false);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('guestbook_messages', JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  // Add new message
  const addMessage = (newMessage) => {
    const messageWithId = {
      ...newMessage,
      id: Date.now(),
      likes: 0,
      liked: false,
    };
    setMessages([messageWithId, ...messages]);
  };

  // Like a message
  const likeMessage = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, likes: msg.likes + 1, liked: true }
          : msg
      )
    );
  };

  // Delete message (admin only)
  const deleteMessage = (messageId) => {
    if (isAdmin) {
      setMessages(messages.filter((msg) => msg.id !== messageId));
      toast.success('Message deleted');
    } else {
      toast.error('Admin access required');
    }
  };

  // Handle admin login
  const handleAdminLogin = () => {
    // Simple secret code: "admin123" (change this to your own)
    if (secretCode === 'admin123') {
      setIsAdmin(true);
      setShowAdminPanel(false);
      toast.success('Admin mode activated');
    } else {
      toast.error('Invalid secret code');
    }
    setSecretCode('');
  };

  return (
    <>
      <SEO
        customMeta={{
          title: 'Guestbook | Taskin Mubassir',
          description:
            'Leave a message in my guestbook! Share your thoughts, feedback, or just say hello.',
        }}
      />

      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Guestbook
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Leave your mark! Share your thoughts, feedback, or just say
                hello. I'd love to hear from visitors like you.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <GuestbookStats messages={messages} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Add Message Form */}
            <div className="lg:col-span-1">
              <AddMessageForm onAddMessage={addMessage} />

              {/* Admin Panel (Hidden) */}
              <div className="mt-4">
                {!isAdmin ? (
                  <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    🔒 Admin
                  </button>
                ) : (
                  <div className="text-xs text-green-600 dark:text-green-400 text-center">
                    ✅ Admin Mode Active
                  </div>
                )}

                {showAdminPanel && !isAdmin && (
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input
                      type="password"
                      placeholder="Secret code"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      className="w-full px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-900"
                    />
                    <button
                      onClick={handleAdminLogin}
                      className="w-full px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Messages List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                  Recent Messages
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {messages.length}{' '}
                  {messages.length === 1 ? 'message' : 'messages'}
                </span>
              </div>

              {isLoading ? (
                <LoadingSkeleton />
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <MessageCard
                      key={message.id}
                      message={message}
                      index={index}
                      onLike={likeMessage}
                      onDelete={deleteMessage}
                      isAdmin={isAdmin}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Social Share Section */}
          <AnimatedSection>
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Share this guestbook with others
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check out this awesome portfolio guestbook!&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaTwitter
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaLinkedin
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </a>
                <a
                  href={`https://github.com/taskin-sky`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaGithub
                    size={20}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
