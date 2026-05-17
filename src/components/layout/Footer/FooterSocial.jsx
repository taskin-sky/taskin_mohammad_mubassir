import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMedium,
  FaDev,
} from 'react-icons/fa';

const socialLinks = [
  { icon: FaGithub, url: 'https://github.com/taskin-sky', label: 'GitHub' },
  {
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/taskin',
    label: 'LinkedIn',
  },
  { icon: FaTwitter, url: 'https://twitter.com/taskin', label: 'Twitter' },
  { icon: FaMedium, url: 'https://medium.com/@taskin', label: 'Medium' },
  { icon: FaDev, url: 'https://dev.to/taskin', label: 'Dev.to' },
];

export default function FooterSocial() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform duration-200"
          aria-label={social.label}
        >
          <social.icon size={20} />
        </a>
      ))}
    </div>
  );
}
