'use client'

import { motion } from 'framer-motion'
import { GlowEffect } from '@/components/GlowEffect'
import { HeroGlow } from '@/components/HeroGlow'

const resources = [
  {
    title: "Guia do Pomodoro",
    description: "Aprenda os fundamentos do método e como aplicá-lo no seu dia a dia.",
    type: "Guia",
    link: "#"
  },
  {
    title: "Templates de Planejamento",
    description: "Modelos prontos para organizar suas tarefas e projetos.",
    type: "Template",
    link: "#"
  },
  {
    title: "Webinars Gravados",
    description: "Assista a apresentações sobre produtividade e gestão de tempo.",
    type: "Vídeo",
    link: "#"
  },
  {
    title: "Blog de Produtividade",
    description: "Dicas e estratégias para melhorar seu foco e eficiência.",
    type: "Blog",
    link: "#"
  }
]

export default function Resources() {
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
              Recursos e Materiais
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Conteúdo gratuito para ajudar você a dominar o método Pomodoro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white text-xl font-medium">{resource.title}</h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/[0.05] text-gray-400">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{resource.description}</p>
                <a 
                  href={resource.link}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Acessar recurso →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <GlowEffect />
    </div>
  )
} 