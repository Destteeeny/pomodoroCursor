'use client'

export function HeroGlow() {
  return (
    <>
      {/* Reduzido o tamanho e a opacidade dos círculos */}
      <div className="absolute top-[-5%] right-[20%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
    </>
  )
} 