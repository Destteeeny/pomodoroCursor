'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Comece agora mesmo
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Aumente sua produtividade e alcance seus objetivos com o método Pomodoro.
          </p>
          <Link href="/register" className="relative inline-block">
            <button className="relative px-10 py-3 rounded-full text-white text-sm sm:text-base font-medium transition-all duration-300 group backdrop-blur-sm border border-white/20 hover:border-white/40 overflow-hidden font-['Clash_Display']">
              <div className="absolute inset-0 rounded-full bg-white/[0.02]" />
              <span className="relative z-10">Começar</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 