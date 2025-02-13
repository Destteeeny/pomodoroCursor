'use client'

import { AppHeader } from '@/components/app/AppHeader'
import { useAppTime } from '@/hooks/useAppTime'
import { AppLayoutClient } from './AppLayoutClient'

export function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  useAppTime()

  return (
    <div className="min-h-screen pt-16">
      <AppHeader />
      <AppLayoutClient>{children}</AppLayoutClient>
    </div>
  )
} 