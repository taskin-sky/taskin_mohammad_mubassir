import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaCode,
  FaHeart,
  FaChartLine,
  FaCertificate,
  FaRocket,
} from 'react-icons/fa';
import {
  skillCategories,
  softSkills,
  learningPath,
  certifications,
} from '../../data/skillsData';
import AnimatedSection from '../../components/animations/AnimatedSection';
import SkillBar from './components/SkillBar';
import SoftSkillCard from './components/SoftSkillCard';
import LearningPathCard from './components/LearningPathCard';
import CertificationCard from './components/CertificationCard';
import SEO from '../../components/SEO';

// Stats Counter Component
const StatCounter = ({ end, label, icon: Icon, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

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
      className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl"
    >
      <div className="text-4xl mb-3 flex justify-center">{Icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
};

// Category Tabs Component
const CategoryTabs = ({ categories, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onTabChange(category.name)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeTab === category.name
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Skill Heatmap Component
const SkillHeatmap = ({ skills }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const expertSkills = skills.filter((s) => s.level >= 80);
  const advancedSkills = skills.filter((s) => s.level >= 60 && s.level < 80);
  const intermediateSkills = skills.filter(
    (s) => s.level >= 40 && s.level < 60
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
        <FaChartLine className="text-blue-600" />
        Skill Distribution
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Expert (80-100%)</span>
            <span className="text-sm text-gray-500">
              {expertSkills.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expertSkills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Advanced (60-79%)</span>
            <span className="text-sm text-gray-500">
              {advancedSkills.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {advancedSkills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Intermediate (40-59%)</span>
            <span className="text-sm text-gray-500">
              {intermediateSkills.length} skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {intermediateSkills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].name);
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);

  // Calculate total skills
  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );
  const averageProficiency = Math.round(
    skillCategories.reduce(
      (acc, cat) =>
        acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0),
      0
    ) / totalSkills
  );

  const stats = [
    { end: totalSkills, label: 'Technical Skills', icon: <FaCode /> },
    { end: softSkills.length, label: 'Soft Skills', icon: <FaHeart /> },
    {
      end: averageProficiency,
      label: 'Avg Proficiency',
      icon: <FaChartLine />,
      suffix: '%',
    },
    {
      end: certifications.length,
      label: 'Certifications',
      icon: <FaCertificate />,
    },
  ];

  useEffect(() => {
    const category = skillCategories.find((cat) => cat.name === activeTab);
    setSelectedCategory(category);
  }, [activeTab]);

  // Get all skills for heatmap
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  return (
    <>
      <SEO />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Skills & Expertise
              </h1>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A comprehensive overview of my technical capabilities, tools,
                and technologies I work with to build amazing digital
                experiences.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <StatCounter key={index} {...stat} />
            ))}
          </div>

          {/* Technical Skills Section */}
          <AnimatedSection className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-center mb-3">
                Technical Skills
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Proficiency levels based on professional experience and project
                work
              </p>
            </div>

            {/* Category Tabs */}
            <CategoryTabs
              categories={skillCategories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Skills Display */}
            {selectedCategory && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {selectedCategory.skills.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>

                  {/* Skill Details Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="text-2xl">{selectedCategory.icon}</span>
                      {selectedCategory.name} Insights
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedCategory.name === 'Frontend Development' &&
                          'Building responsive, interactive user interfaces with modern frameworks and libraries.'}
                        {selectedCategory.name === 'Backend Development' &&
                          'Creating robust server-side applications and RESTful APIs.'}
                        {selectedCategory.name === 'Database' &&
                          'Designing efficient database schemas and writing optimized queries.'}
                        {selectedCategory.name === 'Tools & Others' &&
                          'Utilizing industry-standard tools for development, testing, and deployment.'}
                      </p>
                      <div className="pt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Strongest Skill:</span>
                          <span className="font-semibold text-blue-600">
                            {
                              selectedCategory.skills.reduce((max, skill) =>
                                skill.level > max.level ? skill : max
                              ).name
                            }
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Experience Level:</span>
                          <span>
                            {selectedCategory.skills.length} technologies
                            mastered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatedSection>

          {/* Skill Heatmap */}
          <AnimatedSection className="mb-16">
            <SkillHeatmap skills={allSkills} />
          </AnimatedSection>

          {/* Soft Skills Section */}
          <AnimatedSection className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-center mb-3">
                Soft Skills
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Essential interpersonal skills that make me an effective team
                player
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <SoftSkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {/* Learning Path Section */}
          <AnimatedSection className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-center mb-3 flex items-center justify-center gap-2">
                <FaRocket className="text-blue-600" />
                Currently Learning
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Technologies and skills I'm actively working on to level up
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPath.map((item, index) => (
                <LearningPathCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {/* Certifications Section */}
          <AnimatedSection>
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-center mb-3">
                Certifications
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Professional certifications and courses completed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={cert.name} cert={cert} index={index} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
