'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/app/PageContainer'
import { Calendar } from '@/components/calendar/Calendar'
import { EventModal } from '@/components/calendar/EventModal'

type Event = {
  id: string
  title: string
  description?: string
  start: string
  end: string
  color?: string
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    const savedEvents = localStorage.getItem(`events_${userId}`)
    if (savedEvents) setEvents(JSON.parse(savedEvents))
  }, [])

  return (
    <PageContainer>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[calc(100vh-6rem)]"
      >
        <Calendar 
          events={events}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onEventClick={setEditingEvent}
          onTimeSlotClick={(date) => {
            setSelectedDate(date)
            setShowEventModal(true)
          }}
        />

        {showEventModal && (
          <EventModal
            event={editingEvent}
            onSave={(event) => {
              if (editingEvent) {
                setEvents(events.map(e => e.id === event.id ? event : e))
              } else {
                setEvents([...events, { ...event, id: Date.now().toString() }])
              }
              setShowEventModal(false)
              setEditingEvent(null)
            }}
            onClose={() => {
              setShowEventModal(false)
              setEditingEvent(null)
            }}
          />
        )}
      </motion.div>
    </PageContainer>
  )
} 