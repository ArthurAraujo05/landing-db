"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { LogOut, User, ChevronDown } from "lucide-react"

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#3d3a6d] hover:bg-[#4d4a7d] rounded-full py-1 pl-2 pr-3 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center">
          <User size={16} className="text-pink-200" />
        </div>
        <span className="text-sm font-medium text-white">{user.name}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-2 w-48 bg-[#2d2a5d] rounded-md shadow-lg overflow-hidden z-20 border border-[#3d3a6d]">
            <div className="py-2 px-4 border-b border-[#3d3a6d]">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">@{user.username}</p>
            </div>

            <button
              onClick={logout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3d3a6d] transition-colors"
            >
              <LogOut size={16} className="mr-2 text-pink-400" />
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  )
}

