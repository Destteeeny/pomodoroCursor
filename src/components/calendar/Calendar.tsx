'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Event = {
  id: string
  title: string
  description?: string
  start: string
  end: string
  color?: string
}

type Props = {
  events: Event[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onEventClick: (event: Event) => void
  onTimeSlotClick: (date: Date) => void
}

export function Calendar({ events, selectedDate, onDateSelect, onEventClick, onTimeSlotClick }: Props) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate)

  const getDaysInMonth = (date: Date) => {
    const days = []
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    // Preencher dias do mês anterior
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(firstDay)
      prevDate.setDate(prevDate.getDate() - (firstDay.getDay() - i))
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i)
      days.push({ date: currentDate, isCurrentMonth: true })
    }
    
    // Preencher dias do próximo mês
    const remainingDays = 42 - days.length // 6 semanas * 7 dias
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(lastDay)
      nextDate.setDate(nextDate.getDate() + i)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white font-medium">
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="grid grid-cols-7 gap-px bg-white/[0.02] rounded-lg overflow-hidden">
        {/* Cabeçalho dos dias da semana */}
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm text-gray-400">
            {day}
          </div>
        ))}
        
        {/* Dias do mês */}
        {days.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date)
          const isSelected = date.toDateString() === selectedDate.toDateString()
          const isToday = date.toDateString() === new Date().toDateString()

          return (
            <motion.div
              key={date.toISOString()}
              className={`min-h-[100px] p-2 relative cursor-pointer transition-colors ${
                isCurrentMonth ? 'bg-white/[0.02]' : 'bg-white/[0.01]'
              } ${isSelected ? 'ring-2 ring-blue-500/50' : ''}`}
              onClick={() => {
                onDateSelect(date)
                onTimeSlotClick(date)
              }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            >
              <span className={`text-sm ${
                isCurrentMonth 
                  ? isToday
                    ? 'text-blue-400 font-medium'
                    : 'text-white'
                  : 'text-gray-600'
              }`}>
                {date.getDate()}
              </span>

              {/* Eventos do dia */}
              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                    className={`text-xs p-1 rounded truncate ${
                      event.color || 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 