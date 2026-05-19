import { motion } from 'framer-motion';

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

export default ProjectStats;
