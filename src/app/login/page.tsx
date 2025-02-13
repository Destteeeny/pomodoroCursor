'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { HeroGlow } from '@/components/HeroGlow'
import { GlowEffect } from '@/components/GlowEffect'
import { BackButton } from '@/components/BackButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type User = {
  name: string
  email: string
  password: string
  accountType: 'basic' | 'pro' | 'team'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(false)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Salvar dados do usuário incluindo o tipo de conta
        localStorage.setItem('user', JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          accountType: data.user.accountType
        }))
        router.push('/app')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <BackButton />
      <HeroGlow />
      
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-gray-400">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.05] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded border-white/[0.05] bg-white/[0.05] text-blue-600 focus:ring-blue-500/20"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Ainda não tem uma conta?{' '}
              <Link href="/register" className="text-blue-400 hover:text-blue-300">
                Registre-se
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <GlowEffect />
    </div>
  )
} 