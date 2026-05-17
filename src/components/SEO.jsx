import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: 'Taskin Mubassir | MERN Stack Developer Portfolio',
  description:
    'Taskin Mohammad Mubassir - CSE Graduate from BRAC University, MERN Stack Developer. View my projects, skills, and professional experience in web development.',
  image: '/assets/images/og-image.jpg',
  url: 'https://taskin-mubassir-portfolio.netlify.app',
};

const pageMeta = {
  '/': {
    title: 'Home | Taskin Mubassir - MERN Stack Developer',
    description:
      'Welcome to my portfolio! I am a CSE graduate from BRAC University specializing in MERN Stack development. Explore my projects and skills.',
  },
  '/resume': {
    title: 'Resume | Taskin Mubassir - Education & Experience',
    description:
      'View my educational background from BRAC University, professional experience at Business Automation Ltd., and technical achievements.',
  },
  '/projects': {
    title: 'Projects | Taskin Mubassir - Portfolio Showcase',
    description:
      'Explore my web development projects including Portfolio Website, Dynamic News Portal, Blog-Mela Platform, and E-commerce Platform.',
  },
  '/skills': {
    title: 'Skills | Taskin Mubassir - Technical Expertise',
    description:
      'Discover my technical skills including React.js, Node.js, MongoDB, Python, and more. See my proficiency levels and certifications.',
  },
  '/blog': {
    title: 'Blog | Taskin Mubassir - Tech Insights',
    description:
      'Read my thoughts on web development, MERN stack, machine learning, and technology trends. Tips, tutorials, and experiences.',
  },
  '/activities': {
    title: 'Activities | Taskin Mubassir - Beyond Coding',
    description:
      'Learn about my extracurricular activities including Robotics Club, Football Club, and Adventure Club achievements.',
  },
  '/contact': {
    title: 'Contact | Taskin Mubassir - Get in Touch',
    description:
      "Contact me for collaborations, freelance work, or just to connect. I'm available for web development opportunities.",
  },
};

export default function SEO({ customMeta = {} }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get meta for current page or use default
  const currentPageMeta = pageMeta[currentPath] || pageMeta['/'];

  const meta = {
    title: customMeta.title || currentPageMeta.title,
    description: customMeta.description || currentPageMeta.description,
    image: customMeta.image || defaultMeta.image,
    url: customMeta.url || `${defaultMeta.url}${currentPath}`,
  };

  const fullTitle = `${meta.title}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={meta.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={meta.url} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
}
