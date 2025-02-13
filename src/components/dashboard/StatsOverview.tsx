'use client'

type Props = {
  stats: {
    totalTime: number
    totalPomodoros: number
    totalTasks: number
    streak: number
    totalAppTime: number
  }
  accountType: 'basic' | 'pro' | 'team'
}

export function StatsOverview({ stats, accountType }: Props) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">Tempo Total na Aplicação</h3>
        <p className="text-4xl text-white font-medium">
          {formatTime(stats.totalAppTime)}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
        <h3 className="text-gray-400 text-sm mb-2">Tempo Total em Pomodoros</h3>
        <p className="text-4xl text-white font-medium">
          {formatTime(stats.totalTime)}
        </p>
      </div>

      {(accountType === 'pro' || accountType === 'team') && (
        <>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Pomodoros Completados</h3>
            <p className="text-4xl text-white font-medium">
              {stats.totalPomodoros}
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Tarefas Concluídas</h3>
            <p className="text-4xl text-white font-medium">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Dias Consecutivos</h3>
            <p className="text-4xl text-white font-medium">
              {stats.streak}
            </p>
          </div>
        </>
      )}
    </div>
  )
} 