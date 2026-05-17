import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaCalendarAlt,
  FaUser,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import { projects, getCategories } from '../../data/projectsData';
import AnimatedSection from '../../components/animations/AnimatedSection';
import ProjectModal from './components/ProjectModal';
import SEO from '../../components/SEO';

// Project Card Component
const ProjectCard = ({ project, index, onOpenModal }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden group">
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onOpenModal(project)}
            className="opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium"
          >
            Quick View
          </button>
        </div>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaCode size={48} className="text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(project.category)}`}
          >
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onOpenModal(project)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Details
          </button>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FaExternalLinkAlt size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Filter Button Component
const FilterButton = ({ category, activeCategory, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        activeCategory === category
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {category}
    </button>
  );
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search projects by title or technology..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

// Stats Component
const ProjectStats = ({ projects }) => {
  const uniqueTech = new Set();
  projects.forEach((project) => {
    project.tech.forEach((tech) => uniqueTech.add(tech));
  });

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Technologies Used', value: uniqueTech.size },
    {
      label: 'Categories',
      value: new Set(projects.map((p) => p.category)).size,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stat.value}
          </div>
          <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const categories = getCategories();

  // Filter projects based on category and search
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(
        (project) => project.category === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tech.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SEO />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                My Projects
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent works. Each project represents
                different challenges and learning experiences in web
                development.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <ProjectStats projects={projects} />

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  category={category}
                  activeCategory={activeCategory}
                  onClick={setActiveCategory}
                />
              ))}
            </div>

            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} project
              {filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FaCode size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
}
