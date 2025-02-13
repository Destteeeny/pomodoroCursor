'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/app/PageContainer'
import { ActivityGraph } from '@/components/dashboard/ActivityGraph'
import { StatsOverview } from '@/components/dashboard/StatsOverview'

type Activity = {
  date: string
  minutes: number
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [stats, setStats] = useState({
    totalTime: 0,
    totalPomodoros: 0,
    totalTasks: 0,
    streak: 0,
    totalAppTime: 0
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Carregar atividades
      const savedActivities = localStorage.getItem(`activities_${parsedUser.email}`)
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities))
      }
      
      // Carregar estatísticas
      const savedStats = localStorage.getItem(`userStats_${parsedUser.email}`)
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats)
        setStats({
          totalTime: parsedStats.totalFocusTime || 0,
          totalPomodoros: parsedStats.totalPomodoros || 0,
          totalTasks: parsedStats.totalTasksCompleted || 0,
          streak: parsedStats.streak || 0,
          totalAppTime: parsedStats.totalAppTime || 0
        })
      }
    }
  }, [])

  return (
    <PageContainer>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <StatsOverview 
          stats={stats} 
          accountType={user?.accountType || 'basic'} 
        />
        
        <div>
          <h2 className="text-xl text-white font-medium mb-4 flex items-center gap-2">
            <span className="text-2xl" style={{ color: '#FFD700' }}>👑</span>
            Atividade
          </h2>
          <ActivityGraph activities={activities} />
        </div>
      </motion.div>
    </PageContainer>
  )
} 