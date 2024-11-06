import 'devicon/devicon.min.css'; // Ensure this CSS is included in your project
import { motion } from 'framer-motion';

interface TechStack {
  name: string;
  icon: string;
  color: string;
}

const TECH_STACK: TechStack[] = [
  {
    name: 'Next.js',
    icon: 'devicon-nextjs-plain',
    color: 'group-hover:text-gray-400',
  },
  {
    name: 'TypeScript',
    icon: 'devicon-typescript-plain',
    color: 'group-hover:text-[#3178C6]',
  },
  {
    name: 'Tailwind CSS',
    icon: 'devicon-tailwindcss-plain',
    color: 'group-hover:text-[#06B6D4]',
  },
  {
    name: 'TensorFlow',
    icon: 'devicon-tensorflow-original',
    color: 'group-hover:text-[#FF6F00]',
  },
  {
    name: 'Python',
    icon: 'devicon-python-plain',
    color: 'group-hover:text-[#3776AB]',
  },
  {
    name: 'C++',
    icon: 'devicon-cplusplus-plain',
    color: 'group-hover:text-[#00599C]',
  },
  {
    name: 'Rust',
    icon: 'devicon-rust-plain',
    color: 'group-hover:text-[#000000]',
  },
  {
    name: 'PostgreSQL',
    icon: 'devicon-postgresql-plain',
    color: 'group-hover:text-[#4169E1]',
  },
  {
    name: 'Astro',
    icon: 'devicon-astro-plain',
    color: 'group-hover:text-[#FF5D01]',
  },
  {
    name: 'React',
    icon: 'devicon-react-original',
    color: 'group-hover:text-[#61DAFB]',
  },
];

export function TechStack() {
  return (
    <section
      id="stack"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-8">
          Tech Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-lg  transition-all duration-300" />
              <div
                className={`relative p-6 flex flex-col items-center gap-4 text-zinc-400 transition-colors duration-300 ${tech.color}`}
              >
                <i className={`${tech.icon} text-4xl`} />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default TechStack;
