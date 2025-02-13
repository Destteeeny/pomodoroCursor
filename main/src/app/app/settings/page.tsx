'use client'

import { motion } from 'framer-motion'
import { useSettings } from '@/hooks/useSettings'
import { useRouter } from 'next/navigation'
import { PageContainer } from '@/components/app/PageContainer'

export default function Settings() {
  const { tempSettings, updateTempSettings, saveSettings, isReady } = useSettings()
  const router = useRouter()

  const handleSave = () => {
    saveSettings()
    router.push('/app')
  }

  if (!isReady) {
    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">Configurações</h2>
          </div>
          <div className="animate-pulse">
            <div className="h-8 bg-white/[0.05] rounded mb-4" />
            <div className="h-8 bg-white/[0.05] rounded mb-4" />
            <div className="h-8 bg-white/[0.05] rounded" />
          </div>
        </motion.div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-white">Configurações</h2>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-lg bg-white/[0.02]" />
            <span className="relative z-10">Salvar</span>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg text-white mb-4">Timer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Duração do Pomodoro (minutos)
                </label>
                <input
                  type="number"
                  value={tempSettings.workDuration}
                  onChange={(e) => updateTempSettings({ workDuration: Number(e.target.value) })}
                  min="1"
                  max="60"
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Duração da Pausa (minutos)
                </label>
                <input
                  type="number"
                  value={tempSettings.breakDuration}
                  onChange={(e) => updateTempSettings({ breakDuration: Number(e.target.value) })}
                  min="1"
                  max="30"
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-white mb-4">Notificações</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">
                  Notificações do navegador
                </label>
                <button
                  onClick={() => updateTempSettings({ notifications: !tempSettings.notifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    tempSettings.notifications ? 'bg-white/[0.1]' : 'bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      tempSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">
                  Som
                </label>
                <button
                  onClick={() => updateTempSettings({ sound: !tempSettings.sound })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    tempSettings.sound ? 'bg-white/[0.1]' : 'bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      tempSettings.sound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PageContainer>
  )
} 