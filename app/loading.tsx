// app/_components/LoadingScreen.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth transition
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black "
    >
      <div className="relative">
        {/* Outer rotating circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-24 w-24 rounded-full border-b-2 border-t-2 border-indigo-500"
        />

        {/* Inner rotating circle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 m-auto h-16 w-16 rounded-full border-l-2 border-r-2 border-purple-500"
        />

        {/* Center pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-indigo-400"
        />
      </div>
    </motion.div>
  );
}
