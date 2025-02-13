'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function BlurText() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <span className="inline-block text-blue-400 font-medium tracking-wider text-xs sm:text-sm uppercase px-4 py-1.5 rounded-full bg-blue-500/[0.03] border border-blue-400/[0.03] backdrop-blur-sm">
            Pomodoro Timer
          </span>
        </div>
        <div className="relative space-y-2">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight font-['Clash_Display']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Foco no essencial
          </motion.h1>

          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl font-normal max-w-2xl mx-auto font-['Clash_Display']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              maximize seu potencial
            </span>
          </motion.p>
          
          {/* Decoração suave */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-600/5 to-purple-600/5 blur-[100px] rounded-full" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Link href="/register" className="relative inline-block">
          <button className="relative px-10 py-3 rounded-full text-white text-sm sm:text-base font-medium transition-all duration-300 group backdrop-blur-sm border border-white/20 hover:border-white/40 overflow-hidden font-['Clash_Display']">
            <div className="absolute inset-0 rounded-full bg-white/[0.02]" />
            <span className="relative z-10">Começar</span>
          </button>
        </Link>
      </motion.div>
    </div>
  )
} 