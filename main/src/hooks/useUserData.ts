'use client'

import { useState, useEffect } from 'react'

export function useUserData<T>(dataType: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const user = localStorage.getItem('user')
      if (!user) return

      const userId = JSON.parse(user).email
      const response = await fetch(`/api/user-data?userId=${userId}&dataType=${dataType}`)
      const loadedData = await response.json()
      setData(loadedData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (newData: T) => {
    try {
      const user = localStorage.getItem('user')
      if (!user) return

      const userId = JSON.parse(user).email
      await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          dataType,
          data: newData
        })
      })

      setData(newData)
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  return { data, loading, saveData }
} 