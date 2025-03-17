"use client"

import { useAuth } from "../../components/auth-provider"
import SpotifyEmbed from "../../components/spotify-embed"
import FallingHearts from "../../components/falling-hearts"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import UserMenu from "../../components/user-menu"

export default function ContadorSpotify() {
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
    <div className="min-h-screen bg-[#1e1b4b] p-4 flex flex-col items-center relative">
      <FallingHearts />

      {/* Cabeçalho */}
      <header className="w-full max-w-md p-4 flex items-center mb-8">
        <Link href="/" className="flex items-center text-white hover:text-pink-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Voltar</span>
        </Link>
        <h1 className="text-xl font-bold text-white text-center flex-1 mr-8">Nosso Contador</h1>
        <UserMenu />
      </header>

      <SpotifyEmbed />
    </div>
  )
}

