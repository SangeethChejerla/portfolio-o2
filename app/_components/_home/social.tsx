import React from 'react';

// Define the type for contact items
interface ContactItem {
  label: string;
  value: string;
  link: string;
}

const contactItems: ContactItem[] = [
  { label: 'X', value: '@sangeeth_rch', link: 'https://x.com/sangeeth_rch' },
  {
    label: 'LinkedIn',
    value: 'sangeeth-reddy-chejerla',
    link: 'https://www.linkedin.com/in/sangeeth-reddy-chejerla-323587254/',
  },
  {
    label: 'Email',
    value: 'sangeethreddychejerla@gmail',
    link: 'mailto:sangeethreddychejerla@gmail.com',
  },
  {
    label: 'My Anime List',
    value: 'Aryayama Nyx',
    link: 'https://myanimelist.net/profile/AryayamaNyx',
  },
];

const ContactList: React.FC = () => {
  return (
    <section
      id="social"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="social"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-8">
        Social
      </h2>
      <div className="font-sans text-gray-300 w-[400px]">
        <div className="space-y-4">
          {contactItems.map(({ label, value, link }, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-500 w-24 mr-16 hover:text-white">
                {label}
              </span>
              <div className="text-right">
                <a href={link} className="text-gray-300 hover:text-white">
                  {value}
                </a>
                <svg
                  className="ml-1 inline"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                    fill="#eee"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactList;
