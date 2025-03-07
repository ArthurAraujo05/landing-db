"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  opacity: number
  rotation: number
}

export default function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Criar 15 corações com propriedades aleatórias
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // posição horizontal aleatória (%)
      size: Math.random() * 15 + 10, // tamanho entre 10px e 25px
      delay: Math.random() * 10, // atraso na animação
      duration: Math.random() * 10 + 10, // duração da queda entre 10s e 20s
      opacity: Math.random() * 0.5 + 0.3, // opacidade entre 0.3 e 0.8
      rotation: Math.random() * 360, // rotação inicial aleatória
    }))

    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-0 text-pink-400"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `fall ${heart.duration}s linear ${heart.delay}s infinite`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
        >
          ❤️
        </div>
      ))}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%) rotate(0deg);
          }
          25% {
            transform: translateY(25vh) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) rotate(270deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

