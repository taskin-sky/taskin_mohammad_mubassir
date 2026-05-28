// Import all your existing data
import {
  personalInfo,
  education,
  experience,
  skills,
  achievements,
} from './personalData';
import { projects } from './projectsData';
import { aboutInfo } from './aboutData';
import { skillCategories } from './skillsData';
import { clubs, competitions } from './activitiesData';
import { blogPosts } from './blogData';

// Helper function to get project by name
const findProjectByName = (query) => {
  const lowerQuery = query.toLowerCase();
  return projects.find(
    (project) =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.category.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to get skill by name
const findSkillByName = (query) => {
  const lowerQuery = query.toLowerCase();
  for (const category of skillCategories) {
    const skill = category.skills.find((s) =>
      s.name.toLowerCase().includes(lowerQuery)
    );
    if (skill) return { skill, category };
  }
  return null;
};

export const chatbotKnowledge = {
  // Personal Info
  name: personalInfo.name,
  fullName: personalInfo.name,
  email: personalInfo.email,
  phone: personalInfo.phone,
  location: personalInfo.location,
  bio: personalInfo.bio,

  // Professional
  role: 'MERN Stack Developer',
  currentStatus: 'Actively looking for full-time opportunities',
  experience: experience,

  // Education
  education: education,

  // Skills
  skills: {
    all: skillCategories.flatMap((cat) => cat.skills.map((s) => s.name)),
    byCategory: skillCategories,
    softSkills: skills.softSkills,
  },

  // Projects
  projects: projects,

  // Achievements
  achievements: achievements,

  // Activities
  activities: {
    clubs: clubs,
    competitions: competitions,
  },

  // Blog
  blogPosts: blogPosts,

  // Availability
  availability:
    'Available for full-time positions, freelance work, and collaborations',
  preferredWork: 'Remote, Hybrid, On-site (Dhaka)',
  noticePeriod: 'Immediate joiner',

  // Social
  social: {
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
    email: personalInfo.email,
    portfolio: personalInfo.portfolio,
  },

  // Greetings
  greetings: [
    "Assalamu Alaikum! 👋 I'm T-Robo, Taskin's virtual assistant. How can I help you today?",
    'Hello! 🤖 I know everything about Taskin. Ask me about his skills, projects, or experience!',
    "Hi there! 🌟 Need to know something about Taskin? I'm here to help!",
  ],

  farewells: [
    'Thanks for chatting! Have a great day! 🌟',
    'Goodbye! Feel free to reach out anytime! 👋',
    'Take care! Come back if you have more questions! 💫',
  ],

  unknownResponses: [
    "I'm not sure about that. Ask me about Taskin's skills, projects, experience, education, or achievements! 💡",
    "Hmm, I don't have that info. Try asking about his projects or technical skills! 🚀",
    'Not sure about that. I can tell you about his work experience, education, or tech stack! 💻',
  ],
};

// Intelligent QA Mapping with Project Recognition
export const qaMapping = [
  // Basic Info
  {
    keywords: [
      'who',
      'are you',
      'your name',
      'introduce',
      'tell me about yourself',
      'background',
    ],
    answer: `I'm ${personalInfo.name}, a ${chatbotKnowledge.role} from ${personalInfo.location}. ${personalInfo.bio} I'm passionate about building scalable web applications and solving real-world problems.`,
  },

  // Skills
  {
    keywords: [
      'skill',
      'technologies',
      'tech stack',
      'what can you do',
      'proficient',
      'expertise',
    ],
    answer: `I'm skilled in:\n\n🎨 **Frontend:** ${skillCategories
      .find((c) => c.name === 'Frontend Development')
      ?.skills.map((s) => s.name)
      .join(', ')}\n\n⚙️ **Backend:** ${skillCategories
      .find((c) => c.name === 'Backend Development')
      ?.skills.map((s) => s.name)
      .join(', ')}\n\n🗄️ **Database:** ${skillCategories
      .find((c) => c.name === 'Database')
      ?.skills.map((s) => s.name)
      .join(', ')}\n\n🛠️ **Tools:** ${skillCategories
      .find((c) => c.name === 'Tools & Others')
      ?.skills.map((s) => s.name)
      .join(', ')}\n\n💡 **Soft Skills:** ${skills.softSkills.join(', ')}`,
  },

  // Projects - General
  {
    keywords: [
      'project',
      'built',
      'portfolio',
      'work',
      'have you made',
      'developed',
      'created',
      'all projects',
    ],
    answer: `I've built ${projects.length} amazing projects! Here are all of them:\n\n${projects.map((p) => `• **${p.title}** - ${p.category} (${p.tech.slice(0, 3).join(', ')})`).join('\n')}\n\nCheck out my Projects page for live demos and GitHub links! 🚀`,
  },

  // Education
  {
    keywords: [
      'education',
      'study',
      'university',
      'college',
      'school',
      'degree',
      'academic',
    ],
    answer: `My educational journey:\n\n${education.map((edu) => `🎓 **${edu.degree}**\n   📍 ${edu.institution}\n   📅 ${edu.period}\n   ${edu.cgpa ? `⭐ CGPA: ${edu.cgpa}` : edu.gpa ? `⭐ GPA: ${edu.gpa}` : ''}`).join('\n\n')}`,
  },

  // Experience
  {
    keywords: ['experience', 'intern', 'job', 'work', 'professional', 'career'],
    answer: `My professional experience:\n\n${experience.map((exp) => `💼 **${exp.title}** at ${exp.company}\n   📅 ${exp.period}\n   📍 ${exp.location}\n   ✅ ${exp.responsibilities.slice(0, 2).join('\n   ✅ ')}`).join('\n\n')}`,
  },

  // Achievements
  {
    keywords: [
      'achievement',
      'award',
      'win',
      'competition',
      'coding contest',
      'robotics',
      'football',
      'olympiad',
      'prize',
    ],
    answer: `🏆 My key achievements:\n\n${achievements.map((ach) => `• **${ach.title}** at ${ach.event}\n   ${ach.description}`).join('\n\n')}`,
  },

  // Activities
  {
    keywords: [
      'activity',
      'hobby',
      'club',
      'interest',
      'outside work',
      'fun',
      'extracurricular',
    ],
    answer: `Outside of coding, I'm involved in:\n\n${clubs.map((club) => `🤖 **${club.name}** - ${club.role}\n   ${club.activities.slice(0, 2).join(', ')}`).join('\n\n')}\n\nI also love playing football and exploring nature! ⚽🏔️`,
  },

  // Contact
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'get in touch'],
    answer: `📫 You can reach me at:\n\n📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n💼 LinkedIn: ${personalInfo.linkedin}\n🐙 GitHub: ${personalInfo.github}\n🌐 Portfolio: ${personalInfo.portfolio}`,
  },

  // Availability
  {
    keywords: [
      'available',
      'hire',
      'freelance',
      'work',
      'job',
      'opportunity',
      'position',
    ],
    answer: `✅ **Availability:** ${chatbotKnowledge.availability}\n\n📍 **Work Preference:** ${chatbotKnowledge.preferredWork}\n\n⏰ **Notice Period:** ${chatbotKnowledge.noticePeriod}\n\nI'm open to discussing opportunities! Feel free to reach out. 🚀`,
  },

  // Resume
  {
    keywords: ['resume', 'cv', 'curriculum vitae'],
    answer: `📄 You can view my complete resume on the **Resume page** of this portfolio. You can also download it as PDF from there!`,
  },

  // GitHub
  {
    keywords: ['github', 'code', 'repository', 'source'],
    answer: `🐙 **GitHub:** ${personalInfo.github}\n\nAll my project codes are open source and available on GitHub. Check out my repositories to see the code quality and documentation!`,
  },

  // LinkedIn
  {
    keywords: ['linkedin', 'professional', 'network', 'connection'],
    answer: `💼 **LinkedIn:** ${personalInfo.linkedin}\n\nConnect with me on LinkedIn for professional networking and collaboration opportunities!`,
  },

  // Blog
  {
    keywords: ['blog', 'article', 'writing', 'post'],
    answer: `📝 I've written ${blogPosts.length} blog posts! Topics include web development, MERN stack, and tech insights.\n\nRecent posts:\n${blogPosts
      .slice(0, 3)
      .map((post) => `• ${post.title}`)
      .join('\n')}\n\nVisit my Blog page to read them!`,
  },

  // Strengths
  {
    keywords: ['strength', 'strong', 'best at', 'expert'],
    answer: `💪 My strongest areas are:\n\n• **MERN Stack Development** - Full-stack applications\n• **React.js** - Modern, responsive UIs\n• **Problem Solving** - Complex challenges\n• **Quick Learning** - Adapting to new tech\n\nI'm most proud of building **Tanjim's Pathshala**, a complete LMS platform!`,
  },

  // Weakness
  {
    keywords: ['weakness', 'improve', 'learning', 'grow'],
    answer: `🌱 I'm continuously improving and currently focusing on:\n\n• TypeScript for better type safety\n• Next.js for server-side rendering\n• GraphQL for efficient APIs\n• Docker for containerization\n\nI believe in lifelong learning and staying updated with industry trends!`,
  },

  // Why hire
  {
    keywords: ['why hire', 'why choose', 'value', 'offer'],
    answer: `🎯 **Why hire me?**\n\n✅ Strong full-stack development skills\n✅ Problem-solving mindset\n✅ Quick learner and adaptable\n✅ Team player with good communication\n✅ Passion for clean, maintainable code\n✅ Experience with real-world projects\n\nI bring dedication, creativity, and a result-driven approach to every project!`,
  },
];

// Specific Project Answers (Hardcoded for better recognition)
export const projectAnswers = {
  "Tanjim's Pathshala": `🎯 **Tanjim's Pathshala** - A Complete Learning Management System

📝 **Description:** A full-featured online tuition management platform where the owner can manage students, create classes with Google Meet links, and track feedback. Students can securely login using unique passkeys, join Google Meet classes, and submit reviews.

🛠️ **Tech Stack:** React, Node.js, Express, MongoDB, TailwindCSS, JWT, Mongoose

⭐ **Key Features:**
• Role-based authentication (Owner + Student)
• Owner dashboard with interactive charts (Recharts)
• Student management with unique passkey generation
• Class scheduling with Google Meet integration
• Student-specific class access control
• Review and rating system (1-5 stars)
• Dark/Light theme toggle
• Fully responsive design

🔗 **Live Demo:** https://tanjims-pathshala.vercel.app
🐙 **GitHub:** https://github.com/taskin-sky/Tanjim-s-Pathshala-Frontend

This is my most comprehensive full-stack project! 🚀`,

  'Portfolio Website': `🎯 **Portfolio Website**

📝 **Description:** A modern, responsive personal portfolio website showcasing projects, skills, and achievements with beautiful animations and dark mode support.

🛠️ **Tech Stack:** React.js, Tailwind CSS, Framer Motion

⭐ **Key Features:**
• Responsive modern UI design
• Dark/Light mode toggle
• Smooth page transitions
• Interactive animations
• Project filtering and search
• Blog system
• Guestbook with messages

🌐 **Live:** https://taskin-mubassir-portfolio.netlify.app`,

  'Dynamic News Portal': `🎯 **Dynamic News Portal**

📝 **Description:** A real-time news portal with categorized news management and live API integration.

🛠️ **Tech Stack:** MERN Stack (MongoDB, Express, React, Node.js)

⭐ **Key Features:**
• Real-time news updates
• Category-based filtering
• Search functionality
• Responsive design
• News bookmarking
• Social media sharing`,

  'Blog-Mela Platform': `🎯 **Blog-Mela Platform**

📝 **Description:** A full-featured blogging platform where users can create, manage, and explore blog posts.

🛠️ **Tech Stack:** React.js, Node.js, Express, MongoDB, JWT

⭐ **Key Features:**
• User authentication with JWT
• Full CRUD operations
• Rich text editor
• Comment system
• Like and share functionality
• Categories and tags`,

  'Ostad Home Clone': `🎯 **Ostad Home Clone**

📝 **Description:** A pixel-perfect clone of the Ostad learning platform's homepage.

🛠️ **Tech Stack:** HTML5, CSS3, Tailwind CSS, JavaScript

⭐ **Key Features:**
• Fully responsive design
• Course categories grid
• Instructor profiles
• Student testimonials
• Pricing plans
• Mobile-friendly hamburger menu`,

  'Epixelab Home': `🎯 **Epixelab Home Clone**

📝 **Description:** A modern, animated homepage clone of Epixelab creative agency.

🛠️ **Tech Stack:** HTML5, CSS3, Tailwind CSS, JavaScript

⭐ **Key Features:**
• Animated gradient background
• Portfolio showcase grid
• Testimonial carousel
• Animated statistics counter
• Smooth scroll animations`,

  'DailyDev Clone': `🎯 **DailyDev Clone**

📝 **Description:** A responsive clone of the Daily.dev developer news platform.

🛠️ **Tech Stack:** HTML5, CSS3, Tailwind CSS, JavaScript

⭐ **Key Features:**
• Responsive card grid layout
• Category filter buttons
• Trending posts section
• Sidebar with tags
• Reading time indicators
• Bookmark functionality UI`,
};
