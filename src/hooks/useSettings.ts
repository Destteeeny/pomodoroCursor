'use client'

import { useState, useEffect } from 'react'

interface Settings {
  workDuration: number
  breakDuration: number
  notifications: boolean
  sound: boolean
}

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  breakDuration: 5,
  notifications: true,
  sound: true
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [tempSettings, setTempSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      setMounted(true)
      return
    }

    const userId = JSON.parse(user).email
    const savedSettings = localStorage.getItem(`settings_${userId}`)
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(parsed)
        setTempSettings(parsed)
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }
    setMounted(true)
  }, [])

  const updateTempSettings = (newSettings: Partial<Settings>) => {
    setTempSettings(prev => ({ ...prev, ...newSettings }))
  }

  const saveSettings = () => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userId = JSON.parse(user).email
    setSettings(tempSettings)
    localStorage.setItem(`settings_${userId}`, JSON.stringify(tempSettings))
  }

  return {
    settings,
    tempSettings,
    updateTempSettings,
    saveSettings,
    isReady: mounted
  }
} 