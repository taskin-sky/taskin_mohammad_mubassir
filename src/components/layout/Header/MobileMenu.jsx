import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/resume', label: 'Resume' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/blog', label: 'Blog' },
  { path: '/activities', label: 'Activities' },
  { path: '/contact', label: 'Contact' },
];

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `block py-3 px-2 text-base font-medium transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </motion.div>
  );
}
