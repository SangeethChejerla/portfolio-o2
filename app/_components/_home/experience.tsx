import { JOB_EXPERIENCE } from '@/app/constant';
import { Link1Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    {children}
  </motion.div>
);

export function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <SectionTitle>
        <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">
          Experience
        </h2>
      </SectionTitle>

      <motion.ol
        className="group/list relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {JOB_EXPERIENCE.map((job, index) => (
          <motion.li
            key={job.id}
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-950/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-500/60 sm:col-span-2">
                {job.date}
              </header>

              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                  <div className="group/link inline-flex flex-col">
                    <span className="text-lg font-semibold text-emerald-400">
                      {job.title}
                    </span>
                    <span className="text-sm text-slate-400">
                      {job.company}
                    </span>
                  </div>
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {job.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.technologies?.map((tech, idx) => (
                    <li key={`${tech}-${idx}`}>
                      <span className="flex items-center rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        {tech}
                      </span>
                    </li>
                  ))}

                  {job.services?.map((service, idx) => (
                    <li key={`${service}-${idx}`}>
                      <span className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>

                {job.relatedLinks && (
                  <ul className="mt-4 flex flex-wrap items-center gap-4">
                    {job.relatedLinks.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <Link1Icon className="h-4 w-4" />
                          <span>{link.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

export default Experience;
