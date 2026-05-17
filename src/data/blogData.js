export const blogPosts = [
  {
    id: 1,
    title: 'Building My First MERN Stack Application',
    slug: 'building-first-mern-stack-application',
    excerpt:
      'A step-by-step journey of building a full-stack application from scratch using MongoDB, Express, React, and Node.js.',
    content: `
      <p>When I first started learning web development, the MERN stack seemed intimidating. Four different technologies working together? How hard could it be? Well, let me share my journey of building my first complete MERN application.</p>
      
      <h2>Why MERN?</h2>
      <p>The MERN stack (MongoDB, Express.js, React.js, Node.js) is one of the most popular stacks for full-stack JavaScript development. It allows you to use JavaScript throughout your entire application, from database to frontend.</p>
      
      <h2>The Learning Journey</h2>
      <p>I started with Node.js and Express, learning how to create RESTful APIs. Then I moved to MongoDB for data persistence, followed by React for the frontend. The real challenge came when I had to connect everything together.</p>
      
      <h2>Key Challenges</h2>
      <ul>
        <li>Understanding asynchronous JavaScript</li>
        <li>Managing state with React hooks</li>
        <li>Handling authentication with JWT</li>
        <li>Connecting frontend to backend APIs</li>
      </ul>
      
      <h2>Lessons Learned</h2>
      <p>After countless hours of debugging and learning, I realized that breaking down problems into smaller pieces makes everything manageable. The MERN stack is powerful, but it requires patience and practice.</p>
    `,
    category: 'Web Development',
    tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
    author: 'Taskin Mubassir',
    authorAvatar: '/assets/images/avatar.jpg',
    date: '2024-03-15',
    readTime: 5,
    image: '/assets/images/blog/mern-stack.jpg',
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: 'Getting Started with Tailwind CSS',
    slug: 'getting-started-with-tailwind-css',
    excerpt:
      'Why Tailwind CSS changed the way I build websites and how you can get started with this utility-first CSS framework.',
    content: `
      <p>Before Tailwind CSS, I was using traditional CSS frameworks like Bootstrap. While they're great, I always felt limited by their predefined components. Then I discovered Tailwind CSS, and everything changed.</p>
      
      <h2>What Makes Tailwind Different?</h2>
      <p>Tailwind is a utility-first CSS framework that provides low-level utility classes. Instead of pre-built components, you compose your designs using these utilities.</p>
      
      <h2>The Benefits</h2>
      <ul>
        <li>No more naming conventions - no more BEM struggles!</li>
        <li>Faster development - style directly in your markup</li>
        <li>Consistent design system - no more random colors and sizes</li>
        <li>Smaller CSS bundles - purge unused styles in production</li>
      </ul>
      
      <h2>My Workflow</h2>
      <p>Now I can prototype designs in minutes. The learning curve is worth it, and once you get used to it, you'll never want to go back to traditional CSS frameworks.</p>
    `,
    category: 'CSS Framework',
    tags: ['Tailwind CSS', 'CSS', 'Web Design'],
    author: 'Taskin Mubassir',
    authorAvatar: '/assets/images/avatar.jpg',
    date: '2024-03-10',
    readTime: 4,
    image: '/assets/images/blog/tailwind.jpg',
    views: 890,
    likes: 67,
  },
  {
    id: 3,
    title: 'Machine Learning for Web Developers',
    slug: 'machine-learning-for-web-developers',
    excerpt:
      'How web developers can leverage machine learning to create smarter applications without becoming data scientists.',
    content: `
      <p>As a web developer, I always thought machine learning was out of my reach. But the reality is, you don't need a PhD to start implementing ML in your applications.</p>
      
      <h2>ML APIs to the Rescue</h2>
      <p>Services like TensorFlow.js, OpenAI API, and Google Cloud ML make it possible to add intelligence to your apps with just a few lines of code.</p>
      
      <h2>Practical Applications</h2>
      <ul>
        <li>Content recommendation systems</li>
        <li>Image recognition and processing</li>
        <li>Natural language processing for comments</li>
        <li>Predictive analytics for user behavior</li>
      </ul>
      
      <h2>My Experience</h2>
      <p>During my thesis on detecting propagandistic posters, I realized how powerful ML can be. Start small, experiment with pre-trained models, and gradually build up your knowledge.</p>
    `,
    category: 'Machine Learning',
    tags: ['Machine Learning', 'AI', 'TensorFlow'],
    author: 'Taskin Mubassir',
    authorAvatar: '/assets/images/avatar.jpg',
    date: '2024-03-05',
    readTime: 6,
    image: '/assets/images/blog/ml.jpg',
    views: 2100,
    likes: 156,
  },
  {
    id: 4,
    title: 'The Art of Debugging: Tips and Tricks',
    slug: 'art-of-debugging-tips-tricks',
    excerpt:
      'Learn how to debug like a pro with these essential techniques and tools that every developer should know.',
    content: `
      <p>Debugging is an essential skill that separates good developers from great ones. Here are my favorite debugging techniques that have saved me countless hours.</p>
      
      <h2>Console.log is Your Friend</h2>
      <p>Never underestimate the power of console.log. But there are better ways: console.table, console.group, and console.time can give you more insight.</p>
      
      <h2>Browser DevTools Mastery</h2>
      <p>Modern browser DevTools are incredibly powerful. Learn to use breakpoints, watch expressions, and the network tab effectively.</p>
      
      <h2>Debugging Strategies</h2>
      <ul>
        <li>Rubber duck debugging - explain your code to someone (or something)</li>
        <li>Binary search debugging - comment out half your code to isolate issues</li>
        <li>Error boundaries in React - catch errors gracefully</li>
        <li>Logging libraries - use proper logging instead of console.log</li>
      </ul>
      
      <h2>Tools I Use</h2>
      <p>VS Code debugger, React DevTools, Redux DevTools, and Postman are essential in my toolkit.</p>
    `,
    category: 'Development',
    tags: ['Debugging', 'Tools', 'Productivity'],
    author: 'Taskin Mubassir',
    authorAvatar: '/assets/images/avatar.jpg',
    date: '2024-02-28',
    readTime: 5,
    image: '/assets/images/blog/debugging.jpg',
    views: 1560,
    likes: 112,
  },
  {
    id: 5,
    title: 'Portfolio Website Best Practices',
    slug: 'portfolio-website-best-practices',
    excerpt:
      'What I learned from building my portfolio and how you can make yours stand out to recruiters.',
    content: `
      <p>Building a portfolio website is about more than just showing your work. It's about telling your story and demonstrating your skills.</p>
      
      <h2>Key Elements of a Great Portfolio</h2>
      <ul>
        <li>Clear value proposition - who you are and what you do</li>
        <li>Showcase your best work - quality over quantity</li>
        <li>Make it responsive - works on all devices</li>
        <li>Fast loading times - optimize images and code</li>
        <li>Easy navigation - don't make recruiters search</li>
      </ul>
      
      <h2>Technical Considerations</h2>
      <p>Use modern frameworks like React, add animations for polish, implement dark mode for user preference, and ensure good SEO with proper meta tags.</p>
      
      <h2>Content Strategy</h2>
      <p>Tell the story behind each project. What challenges did you face? How did you solve them? What did you learn? Recruiters want to see your problem-solving process.</p>
    `,
    category: 'Career',
    tags: ['Portfolio', 'Career', 'Web Development'],
    author: 'Taskin Mubassir',
    authorAvatar: '/assets/images/avatar.jpg',
    date: '2024-02-20',
    readTime: 7,
    image: '/assets/images/blog/portfolio.jpg',
    views: 3200,
    likes: 245,
  },
];

export const categories = [
  { name: 'All', count: blogPosts.length, icon: '📚' },
  {
    name: 'Web Development',
    count: blogPosts.filter((p) => p.category === 'Web Development').length,
    icon: '💻',
  },
  {
    name: 'CSS Framework',
    count: blogPosts.filter((p) => p.category === 'CSS Framework').length,
    icon: '🎨',
  },
  {
    name: 'Machine Learning',
    count: blogPosts.filter((p) => p.category === 'Machine Learning').length,
    icon: '🤖',
  },
  {
    name: 'Development',
    count: blogPosts.filter((p) => p.category === 'Development').length,
    icon: '🛠️',
  },
  {
    name: 'Career',
    count: blogPosts.filter((p) => p.category === 'Career').length,
    icon: '💼',
  },
];

export const popularTags = () => {
  const tags = blogPosts.flatMap((post) => post.tags);
  const tagCount = {};
  tags.forEach((tag) => {
    tagCount[tag] = (tagCount[tag] || 0) + 1;
  });
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

export const recentPosts = () => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
};
