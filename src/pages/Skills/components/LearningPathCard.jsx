import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket } from 'react-icons/fa';

const LearningPathCard = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-3">
        <FaRocket className="text-blue-600" size={24} />
        <h3 className="text-lg font-bold">{item.name}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
        {item.description}
      </p>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Learning Progress</span>
          <span className="text-blue-600 font-semibold">{item.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${item.progress}%` } : {}}
            transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPathCard;
