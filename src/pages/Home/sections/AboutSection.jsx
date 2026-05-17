import { motion } from 'framer-motion';
import AnimatedSection from '../../../components/animations/AnimatedSection';
import { personalInfo } from '../../../data/personalData';

export default function AboutSection() {
  return (
    <AnimatedSection className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            I'm a passionate Computer Science graduate from BRAC University with
            a strong foundation in full-stack web development. My journey in
            tech started with curiosity and has evolved into a commitment to
            building meaningful digital solutions.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            With experience in both frontend and backend technologies, I enjoy
            creating seamless user experiences while ensuring robust backend
            architecture. When I'm not coding, you'll find me on the football
            field or planning my next adventure.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
