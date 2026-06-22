import { useMemo, useState } from "react"
import {
    CalendarDays,
    Save,
    Sparkles,
    Trash2,
    UserRound,
} from "lucide-react"

import MetricCard from "../../components/Shared/MetricCard"
import { navigationConfig, siteConfig } from "../../config/siteConfig"
import type { BarberRestDay, RestDaysState } from "../../types/barber"

const barbersList: BarberRestDay[] = [
    {
        id: 1,
        name: "Juan Perez",
        specialty: "Corte clasico",
        restDays: ["2026-06-10", "2026-06-17"],
    },
    {
        id: 2,
        name: "Carlos Ruiz",
        specialty: "Barba y perfilado",
        restDays: [],
    },
]

export default function AdminRestDays() {
    const barbers = barbersList
    const [selectedBarberId, setSelectedBarberId] = useState<number | null>(
        barbers.length > 0 ? barbers[0].id : null
    )
    const [restDays, setRestDays] = useState<RestDaysState>({})

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const monthName = new Intl.DateTimeFormat("es-MX", {
        month: "long",
        year: "numeric",
    }).format(currentDate)

    const selectedBarber = useMemo<BarberRestDay | undefined>(
        () =>
            barbers.find(
                (barber) => barber.id === selectedBarberId
            ),
        [barbers, selectedBarberId]
    )

    const selectedRestDays = selectedBarber
        ? restDays[selectedBarber.id] ?? selectedBarber.restDays
        : []

    function formatDate(day: number): string {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    }

    function toggleDay(day: number): void {
        if (!selectedBarber) return

        const date = formatDate(day)

        setRestDays((prev) => {
            const current =
                prev[selectedBarber.id] ??
                selectedBarber.restDays

            const exists = current.includes(date)

            return {
                ...prev,
                [selectedBarber.id]: exists
                    ? current.filter(
                        (restDate) => restDate !== date
                    )
                    : [...current, date],
            }
        })
    }

    function clearMonth(): void {
        if (!selectedBarber) return

        setRestDays((prev) => ({
            ...prev,
            [selectedBarber.id]: [],
        }))
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <div className="pointer-events-none absolute left-1/2 top-20 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.08)] blur-[140px]" />
            <div className="pointer-events-none absolute bottom-12 right-12 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.08)] blur-[90px]" />

            <div className="relative mx-auto max-w-7xl p-5 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur-md">
                        <Sparkles className="h-4 w-4" />
                        {navigationConfig.admin.subtitle}
                    </div>
                    <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                        Descansos
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                        Configura los dias de descanso de cada barbero para que {siteConfig.business.name} no acepte citas en esos dias.
                    </p>
                </header>

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <MetricCard label="Barberos" value={barbers.length} icon={UserRound} />
                    <MetricCard label="Descansos seleccionados" value={selectedRestDays.length} icon={CalendarDays} />
                    <MetricCard label="Mes activo" value={monthName} icon={Sparkles} compact valueClassName="capitalize" />
                </section>

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <section className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-2xl font-black text-white">Barberos</h2>
                                <p className="mt-1 text-sm text-zinc-500">Selecciona un perfil.</p>
                            </div>
                            <UserRound className="h-6 w-6 text-[hsl(var(--primary))]" />
                        </div>

                        <div className="space-y-2">
                            {barbers.map((barber) => {
                                const selected = barber.id === selectedBarberId
                                const barberRestDays = restDays[barber.id] ?? barber.restDays

                                return (
                                    <button
                                        key={barber.id}
                                        onClick={() => setSelectedBarberId(barber.id)}
                                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                                            selected
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)]"
                                                : "border-white/10 bg-zinc-900 hover:border-[hsl(var(--primary)/0.4)]"
                                        }`}
                                    >
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-black ${
                                            selected
                                                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                                                : "bg-zinc-800 text-zinc-300"
                                        }`}>
                                            {barber.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-white">{barber.name}</p>
                                            <p className="text-sm text-zinc-500">{barber.specialty}</p>
                                            <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary))]">
                                                {barberRestDays.length} descansos
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
                        {!selectedBarber ? (
                            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                                <CalendarDays className="mb-4 h-16 w-16 text-zinc-700" />
                                <p className="text-zinc-500">Selecciona un barbero primero.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                                            Calendario
                                        </p>
                                        <h2 className="mt-1 text-3xl font-black capitalize text-white">
                                            {monthName}
                                        </h2>
                                        <p className="mt-2 text-zinc-400">
                                            Descansos de {selectedBarber.name}
                                        </p>
                                    </div>
                                    <CalendarDays className="h-8 w-8 text-[hsl(var(--primary))]" />
                                </div>

                                <div className="mb-3 grid grid-cols-7 gap-2 text-center text-sm font-black text-zinc-500">
                                    <div>D</div>
                                    <div>L</div>
                                    <div>M</div>
                                    <div>M</div>
                                    <div>J</div>
                                    <div>V</div>
                                    <div>S</div>
                                </div>

                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: firstDay }).map((_, index) => (
                                        <div key={`empty-${index}`} />
                                    ))}

                                    {Array.from({ length: daysInMonth }).map((_, index) => {
                                        const day = index + 1
                                        const today = new Date()
                                        const isToday =
                                            day === today.getDate() &&
                                            month === today.getMonth() &&
                                            year === today.getFullYear()
                                        const date = formatDate(day)
                                        const selected = selectedRestDays.includes(date)

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => toggleDay(day)}
                                                className={`aspect-square rounded-xl border text-sm font-black transition ${
                                                    selected
                                                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/0.2)]"
                                                        : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-[hsl(var(--primary)/0.45)] hover:text-white"
                                                } ${isToday ? "ring-2 ring-[hsl(var(--accent))]" : ""}`}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <button
                                        onClick={clearMonth}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 font-bold text-red-200 transition hover:bg-red-500/15"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                        Limpiar mes
                                    </button>
                                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 font-black text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/0.25)] transition hover:bg-[hsl(var(--primary)/0.9)]">
                                        <Save className="h-5 w-5" />
                                        Guardar
                                    </button>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}