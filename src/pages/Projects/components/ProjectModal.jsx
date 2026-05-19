import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaCode, // ✅ ADD THIS IMPORT
} from 'react-icons/fa';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  const [modalImageIndex, setModalImageIndex] = useState(0);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'React':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'MERN':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'PHP':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="sticky top-4 right-4 float-right z-10 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="p-6 pt-0">
              {/* Header Image - IMPROVED VERSION */}
              <div className="w-full rounded-xl overflow-hidden mb-6 -mt-6 bg-gradient-to-r from-blue-500 to-purple-600 relative group">
                {project.images && project.images.length > 0 ? (
                  <>
                    <img
                      src={project.images[modalImageIndex]}
                      alt={project.title}
                      className="w-full h-auto max-h-[70vh] object-contain bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setModalImageIndex(
                              (prev) =>
                                (prev - 1 + project.images.length) %
                                project.images.length
                            )
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
                        >
                          <FaChevronLeft size={24} />
                        </button>
                        <button
                          onClick={() =>
                            setModalImageIndex(
                              (prev) => (prev + 1) % project.images.length
                            )
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
                        >
                          <FaChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                          {project.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setModalImageIndex(idx)}
                              className={`h-2 rounded-full transition-all ${
                                idx === modalImageIndex
                                  ? 'bg-white w-6'
                                  : 'bg-white bg-opacity-50 w-2 hover:w-3'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center">
                    <FaCode size={64} className="text-white opacity-50" />
                  </div>
                )}
              </div>

              {/* Title and Category */}
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${getCategoryColor(project.category)}`}
                >
                  {project.category}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                {project.date && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt size={14} />
                    <span>{project.date}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center gap-2">
                    <FaUser size={14} />
                    <span>{project.role}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheckCircle
                          className="text-green-500 mt-1 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges and Solutions */}
              {project.challenges && project.solutions && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                      <FaExclamationTriangle className="text-yellow-500" />
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                      <FaLightbulb className="text-blue-500" />
                      Solutions
                    </h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <FaGithub size={18} />
                    View Code
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
