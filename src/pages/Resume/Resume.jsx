import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGraduationCap,
  FaBriefcase,
  FaTrophy,
  FaAward,
  FaDownload,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaCode,
  FaRobot,
  FaFutbol,
  FaBrain,
} from 'react-icons/fa';
import {
  education,
  experience,
  training,
  achievements,
} from '../../data/personalData';
import AnimatedSection from '../../components/animations/AnimatedSection';
import SEO from '../../components/SEO';

// Custom Timeline Component
const TimelineItem = ({ item, type, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const icons = {
    education: <FaGraduationCap className="text-blue-600 dark:text-blue-400" />,
    experience: <FaBriefcase className="text-green-600 dark:text-green-400" />,
    training: <FaCode className="text-purple-600 dark:text-purple-400" />,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-12"
    >
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>

      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-5 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-600 dark:border-blue-400 z-10 items-center justify-center">
        {icons[type]}
      </div>

      {/* Content */}
      <div className="ml-0 md:ml-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.title || item.degree}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {item.company || item.institution || item.provider}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt size={14} />
              <span>{item.period || item.year}</span>
            </div>
          </div>

          {item.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <FaMapMarkerAlt size={14} />
              <span>{item.location}</span>
            </div>
          )}

          {(item.cgpa || item.gpa) && (
            <div className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm mb-3">
              GPA: {item.cgpa || item.gpa}
            </div>
          )}

          {item.thesis && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Thesis:</span> {item.thesis}
              </p>
            </div>
          )}

          {item.coursework && (
            <div className="mb-3">
              <p className="text-sm font-semibold mb-2">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {item.coursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.responsibilities && (
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {item.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-sm">
                  {resp}
                </li>
              ))}
            </ul>
          )}

          {item.achievements && (
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {item.achievements.map((ach, idx) => (
                <li key={idx} className="text-sm">
                  {ach}
                </li>
              ))}
            </ul>
          )}

          {item.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Achievement Card Component
const AchievementCard = ({ achievement, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Robotics':
        return <FaRobot className="text-blue-600" size={24} />;
      case 'Coding':
        return <FaCode className="text-green-600" size={24} />;
      case 'Sports':
        return <FaFutbol className="text-yellow-600" size={24} />;
      default:
        return <FaBrain className="text-purple-600" size={24} />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {getCategoryIcon(achievement.category)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{achievement.title}</h3>
          <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
            {achievement.event}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {achievement.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <FaStar className="text-yellow-500" size={14} />
            <span className="text-xs text-gray-500">{achievement.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Download Resume Button Component
const DownloadResume = () => {
  const handleDownload = () => {
    // Create a temporary link to download resume
    const link = document.createElement('a');
    link.href = '/documents/Taskin_Mubassir_Resume.pdf';
    link.download = 'Taskin_Mubassir_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 no-print"
    >
      <FaDownload size={18} />
      <span className="hidden md:inline">Download Resume</span>
    </motion.button>
  );
};

// Stats Counter Component
const StatCounter = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useState(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {label}
      </div>
    </div>
  );
};

export default function Resume() {
  const stats = [
    { end: 3, label: 'Years of Learning', suffix: '+' },
    { end: 10, label: 'Projects Completed', suffix: '+' },
    { end: 5, label: 'Technologies Mastered', suffix: '+' },
    { end: 3, label: 'Clubs Participated', suffix: '' },
  ];

  return (
    <>
      <SEO />
      <div className="min-h-screen py-20">
        <DownloadResume />

        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Resume
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A passionate developer with a strong foundation in computer
                science and hands-on experience in full-stack web development.
                Here's my journey so far.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCounter
                  key={index}
                  end={stat.end}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              {/* Education Section */}
              <AnimatedSection>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <FaGraduationCap
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">Education</h2>
                  </div>
                  <div>
                    {education.map((edu, index) => (
                      <TimelineItem
                        key={index}
                        item={edu}
                        type="education"
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Experience Section */}
              <AnimatedSection>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <FaBriefcase
                        className="text-green-600 dark:text-green-400"
                        size={24}
                      />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">
                      Experience
                    </h2>
                  </div>
                  <div>
                    {experience.map((exp, index) => (
                      <TimelineItem
                        key={index}
                        item={exp}
                        type="experience"
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Training Section */}
              <AnimatedSection>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <FaCode
                        className="text-purple-600 dark:text-purple-400"
                        size={24}
                      />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">Training</h2>
                  </div>
                  <div>
                    {training.map((train, index) => (
                      <TimelineItem
                        key={index}
                        item={train}
                        type="training"
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column */}
            <div>
              {/* Achievements Section */}
              <AnimatedSection>
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <FaTrophy
                        className="text-yellow-600 dark:text-yellow-400"
                        size={24}
                      />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">
                      Achievements
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <AchievementCard
                        key={index}
                        achievement={achievement}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Quick Facts */}
              <AnimatedSection>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-bold mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        CGPA
                      </span>
                      <span className="font-semibold">3.19/4.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Projects Built
                      </span>
                      <span className="font-semibold">10+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Technologies
                      </span>
                      <span className="font-semibold">15+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Certifications
                      </span>
                      <span className="font-semibold">5+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Hackathons
                      </span>
                      <span className="font-semibold">3</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-2">Areas of Interest</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                        Web Development
                      </span>
                      <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                        Machine Learning
                      </span>
                      <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                        AI
                      </span>
                      <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                        Robotics
                      </span>
                      <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm">
                        Open Source
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Languages */}
              <AnimatedSection className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-serif font-bold mb-4">
                    Languages
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Bengali</span>
                        <span className="text-sm text-gray-500">Native</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>English</span>
                        <span className="text-sm text-gray-500">Fluent</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Hindi</span>
                        <span className="text-sm text-gray-500">
                          Conversational
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: '70%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Print Styles Note */}
          <style jsx>{`
            @media print {
              .no-print {
                display: none !important;
              }
              body {
                print-color-adjust: exact;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
