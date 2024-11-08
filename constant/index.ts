// constants/experienceData.ts

export interface JobExperience {
  id: number;
  date: string;
  title: string;
  company?: string;
  description: string;
  technologies?: string[];
  services?: string[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

export const JOB_EXPERIENCE: JobExperience[] = [
  {
    id: 1,
    date: '2024 - Present',
    title: 'Honing my skills.',
    description: 'Learning Ml & AI and building projects to improve my skills.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Tensorflow',
      'C++',
      'Rust',
      'Astro.js',
    ],
    services: [
      'Machine Learning',
      'Artifical Intelligence',
      'Data Science',
      'Deep Learning',
    ],
  },
  {
    id: 2,
    date: '2023',
    title: 'Btech year- 3',
    description:
      'Building project and learning best practices for code quality and performance optimization.',
    technologies: ['React', 'Next.js', 'Typescript', 'Flask', 'PostgreSQL'],
    services: ['API Development', 'Database Design'],
  },
  {
    id: 3,
    date: '2021 - 2022',
    title: 'Btech year 1 & 2',
    description:
      'Started my coding journey as a student and have been working on various projects and tools since then.',
    technologies: ['JavaScript', 'python', 'HTML/CSS'],
    services: ['UI/UX Implementation'],
  },
];
