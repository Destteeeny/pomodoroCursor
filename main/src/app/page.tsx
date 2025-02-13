import { BlurText } from '@/components/BlurText'
import { GlowEffect } from '@/components/GlowEffect'
import { HeroGlow } from '@/components/HeroGlow'
import { Features } from '@/components/Features'
import { HowItWorks } from '@/components/HowItWorks'
import { CallToAction } from '@/components/CallToAction'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 relative">
        <HeroGlow />
        <div className="relative w-full max-w-[280px] xs:max-w-[350px] sm:max-w-2xl md:max-w-3xl mx-auto text-center">
          <BlurText />
        </div>
        <GlowEffect />
      </div>

      {/* Features Section */}
      <Features />

      {/* How it Works */}
      <HowItWorks />

      {/* Call to Action */}
      <CallToAction />
    </>
  )
}
