import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const CertificationCard = ({ cert, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-3">
        <FaCertificate
          className="text-yellow-500 mt-1 flex-shrink-0"
          size={24}
        />
        <div className="flex-1">
          <h3 className="font-bold mb-1">{cert.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {cert.issuer}
          </p>
          <p className="text-xs text-gray-500 mt-2">{cert.year}</p>
          {cert.credential && cert.credential !== '#' && (
            <a
              href={cert.credential}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
            >
              View Credential <FaExternalLinkAlt size={10} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
