import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaCode,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaJs,
  FaCss3Alt,
  FaHtml5,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiLaravel,
  SiPhp,
} from 'react-icons/si';
import { personalInfo } from '../../../data/personalData';

// 1. Interactive Mouse-Following Particles
const InteractiveParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
    baseX: (Math.random() - 0.5) * 200,
    baseY: (Math.random() - 0.5) * 200,
    speed: 0.02 + Math.random() * 0.03,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const dx = (mousePosition.x - window.innerWidth / 2) * particle.speed;
        const dy = (mousePosition.y - window.innerHeight / 2) * particle.speed;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              left: `calc(50% + ${particle.baseX + dx}px)`,
              top: `calc(50% + ${particle.baseY + dy}px)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
};

// 2. Animated Code Rain Effect
const CodeRain = () => {
  const codeStrings = [
    '<React />',
    '{}',
    '() =>',
    'const',
    'function',
    'import',
    'export',
    'return',
    'if()',
    'map()',
    'filter()',
    'useState',
    'useEffect',
    'npm start',
    'git push',
    '<div>',
    '</div>',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-500 font-mono text-xs whitespace-nowrap"
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 50 }}
          transition={{
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {codeStrings[Math.floor(Math.random() * codeStrings.length)]}
        </motion.div>
      ))}
    </div>
  );
};

// 3. Animated Gradient Border Box
const GradientBorderBox = () => {
  return (
    <motion.div
      className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
        filter: 'blur(20px)',
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// 4. 3D Tilt Effect Component
const Tilt3D = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [20, -20]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-20, 20]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

// 5. Floating Shapes
const FloatingShapes = () => {
  const shapes = [
    {
      size: 100,
      color: 'bg-blue-500/5',
      left: '10%',
      top: '20%',
      duration: 20,
    },
    {
      size: 80,
      color: 'bg-purple-500/5',
      left: '85%',
      top: '30%',
      duration: 25,
    },
    {
      size: 120,
      color: 'bg-pink-500/5',
      left: '15%',
      top: '70%',
      duration: 18,
    },
    {
      size: 60,
      color: 'bg-green-500/5',
      left: '75%',
      top: '75%',
      duration: 22,
    },
    {
      size: 150,
      color: 'bg-yellow-500/5',
      left: '50%',
      top: '50%',
      duration: 30,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.color} rounded-2xl backdrop-blur-sm`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            top: shape.top,
          }}
          animate={{
            y: [0, -50, 0, 50, 0],
            x: [0, 30, 0, -30, 0],
            rotate: [0, 45, 0, -45, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// 6. Glowing Orb Effect
const GlowingOrb = () => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        background:
          'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// 7. Animated Neural Network Lines
const NeuralNetwork = () => {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
      {nodes.map((node, i) =>
        nodes
          .slice(i + 1)
          .map((node2, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${node2.x}%`}
              y2={`${node2.y}%`}
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: (i + j) * 0.1 }}
            />
          ))
      )}
    </svg>
  );
};

// 8. Particle Burst Effect on Click
const ParticleBurst = ({ onComplete }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (Math.PI * 2 * i) / 20,
    distance: 50 + Math.random() * 100,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: particle.size, height: particle.size }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            opacity: 0,
          }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => {
            if (particle.id === particles.length - 1) onComplete();
          }}
        />
      ))}
    </div>
  );
};

// 9. Animated Counter
const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
        {count}+
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
};

export default function HeroSection() {
  const [particleBurst, setParticleBurst] = useState(false);
  const stats = [
    { value: 20, label: 'Projects' },
    { value: 15, label: 'Technologies' },
    { value: 50, label: 'Contributions' },
  ];

  const handleParticleBurst = () => {
    setParticleBurst(true);
    setTimeout(() => setParticleBurst(false), 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <InteractiveParticles />
      <CodeRain />
      <FloatingShapes />
      <GlowingOrb />
      <NeuralNetwork />

      {/* Particle Burst */}
      {particleBurst && (
        <ParticleBurst onComplete={() => setParticleBurst(false)} />
      )}

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Avatar with 3D Tilt and Rotating Rings */}
        <Tilt3D>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative w-32 h-32 mx-auto mb-8 cursor-pointer group"
            onClick={handleParticleBurst}
          >
            {/* Rotating rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{ borderTopColor: '#3b82f6', borderRightColor: '#8b5cf6' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                borderBottomColor: '#ec4899',
                borderLeftColor: '#f59e0b',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: '#10b981',
                borderBottomColor: '#6366f1',
              }}
              animate={{ rotate: 180 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
              <img
                src="/taskin.png"
                alt="Taskin Mohammad Mubassir"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <GradientBorderBox />
          </motion.div>
        </Tilt3D>

        {/* Animated Badges */}
        <div className="flex justify-center gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/50 rounded-full"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-700 dark:text-green-300 font-medium">
              Available for work
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full"
          >
            <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              🌟 4+ Years Journey
            </span>
          </motion.div>
        </div>

        {/* Name with animation */}
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {personalInfo.name.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.03 }}
              className="inline-block hover:scale-110 hover:text-purple-500 transition-all duration-300 cursor-default"
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Typing Animation */}
        <div className="text-xl md:text-2xl mb-6 h-16">
          <TypeAnimation
            sequence={[
              '✨ CSE Graduate 🎓',
              2000,
              '💻 MERN Stack Developer',
              2000,
              '🚀 Problem Solver',
              2000,
              '⚽ Football Player',
              2000,
              '🌟 Tech Enthusiast',
              2000,
              '🎨 Creative Coder',
              2000,
              '📚 Lifelong Learner',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold"
          />
        </div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8 leading-relaxed relative"
        >
          {personalInfo.bio}
          <motion.span
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.p>

        {/* Stats Row */}
        <div className="flex justify-center gap-8 mb-8">
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(59,130,246,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium overflow-hidden group"
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          <Link to="/resume">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-300 flex items-center gap-2 group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <FaDownload className="group-hover:translate-y-1 transition-transform" />
              View Resume
            </motion.button>
          </Link>
        </div>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { Icon: FaReact, name: 'React', color: 'text-cyan-500' },
            { Icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
            { Icon: SiMongodb, name: 'MongoDB', color: 'text-emerald-500' },
            { Icon: FaPython, name: 'Python', color: 'text-blue-500' },
            { Icon: SiTailwindcss, name: 'Tailwind', color: 'text-sky-500' },
            { Icon: FaJs, name: 'JavaScript', color: 'text-yellow-500' },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="relative group"
            >
              <div
                className={`p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all ${tech.color}`}
              >
                <tech.Icon size={24} />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {[
            {
              Icon: FaGithub,
              url: personalInfo.github,
              label: 'GitHub',
              color: 'hover:text-gray-900 dark:hover:text-white',
            },
            {
              Icon: FaLinkedin,
              url: personalInfo.linkedin,
              label: 'LinkedIn',
              color: 'hover:text-blue-600',
            },
            {
              Icon: FaEnvelope,
              url: `mailto:${personalInfo.email}`,
              label: 'Email',
              color: 'hover:text-red-500',
            },
          ].map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="relative group"
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 block transform hover:scale-110 hover:-translate-y-1`}
              >
                <social.Icon size={28} />
              </a>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Scroll to explore
            </span>
            <div className="relative">
              <motion.div
                className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full"
                animate={{ borderColor: ['#9ca3af', '#3b82f6', '#9ca3af'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-blue-500 rounded-full"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
