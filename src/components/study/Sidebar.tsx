'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  folderId?: string
}

type Folder = {
  id: string
  name: string
  parentId?: string
}

type Props = {
  notes: Note[]
  folders: Folder[]
  activeNoteId: string | null
  onNoteSelect: (noteId: string) => void
  onCreateNote: () => void
}

export function Sidebar({ notes, folders, activeNoteId, onNoteSelect, onCreateNote }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFolder = !selectedFolder || note.folderId === selectedFolder
    
    return matchesSearch && matchesFolder
  })

  return (
    <div className="w-64 border-r border-white/[0.05] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.05]">
        <button
          onClick={onCreateNote}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Nova Nota
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-4 bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder="Pesquisar notas..."
        />
      </div>

      {/* Lista de pastas */}
      <div className="p-2 border-b border-white/[0.05]">
        <button
          onClick={() => setSelectedFolder(null)}
          className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
            !selectedFolder ? 'bg-white/[0.02] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Todas as Notas
        </button>
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
              selectedFolder === folder.id ? 'bg-white/[0.02] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {folder.name}
          </button>
        ))}
      </div>

      {/* Lista de notas */}
      <div className="flex-1 overflow-auto">
        {filteredNotes.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            Nenhuma nota encontrada
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredNotes.map(note => (
              <motion.button
                key={note.id}
                onClick={() => onNoteSelect(note.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  activeNoteId === note.id 
                    ? 'bg-white/[0.02] text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="font-medium truncate">{note.title || 'Sem título'}</h3>
                <p className="text-sm truncate mt-1">
                  {note.content.substring(0, 50)}
                  {note.content.length > 50 ? '...' : ''}
                </p>
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 