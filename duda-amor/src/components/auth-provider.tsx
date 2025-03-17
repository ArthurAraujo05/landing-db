"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Tipo para o usuário
interface User {
  username: string
  name: string
}

// Tipo para o contexto de autenticação
interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

// Componente provedor de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, isLoading, pathname, router])

  // Função de login
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulação de verificação de credenciais
    // Em um sistema real, isso seria uma chamada de API para o backend

    // Usuário padrão para demonstração
    const defaultUser = {
      username: "duda",
      password: "26042007",
      name: "Duda<3",
    }

    // Verificar credenciais
    if (username === defaultUser.username && password === defaultUser.password) {
      const authenticatedUser = {
        username: defaultUser.username,
        name: defaultUser.name,
      }

      // Armazenar usuário no localStorage
      localStorage.setItem("user", JSON.stringify(authenticatedUser))
      setUser(authenticatedUser)
      return true
    }

    return false
  }

  // Função de logout
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

