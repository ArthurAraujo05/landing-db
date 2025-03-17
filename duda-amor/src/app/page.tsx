"use client"

import { useAuth } from "../components/auth-provider"
import FallingHearts from "../components/falling-hearts"
import ProjectsGrid from "../components/projects-grid"
import UserMenu from "../components/user-menu"

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
        <div className="animate-pulse text-pink-300">Carregando...</div>
      </div>
    )
  }

  if (!user) return null // Redirecionado para login pelo AuthProvider

  return (
    <div className="min-h-screen bg-[#1e1b4b] p-4 relative">
      <FallingHearts />

      {/* Header com menu de usuário */}
      <header className="container mx-auto flex justify-end mb-8 pt-4">
        <UserMenu />
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Título da seção de projetos */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Projetos Feitos Para Você</h2>
          <p className="text-pink-200 italic">Cada projeto é uma forma de expressar meu amor</p>
        </div>

        {/* Grade de projetos */}
        <ProjectsGrid />
      </div>
    </div>
  )
}

