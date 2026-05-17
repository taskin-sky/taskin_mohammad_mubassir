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

export default function Navbar() {
  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `relative px-2 py-1 text-sm font-medium transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  transition={{ duration: 0.3 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
