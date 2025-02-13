'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Defina suas tarefas',
    description: 'Liste suas atividades principais e priorize o que precisa ser feito.'
  },
  {
    number: '02',
    title: 'Configure o timer',
    description: 'Escolha o tempo ideal para seus ciclos de foco e descanso.'
  },
  {
    number: '03',
    title: 'Mantenha o foco',
    description: 'Concentre-se em uma tarefa por vez durante cada ciclo Pomodoro.'
  },
  {
    number: '04',
    title: 'Faça pausas',
    description: 'Descanse entre os ciclos para manter sua mente sempre produtiva.'
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Como Funciona
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Quatro passos simples para aumentar sua produtividade com o método Pomodoro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-5xl font-bold text-white/[0.03] absolute -top-6 left-0">
                {step.number}
              </div>
              <div className="pt-8">
                <h3 className="text-white text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 