'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/app/PageContainer'

type Stats = {
  totalPomodoros: number
  totalTasksCompleted: number
  totalFocusTime: number // em minutos
  streak: number // dias consecutivos
  lastActiveDate?: string
}

export default function Stats() {
  const [stats, setStats] = useState<Stats>({
    totalPomodoros: 0,
    totalTasksCompleted: 0,
    totalFocusTime: 0,
    streak: 0
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email // Usando email como ID do usuário
    const savedStats = localStorage.getItem(`userStats_${userId}`)
    
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats)
      
      // Verificar streak
      const lastActive = parsedStats.lastActiveDate ? new Date(parsedStats.lastActiveDate) : null
      const today = new Date()
      
      if (lastActive) {
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays > 1) {
          // Resetar streak se passou mais de um dia
          parsedStats.streak = 0
        } else if (diffDays === 1) {
          // Incrementar streak se último acesso foi ontem
          parsedStats.streak += 1
        }
      }
      
      parsedStats.lastActiveDate = today.toISOString()
      setStats(parsedStats)
      localStorage.setItem(`userStats_${userId}`, JSON.stringify(parsedStats))
    }
  }, [])

  return (
    <PageContainer>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm"
      >
        <h2 className="text-2xl text-white font-medium mb-8">Estatísticas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total de Pomodoros</h3>
            <p className="text-4xl text-white font-medium">{stats.totalPomodoros}</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Tarefas Concluídas</h3>
            <p className="text-4xl text-white font-medium">{stats.totalTasksCompleted}</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Tempo Total Focado</h3>
            <p className="text-4xl text-white font-medium">
              {Math.floor(stats.totalFocusTime / 60)}h {stats.totalFocusTime % 60}m
            </p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Dias Consecutivos</h3>
            <p className="text-4xl text-white font-medium">{stats.streak}</p>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  )
} 