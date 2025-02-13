'use client'

import { motion } from 'framer-motion'

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        {children}
      </motion.div>
    </div>
  )
} 