import { Link } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/resume', label: 'Resume' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/blog', label: 'Blog' },
  { path: '/activities', label: 'Activities' },
  { path: '/contact', label: 'Contact' },
  { path: '/guestbook', label: 'Guestbook' }, // ✅ Add this
];

export default function FooterLinks() {
  return (
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
