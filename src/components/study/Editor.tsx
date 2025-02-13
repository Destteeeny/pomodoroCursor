'use client'

import { useState, useEffect } from 'react'
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

type Props = {
  note: Note
  onChange: (note: Note) => void
}

export function Editor({ note, onChange }: Props) {
  const [localNote, setLocalNote] = useState(note)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setLocalNote(note)
  }, [note])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        localNote.title !== note.title ||
        localNote.content !== note.content ||
        localNote.tags.join(',') !== note.tags.join(',')
      ) {
        setIsSaving(true)
        onChange({
          ...localNote,
          updatedAt: new Date().toISOString()
        })
        setTimeout(() => setIsSaving(false), 1000)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localNote, note, onChange])

  return (
    <div className="h-full flex flex-col">
      {/* Barra de ferramentas */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
        <div className="flex-1">
          <input
            type="text"
            value={localNote.title}
            onChange={(e) => setLocalNote({ ...localNote, title: e.target.value })}
            className="w-full bg-transparent text-xl text-white font-medium focus:outline-none"
            placeholder="Título da nota..."
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={localNote.tags.join(', ')}
              onChange={(e) => setLocalNote({
                ...localNote,
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              })}
              className="text-sm text-gray-400 bg-transparent focus:outline-none"
              placeholder="Adicionar tags..."
            />
            {isSaving && (
              <span className="text-xs text-gray-400">Salvando...</span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {new Date(localNote.updatedAt).toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Editor de conteúdo */}
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={localNote.content}
          onChange={(e) => setLocalNote({ ...localNote, content: e.target.value })}
          className="w-full h-full bg-transparent text-white resize-none focus:outline-none"
          placeholder="Comece a escrever..."
        />
      </div>

      {/* Barra de status */}
      <div className="flex items-center justify-between p-4 border-t border-white/[0.05] text-sm text-gray-400">
        <div>
          {localNote.content.split(/\s+/).filter(Boolean).length} palavras
        </div>
        <div>
          {localNote.content.length} caracteres
        </div>
      </div>
    </div>
  )
} 