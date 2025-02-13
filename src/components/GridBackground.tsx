'use client'

export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
      />
      {/* Gradiente de fundo */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"
        style={{ mixBlendMode: 'soft-light' }}
      />
    </div>
  )
} 