import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../../../components/animations/AnimatedSection';
import { projects } from '../../../data/projectsData';

export default function FeaturedProjects() {
  // Get first 3 projects for featured section
  const featuredProjects = projects.slice(0, 3);

  return (
    <AnimatedSection className="py-20 bg-gray-50 dark:bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-blue-600">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-800 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion
            for development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-4xl text-white">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  {project.tech.join(', ')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <Link to="/projects">
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors">
                    Learn More →
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              View All Projects
            </motion.button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
