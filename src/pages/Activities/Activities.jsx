import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaTrophy,
  FaCalendarAlt,
  FaMedal,
  FaUsers,
  FaCamera,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import {
  clubs,
  competitions,
  timeline,
  stats,
} from '../../data/activitiesData';
import AnimatedSection from '../../components/animations/AnimatedSection';
import SEO from '../../components/SEO';

// Club Card Component
const ClubCard = ({ club, index, onOpenGallery }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
    >
      <div className={`h-2 bg-gradient-to-r ${club.color}`}></div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{club.icon}</span>
          <div>
            <h3 className="text-xl font-bold">{club.name}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {club.role}
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {club.description}
        </p>

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">Activities:</h4>
          <ul className="space-y-1">
            {club.activities.slice(0, 3).map((activity, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span className="text-blue-500">•</span>
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {club.achievements && club.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Achievements:</h4>
            <div className="flex flex-wrap gap-2">
              {club.achievements.map((achievement, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg text-xs"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500">{club.period}</span>
          {club.gallery && (
            <button
              onClick={() => onOpenGallery(club.gallery, club.name)}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1"
            >
              <FaCamera size={14} />
              View Gallery
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Competition Card Component
const CompetitionCard = ({ competition, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${competition.color} rounded-xl p-6 text-white shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{competition.icon}</span>
        <span className="px-2 py-1 bg-white bg-opacity-20 rounded-lg text-sm font-semibold">
          {competition.year}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-1">{competition.name}</h3>
      <p className="text-sm text-white text-opacity-90 mb-2">
        {competition.event}
      </p>
      <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold mb-3">
        {competition.result}
      </div>
      <p className="text-sm text-white text-opacity-80">
        {competition.description}
      </p>
    </motion.div>
  );
};

// Timeline Component
const Timeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="relative"
    >
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

      {timeline.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative flex flex-col md:flex-row items-start md:items-center mb-8 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Timeline Dot */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

          {/* Content */}
          <div
            className={`ml-12 md:ml-0 w-full md:w-5/12 ${
              index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {item.year}
                  </span>
                  <h4 className="font-bold">{item.title}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Stat Counter Component
const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useState(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = stat.value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl"
    >
      <div className="text-4xl mb-2">{stat.icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">
        {stat.label}
      </div>
    </motion.div>
  );
};

// Lightbox Gallery Component
const Lightbox = ({ images, title, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <FaTimes size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        className="absolute left-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="absolute right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <FaChevronRight size={24} />
      </button>

      <div
        className="max-w-4xl max-h-[80vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="max-w-full max-h-[70vh] object-contain mx-auto"
        />
        <p className="text-white text-center mt-4">
          {title} - Image {currentIndex + 1} of {images.length}
        </p>
      </div>
    </motion.div>
  );
};

export default function Activities() {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    title: '',
  });

  const openGallery = (images, title) => {
    setLightbox({ isOpen: true, images, title });
  };

  const closeGallery = () => {
    setLightbox({ isOpen: false, images: [], title: '' });
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Activities & Achievements
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Beyond coding, I'm passionate about robotics, sports, and
                adventure. Here's a glimpse into my extracurricular journey.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Clubs Section */}
          <AnimatedSection className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-3 flex items-center justify-center gap-2">
                <FaUsers className="text-blue-600" />
                Clubs & Organizations
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Active memberships that shaped my journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club, index) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  index={index}
                  onOpenGallery={openGallery}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Competitions Section */}
          <AnimatedSection className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-3 flex items-center justify-center gap-2">
                <FaTrophy className="text-yellow-500" />
                Competitions & Achievements
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Showcasing skills and winning spirit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((competition, index) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  index={index}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Journey Timeline */}
          <AnimatedSection className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-3 flex items-center justify-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                My Journey Timeline
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Key milestones and memorable moments
              </p>
            </div>

            <Timeline />
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection>
            <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Want to Collaborate?
              </h3>
              <p className="mb-6 text-white text-opacity-90">
                I'm always open to new opportunities, collaborations, and
                adventures!
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Get in Touch
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Lightbox Gallery */}
        <AnimatePresence>
          {lightbox.isOpen && (
            <Lightbox
              images={lightbox.images}
              title={lightbox.title}
              onClose={closeGallery}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
