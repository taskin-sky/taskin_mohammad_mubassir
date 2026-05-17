export const clubs = [
  {
    id: 1,
    name: 'Robotics Club',
    role: 'Active Member',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    period: '2022 - Present',
    description:
      'Participated in robotics projects and technical workshops, building autonomous robots and learning embedded systems.',
    activities: [
      'Participated in Robo Soccer competition at KUET',
      'Attended technical workshops on Arduino and sensors',
      'Collaborated on team robotics projects',
      'Learned about automation and control systems',
    ],
    achievements: ['Semifinalist in Robo Soccer Competition at KUET'],
    image: '/assets/images/activities/robotics-club.jpg',
    gallery: [
      '/assets/images/activities/robo-soccer-1.jpg',
      '/assets/images/activities/robotics-workshop.jpg',
    ],
  },
  {
    id: 2,
    name: 'Football Club',
    role: 'Team Member',
    icon: '⚽',
    color: 'from-green-500 to-emerald-500',
    period: '2021 - Present',
    description:
      'Represented the university in inter-university football tournaments and maintained regular team practices.',
    activities: [
      'Regular team practices and fitness training',
      'Participated in inter-university tournaments',
      'Team coordination and strategy planning',
      'Building team spirit and sportsmanship',
    ],
    achievements: ['Runner-up in Inter-University Football Tournament'],
    image: '/assets/images/activities/football-club.jpg',
    gallery: [
      '/assets/images/activities/football-match.jpg',
      '/assets/images/activities/football-team.jpg',
    ],
  },
  {
    id: 3,
    name: 'Adventure Club',
    role: 'Member',
    icon: '🏔️',
    color: 'from-orange-500 to-red-500',
    period: '2022 - Present',
    description:
      'Exploring nature through hiking, traveling to remote locations, and participating in outdoor exploration activities.',
    activities: [
      'Hiking expeditions in challenging terrains',
      'Traveling to remote natural locations',
      'Camping and outdoor survival skills',
      'Photography and nature documentation',
    ],
    achievements: ['Successfully completed multiple hiking expeditions'],
    image: '/assets/images/activities/adventure-club.jpg',
    gallery: [
      '/assets/images/activities/hiking.jpg',
      '/assets/images/activities/camping.jpg',
    ],
  },
];

export const competitions = [
  {
    id: 1,
    name: 'Robo Soccer Competition',
    event: 'KUET',
    result: 'Semifinalist',
    year: '2023',
    category: 'Robotics',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-500',
    description:
      "Competed in robotics and automation project performance, showcasing our team's autonomous robot design and control systems.",
    image: '/assets/images/activities/robo-soccer.jpg',
  },
  {
    id: 2,
    name: 'Internal Coding Contest',
    event: 'BRAC University',
    result: 'Top 10 Position',
    year: '2023',
    category: 'Coding',
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
    description:
      'Competitive programming achievement among university students, solving complex algorithmic challenges.',
    image: '/assets/images/activities/coding-contest.jpg',
  },
  {
    id: 3,
    name: 'Smart Seismic Detection Project',
    event: 'Rajshahi College Science Fair',
    result: 'Presented',
    year: '2019',
    category: 'Research',
    icon: '🌍',
    color: 'from-teal-500 to-cyan-500',
    description:
      'Presented an innovative Smart Seismic Detection and Early Warning System project at the science fair.',
    image: '/assets/images/activities/science-fair.jpg',
  },
  {
    id: 4,
    name: 'Math Olympiad',
    event: 'Rajshahi University',
    result: '6th Place',
    year: '2017',
    category: 'Academics',
    icon: '📐',
    color: 'from-red-500 to-rose-500',
    description:
      'Mathematics competition achievement demonstrating analytical and problem-solving skills.',
    image: '/assets/images/activities/math-olympiad.jpg',
  },
  {
    id: 5,
    name: 'Inter-University Football Tournament',
    event: 'University Football Tournament',
    result: 'Runner-up',
    year: '2023',
    category: 'Sports',
    icon: '⚽',
    color: 'from-green-500 to-teal-500',
    description:
      'Represented the university team and achieved runner-up position in the tournament.',
    image: '/assets/images/activities/football-tournament.jpg',
  },
];

export const timeline = [
  {
    year: '2024',
    title: 'Portfolio Launch',
    description:
      'Launched personal portfolio website showcasing projects and skills',
    icon: '🚀',
    type: 'achievement',
  },
  {
    year: '2023',
    title: 'Robo Soccer Semifinalist',
    description:
      'Achieved semifinalist position at KUET Robo Soccer competition',
    icon: '🤖',
    type: 'competition',
  },
  {
    year: '2023',
    title: 'Top 10 Coding Contest',
    description:
      'Secured Top 10 position in internal coding contest at BRAC University',
    icon: '💻',
    type: 'achievement',
  },
  {
    year: '2023',
    title: 'Football Runner-up',
    description: 'Runner-up in Inter-University Football Tournament',
    icon: '⚽',
    type: 'sports',
  },
  {
    year: '2019',
    title: 'Science Fair Presentation',
    description:
      'Presented Seismic Detection project at Rajshahi College Science Fair',
    icon: '🔬',
    type: 'research',
  },
  {
    year: '2017',
    title: 'Math Olympiad',
    description: '6th place in Math Olympiad at Rajshahi University',
    icon: '📐',
    type: 'academic',
  },
];

export const stats = [
  { label: 'Clubs Joined', value: 3, icon: '🎯', suffix: '' },
  { label: 'Competitions', value: 5, icon: '🏆', suffix: '+' },
  { label: 'Achievements', value: 6, icon: '⭐', suffix: '' },
  { label: 'Events Attended', value: 10, icon: '📅', suffix: '+' },
];
