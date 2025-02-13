'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'

export function HeaderManager() {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isAppPage = pathname.startsWith('/app')

  if (isAuthPage || isAppPage) return null
  return <Header />
} 