"use client"

import { useState } from "react"
import { Menu, X, Music, Camera, Calendar, Book, Gift, Star, Coffee, Map, Home } from "lucide-react"
import Link from "next/link"

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Lista de projetos para o menu
    const projects = [
        {
            id: "home",
            title: "Página Inicial",
            icon: <Home size={18} className="mr-2" />,
            link: "/",
        },
        {
            id: "spotify-counter",
            title: "Contador de Amor",
            icon: <Music size={18} className="mr-2" />,
            link: "/contador-spotify",
        },
        {
            id: "momentos-especiais",
            title: "Galeria de Momentos",
            icon: <Camera size={18} className="mr-2" />,
            link: "/momentos-especiais",
        },
        {
            id: "calendario",
            title: "Calendário de Datas",
            icon: <Calendar size={18} className="mr-2" />,
            link: "#",
        },
        {
            id: "cartas",
            title: "Cartas de Amor",
            icon: <Book size={18} className="mr-2" />,
            link: "#",
        },
        {
            id: "presentes",
            title: "Lista de Desejos",
            icon: <Gift size={18} className="mr-2" />,
            link: "#",
        },
        {
            id: "poemas",
            title: "Poemas & Versos",
            icon: <Star size={18} className="mr-2" />,
            link: "#",
        },
        {
            id: "encontros",
            title: "Ideias de Encontros",
            icon: <Coffee size={18} className="mr-2" />,
            link: "#",
        },
        {
            id: "mapa",
            title: "Mapa do Nosso Amor",
            icon: <Map size={18} className="mr-2" />,
            link: "#",
        },
    ]

    return (
        <>
            {/* Botão do menu hambúrguer */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 z-50 text-white p-2 rounded-md hover:bg-[#2d2a5d] transition-colors"
                aria-label="Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para fechar o menu quando clicar fora */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleMenu} />}

            {/* Menu lateral */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#2d2a5d] z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } overflow-y-auto`}
            >
                <div className="pt-16 px-4 pb-8">
                    <h2 className="text-white font-bold text-lg mb-4 border-b border-[#3d3a6d] pb-2">
                        Projetos Feitos Para Você
                    </h2>

                    <nav className="space-y-1">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link}
                                className="flex items-center text-white hover:text-pink-300 hover:bg-[#3d3a6d] py-2 px-2 rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {project.icon}
                                <span>{project.title}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 pt-4 border-t border-[#3d3a6d]">
                        <p className="text-pink-200 text-sm italic text-center">"Cada projeto é uma forma de dizer que te amo"</p>
                    </div>
                </div>
            </div>
        </>
    )
}

