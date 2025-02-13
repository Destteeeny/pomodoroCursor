'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/app/PageContainer'

// Primeiro, vamos definir o tipo Priority
type Priority = 'low' | 'medium' | 'high'

type Task = {
  id: string
  title: string
  description: string
  completed: boolean
  priority: Priority
  dueDate?: string
  createdAt: string
  tags: string[]
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: '',
    tags: ''
  })
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingTask, setEditingTask] = useState<string | null>(null)

  // Carregar tarefas do localStorage
  useEffect(() => {
    try {
      const user = localStorage.getItem('user')
      if (!user) return

      const userId = JSON.parse(user).email
      const savedTasks = localStorage.getItem(`todoTasks_${userId}`)
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    }
  }, [])

  // Salvar tarefas no localStorage
  useEffect(() => {
    try {
      const user = localStorage.getItem('user')
      if (!user) return

      const userId = JSON.parse(user).email
      localStorage.setItem(`todoTasks_${userId}`, JSON.stringify(tasks))
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error)
    }
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate || undefined,
        createdAt: new Date().toISOString(),
        tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }
      setTasks(prev => [task, ...prev])
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        tags: ''
      })
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
    if (editingTask === taskId) {
      setEditingTask(null)
    }
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed
      if (filter === 'active') return !task.completed
      return true
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const priorityColors = {
    low: 'bg-green-500/20 text-green-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300'
  }

  return (
    <PageContainer>
      <motion.div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm">
        {/* Header e Filtros */}
        <div className="mb-8">
          <h1 className="text-2xl text-white font-medium mb-4">Minhas Tarefas</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar tarefas..."
              className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="all">Todas</option>
              <option value="active">Ativas</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>
        </div>

        {/* Formulário de Nova Tarefa */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm mb-8"
          onSubmit={addTask}
        >
          <div className="space-y-4">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Título da tarefa"
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Descrição (opcional)"
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px]"
            />
            <div className="flex flex-wrap gap-4">
              <select
                value={newTask.priority}
                onChange={(e) => {
                  const value = e.target.value as Priority
                  setNewTask({ ...newTask, priority: value })
                }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="low">Baixa Prioridade</option>
                <option value="medium">Média Prioridade</option>
                <option value="high">Alta Prioridade</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <input
                type="text"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                placeholder="Tags (separadas por vírgula)"
                className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 ease-in-out hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-[1.02]"
            >
              Adicionar Tarefa
            </button>
          </div>
        </motion.form>

        {/* Lista de Tarefas */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Nenhuma tarefa encontrada...
            </p>
          ) : (
            filteredTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg backdrop-blur-sm ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompleted(task.id)}
                    className="mt-1.5 w-4 h-4 rounded border-gray-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-gray-400 mb-2">{task.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      {task.dueDate && (
                        <span className="text-gray-400">
                          Prazo: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {task.tags.length > 0 && (
                        <div className="flex gap-2">
                          {task.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </PageContainer>
  )
} 