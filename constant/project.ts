export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'LinkNest',
    description:
      'Linktree clone built with Next.js, TypeScript, and Tailwind CSS. Features a modern and responsive design, with a focus on user experience and performance.',
    image: '/images/linknest.png',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'NeonDB',
      'Drizzle Orm',
      'Shadcn UI',
    ],
    links: {
      github: 'https://github.com/SangeethChejerla/LinkNest',
      live: 'https://smart-dashboard.demo.com',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Phrases ',
    description:
      'A simple note-taking app that lets you organize your thoughts by date, so you can easily keep track of everything.',
    image: '/images/phrase.png',
    tags: [
      'Nextjs',
      'TypeScript',
      'Tailwind CSS',
      'NeonDB',
      'Drizzle Orm',
      'Shadcn UI',
    ],
    links: {
      github: 'https://github.com/yourusername/rust-game-engine',
      live: 'https://smart-dashboard.demo.com',
    },
    featured: true,
  },
];
