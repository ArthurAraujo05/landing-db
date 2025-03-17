"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import FallingHearts from "../../components/falling-hearts"
import { useAuth } from "../../components/auth-provider"
import UserMenu from "../../components/user-menu"

// Tipo para cartas
interface Carta {
  id: number
  titulo: string
  data: string
  conteudo: string
  corFundo: string
}

export default function Cartas() {
  const { user, isLoading } = useAuth()
  const [cartaAtual, setCartaAtual] = useState(0) // Initialize cartaAtual here

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
        <div className="animate-pulse text-pink-300">Carregando...</div>
      </div>
    )
  }

  if (!user) return null // Redirecionado para login pelo AuthProvider

  // Lista de cartas de amor
  const cartas: Carta[] = [
    {
      id: 1,
      titulo: "Quando nos conhecemos",
      data: "12 de Maio de 2023",
      conteudo: `Meu amor,

Lembro como se fosse ontem do dia em que nos conhecemos. Aquele sorriso tímido, o jeito que você mexia no cabelo enquanto falava, e como o tempo pareceu parar quando nossos olhares se cruzaram pela primeira vez.

Naquele momento, algo dentro de mim já sabia que você seria especial na minha vida. Não imaginava o quanto, mas sentia que estava diante de alguém que mudaria meu mundo para sempre.

E como mudou! Cada dia ao seu lado é uma nova descoberta, um novo motivo para sorrir, uma nova razão para agradecer por ter você em minha vida.

Obrigado por fazer parte da minha história. Que este seja apenas o começo de muitos capítulos que escreveremos juntos.

Com todo meu amor,`,
      corFundo: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: 2,
      titulo: "Nosso primeiro mês juntos",
      data: "15 de Junho de 2023",
      conteudo: `Meu bem,

Um mês se passou desde que decidimos caminhar juntos, e parece que foi ontem e ao mesmo tempo parece que te conheço há uma vida inteira.

Em apenas 30 dias, você me ensinou mais sobre amor do que aprendi em todos os anos anteriores. Seu carinho, sua atenção, seu jeito único de me fazer sentir especial... tudo isso faz meu coração transbordar de felicidade.

Cada mensagem de bom dia, cada ligação antes de dormir, cada momento compartilhado... tudo fica guardado com carinho em minha memória e em meu coração.

Este é apenas o primeiro de muitos meses que celebraremos juntos. Mal posso esperar para construir mais memórias ao seu lado.

Todo meu amor,`,
      corFundo: "from-pink-500/20 to-red-500/20",
    },
    {
      id: 3,
      titulo: "Seis meses de amor",
      data: "12 de Novembro de 2023",
      conteudo: `Meu amor,

Seis meses... meio ano ao seu lado, e cada dia tem sido mais especial que o anterior.

Quando olho para trás, vejo quantas coisas vivemos juntos nesse curto período: nossos passeios, nossas conversas até tarde da noite, nossos planos para o futuro, nossas risadas e até mesmo nossos pequenos desentendimentos que só serviram para fortalecer ainda mais o que sentimos.

Você trouxe cores à minha vida que eu nem sabia que existiam. Me fez enxergar o mundo de uma forma diferente, mais bonita, mais cheia de possibilidades.

Obrigado por estar ao meu lado, por me apoiar, por me compreender, por me amar do jeito que sou. Prometo fazer o mesmo por você, todos os dias.

Que venham mais seis meses, mais seis anos, mais uma vida inteira juntos.

Eternamente seu,`,
      corFundo: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: 4,
      titulo: "Nosso primeiro ano",
      data: "12 de Maio de 2024",
      conteudo: `Meu amor,

Um ano... 365 dias de sorrisos, abraços, beijos, conversas, sonhos compartilhados e amor, muito amor.

Parece incrível como em apenas um ano podemos viver tantas coisas, criar tantas memórias, crescer tanto juntos. Você se tornou parte essencial da minha vida, meu porto seguro, minha pessoa favorita, meu melhor amigo, meu amor.

Neste primeiro ano, aprendemos tanto um sobre o outro. Descobrimos nossas manias, nossos gostos, nossos sonhos. Superamos desafios, celebramos conquistas e, acima de tudo, fortalecemos o que sentimos um pelo outro.

Que este seja apenas o primeiro de muitos aniversários que celebraremos juntos. Que nosso amor continue crescendo, evoluindo e nos surpreendendo a cada dia.

Te amo mais do que palavras podem expressar.

Para sempre seu,`,
      corFundo: "from-green-500/20 to-emerald-500/20",
    },
  ]

  // Estado para controlar a carta atual

  // Função para ir para a próxima carta
  const proximaCarta = () => {
    if (cartaAtual < cartas.length - 1) {
      setCartaAtual(cartaAtual + 1)
    }
  }

  // Função para ir para a carta anterior
  const cartaAnterior = () => {
    if (cartaAtual > 0) {
      setCartaAtual(cartaAtual - 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1b4b] text-white">
      <FallingHearts />

      {/* Cabeçalho */}
      <header className="p-4 flex items-center">
        <Link href="/" className="flex items-center text-white hover:text-pink-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Voltar</span>
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1 mr-8">Cartas de Amor</h1>
        <UserMenu />
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Navegação entre cartas */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={cartaAnterior}
            className={`p-2 rounded-full hover:bg-[#3d3a6d] transition-colors ${
              cartaAtual === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cartaAtual === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center">
            <p className="text-pink-300">
              {cartaAtual + 1} de {cartas.length}
            </p>
          </div>

          <button
            onClick={proximaCarta}
            className={`p-2 rounded-full hover:bg-[#3d3a6d] transition-colors ${
              cartaAtual === cartas.length - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cartaAtual === cartas.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carta atual */}
        <div
          className={`bg-gradient-to-br ${cartas[cartaAtual].corFundo} p-8 rounded-lg shadow-lg border border-white/10`}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">{cartas[cartaAtual].titulo}</h2>
            <p className="text-sm text-pink-300">{cartas[cartaAtual].data}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {cartas[cartaAtual].conteudo.split("\n\n").map((paragrafo, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragrafo}
              </p>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Heart className="text-pink-400" fill="currentColor" />
          </div>
        </div>

        {/* Miniaturas das cartas */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {cartas.map((carta, index) => (
            <button
              key={carta.id}
              onClick={() => setCartaAtual(index)}
              className={`p-4 rounded-md text-center transition-all ${
                index === cartaAtual ? "bg-[#3d3a6d] border-2 border-pink-500" : "bg-[#2d2a5d] hover:bg-[#3d3a6d]"
              }`}
            >
              <p className="text-sm font-medium truncate">{carta.titulo}</p>
              <p className="text-xs text-gray-300 mt-1">{carta.data}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mensagem romântica no rodapé */}
      <footer className="text-center p-8 mt-8 border-t border-[#3d3a6d]">
        <p className="italic text-pink-200">
          "As palavras podem desaparecer, mas os sentimentos escritos nestas cartas são eternos."
        </p>
      </footer>
    </div>
  )
}

