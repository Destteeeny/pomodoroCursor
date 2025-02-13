'use client'

import { AppHeader } from '@/components/app/AppHeader'
import { HeroGlow } from '@/components/HeroGlow'

export function AppLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-[#070709] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <HeroGlow />
      </div>
      <AppHeader />
      <main className="relative pt-16">
        {children}
      </main>
    </div>
  )
} 