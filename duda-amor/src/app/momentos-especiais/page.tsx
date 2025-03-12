import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import FallingHearts from "../../components/falling-hearts"

export default function MomentosEspeciais() {
    // Array de fotos de exemplo (usando placeholders)
    const fotos = [
        { id: 1, titulo: "Nosso primeiro encontro", data: "12/05/2023" },
        { id: 2, titulo: "Viagem à praia", data: "23/07/2023" },
        { id: 3, titulo: "Jantar romântico", data: "14/02/2024" },
        { id: 4, titulo: "Piquenique no parque", data: "30/04/2024" },
        { id: 5, titulo: "Concerto sob as estrelas", data: "18/06/2024" },
        { id: 6, titulo: "Passeio de bicicleta", data: "05/08/2024" },
        { id: 7, titulo: "Café da manhã especial", data: "25/09/2024" },
        { id: 8, titulo: "Pôr do sol na montanha", data: "10/11/2024" },
        { id: 9, titulo: "Festival de luzes", data: "20/12/2024" },
    ]

    return (
        <div className="min-h-screen bg-[#1e1b4b] text-white">
            <FallingHearts />

            {/* Cabeçalho */}
            <header className="p-4 flex items-center">
                <Link href="/" className="flex items-center text-white hover:text-pink-300 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Voltar</span>
                </Link>
                <h1 className="text-2xl font-bold text-center flex-1 mr-8">Nossos Momentos Especiais</h1>
            </header>

            {/* Galeria de fotos */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {fotos.map((foto) => (
                        <div
                            key={foto.id}
                            className="bg-[#2d2a5d] rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                        >
                            <div className="relative h-64 w-full">
                                <Image
                                    src={`/placeholder.svg?height=400&width=600&text=Momento+${foto.id}`}
                                    alt={foto.titulo}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                                    <div className="p-4 w-full">
                                        <p className="text-sm text-pink-300">{foto.data}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-lg">{foto.titulo}</h3>
                                <p className="text-sm text-gray-300 mt-1">{foto.data}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mensagem romântica no rodapé */}
            <footer className="text-center p-8 mt-8 border-t border-[#3d3a6d]">
                <p className="italic text-pink-200">
                    "Cada foto conta uma história, cada momento juntos é um tesouro guardado no coração."
                </p>
            </footer>
        </div>
    )
}

