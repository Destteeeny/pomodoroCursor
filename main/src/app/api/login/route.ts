import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Ler arquivo de usuários
    const usersPath = path.join(process.cwd(), 'data', 'users.json')
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

    // Encontrar usuário
    const user = users.find((u: any) => u.email === email)

    if (!user) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 })
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 })
    }

    // Retornar dados do usuário
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        accountType: user.accountType || 'basic' // fallback para 'basic' se não definido
      }
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
} 