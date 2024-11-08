'use client';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { About } from './about';
import Experience from './experience';
import Projects from './showcase';
import Socials from './social';
import TechStack from './stack';

const PortfolioLayout = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let inViewSection = null;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          inViewSection = section;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Tech Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'social', label: 'Social' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64; // Adjust this value based on your sidebar width
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex min-h-screen text-zinc-100">
      <nav className="fixed w-64 h-screen p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Sangeeth Reddy
            </h1>
            <p className="text-sm text-zinc-400 mt-2">Full Stack Engineer</p>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'hover:bg-zinc-800/50 text-zinc-400'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRightIcon
                  className={`w-4 h-4 mr-2 transition-opacity ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      <main className="ml-64 w-full p-8">
        <div className="max-w-4xl mx-auto space-y-24">
          <section id="about" className="min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <About />
            </motion.div>
          </section>

          <section id="stack" className="min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TechStack />
            </motion.div>
          </section>

          <section id="experience" className="min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Experience />
            </motion.div>
          </section>

          <section id="projects" className="min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Projects />
            </motion.div>
          </section>

          <section id="social" className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Socials />
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PortfolioLayout;
