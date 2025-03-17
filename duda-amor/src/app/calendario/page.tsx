"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Plus, X, Edit, Trash2 } from "lucide-react"
import FallingHearts from "../../components/falling-hearts"
import { useAuth } from "../../components/auth-provider"
import UserMenu from "../../components/user-menu"

// Tipo para eventos especiais
interface EventoEspecial {
  id: string
  data: string
  titulo: string
  descricao: string
  tipo: "aniversario" | "encontro" | "comemoracao" | "outro"
}

export default function Calendario() {
  const { user, isLoading } = useAuth()

  // Initialize state variables with default values
  const [mesAtual, setMesAtual] = useState(new Date().getMonth())
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())
  const [eventoSelecionado, setEventoSelecionado] = useState<EventoEspecial | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [dataSelecionada, setDataSelecionada] = useState("")
  const [modoEdicao, setModoEdicao] = useState(false)

  // Estados do formulário
  const [novoEvento, setNovoEvento] = useState<{
    id: string
    data: string
    titulo: string
    descricao: string
    tipo: "aniversario" | "encontro" | "comemoracao" | "outro"
  }>({
    id: "",
    data: "",
    titulo: "",
    descricao: "",
    tipo: "outro",
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center">
        <div className="animate-pulse text-pink-300">Carregando...</div>
      </div>
    )
  }

  if (!user) return null // Redirecionado para login pelo AuthProvider

  // Lista de meses
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Estados
  // const [mesAtual, setMesAtual] = useState(new Date().getMonth())
  // const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())
  // const [eventoSelecionado, setEventoSelecionado] = useState<EventoEspecial | null>(null)
  // const [mostrarFormulario, setMostrarFormulario] = useState(false)
  // const [dataSelecionada, setDataSelecionada] = useState("")
  // const [modoEdicao, setModoEdicao] = useState(false)

  // // Estados do formulário
  // const [novoEvento, setNovoEvento] = useState<{
  //   id: string
  //   data: string
  //   titulo: string
  //   descricao: string
  //   tipo: "aniversario" | "encontro" | "comemoracao" | "outro"
  // }>({
  //   id: "",
  //   data: "",
  //   titulo: "",
  //   descricao: "",
  //   tipo: "outro",
  // })

  // Lista de eventos especiais iniciais
  const eventosIniciais: EventoEspecial[] = [
    {
      id: "1",
      data: "2023-05-12",
      titulo: "Nosso primeiro encontro",
      descricao: "O dia em que nos conhecemos e tudo começou. Um momento que mudou nossas vidas para sempre.",
      tipo: "encontro",
    },
    {
      id: "2",
      data: "2023-06-15",
      titulo: "Nosso primeiro beijo",
      descricao: "Um momento mágico que nunca vou esquecer. As estrelas pareciam brilhar só para nós.",
      tipo: "encontro",
    },
    {
      id: "3",
      data: "2023-07-23",
      titulo: "Viagem à praia",
      descricao: "Nossa primeira viagem juntos. Caminhadas na areia, pôr do sol e muitas risadas.",
      tipo: "comemoracao",
    },
    {
      id: "4",
      data: "2023-12-25",
      titulo: "Nosso primeiro Natal",
      descricao: "Celebramos o Natal juntos pela primeira vez. Um dia cheio de amor, presentes e momentos especiais.",
      tipo: "comemoracao",
    },
    {
      id: "5",
      data: "2024-02-14",
      titulo: "Dia dos Namorados",
      descricao: "Jantar romântico à luz de velas. Uma noite perfeita para celebrar nosso amor.",
      tipo: "comemoracao",
    },
    {
      id: "6",
      data: "2024-05-12",
      titulo: "1 ano juntos",
      descricao:
        "Celebrando nosso primeiro ano de relacionamento. Um ano cheio de amor, aprendizado e crescimento juntos.",
      tipo: "aniversario",
    },
  ]

  // Estado para armazenar todos os eventos (iniciais + adicionados pelo usuário)
  const [eventosEspeciais, setEventosEspeciais] = useState<EventoEspecial[]>([])

  // Carregar eventos do localStorage na inicialização
  useEffect(() => {
    const eventosArmazenados = localStorage.getItem("eventosCalendario")
    if (eventosArmazenados) {
      setEventosEspeciais(JSON.parse(eventosArmazenados))
    } else {
      setEventosEspeciais(eventosIniciais)
    }
  }, [])

  // Salvar eventos no localStorage quando mudam
  useEffect(() => {
    if (eventosEspeciais.length > 0) {
      localStorage.setItem("eventosCalendario", JSON.stringify(eventosEspeciais))
    }
  }, [eventosEspeciais])

  // Função para verificar se uma data tem evento
  const verificarEvento = (data: string) => {
    return eventosEspeciais.find((evento) => evento.data === data)
  }

  // Função para abrir o formulário para adicionar evento
  const abrirFormularioAdicionar = (data: string) => {
    setModoEdicao(false)
    setDataSelecionada(data)
    setNovoEvento({
      id: Date.now().toString(),
      data: data,
      titulo: "",
      descricao: "",
      tipo: "outro",
    })
    setMostrarFormulario(true)
    setEventoSelecionado(null)
  }

  // Função para abrir o formulário para editar evento
  const abrirFormularioEditar = (evento: EventoEspecial) => {
    setModoEdicao(true)
    setNovoEvento({ ...evento })
    setMostrarFormulario(true)
    setEventoSelecionado(null)
  }

  // Função para adicionar ou atualizar evento
  const salvarEvento = () => {
    if (novoEvento.titulo.trim() === "") {
      alert("Por favor, adicione um título para o evento")
      return
    }

    if (modoEdicao) {
      // Atualizar evento existente
      setEventosEspeciais((prev) => prev.map((evento) => (evento.id === novoEvento.id ? novoEvento : evento)))
    } else {
      // Adicionar novo evento
      setEventosEspeciais((prev) => [...prev, novoEvento])
    }

    setMostrarFormulario(false)
    setNovoEvento({
      id: "",
      data: "",
      titulo: "",
      descricao: "",
      tipo: "outro",
    })
  }

  // Função para excluir evento
  const excluirEvento = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      setEventosEspeciais((prev) => prev.filter((evento) => evento.id !== id))
      setMostrarFormulario(false)
    }
  }

  // Função para gerar os dias do mês
  const gerarDiasDoMes = () => {
    const primeiroDia = new Date(anoAtual, mesAtual, 1)
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0)
    const diasNoMes = ultimoDia.getDate()
    const diaDaSemanaInicial = primeiroDia.getDay() // 0 = Domingo, 6 = Sábado

    const dias = []

    // Adicionar dias vazios para alinhar com o dia da semana
    for (let i = 0; i < diaDaSemanaInicial; i++) {
      dias.push(<div key={`empty-${i}`} className="h-14 md:h-24"></div>)
    }

    // Adicionar os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataFormatada = `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
      const evento = verificarEvento(dataFormatada)

      dias.push(
        <div
          key={dia}
          className={`h-14 md:h-24 border border-[#3d3a6d] rounded-md p-1 relative transition-all ${
            evento ? "cursor-pointer hover:border-pink-500 hover:shadow-md" : "hover:border-[#4d4a7d]"
          } ${evento ? "bg-[#3d3a6d]/50" : ""}`}
          onClick={() => {
            if (evento) {
              setEventoSelecionado(evento)
              // Scroll para o detalhe do evento em dispositivos móveis
              if (window.innerWidth < 768) {
                setTimeout(() => {
                  document.getElementById("evento-detalhe")?.scrollIntoView({ behavior: "smooth" })
                }, 100)
              }
            } else {
              abrirFormularioAdicionar(dataFormatada)
            }
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${evento ? "text-white" : "text-gray-400"}`}>{dia}</span>
            {evento ? (
              <Heart
                size={16}
                className={`
                  ${evento.tipo === "aniversario" ? "text-red-400" : ""}
                  ${evento.tipo === "encontro" ? "text-pink-400" : ""}
                  ${evento.tipo === "comemoracao" ? "text-yellow-400" : ""}
                  ${evento.tipo === "outro" ? "text-blue-400" : ""}
                `}
                fill="currentColor"
              />
            ) : (
              <Plus size={14} className="text-gray-500 opacity-0 group-hover:opacity-100" />
            )}
          </div>

          {evento && (
            <div className="mt-1">
              <p className="text-xs font-medium truncate text-pink-200">{evento.titulo}</p>
            </div>
          )}
        </div>,
      )
    }

    return dias
  }

  // Função para ir para o próximo mês
  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
    setEventoSelecionado(null)
  }

  // Função para ir para o mês anterior
  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
    setEventoSelecionado(null)
  }

  // Função para ir para o mês atual
  const irParaMesAtual = () => {
    const dataAtual = new Date()
    setMesAtual(dataAtual.getMonth())
    setAnoAtual(dataAtual.getFullYear())
    setEventoSelecionado(null)
  }

  // Filtrar eventos do mês atual
  const eventosMesAtual = eventosEspeciais.filter((evento) => {
    const data = new Date(evento.data)
    return data.getMonth() === mesAtual && data.getFullYear() === anoAtual
  })

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return `${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}`
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
        <h1 className="text-2xl font-bold text-center flex-1 mr-8">Calendário de Datas Especiais</h1>
        <UserMenu />
      </header>

      {/* Calendário */}
      <div className="container mx-auto p-4">
        <div className="bg-[#2d2a5d] rounded-lg overflow-hidden shadow-lg p-4 mb-8">
          {/* Controles do calendário */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={mesAnterior}
              className="p-2 rounded-md hover:bg-[#3d3a6d] transition-colors flex items-center"
            >
              <ChevronLeft size={20} className="mr-1" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-pink-200">
                {meses[mesAtual]} {anoAtual}
              </h2>
              <button onClick={irParaMesAtual} className="text-xs text-gray-300 hover:text-pink-300 mt-1">
                Ir para hoje
              </button>
            </div>

            <button
              onClick={proximoMes}
              className="p-2 rounded-md hover:bg-[#3d3a6d] transition-colors flex items-center"
            >
              <span className="hidden sm:inline">Próximo</span>
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
              <div key={dia} className="text-center font-medium text-pink-200">
                {dia}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-1 group">{gerarDiasDoMes()}</div>

          {/* Legenda */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center">
              <Heart size={16} className="text-red-400 mr-2" fill="currentColor" />
              <span className="text-sm">Aniversário</span>
            </div>
            <div className="flex items-center">
              <Heart size={16} className="text-pink-400 mr-2" fill="currentColor" />
              <span className="text-sm">Encontro</span>
            </div>
            <div className="flex items-center">
              <Heart size={16} className="text-yellow-400 mr-2" fill="currentColor" />
              <span className="text-sm">Comemoração</span>
            </div>
            <div className="flex items-center">
              <Heart size={16} className="text-blue-400 mr-2" fill="currentColor" />
              <span className="text-sm">Outro</span>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-300">
            <p>Clique em um dia para adicionar um novo evento</p>
          </div>
        </div>

        {/* Formulário para adicionar/editar evento */}
        {mostrarFormulario && (
          <div className="bg-[#2d2a5d] p-6 rounded-lg border-l-4 border-pink-500 mb-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{modoEdicao ? "Editar Evento" : "Novo Evento"}</h3>
              <button onClick={() => setMostrarFormulario(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <input
                  type="date"
                  value={novoEvento.data}
                  onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                  className="w-full p-2 rounded-md bg-[#1e1b4b] border border-[#3d3a6d] focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={novoEvento.titulo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  placeholder="Ex: Nosso jantar especial"
                  className="w-full p-2 rounded-md bg-[#1e1b4b] border border-[#3d3a6d] focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  value={novoEvento.descricao}
                  onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                  placeholder="Descreva este momento especial..."
                  rows={3}
                  className="w-full p-2 rounded-md bg-[#1e1b4b] border border-[#3d3a6d] focus:border-pink-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Evento</label>
                <select
                  value={novoEvento.tipo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value as any })}
                  className="w-full p-2 rounded-md bg-[#1e1b4b] border border-[#3d3a6d] focus:border-pink-500 focus:outline-none"
                >
                  <option value="aniversario">Aniversário</option>
                  <option value="encontro">Encontro</option>
                  <option value="comemoracao">Comemoração</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="flex justify-between pt-2">
                {modoEdicao && (
                  <button
                    onClick={() => excluirEvento(novoEvento.id)}
                    className="px-4 py-2 rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Excluir
                  </button>
                )}

                <div className={`${modoEdicao ? "" : "ml-auto"}`}>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="px-4 py-2 rounded-md bg-[#3d3a6d] text-white mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={salvarEvento}
                    className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detalhe do evento selecionado */}
        {eventoSelecionado && !mostrarFormulario && (
          <div
            id="evento-detalhe"
            className="bg-[#2d2a5d] p-6 rounded-lg border-l-4 border-pink-500 mb-8 animate-fadeIn"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{eventoSelecionado.titulo}</h3>
                <p className="text-gray-300">{eventoSelecionado.descricao}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-pink-300 font-medium">{formatarData(eventoSelecionado.data)}</p>
                <div className="mt-2 flex justify-end">
                  <Heart
                    size={20}
                    className={`
                      ${eventoSelecionado.tipo === "aniversario" ? "text-red-400" : ""}
                      ${eventoSelecionado.tipo === "encontro" ? "text-pink-400" : ""}
                      ${eventoSelecionado.tipo === "comemoracao" ? "text-yellow-400" : ""}
                      ${eventoSelecionado.tipo === "outro" ? "text-blue-400" : ""}
                    `}
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => abrirFormularioEditar(eventoSelecionado)}
                className="text-sm text-pink-300 hover:text-pink-200 flex items-center"
              >
                <Edit size={16} className="mr-1" />
                Editar
              </button>
              <button
                onClick={() => excluirEvento(eventoSelecionado.id)}
                className="text-sm text-red-300 hover:text-red-200 flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Excluir
              </button>
              <button
                onClick={() => setEventoSelecionado(null)}
                className="text-sm text-gray-300 hover:text-white ml-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Lista de eventos do mês */}
        <div className="bg-[#2d2a5d] rounded-lg overflow-hidden shadow-lg p-4">
          <h3 className="text-xl font-bold mb-4 text-center">Eventos em {meses[mesAtual]}</h3>

          <div className="space-y-4">
            {eventosMesAtual.length > 0 ? (
              eventosMesAtual.map((evento) => (
                <div
                  key={evento.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                    eventoSelecionado === evento ? "bg-[#3d3a6d] border-pink-500" : "bg-[#2d2a5d]/70 border-[#3d3a6d]"
                  }`}
                  onClick={() => setEventoSelecionado(evento)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{evento.titulo}</h4>
                      <p className="text-sm text-gray-300 line-clamp-1">{evento.descricao}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-pink-300">
                        {new Date(evento.data).getDate()} de {meses[new Date(evento.data).getMonth()]}
                      </p>
                      <Heart
                        size={16}
                        className={`
                          ml-auto mt-2
                          ${evento.tipo === "aniversario" ? "text-red-400" : ""}
                          ${evento.tipo === "encontro" ? "text-pink-400" : ""}
                          ${evento.tipo === "comemoracao" ? "text-yellow-400" : ""}
                          ${evento.tipo === "outro" ? "text-blue-400" : ""}
                        `}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-300 italic">Nenhum evento especial neste mês</p>
                <p className="text-sm text-pink-200 mt-2">Que tal planejarmos algo especial juntos?</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mensagem romântica no rodapé */}
      <footer className="text-center p-8 mt-8 border-t border-[#3d3a6d]">
        <p className="italic text-pink-200">"Cada data marcada é uma promessa de mais momentos felizes ao seu lado."</p>
      </footer>

      {/* Estilos para animação */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

