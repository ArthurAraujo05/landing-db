import type React from "react"
import Link from "next/link"
import { Heart, Music, Camera, Calendar, Book, Gift, Star, Coffee, Map } from "lucide-react"

interface Project {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    color: string
    link: string
}

export default function ProjectsGrid() {
    // Lista de projetos feitos para ela
    const projects: Project[] = [
        {
            id: "spotify-counter",
            title: "Contador de Amor",
            description: "Um contador personalizado com nossa música favorita do Spotify",
            icon: <Music className="size-6" />,
            color: "from-green-500 to-emerald-700",
            link: "/contador-spotify",
        },
        {
            id: "momentos-especiais",
            title: "Galeria de Momentos",
            description: "Uma coleção de nossas memórias mais preciosas juntos",
            icon: <Camera className="size-6" />,
            color: "from-purple-500 to-indigo-700",
            link: "/momentos-especiais",
        },
        {
            id: "calendario",
            title: "Calendário de Datas",
            description: "Um calendário com todas as nossas datas especiais",
            icon: <Calendar className="size-6" />,
            color: "from-blue-500 to-cyan-700",
            link: "/calendario",
        },
        {
            id: "cartas",
            title: "Cartas de Amor",
            description: "Uma coleção de cartas escritas especialmente para você",
            icon: <Book className="size-6" />,
            color: "from-red-500 to-rose-700",
            link: "/cartas",
        },
        {
            id: "presentes",
            title: "Lista de Desejos",
            description: "Ideias de presentes que sei que você vai adorar",
            icon: <Gift className="size-6" />,
            color: "from-amber-500 to-orange-700",
            link: "#",
        },
        {
            id: "poemas",
            title: "Poemas & Versos",
            description: "Palavras que expressam o que sinto por você",
            icon: <Star className="size-6" />,
            color: "from-pink-500 to-fuchsia-700",
            link: "#",
        },
        {
            id: "encontros",
            title: "Ideias de Encontros",
            description: "Lugares especiais para visitarmos juntos",
            icon: <Coffee className="size-6" />,
            color: "from-teal-500 to-emerald-700",
            link: "#",
        },
        {
            id: "mapa",
            title: "Mapa do Nosso Amor",
            description: "Um mapa com todos os lugares especiais que visitamos",
            icon: <Map className="size-6" />,
            color: "from-violet-500 to-purple-700",
            link: "#",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {projects.map((project) => (
                <Link href={project.link} key={project.id} className="group">
                    <div className="bg-[#2d2a5d] rounded-xl overflow-hidden shadow-lg h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl border border-transparent group-hover:border-pink-500/30">
                        <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color} text-white`}>{project.icon}</div>
                                <h3 className="ml-3 font-semibold text-white text-lg">{project.title}</h3>
                            </div>
                            <p className="text-gray-300 text-sm">{project.description}</p>

                            <div className="mt-4 flex justify-end">
                                <Heart className="size-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

