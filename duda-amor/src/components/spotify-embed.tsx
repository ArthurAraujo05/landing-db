"use client"

import { useEffect, useState } from "react"

export default function SpotifyEmbed() {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const startDate = new Date("2007-04-27T00:00:00"); // Data inicial

        const updateTimer = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

            const seconds = Math.floor(diff / 1000) % 60;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365;
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

            setTimeElapsed({ years, days, hours, minutes, seconds });
        };

        updateTimer(); // Atualiza imediatamente ao carregar
        const timer = setInterval(updateTimer, 1000); // Atualiza a cada segundo

        return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
    }, []);

    return (
        <div className="w-full max-w-md bg-[#1e1b4b] p-6 rounded-lg shadow-lg">
            {/* Spotify Iframe */}
            <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/3PlKQNlbL4767rND3HnqSI?utm_source=generator"
                width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></iframe>

            {/* Placeholder Area */}
            <div className="bg-gray-100 rounded-md flex items-center justify-center mb-6">
                <img
                    src="/mor.jpeg"
                    alt="Imagem personalizada"
                    className="rounded-md"
                />
            </div>

            {/* Counter Section */}
            <div className="text-center text-white">
                <h2 className="text-xl font-medium mb-6">Feliz dia das mulheres!❤️</h2>

                <div className="flex justify-between mb-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{timeElapsed.years}</p>
                        <p className="text-sm">Anos</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{timeElapsed.days}</p>
                        <p className="text-sm">Dias</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{timeElapsed.hours}</p>
                        <p className="text-sm">Horas</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{timeElapsed.minutes}</p>
                        <p className="text-sm">Minutos</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{timeElapsed.seconds}</p>
                        <p className="text-sm">Segundos</p>
                    </div>
                </div>

                <div className="border-t border-indigo-700 pt-6 pb-2">
                    <p className="text-sm italic text-center">
                        "Meu amor, hoje é um dia especial, mas para mim, todos os dias são seus.

                        Seus cabelos escuros são como a noite estrelada: profundos, misteriosos e cheios de encanto. Cada fio brilha como se guardasse um segredo bonito, como se dançasse ao ritmo do vento só para me hipnotizar. Mas o que me fascina ainda mais é a força que você carrega no olhar, a maneira como enfrenta o mundo com coragem e graça. Você é incrível, um furacão de amor e determinação, e ao mesmo tempo, a calmaria que acolhe meu coração.

                        Neste Dia das Mulheres, quero lembrar o quanto você é tudo de bom: um universo inteiro de beleza, inteligência e amor. Obrigado por ser essa mulher maravilhosa, por me inspirar todos os dias e por encher minha vida de luz."
                    </p>
                </div>
            </div>
        </div>
    );
}
