'use client'

import { useMemo } from 'react'

type Activity = {
  date: string
  minutes: number
}

type Props = {
  activities: Activity[]
}

export function ActivityGraph({ activities }: Props) {
  const last365Days = useMemo(() => {
    const days = []
    const today = new Date()
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      days.unshift(date.toISOString().split('T')[0])
    }
    
    return days
  }, [])

  const activityMap = useMemo(() => {
    const map: Record<string, number> = {}
    activities.forEach(activity => {
      map[activity.date] = activity.minutes
    })
    return map
  }, [activities])

  const getIntensityClass = (minutes: number) => {
    if (minutes === 0) return 'bg-white/[0.02]'
    if (minutes < 30) return 'bg-green-500/20'
    if (minutes < 60) return 'bg-green-500/40'
    if (minutes < 120) return 'bg-green-500/60'
    return 'bg-green-500/80'
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm">
      <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
        {last365Days.map((date) => (
          <div
            key={date}
            className={`aspect-square rounded-sm ${getIntensityClass(activityMap[date] || 0)}`}
            title={`${date}: ${activityMap[date] || 0} minutos`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-400">
        <span>Menos</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded-sm bg-white/[0.02]" />
          <div className="w-3 h-3 rounded-sm bg-green-500/20" />
          <div className="w-3 h-3 rounded-sm bg-green-500/40" />
          <div className="w-3 h-3 rounded-sm bg-green-500/60" />
          <div className="w-3 h-3 rounded-sm bg-green-500/80" />
        </div>
        <span>Mais</span>
      </div>
    </div>
  )
} 