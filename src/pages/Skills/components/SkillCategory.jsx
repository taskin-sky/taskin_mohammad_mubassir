import { motion } from 'framer-motion';

const SkillCategory = ({ category, index, onSelect }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(category)}
      className="group relative overflow-hidden"
    >
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
        <div className="text-5xl mb-3">{category.icon}</div>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {category.skills.length} skills
        </p>
        <div className="mt-3 w-0 group-hover:w-full h-0.5 bg-blue-600 transition-all duration-300 mx-auto"></div>
      </div>
    </motion.button>
  );
};

export default SkillCategory;
