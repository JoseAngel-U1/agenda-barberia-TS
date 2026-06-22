import { Sparkles } from "lucide-react"

import { navigationConfig } from "../../config/siteConfig"
import type { BarberHeaderProps } from "../../types/ui"

export default function BarberHeader({
    title,
    description,
    rightContent,
}: BarberHeaderProps) {
    return (
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur-md">
                    <Sparkles className="h-4 w-4" />
                    {navigationConfig.barber.subtitle}
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {title}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                    {description}
                </p>
            </div>

            {rightContent && (
                <div>
                    {rightContent}
                </div>
            )}
        </header>
    )
}
