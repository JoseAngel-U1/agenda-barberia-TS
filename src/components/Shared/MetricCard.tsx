import type { MetricCardProps } from "../../types/ui"

export default function MetricCard({
    label,
    value,
    icon: Icon,
    compact = false,
    valueClassName = "",
}: MetricCardProps) {
    const valueSizeClass = compact ? "text-xl" : "text-3xl"

    return (
        <article className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-400">
                    {label}
                </p>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                    <Icon className="h-5 w-5" />
                </span>
            </div>

            <p className={`mt-4 font-black text-white ${valueSizeClass} ${valueClassName}`}>
                {value}
            </p>
        </article>
    )
}
