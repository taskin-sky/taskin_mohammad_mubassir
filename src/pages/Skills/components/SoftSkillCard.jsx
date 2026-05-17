import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaRegStar, FaCode } from 'react-icons/fa';

const SkillBar = ({ skill, index }) => {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setWidth(skill.level);
      }, 100);
    }
  }, [inView, skill.level]);

  const getProficiencyText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const getStarRating = (level) => {
    const stars = Math.floor(level / 20);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) =>
          i < stars ? (
            <FaStar key={i} className="text-yellow-500" size={12} />
          ) : (
            <FaRegStar key={i} className="text-gray-400" size={12} />
          )
        )}
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition-transform"
          style={{ color: skill.color }}
        >
          <FaCode size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {skill.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{skill.level}%</span>
              {getStarRating(skill.level)}
            </div>
          </div>
          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${width}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">
              {getProficiencyText(skill.level)}
            </span>
            {skill.years && (
              <span className="text-xs text-gray-500">
                {skill.years} years experience
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillBar;
