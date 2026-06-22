import { CalendarDays } from 'lucide-react';

import AppointmentCard from './AppointmentCard';
import type { WeekScheduleProps } from '../../types/ui'

export default function WeekSchedule({
    weekDays,
    hours,
    todayKey,
    appointmentsBySlot,
}: WeekScheduleProps) {

    return (
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex flex-col gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                        <CalendarDays className="h-5 w-5" />
                    </span>
                    <div>
                        <h2 className="text-2xl font-black text-white">
                            Vista por hora
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Filas por horario, columnas por dia.
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[1080px]">
                    <div className="grid grid-cols-[110px_repeat(7,minmax(135px,1fr))] border-b border-white/10 bg-zinc-900/80">
                        <div className="px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
                            Hora
                        </div>

                        {weekDays.map((day) => (
                            <div
                                key={day.key}
                                className={`border-l border-white/10 px-4 py-4 ${day.key === todayKey
                                        ? "bg-[hsl(var(--primary)/0.12)]"
                                        : ""
                                    }`}
                            >
                                <p className="text-sm font-black uppercase text-zinc-200">
                                    {day.weekday}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-zinc-500">
                                    Dia {day.day}
                                </p>
                            </div>
                        ))}
                    </div>

                    {hours.map((hour) => (
                        <div
                            key={hour}
                            className="grid min-h-32 grid-cols-[110px_repeat(7,minmax(135px,1fr))] border-b border-white/10 last:border-b-0"
                        >
                            <div className="flex items-start px-4 py-4 text-sm font-black text-zinc-300">
                                {hour}
                            </div>

                            {weekDays.map((day) => {
                                const slotAppointments = appointmentsBySlot[`${day.key}-${hour}`] || []
                                const isToday = day.key === todayKey

                                return (
                                    <div
                                        key={`${day.key}-${hour}`}
                                        className={`border-l border-white/10 p-2 ${isToday ? "bg-[hsl(var(--primary)/0.035)]" : ""
                                            }`}
                                    >
                                        {slotAppointments.length === 0 ? (
                                            <div className="flex h-full min-h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] text-xs font-bold text-zinc-700">
                                                Libre
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {slotAppointments.map((appointment, index) => (
                                                    <AppointmentCard
                                                        key={`${appointment.clientName}-${hour}-${index}`}
                                                        appointment={appointment}
                                                    />
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

        </section>

    )
}