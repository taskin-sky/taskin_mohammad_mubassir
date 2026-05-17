import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
    >
      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
        Subscribe to My Newsletter
      </h3>
      <p className="mb-6 text-white text-opacity-90 max-w-md mx-auto">
        Get the latest posts delivered right to your inbox. No spam, ever.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-1 relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="text-xs text-white text-opacity-70 mt-4">
        Unsubscribe at any time. Your privacy is respected.
      </p>
    </motion.div>
  );
};

export default NewsletterSignup;
