import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')

// Garantir que o diretório existe
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'))
}

// Garantir que o arquivo existe
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]))
}

interface User {
  id: string
  name: string
  email: string
  password: string
}

export async function createUser(name: string, email: string, password: string) {
  const users = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as User[]
  
  // Verificar se o email já existe
  if (users.some(user => user.email === email)) {
    throw new Error('Email já cadastrado')
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10)

  // Criar novo usuário
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword
  }

  // Adicionar ao array e salvar
  users.push(newUser)
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))

  // Retornar usuário sem a senha
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export async function verifyUser(email: string, password: string) {
  const users = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as User[]
  
  const user = users.find(user => user.email === email)
  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new Error('Senha incorreta')
  }

  // Retornar usuário sem a senha
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
} 