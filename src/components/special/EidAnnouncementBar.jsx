import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const EidAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Check if the bar was closed before
  useEffect(() => {
    const wasClosed = localStorage.getItem('eidBarClosed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('eidBarClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 dark:from-emerald-800 dark:via-green-800 dark:to-emerald-900 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl hidden sm:block"
        >
          🌙
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hidden sm:block"
        >
          ⭐
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left decorative star */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="hidden md:block text-xl"
            >
              ✨
            </motion.div>

            {/* Main Message */}
            <div className="flex-1 text-center">
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-3 flex-wrap justify-center"
              >
                {/* Animated emoji */}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="text-xl md:text-2xl inline-block"
                >
                  🐂
                </motion.span>

                {/* Text with gradient */}
                <a
                  href="https://bn.wikipedia.org/wiki/%E0%A6%88%E0%A6%A6%E0%A7%81%E0%A6%B2_%E0%A6%86%E0%A6%AF%E0%A6%B9%E0%A6%BE"
                  className="text-white font-semibold text-sm md:text-base lg:text-lg tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                >
                  ঈদ মোবারক!
                </a>

                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="text-xl md:text-2xl inline-block"
                >
                  🐂
                </motion.span>
              </motion.div>

              {/* Subtitle text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-xs md:text-sm mt-1"
              >
                আপনাকে ও আপনার পরিবারকে ঈদুল আজহার শুভেচ্ছা
              </motion.p>
            </div>

            {/* Right decorative star */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden md:block text-xl"
            >
              🌟
            </motion.div>
          </div>
        </div>

        {/* Bottom border animation */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          style={{ width: '100%' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default EidAnnouncementBar;
