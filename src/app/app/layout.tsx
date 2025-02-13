import type { Metadata } from 'next'
import { AppLayoutWrapper } from './AppLayoutWrapper'

export const metadata: Metadata = {
  title: 'Pomodoro - App',
  description: 'Gerencie seu tempo e aumente sua produtividade',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>
} 