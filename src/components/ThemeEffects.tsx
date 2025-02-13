'use client'

import { useTheme } from '@/contexts/ThemeContext'

export function BlueSkiesEffect() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute top-[-10%] right-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]" />
    </div>
  )
}

export function ThemeEffects() {
  const { currentThemeKey } = useTheme()

  if (currentThemeKey === 'bluesky') {
    return <BlueSkiesEffect />
  }

  return null
} 