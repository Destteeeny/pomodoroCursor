import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { userId, dataType, data } = await request.json()
    
    // Criar pasta do usuário se não existir
    const userDir = path.join(process.cwd(), 'data', 'users', userId)
    await fs.mkdir(userDir, { recursive: true })
    
    // Salvar dados no arquivo apropriado
    const filePath = path.join(userDir, `${dataType}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const dataType = searchParams.get('dataType')
    
    if (!userId || !dataType) {
      return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
    }
    
    const filePath = path.join(process.cwd(), 'data', 'users', userId, `${dataType}.json`)
    
    try {
      const data = await fs.readFile(filePath, 'utf8')
      return NextResponse.json(JSON.parse(data))
    } catch (e) {
      // Se o arquivo não existir, retornar dados vazios
      return NextResponse.json(getEmptyData(dataType))
    }
  } catch (error) {
    console.error('Erro ao ler dados:', error)
    return NextResponse.json({ error: 'Erro ao ler dados' }, { status: 500 })
  }
}

function getEmptyData(dataType: string) {
  switch (dataType) {
    case 'notes':
      return { notes: [], folders: [] }
    case 'calendar':
      return { events: [] }
    case 'activities':
      return { activities: [] }
    default:
      return {}
  }
} 