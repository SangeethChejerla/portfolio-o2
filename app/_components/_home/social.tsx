import 'devicon/devicon.min.css';
import { motion } from 'framer-motion';

interface Social {
  icon: string;
  color: string;
  url: string; // Add a URL for each social link
}

const SOCIALS: Social[] = [
  {
    icon: 'devicon-github-original',
    color: 'group-hover:text-[#181717]',
    url: 'https://github.com/your-username',
  },
  {
    icon: 'devicon-linkedin-plain',
    color: 'group-hover:text-[#0077B5]',
    url: 'https://linkedin.com/in/your-username',
  },
  {
    icon: 'devicon-discord-plain',
    color: 'group-hover:text-[#7289DA]',
    url: 'https://discord.com/users/your-discord-id',
  },
  {
    icon: 'devicon-twitter-original', // Assuming there's an X icon in DevIcon, if not, you might need to use a different icon or library
    color: 'group-hover:text-[#1DA1F2]',
    url: 'https://x.com/your-username',
  },
];

export function Socials() {
  return (
    <section
      id="socials"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-8">
          Socials
        </h2>

        <div className="flex justify-center gap-8">
          {SOCIALS.map((social, index) => (
            <motion.a
              key={social.icon}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className={`group relative ${social.color}`}
            >
              <i className={`${social.icon} text-4xl`} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Socials;
