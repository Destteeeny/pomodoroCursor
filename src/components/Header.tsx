'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type NavItem = {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 sm:top-6 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between bg-white/[0.02] backdrop-blur-sm rounded-none sm:rounded-2xl px-5 py-3 border-b sm:border border-white/[0.05]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="text-white text-sm font-medium">Pomodoro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </motion.div>
                )}
                <Link 
                  href={item.href}
                  className={`relative text-sm transition-colors px-4 py-2 block ${
                    pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login"
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/register"
              className="px-3 py-1.5 text-xs bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-lg border border-white/[0.05] transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-0 right-0 top-[60px] mx-4 p-4 rounded-lg bg-[#0D0D0F] border border-white/[0.05] shadow-xl"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      pathname === item.href 
                        ? 'bg-white/[0.05] text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="h-[1px] bg-white/[0.05] my-2" />
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white text-left"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-lg"
                >
                  Sign up
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 