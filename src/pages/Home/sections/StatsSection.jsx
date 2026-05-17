import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { projects } from '../../../data/projectsData';
import { skills } from '../../../data/personalData';

const Counter = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-white text-opacity-90 text-sm">{label}</div>
    </motion.div>
  );
};

export default function StatsSection() {
  // Calculate real stats from your data
  const totalProjects = projects.length;
  const totalTechnologies = Object.values(skills).flat().length;
  const totalAchievements = 5; // From your achievements data

  const stats = [
    { end: totalProjects, label: 'Projects Completed', suffix: '+' },
    { end: totalTechnologies, label: 'Technologies Used', suffix: '+' },
    { end: 3, label: 'Years of Experience', suffix: '+' },
    { end: totalAchievements, label: 'Achievements', suffix: '+' },
  ];

  return (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
