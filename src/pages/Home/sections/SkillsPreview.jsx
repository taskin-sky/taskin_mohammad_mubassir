import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../../../components/animations/AnimatedSection';
import { skills } from '../../../data/personalData';

export default function SkillsPreview() {
  // Get top 6 skills for preview
  const previewSkills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React.js', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'MongoDB', level: 75 },
    { name: 'Tailwind CSS', level: 85 },
  ];

  return (
    <AnimatedSection className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {previewSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {skill.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/skills">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors"
            >
              View All Skills
            </motion.button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
