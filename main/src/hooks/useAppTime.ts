'use client'

import { useEffect } from 'react'

export function useAppTime() {
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    const startTime = Date.now()

    // Atualizar tempo total a cada minuto
    const interval = setInterval(() => {
      const savedStats = localStorage.getItem(`userStats_${userId}`)
      const stats = savedStats ? JSON.parse(savedStats) : {
        totalPomodoros: 0,
        totalTasksCompleted: 0,
        totalFocusTime: 0,
        totalAppTime: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString()
      }

      const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
      stats.totalAppTime = (stats.totalAppTime || 0) + 1

      localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
    }, 60000)

    // Salvar tempo quando o usuário sair
    const handleBeforeUnload = () => {
      const savedStats = localStorage.getItem(`userStats_${userId}`)
      if (savedStats) {
        const stats = JSON.parse(savedStats)
        const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000)
        stats.totalAppTime = (stats.totalAppTime || 0) + elapsedMinutes
        localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      handleBeforeUnload()
    }
  }, [])
} 