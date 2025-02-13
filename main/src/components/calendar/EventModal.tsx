'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Event = {
  id?: string
  title: string
  description?: string
  start: string
  end: string
  color?: string
}

type Props = {
  event?: Event | null
  onSave: (event: Event) => void
  onClose: () => void
}

export function EventModal({ event, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Event>({
    title: event?.title || '',
    description: event?.description || '',
    start: event?.start || new Date().toISOString().split('T')[0],
    end: event?.end || new Date().toISOString().split('T')[0],
    color: event?.color || 'bg-blue-500/20 text-blue-300'
  })

  const colors = [
    { value: 'bg-blue-500/20 text-blue-300', label: 'Azul' },
    { value: 'bg-green-500/20 text-green-300', label: 'Verde' },
    { value: 'bg-purple-500/20 text-purple-300', label: 'Roxo' },
    { value: 'bg-red-500/20 text-red-300', label: 'Vermelho' },
    { value: 'bg-yellow-500/20 text-yellow-300', label: 'Amarelo' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm w-full max-w-md"
      >
        <h2 className="text-xl text-white font-medium mb-4">
          {event ? 'Editar Evento' : 'Novo Evento'}
        </h2>

        <form onSubmit={(e) => {
          e.preventDefault()
          onSave(formData)
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Início</label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Fim</label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Cor</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {colors.map(color => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
} 