'use client'

import { motion } from 'framer-motion'
import { GlowEffect } from '@/components/GlowEffect'
import { HeroGlow } from '@/components/HeroGlow'
import { CheckIcon } from '@/components/icons/CheckIcon'

const plans = [
  {
    name: "Básico",
    price: "Grátis",
    description: "Perfeito para começar com o método Pomodoro",
    features: [
      "Timer Pomodoro básico",
      "Estatísticas diárias",
      "3 templates de tarefas",
      "Notificações básicas",
      "Sincronização em 1 dispositivo"
    ]
  },
  {
    name: "Pro",
    price: "4,99€",
    period: "/mês",
    description: "Para profissionais que buscam mais produtividade",
    popular: true,
    features: [
      "Tudo do plano Básico",
      "Timer personalizado",
      "Estatísticas avançadas",
      "Templates ilimitados",
      "Notificações personalizadas",
      "Sincronização em todos dispositivos",
      "Modo offline",
      "Integração com calendário",
      "Suporte prioritário"
    ]
  },
  {
    name: "Equipa",
    price: "9,99€",
    period: "/mês",
    description: "Ideal para equipas e empresas",
    features: [
      "Tudo do plano Pro",
      "Gestão de equipa",
      "Relatórios de produtividade",
      "Dashboards compartilhados",
      "Integração com Slack/Teams",
      "API acesso",
      "Onboarding personalizado",
      "Gestor de conta dedicado",
      "SLA garantido"
    ]
  }
]

export default function Pricing() {
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
              Planos e Preços
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Escolha o plano ideal para aumentar sua produtividade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl backdrop-blur-sm border ${
                  plan.popular 
                    ? 'bg-white/[0.03] border-blue-500/20' 
                    : 'bg-white/[0.02] border-white/[0.05]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-white text-xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 mb-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full mt-8 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                      : 'bg-white/[0.05] text-white hover:bg-white/[0.1]'
                  }`}
                >
                  {plan.price === "Grátis" ? "Começar Agora" : "Começar Trial Grátis"}
                </button>
              </motion.div>
            ))}
          </div>

          {/* FAQ ou informações adicionais podem ser adicionadas aqui */}
        </div>
      </div>

      <GlowEffect />
    </div>
  )
} 