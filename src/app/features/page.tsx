'use client'

import { motion } from 'framer-motion'
import { GlowEffect } from '@/components/GlowEffect'
import { HeroGlow } from '@/components/HeroGlow'

const features = [
  {
    title: "Timer Personalizável",
    description: "Configure a duração dos ciclos de trabalho e pausas de acordo com seu ritmo.",
    icon: "⚡"
  },
  {
    title: "Estatísticas Detalhadas",
    description: "Acompanhe seu progresso diário, semanal e mensal com gráficos intuitivos.",
    icon: "📊"
  },
  {
    title: "Integração com Calendário",
    description: "Sincronize suas tarefas com Google Calendar e outros apps populares.",
    icon: "📅"
  },
  {
    title: "Modo Offline",
    description: "Continue produtivo mesmo sem conexão com a internet.",
    icon: "🔄"
  },
  {
    title: "Temas Personalizados",
    description: "Escolha entre temas claros e escuros ou crie o seu próprio.",
    icon: "🎨"
  },
  {
    title: "Notificações Inteligentes",
    description: "Receba lembretes sutis para manter seu foco e fazer pausas.",
    icon: "🔔"
  }
]

export default function Features() {
  return (
    <div className="min-h-screen relative">
      <HeroGlow />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-6">
              Recursos Completos
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Todas as ferramentas que você precisa para maximizar sua produtividade em um só lugar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-white text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <GlowEffect />
    </div>
  )
} 