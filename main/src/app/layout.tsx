import type { Metadata } from "next";
import { HeaderManager } from "@/components/HeaderManager";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "Pomodoro - Maximize seu foco e produtividade",
  description: "Aumente sua produtividade com o método Pomodoro. Uma forma inteligente de gerenciar seu tempo e melhorar seu foco.",
};

// Configuração do viewport separada
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-['Clash_Display']">
        <div className="relative min-h-screen overflow-hidden bg-[#070709] pt-[60px] sm:pt-0">
          <HeaderManager />
          {children}
        </div>
      </body>
    </html>
  );
}
