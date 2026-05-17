export const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    category: 'React',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
    description:
      'A modern, responsive personal portfolio website showcasing projects, skills, and achievements with beautiful animations and dark mode support.',
    longDescription:
      'This portfolio website is built with React.js and Tailwind CSS, featuring smooth page transitions, dark/light mode toggle, responsive design, and interactive animations. It serves as a central hub to showcase my work, skills, and professional journey.',
    features: [
      'Responsive modern UI design',
      'Dark/Light mode toggle with persistence',
      'Smooth page transitions with Framer Motion',
      'Scroll-triggered animations',
      'Dynamic project filtering',
      'Contact form with validation',
      'SEO optimized',
    ],
    challenges: [
      'Implementing smooth page transitions without layout shift',
      'Managing dark mode state across the entire application',
      'Optimizing animations for performance',
    ],
    solutions: [
      "Used Framer Motion's AnimatePresence for route transitions",
      'Implemented React Context API for theme management',
      'Used whileInView instead of scroll listeners for better performance',
    ],
    liveLink: 'https://taskin-mubassir-portfolio.netlify.app',
    githubLink: 'https://github.com/taskin-sky/portfolio',
    image: '/assets/images/projects/portfolio-website.jpg',
    video: null,
    date: '2024',
    role: 'Full Stack Developer',
  },
  {
    id: 2,
    title: 'Dynamic News Portal',
    category: 'MERN',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'API Integration'],
    description:
      'A real-time news portal with categorized news management, responsive interface, and live API integration for latest updates.',
    longDescription:
      'Built a full-stack news portal using the MERN stack that fetches real-time news from various APIs, allows category filtering, and provides a seamless reading experience across all devices.',
    features: [
      'Real-time news updates from multiple APIs',
      'Category-based news filtering',
      'Search functionality',
      'Responsive design for mobile and desktop',
      'News bookmarking feature',
      'Share articles on social media',
    ],
    challenges: [
      'Handling API rate limiting',
      'Managing state across different news categories',
      'Implementing infinite scroll for news feed',
    ],
    solutions: [
      'Implemented caching mechanism for API responses',
      'Used React Context for global state management',
      'Implemented intersection observer for infinite scroll',
    ],
    liveLink: null,
    githubLink: 'https://github.com/taskin-sky/news-portal',
    image: '/assets/images/projects/news-portal.jpg',
    video: null,
    date: '2024',
    role: 'Full Stack Developer',
  },
  {
    id: 3,
    title: 'Blog-Mela Platform',
    category: 'MERN',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Tailwind CSS',
    ],
    description:
      'A full-featured blogging platform where users can create, manage, and explore blog posts with authentication and responsive design.',
    longDescription:
      'Blog-Mela is a complete blogging platform that allows users to register, create blog posts, edit their content, and engage with other bloggers. It features user authentication, rich text editing, and a clean reading experience.',
    features: [
      'User authentication with JWT',
      'Create, Read, Update, Delete blog posts',
      'Rich text editor for blog content',
      'User profiles with avatars',
      'Comment system on blog posts',
      'Like and share functionality',
      'Categories and tags for blogs',
      'Responsive design',
    ],
    challenges: [
      'Implementing secure authentication',
      'Managing user sessions',
      'Creating a WYSIWYG editor experience',
    ],
    solutions: [
      'Used JWT for stateless authentication',
      'Implemented refresh tokens for better security',
      'Integrated React Quill for rich text editing',
    ],
    liveLink: null,
    githubLink: 'https://github.com/taskin-sky/blog-mela',
    image: '/assets/images/projects/blog-mela.jpg',
    video: null,
    date: '2024',
    role: 'Full Stack Developer',
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    category: 'PHP',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'MySQL'],
    description:
      'An online shopping platform with user authentication, product management, shopping cart, and order processing features.',
    longDescription:
      'Developed a complete e-commerce solution with product catalog, shopping cart, user accounts, and order management system. The platform provides a seamless shopping experience with secure payment integration.',
    features: [
      'User registration and authentication',
      'Product listing with categories',
      'Advanced search and filters',
      'Shopping cart functionality',
      'Order management system',
      'Admin panel for product management',
      'Payment gateway integration',
      'Order history and tracking',
    ],
    challenges: [
      'Managing cart state across sessions',
      'Implementing secure payment flow',
      'Optimizing database queries for product search',
    ],
    solutions: [
      'Used PHP sessions for cart management',
      'Integrated SSL for secure transactions',
      'Implemented indexing on database for faster searches',
    ],
    liveLink: null,
    githubLink: 'https://github.com/taskin-sky/ecommerce',
    image: '/assets/images/projects/ecommerce.jpg',
    video: null,
    date: '2023',
    role: 'Full Stack Developer',
  },
  {
    id: 5,
    title: 'Your New Project',
    category: 'MERN', // or "React", "PHP", etc.
    tech: ['Tech1', 'Tech2', 'Tech3'],
    description: 'Short description',
    longDescription: 'Detailed description',
    features: ['Feature 1', 'Feature 2'],
    challenges: ['Challenge 1'],
    solutions: ['Solution 1'],
    liveLink: 'https://your-live-demo.com',
    githubLink: 'https://github.com/your-repo',
    image: '/assets/images/projects/new-project.jpg',
    date: '2024',
    role: 'Full Stack Developer',
  },
];

// Get unique categories for filtering
export const getCategories = () => {
  const categories = projects.map((project) => project.category);
  return ['All', ...new Set(categories)];
};
