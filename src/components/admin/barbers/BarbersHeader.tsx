import { Plus, Sparkles } from "lucide-react"

import { navigationConfig, siteConfig } from "../../../config/siteConfig"
import type { BarbersHeaderProps } from "../../../types/ui"

export default function BarbersHeader({
    onCreateBarber,
}: BarbersHeaderProps) {
    return (
        <>
            <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur-md">
                    <Sparkles className="h-4 w-4" />
                    {navigationConfig.admin.subtitle}
                </div>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Barberos
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                    Administra el equipo de {siteConfig.business.name}, sus datos y horarios de atencion.
                </p>
            </div>

            <button
                onClick={onCreateBarber}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 font-black text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/0.25)] transition hover:scale-[1.02] hover:bg-[hsl(var(--primary)/0.9)] active:scale-[0.98]"
            >
                <Plus className="h-5 w-5" />
                Agregar barbero
            </button>
        </>
    )
}
