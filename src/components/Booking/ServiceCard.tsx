import {
    Clock3,
    Crown,
    Scissors,
    Zap,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import type { PublicServiceCardProps } from "../../types/ui"

const iconMap: Record<string, LucideIcon> = {
    scissors: Scissors,
    zap: Zap,
    crown: Crown,
}

export default function ServiceCard({
    service,
    variant = "landing",
    selected = false,
    onSelect,
}: PublicServiceCardProps) {
    const Icon = iconMap[service.icon] || Scissors

    if (variant === "booking") {
        return (
            <button
                type="button"
                onClick={() => onSelect?.(service)}
                className={`group min-h-48 rounded-xl border p-4 text-left transition ${
                    selected
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] shadow-lg shadow-black/30"
                        : "border-white/10 bg-white/[0.03] hover:border-[hsl(var(--primary)/0.6)] hover:bg-white/[0.06]"
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            selected
                                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                                : "bg-zinc-900 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary)/0.15)]"
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                    </span>

                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                        {service.tag}
                    </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                    {service.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">
                    {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-lg font-black text-white">
                        {service.price}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400">
                        <Clock3 className="h-4 w-4" />
                        {service.duration}
                    </span>
                </div>
            </button>
        )
    }

    return (
        <div
            className="
            group relative overflow-hidden
            rounded-2xl p-6

            bg-[hsl(var(--secondary)/0.3)]
            backdrop-blur-xl

            border border-white/5

            transition-all duration-500 ease-out

            hover:bg-[hsl(var(--secondary)/0.5)]
            hover:border-[hsl(var(--primary)/0.2)]
            hover:-translate-y-3
            hover:shadow-2xl
            hover:shadow-[hsl(var(--primary)/0.1)]

            cursor-pointer
            "
        >
            <div className="absolute inset-0 bg-[hsl(var(--primary)/0.05)] opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="absolute top-4 right-4">
                <span
                    className="
                    text-xs px-3 py-1 rounded-full
                    bg-[hsl(var(--primary)/0.1)]
                    text-[hsl(var(--primary))]
                    border border-[hsl(var(--primary)/0.2)]
                    backdrop-blur-md
                    "
                >
                    {service.tag}
                </span>
            </div>

            <div
                className="
                w-12 h-12 rounded-xl
                bg-[hsl(var(--primary)/0.1)]
                flex items-center justify-center
                mb-4

                transition-all duration-300
                group-hover:scale-110
                group-hover:rotate-6
                "
            >
                <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>

            <h3
                className="
                text-2xl font-bold mb-2
                text-foreground
                group-hover:text-[hsl(var(--primary))]
                transition-colors
                "
            >
                {service.name}
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <span
                    className="
                    text-[hsl(var(--primary))]
                    text-2xl font-black
                    tracking-tight
                    "
                >
                    {service.price}
                </span>

                <span className="text-sm text-muted-foreground">
                    {service.duration}
                </span>
            </div>
        </div>
    )
}
