import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { siteConfig } from "../../config/siteConfig"

export default function NotFoundLinks() {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                            {siteConfig.business.shortName}
                        </p>

                        <h3 className="mt-1 text-2xl font-black text-white">
                            Navegación disponible
                        </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                        <ArrowLeft className="h-5 w-5" />
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <Link
                        to={siteConfig.routes.home}
                        className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-4"
                    >
                        Inicio
                        <span>{siteConfig.routes.home}</span>
                    </Link>

                    <Link
                        to={siteConfig.routes.reservar}
                        className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-4"
                    >
                        Reservar
                        <span>{siteConfig.routes.reservar}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}