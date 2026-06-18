import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WorldCupAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // sessionStorage ব্যবহার করছি - ট্যাব বন্ধ করলেই ডাটা মুছে যাবে
    const wasClosed = sessionStorage.getItem('worldCupBarClosed');
    if (wasClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // sessionStorage ব্যবহার করছি localStorage এর পরিবর্তে
    sessionStorage.setItem('worldCupBarClosed', 'true');
  };

  // Generate particle effect on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setParticles((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FF9F43'][
              Math.floor(Math.random() * 5)
            ],
            duration: Math.random() * 2 + 1,
          },
        ]);
        setTimeout(() => {
          setParticles((prev) => prev.slice(1));
        }, 3000);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -100, opacity: 0, scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          opacity: { duration: 0.5 },
        }}
        className="relative w-full overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background:
            'linear-gradient(135deg, #0a0e27 0%, #1a1a4e 25%, #1e3a5f 50%, #2d1b69 75%, #0a0e27 100%)',
          backgroundSize: '400% 400%',
        }}
      >
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(270deg, #0a0e27 0%, #1a1a4e 25%, #1e3a5f 50%, #2d1b69 75%, #0a0e27 100%)',
            backgroundSize: '400% 400%',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400/20 to-purple-600/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/20 to-pink-600/20 blur-3xl"
        />

        {/* Stars Background */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Particles on Hover */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size + 'px',
              height: particle.size + 'px',
              backgroundColor: particle.color,
              top: particle.y + '%',
              left: particle.x + '%',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 0],
              opacity: [1, 0.5, 0],
              y: [-20, -60, -100],
            }}
            transition={{ duration: particle.duration }}
          />
        ))}

        {/* Decorative Football Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              style={{
                top: `${(i * 8 + 5) % 100}%`,
                left: `${(i * 12 + 3) % 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              ⚽
            </motion.div>
          ))}
        </div>

        {/* Main Content - Only Title */}
        <div className="relative z-10 container mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            {/* Left Decorative - Host Nation Flags */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-3 text-3xl"
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🇺🇸
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                🇨🇦
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              >
                🇲🇽
              </motion.span>
            </motion.div>

            {/* Main Message - Only Title */}
            <motion.div
              className="flex-1 text-center"
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                {/* Animated Trophy */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-2xl md:text-3xl"
                >
                  🏆
                </motion.div>

                {/* Main Title with Glow */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <motion.a
                    href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative font-black text-lg md:text-xl lg:text-2xl tracking-wider"
                    style={{
                      background:
                        'linear-gradient(135deg, #FFD700 0%, #FF6B6B 25%, #FF9F43 50%, #FFD700 75%, #FF6B6B 100%)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'gradientText 3s ease infinite',
                    }}
                  >
                    WORLD CUP 2026
                  </motion.a>
                  <motion.div
                    className="absolute -inset-1 blur-xl opacity-50"
                    style={{
                      background:
                        'linear-gradient(135deg, #FFD700, #FF6B6B, #FF9F43)',
                      filter: 'blur(20px)',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                {/* Animated Soccer Ball */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="text-2xl md:text-3xl"
                >
                  ⚽
                </motion.div>
              </div>
            </motion.div>

            {/* Right Decorative - Globe */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="hidden md:block text-3xl"
            >
              🌎
            </motion.div>
          </div>
        </div>

        {/* Animated Border Glow */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-0 h-0.5 w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #FFD700, #FF6B6B, #FF9F43, transparent)',
          }}
        />
        <motion.div
          animate={{
            x: ['100%', '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-0 left-0 h-0.5 w-full"
          style={{
            background:
              'linear-gradient(270deg, transparent, #FFD700, #FF6B6B, #FF9F43, transparent)',
          }}
        />

        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close announcement"
        >
          <svg
            className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        {/* CSS for gradient animation */}
        <style jsx>{`
          @keyframes gradientText {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorldCupAnnouncementBar;
