'use client'

import { motion } from 'framer-motion'

export function GlowEffect() {
  return (
    <>
      <motion.div
        className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/40 blur-[180px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-purple-600/40 blur-[180px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </>
  )
} 