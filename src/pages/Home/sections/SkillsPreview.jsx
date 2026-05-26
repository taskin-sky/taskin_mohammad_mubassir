import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaCss3Alt,
  FaHtml5,
  FaGitAlt,
  FaServer,
  FaCloud,
  FaMobile,
} from 'react-icons/fa';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';
import AnimatedSection from '../../../components/animations/AnimatedSection';

export default function SkillsPreview() {
  // Enhanced skills with icons and colors
  const previewSkills = [
    {
      name: 'JavaScript',
      level: 85,
      icon: FaJs,
      color: '#F7DF1E',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      name: 'React.js',
      level: 85,
      icon: FaReact,
      color: '#61DAFB',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
    {
      name: 'Node.js',
      level: 75,
      icon: FaNodeJs,
      color: '#339933',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      name: 'Python',
      level: 70,
      icon: FaPython,
      color: '#3776AB',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      name: 'MongoDB',
      level: 75,
      icon: SiMongodb,
      color: '#47A248',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      name: 'Tailwind CSS',
      level: 85,
      icon: SiTailwindcss,
      color: '#06B6D4',
      bgColor: 'bg-sky-100 dark:bg-sky-900/30',
    },
  ];

  // Additional stats
  const skillStats = [
    { value: '6+', label: 'Years Coding', icon: '💻' },
    { value: '20+', label: 'Projects', icon: '🚀' },
    { value: '15+', label: 'Technologies', icon: '⚙️' },
    { value: '∞', label: 'Learning', icon: '📚' },
  ];

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              Technical Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              My Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {skillStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Skill Header with Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${skill.bgColor} flex items-center justify-center`}
                >
                  <skill.icon size={28} style={{ color: skill.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Skill Level Badge */}
              <div className="mt-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    skill.level >= 80
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : skill.level >= 70
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                  }`}
                >
                  {skill.level >= 80
                    ? 'Expert'
                    : skill.level >= 70
                      ? 'Advanced'
                      : 'Intermediate'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/skills">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(59,130,246,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all overflow-hidden group"
            >
              <span className="relative z-10">View All Skills</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
