'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '⏱️',
    title: 'Temporizador Inteligente',
    description: 'Configure ciclos de trabalho e descanso personalizados para maximizar sua produtividade.'
  },
  {
    icon: '📊',
    title: 'Análise de Progresso',
    description: 'Acompanhe seu desempenho e visualize estatísticas detalhadas do seu foco.'
  },
  {
    icon: '🎯',
    title: 'Gestão de Tarefas',
    description: 'Organize suas atividades e priorize o que realmente importa.'
  },
  {
    icon: '🔔',
    title: 'Notificações Personalizadas',
    description: 'Receba alertas suaves para manter seu foco e ritmo de trabalho.'
  }
]

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Recursos Essenciais
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ferramentas poderosas para ajudar você a manter o foco e aumentar sua produtividade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
    </section>
  )
} 