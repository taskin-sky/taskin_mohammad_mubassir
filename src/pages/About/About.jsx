import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // ✅ FIXED: Import from correct package
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaCode,
  FaRocket,
  FaCoffee,
  FaFutbol,
  FaPlane,
  FaBook,
  FaStar,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaQuoteLeft,
  FaHeart,
  FaCamera,
} from 'react-icons/fa';
import { aboutInfo, galleryImages } from '../../data/aboutData';
import SEO from '../../components/SEO';
import AnimatedSection from '../../components/animations/AnimatedSection';

// Timeline Component
// Enhanced Timeline Component
// Compact Vertical Timeline
const JourneyTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { milestones } = aboutInfo.journey;

  return (
    <div ref={ref} className="relative py-4">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />

      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="relative pl-14 pb-8 last:pb-0"
        >
          {/* Dot */}
          <div className="absolute left-4 top-1">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"
                style={{
                  width: '12px',
                  height: '12px',
                  left: '-2px',
                  top: '-2px',
                }}
              />
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
          </div>

          {/* Year Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-semibold mb-2">
            <FaCalendarAlt size={10} />
            <span>{milestone.year}</span>
          </div>

          {/* Content */}
          <div className="flex items-start gap-2 mb-1">
            <span className="text-xl">{milestone.icon}</span>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {milestone.event}
            </h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 pl-9">
            {milestone.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// Education Card Component
const EducationCard = ({ edu, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{edu.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {edu.level}
            </h3>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
              {edu.year}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {edu.institution}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {edu.location}
          </p>
          {(edu.gpa || edu.cgpa) && (
            <p className="text-sm mt-2 inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
              {edu.gpa ? `GPA: ${edu.gpa}` : `CGPA: ${edu.cgpa}`}
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {edu.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Goal Card Component
const GoalCard = ({ goal, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg text-center"
    >
      <div className="text-4xl mb-3">{goal.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {goal.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {goal.description}
      </p>
      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
        {goal.timeline}
      </span>
    </motion.div>
  );
};

// Fun Fact Card
const FunFactCard = ({ fact, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <span className="text-2xl">{fact.icon}</span>
      <span className="text-gray-700 dark:text-gray-300">{fact.fact}</span>
    </motion.div>
  );
};

// Gallery Component
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-gradient-to-r from-blue-500 to-purple-500"
            onClick={() => setSelectedImage(img)}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaCamera size={32} className="text-white opacity-50" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            {selectedImage.src ? (
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center rounded-xl">
                <p className="text-white text-center">
                  <FaCamera size={48} className="mx-auto mb-2" />
                  {selectedImage.title}
                </p>
              </div>
            )}
            <p className="text-white text-center mt-4">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default function About() {
  const stats = [
    { label: 'Projects Completed', value: '15+', icon: '🚀' },
    { label: 'Technologies', value: '20+', icon: '💻' },
    { label: 'Coffee Consumed', value: '∞', icon: '☕' },
    { label: 'Football Goals', value: '25+', icon: '⚽' },
  ];

  return (
    <>
      <SEO
        customMeta={{
          title: 'About Me | Taskin Mohammad Mubassir',
          description:
            'Learn about my journey, education, goals, and passion for technology. Get to know the person behind the code.',
        }}
      />

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                About Me
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Get to know the person behind the code - my journey, passions,
                and what drives me.
              </p>
            </div>
          </AnimatedSection>

          {/* Hero Section with Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl text-white">
                    <img src="/public/taskin.png" alt="" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {aboutInfo.name}
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400">
                      {aboutInfo.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>From: {aboutInfo.hometown}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-purple-500" />
                    <span>Currently: {aboutInfo.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaCalendarAlt className="text-pink-500" />
                    <span>Born: {aboutInfo.birthDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutInfo.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey Timeline */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
              My Journey
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <JourneyTimeline />
            </div>
          </AnimatedSection>

          {/* Education Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
              Education
            </h2>
            <div className="space-y-4">
              {aboutInfo.education.map((edu, index) => (
                <EducationCard key={index} edu={edu} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {/* Goals Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
              My Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutInfo.goals.map((goal, index) => (
                <GoalCard key={index} goal={goal} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {/* Fun Facts */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
              Fun Facts
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {aboutInfo.funFacts.map((fact, index) => (
                <FunFactCard key={index} fact={fact} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {/* Quote */}
          <AnimatedSection className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <FaQuoteLeft className="text-4xl mx-auto mb-4 opacity-50" />
              <p className="text-xl md:text-2xl font-serif italic mb-4">
                "Code is like poetry. Every line should have a purpose and tell
                a story."
              </p>
              <p className="text-sm opacity-75">- Taskin Mohammad Mubassir</p>
            </div>
          </AnimatedSection>

          {/* Gallery */}
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
              Moments Gallery
            </h2>
            <Gallery />
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection>
            <div className="mt-12 text-center">
              <div className="inline-flex gap-4">
                <a
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="/resume"
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-600 dark:hover:border-blue-600 transition-colors"
                >
                  View Resume
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
