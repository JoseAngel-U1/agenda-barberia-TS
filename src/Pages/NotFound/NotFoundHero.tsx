import { Link } from "react-router-dom"
import { CalendarDays, Home, SearchX } from "lucide-react"

import { siteConfig } from "../../config/siteConfig"

export default function NotFoundHero() {
    return (
        <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur-md">
                <SearchX className="h-4 w-4" />
                Ruta no encontrada
            </div>

            <h1 className="mt-8 text-7xl font-black leading-none tracking-tight text-white sm:text-8xl lg:text-9xl">
                404
            </h1>

            <h2 className="mt-6 max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Esta página no está en la agenda de {siteConfig.business.name}.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                Puede que el enlace haya cambiado o que la dirección no exista.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                    to={siteConfig.routes.home}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-6 py-3 font-bold text-[hsl(var(--primary-foreground))]"
                >
                    <Home className="h-4 w-4" />
                    Ir al inicio
                </Link>

                <Link
                    to={siteConfig.routes.reservar}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-bold text-zinc-200"
                >
                    <CalendarDays className="h-4 w-4" />
                    Reservar cita
                </Link>
            </div>
        </div>
    )
}