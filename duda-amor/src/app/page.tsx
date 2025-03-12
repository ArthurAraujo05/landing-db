import FallingHearts from "../components/falling-hearts"
import HamburgerMenu from "../components/hamburger-menu"
import ProjectsGrid from "../components/projects-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1b4b] p-4 relative">
      <HamburgerMenu />
      <FallingHearts />

      <div className="max-w-6xl mx-auto pt-16">
        {/* Título da seção de projetos */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Projetos Feitos Para Você</h2>
          <p className="text-pink-200 italic">Cada projeto é uma forma de expressar meu amor</p>
        </div>

        {/* Grade de projetos */}
        <ProjectsGrid />
      </div>
    </div>
  )
}

