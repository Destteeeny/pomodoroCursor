'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '@/hooks/useSettings'

type Task = {
  id: string
  title: string
  completed: boolean
  pomodoros: number
}

export default function Timer() {
  const { settings } = useSettings()
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkTime, setIsWorkTime] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const workAlarmRef = useRef<HTMLAudioElement | null>(null)
  const breakAlarmRef = useRef<HTMLAudioElement | null>(null)

  // Carregar tarefas do localStorage
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    const savedTasks = localStorage.getItem(`tasks_${userId}`)
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Salvar tarefas no localStorage quando houver mudanças
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks))
  }, [tasks])

  // Atualizar o timer quando as configurações mudarem
  useEffect(() => {
    if (isWorkTime) {
      setTimeLeft(settings.workDuration * 60)
    } else {
      setTimeLeft(settings.breakDuration * 60)
    }
    setIsRunning(false)
  }, [settings, isWorkTime])

  useEffect(() => {
    // Criar elementos de áudio para os dois alarmes
    workAlarmRef.current = new Audio('/sounds/alarm.mp3')
    breakAlarmRef.current = new Audio('/sounds/pause.mp3')
    workAlarmRef.current.volume = 1.0
    breakAlarmRef.current.volume = 1.0
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    let soundTimeout: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Tocar o som apropriado quando o timer chegar a zero
      if (settings.sound) {
        const currentAlarm = isWorkTime ? workAlarmRef.current : breakAlarmRef.current
        if (currentAlarm) {
          currentAlarm.play()
          // Parar o som após 3 segundos
          soundTimeout = setTimeout(() => {
            if (currentAlarm) {
              currentAlarm.pause()
              currentAlarm.currentTime = 0
            }
          }, 1000)
        }
      }
      
      if (isWorkTime && selectedTask) {
        setTasks(tasks.map(task => 
          task.id === selectedTask 
            ? { ...task, pomodoros: task.pomodoros + 1 }
            : task
        ))
      }
      
      if (isWorkTime) {
        setTimeLeft(settings.breakDuration * 60)
        setIsWorkTime(false)
      } else {
        setTimeLeft(settings.workDuration * 60)
        setIsWorkTime(true)
      }

      if (timeLeft === 0 && isWorkTime) {
        const user = localStorage.getItem('user')
        if (user) {
          const userId = JSON.parse(user).email
          const savedStats = localStorage.getItem(`userStats_${userId}`)
          const stats = savedStats ? JSON.parse(savedStats) : {
            totalPomodoros: 0,
            totalTasksCompleted: 0,
            totalFocusTime: 0,
            totalAppTime: 0,
            streak: 0,
            lastActiveDate: new Date().toISOString()
          }
          
          stats.totalPomodoros += 1
          stats.totalFocusTime += settings.workDuration

          // Atualizar atividades para cada pomodoro completado
          const today = new Date().toISOString().split('T')[0]
          const savedActivities = localStorage.getItem(`activities_${userId}`)
          const activities = savedActivities ? JSON.parse(savedActivities) : []
          
          const existingActivity = activities.find(a => a.date === today)
          if (existingActivity) {
            existingActivity.minutes += 1 // Cada pomodoro conta como 1 na atividade
          } else {
            activities.push({ date: today, minutes: 1 })
          }
          
          localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
          localStorage.setItem(`activities_${userId}`, JSON.stringify(activities))
        }
      }
    }

    return () => {
      clearInterval(interval)
      clearTimeout(soundTimeout)
    }
  }, [isRunning, timeLeft, settings, isWorkTime, selectedTask, tasks])

  useEffect(() => {
    // Atualizar tempo total na aplicação a cada minuto
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    const savedStats = localStorage.getItem(`userStats_${userId}`)
    const stats = savedStats ? JSON.parse(savedStats) : {
      totalPomodoros: 0,
      totalTasksCompleted: 0,
      totalFocusTime: 0,
      totalAppTime: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString()
    }

    // Inicializar totalAppTime se não existir
    if (!stats.totalAppTime) stats.totalAppTime = 0

    const interval = setInterval(() => {
      stats.totalAppTime = (stats.totalAppTime || 0) + 1
      localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
    }, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        pomodoros: 0
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    }
  }

  const toggleTaskCompleted = (taskId: string) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    setTasks(newTasks)

    // Se a tarefa foi marcada como concluída
    const task = tasks.find(t => t.id === taskId)
    if (task && !task.completed) {
      const user = localStorage.getItem('user')
      if (user) {
        const userId = JSON.parse(user).email
        
        // Atualizar estatísticas
        const savedStats = localStorage.getItem(`userStats_${userId}`)
        const stats = savedStats ? JSON.parse(savedStats) : {
          totalPomodoros: 0,
          totalTasksCompleted: 0,
          totalFocusTime: 0,
          totalAppTime: 0,
          streak: 0,
          lastActiveDate: new Date().toISOString()
        }
        stats.totalTasksCompleted += 1

        // Atualizar atividades
        const today = new Date().toISOString().split('T')[0]
        const savedActivities = localStorage.getItem(`activities_${userId}`)
        const activities = savedActivities ? JSON.parse(savedActivities) : []
        
        const existingActivity = activities.find(a => a.date === today)
        if (existingActivity) {
          existingActivity.minutes += 1
        } else {
          activities.push({ date: today, minutes: 1 })
        }

        // Salvar atualizações
        localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
        localStorage.setItem(`activities_${userId}`, JSON.stringify(activities))
      }
    }
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    if (selectedTask === taskId) {
      setSelectedTask(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Timer Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl text-white mb-8">
            {isWorkTime ? 'Hora de Focar!' : 'Hora da Pausa!'}
            <p className="text-1xl text-gray-400 mb-10">
              {isWorkTime ? 'Clique no botão abaixo para começar a trabalhar!' : 'Clique no botão abaixo para pausar o timer!'}
            </p>
          </h2>
          
          <div 
            onClick={toggleTimer}
            className={`w-72 h-72 rounded-full bg-white/[0.02] border flex items-center justify-center relative mx-auto backdrop-blur-sm cursor-pointer transition-all duration-300 group ${
              !isRunning && 'opacity-60'
            } ${
              !isWorkTime 
                ? 'border-red-500/40 bg-red-500/[0.02]' 
                : isRunning 
                  ? 'border-green-500/40 bg-green-500/[0.02] hover:border-green-500/60' 
                  : 'border-white/[0.05] hover:border-white/40'
            }`}
          >
            <div className={`text-6xl font-medium ${
              !isWorkTime 
                ? 'text-red-50' 
                : isRunning 
                  ? 'text-green-50' 
                  : 'text-white'
            }`}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            
            {/* Ícone de Play quando parado */}
            {!isRunning && (
              <div className={`absolute inset-0 flex items-center justify-center ${
                isWorkTime ? 'bg-black/20' : 'bg-red-900/20'
              } rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}>
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tasks Section */}
      <div className="flex-1 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto p-8"
        >
          <h3 className="text-xl text-white mb-6">Tarefas</h3>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm">
            {/* Adicionar nova tarefa */}
            <form onSubmit={addTask} className="mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Adicionar nova tarefa..."
                  className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 overflow-hidden"
                >
                  <div className="" />
                  <span className="relative z-10">Adicionar</span>
                </button>
              </div>
            </form>

            {/* Lista de tarefas */}
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-gray-400 text-center">
                  Nenhuma tarefa adicionada ainda...
                </p>
              ) : (
                tasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg flex items-center justify-between ${
                      selectedTask === task.id ? 'ring-2 ring-blue-500/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompleted(task.id)}
                        className="w-4 h-4 rounded border-gray-400"
                      />
                      <span className={`text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({task.pomodoros} pomodoros)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                        className={`text-sm px-3 py-1 rounded ${
                          selectedTask === task.id
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.05]'
                        }`}
                      >
                        {selectedTask === task.id ? 'Selecionada' : 'Selecionar'}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 