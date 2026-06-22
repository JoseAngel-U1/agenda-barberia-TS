import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { CalendarDays, Clock3, Home, Trash2, UserCheck } from "lucide-react"

import { hours } from "../../config/services"
import type { Appointment, WeekDay } from "../../types/booking"

const todayKey: string = new Date().toLocaleDateString("en-CA")

function buildWeekDays(): WeekDay[] {
    const today = new Date()

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today)

        date.setDate(today.getDate() + index)

        return {
            key: date.toLocaleDateString("en-CA"),
            weekday: date.toLocaleDateString("es-MX", {
                weekday: "short",
            }),
            day: date.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "short",
            }),
        }
    })
}

export default function Admin() {
    const [appointments, setAppointments] =
        useState<Appointment[]>(() =>
            JSON.parse(localStorage.getItem("appointments") ?? "[]")
        )

    const weekDays = useMemo<WeekDay[]>(
        () => buildWeekDays(),
        [],
    )

    const appointmentsBySlot = useMemo<
        Record<string, Appointment[]>
    >(() => {
        return appointments.reduce<Record<string, Appointment[]>>(
            (acc, appointment) => {
                const slotKey =
                    `${appointment.date}-${appointment.time}`

                acc[slotKey] ??= []

                acc[slotKey].push(appointment)

                return acc
            },
            {},
        )
    }, [appointments])

    const todayAppointments = appointments.filter(
        (item) => item.date === todayKey,
    )

    const weekAppointmentCount = appointments.filter(
        (item) =>
            weekDays.some(
                (day) => day.key === item.date,
            ),
    ).length

    const clearAppointments = (): void => {
        localStorage.removeItem("appointments")
        setAppointments([])
    }
    
    return (
        <div className="min-h-screen bg-[hsl(var(--background))] px-5 py-8 text-white sm:px-6 lg:py-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-400">
                            Panel Barberia
                        </p>
                        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                            Horario de citas
                        </h1>
                        <p className="mt-3 max-w-2xl text-zinc-400">
                            Consulta las reservas por dia y hora, como una agenda semanal de trabajo.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-zinc-200 transition hover:bg-zinc-700"
                        >
                            <Home className="h-4 w-4" />
                            Inicio
                        </Link>

                        <button
                            type="button"
                            onClick={clearAppointments}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
                        >
                            <Trash2 className="h-4 w-4" />
                            Limpiar
                        </button>
                    </div>
                </header>

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-zinc-400">Total citas</p>
                            <CalendarDays className="h-5 w-5 text-red-300" />
                        </div>
                        <h2 className="mt-3 text-4xl font-black">{appointments.length}</h2>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-zinc-400">Citas hoy</p>
                            <Clock3 className="h-5 w-5 text-red-300" />
                        </div>
                        <h2 className="mt-3 text-4xl font-black">{todayAppointments.length}</h2>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-zinc-400">Esta semana</p>
                            <UserCheck className="h-5 w-5 text-emerald-300" />
                        </div>
                        <h2 className="mt-3 text-4xl font-black">{weekAppointmentCount}</h2>
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
                    <div className="flex flex-col gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Agenda semanal</h2>
                            <p className="text-sm text-zinc-400">Filas por hora, columnas por dia.</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                            Confirmadas
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[980px]">
                            <div className="grid grid-cols-[110px_repeat(7,minmax(120px,1fr))] border-b border-white/10 bg-zinc-900/80">
                                <div className="px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
                                    Hora
                                </div>

                                {weekDays.map((day) => (
                                    <div
                                        key={day.key}
                                        className={`border-l border-white/10 px-4 py-4 ${
                                            day.key === todayKey ? "bg-red-500/10" : ""
                                        }`}
                                    >
                                        <p className="text-sm font-bold uppercase text-zinc-300">
                                            {day.weekday}
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-zinc-500">
                                            {day.day}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    className="grid min-h-28 grid-cols-[110px_repeat(7,minmax(120px,1fr))] border-b border-white/10 last:border-b-0"
                                >
                                    <div className="flex items-start px-4 py-4 text-sm font-bold text-zinc-300">
                                        {hour}
                                    </div>

                                    {weekDays.map((day) => {
                                        const slotAppointments = appointmentsBySlot[`${day.key}-${hour}`] || []

                                        return (
                                            <div
                                                key={`${day.key}-${hour}`}
                                                className={`border-l border-white/10 p-2 ${
                                                    day.key === todayKey ? "bg-red-500/[0.03]" : ""
                                                }`}
                                            >
                                                {slotAppointments.length === 0 ? (
                                                    <div className="flex h-full min-h-20 items-center justify-center rounded-lg border border-dashed border-white/10 text-xs font-medium text-zinc-700">
                                                        Libre
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {slotAppointments.map((appointment, index) => (
                                                            <div
                                                                key={`${appointment.service}-${appointment.date}-${appointment.time}-${index}`}
                                                                className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-3"
                                                            >
                                                                <p className="mb-1 text-xs font-semibold text-emerald-300">
                                                                    {appointment.clientName || "Sin nombre"}
                                                                </p>
                                                                <p className="text-sm font-bold text-emerald-100">
                                                                    {appointment.service}
                                                                </p>
                                                                <p className="mt-1 text-xs font-medium text-emerald-50/80">
                                                                    {appointment.barberName || "Barbero no asignado"}
                                                                </p>
                                                                <p className="mt-1 text-xs font-semibold text-emerald-300">
                                                                    Confirmada
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {appointments.length === 0 && (
                        <div className="border-t border-white/10 px-6 py-8 text-center text-zinc-500">
                            No hay citas registradas todavia.
                        </div>
                    )}
                </section>

                <footer className="mt-10 text-center text-sm text-zinc-600">
                    Copyright 2026 Barberia Pro
                </footer>
            </div>
        </div>
    )
}
