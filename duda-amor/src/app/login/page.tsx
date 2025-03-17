"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../components/auth-provider"
import FallingHearts from "../../components/falling-hearts"
import { Heart, User, Lock, AlertCircle } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)

      if (success) {
        router.push("/")
      } else {
        setError("Usuário ou senha incorretos")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center p-4">
      <FallingHearts />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-pink-500/20 rounded-full mb-4">
            <Heart size={40} className="text-pink-500" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-white">Bem-vindo(a) de volta</h1>
          <p className="text-gray-300 mt-2">Entre para acessar nossos momentos especiais</p>
        </div>

        <div className="bg-[#2d2a5d] rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center text-red-200">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                    Usuário
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-[#3d3a6d] rounded-md bg-[#1e1b4b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Digite seu usuário"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Dica: o usuário é "amor"</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-[#3d3a6d] rounded-md bg-[#1e1b4b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Digite sua senha"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Dica: a senha é "teamo123"</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-md bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-[#252347] text-center">
            <p className="text-sm text-gray-300">"O amor é a chave que abre todas as portas."</p>
          </div>
        </div>
      </div>
    </div>
  )
}

