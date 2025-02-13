'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { href: '/app', label: 'Timer' },
    { href: '/app/tasks', label: 'Tarefas' },
    { href: '/app/calendar', label: 'Calendário' },
    { href: '/app/stats', label: 'Estatísticas' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/app" className="text-white font-medium">
            Pomodoro
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <nav className="py-2 px-4 space-y-1">
              {menuItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 