'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "O método Pomodoro mudou completamente minha forma de trabalhar. Agora consigo manter o foco por mais tempo.",
    author: "Maria Silva",
    role: "Designer"
  },
  {
    quote: "Simples e eficiente. As pausas estratégicas fazem toda a diferença na minha produtividade.",
    author: "João Santos",
    role: "Desenvolvedor"
  },
  {
    quote: "Excelente para gerenciar meu tempo de estudo. Recomendo para todos os estudantes.",
    author: "Ana Costa",
    role: "Estudante"
  }
]

export function Testimonials() {
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
            O que dizem nossos usuários
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Histórias reais de pessoas que transformaram sua produtividade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-500/20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-6">{testimonial.quote}</p>
              <div>
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 