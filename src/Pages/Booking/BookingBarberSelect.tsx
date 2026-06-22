import { Clock3, UserCheck } from "lucide-react"
import { barbers } from "../../config/barbers"

import type { BookingBarberSelectProps } from "../../types/ui"

export default function BookingBarberSelect({
    selectedBarberId,
    onSelect,
}: BookingBarberSelectProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/30 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                        Paso 2
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-white">
                        Barbero
                    </h2>
                </div>
                <UserCheck className="h-6 w-6 text-[hsl(var(--primary))]" />
            </div>

            <div className="grid gap-3 md:grid-cols-6">
                {barbers.map((barber, index) => {
                    const selected = selectedBarberId === barber.id

                    const total = barbers.length

                    const lastOne =
                        total % 3 === 1 &&
                        index === total - 1

                    const lastTwo =
                        total % 3 === 2 &&
                        index >= total - 2

                    return (
                        <button
                            key={barber.id}
                            type="button"
                            onClick={() => onSelect(barber.id)}
                            className={`
                                min-h-40 rounded-xl border p-4 text-left transition
                                ${
                                    selected
                                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] shadow-lg shadow-black/30"
                                        : "border-white/10 bg-white/[0.03] hover:border-[hsl(var(--primary)/0.6)] hover:bg-white/[0.06]"
                                }
                                ${
                                    lastOne
                                        ? "md:col-span-6"
                                        : lastTwo
                                            ? "md:col-span-3"
                                            : "md:col-span-2"
                                }
                            `}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <span
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                        selected
                                            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                                            : "bg-zinc-900 text-[hsl(var(--primary))]"
                                    }`}
                                >
                                    <UserCheck className="h-5 w-5" />
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                                    <Clock3 className="h-3.5 w-3.5" />
                                    Variable
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-white">
                                {barber.name}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                {barber.specialty}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
