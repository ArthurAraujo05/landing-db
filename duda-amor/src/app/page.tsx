import SpotifyEmbed from "../components/spotify-embed"
import FallingHearts from "../components/falling-hearts"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1b4b] p-4 flex flex-col items-center justify-center relative">
      <FallingHearts />
      <SpotifyEmbed />
    </div>
  )
}

