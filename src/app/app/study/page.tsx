'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/app/PageContainer'
import { Editor } from '@/components/study/Editor'
import { Sidebar } from '@/components/study/Sidebar'

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

export default function Study() {
  const [notes, setNotes] = useState<Note[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  
  // Carregar notas do localStorage
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    const savedNotes = localStorage.getItem(`notes_${userId}`)
    const savedFolders = localStorage.getItem(`folders_${userId}`)

    if (savedNotes) setNotes(JSON.parse(savedNotes))
    if (savedFolders) setFolders(JSON.parse(savedFolders))
  }, [])

  return (
    <PageContainer>
      <div className="flex h-[calc(100vh-6rem)]">
        <Sidebar 
          notes={notes}
          folders={folders}
          activeNoteId={activeNoteId}
          onNoteSelect={setActiveNoteId}
          onCreateNote={() => {
            const newNote: Note = {
              id: Date.now().toString(),
              title: 'Nova Nota',
              content: '',
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            setNotes([newNote, ...notes])
            setActiveNoteId(newNote.id)
          }}
        />
        
        <div className="flex-1">
          {activeNoteId ? (
            <Editor 
              note={notes.find(n => n.id === activeNoteId)!}
              onChange={(updatedNote) => {
                setNotes(notes.map(note => 
                  note.id === activeNoteId ? updatedNote : note
                ))
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Selecione ou crie uma nota para começar
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
} 