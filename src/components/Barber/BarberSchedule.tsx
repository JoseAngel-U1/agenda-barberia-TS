import {
    Clock3,
    Scissors,
    Timer,
    UserRound,
} from "lucide-react"
import type { AppointmentStatus } from "../../types/booking"
import type { BarberScheduleProps } from "../../types/ui"

export default function BarberSchedule({
    appointments,
    currentAppointment,
    appointmentStatus,
    statusStyles,
}: BarberScheduleProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex flex-col gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                        <Clock3 className="h-5 w-5" />
                    </span>
                    <div>
                        <h2 className="text-2xl font-black text-white">
                            Horarios del dia
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Citas confirmadas y espacios disponibles.
                        </p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-white/10">
                {appointments.map((appointment) => {
                    const isCurrent = appointment.id === currentAppointment?.id
                    const visualStatus: AppointmentStatus = isCurrent
                        ? appointmentStatus
                        : appointment.status

                    const style = statusStyles[visualStatus]

                    return (
                        <article
                            key={appointment.id}
                            className={`grid gap-4 p-5 transition hover:bg-white/[0.03] sm:grid-cols-[88px_1fr_auto] sm:items-center ${
                                isCurrent ? "bg-[hsl(var(--primary)/0.06)]" : ""
                            }`}
                        >
                            <div>
                                <p className="text-lg font-black text-white">
                                    {appointment.hour}
                                </p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
                                    Hora
                                </p>
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-black text-white">
                                        {appointment.client || "Disponible"}
                                    </h3>
                                    <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${style.className}`}>
                                        {style.label}
                                    </span>
                                </div>

                                {appointment.client ? (
                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-400">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Scissors className="h-4 w-4 text-[hsl(var(--primary))]" />
                                            {appointment.service}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Timer className="h-4 w-4 text-[hsl(var(--accent))]" />
                                            {appointment.duration}
                                        </span>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-zinc-500">
                                        Sin cliente asignado en este horario.
                                    </p>
                                )}
                            </div>

                            {appointment.client && (
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-[hsl(var(--primary))] ring-1 ring-white/10">
                                    <UserRound className="h-5 w-5" />
                                </div>
                            )}
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
