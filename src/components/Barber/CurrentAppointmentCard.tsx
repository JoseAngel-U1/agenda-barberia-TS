import {
    CheckCircle2,
    Phone,
    Scissors,
    XCircle,
} from "lucide-react"
import type { CurrentAppointmentCardProps } from "../../types/ui"

export default function CurrentAppointmentCard({
    currentAppointment,
    appointmentStatus,
    statusStyles,
    onServiceAction,
    getButtonText,
}: CurrentAppointmentCardProps) {
    return (
        <aside className="lg:sticky lg:top-6 lg:self-start">
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
                <div className="border-b border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                            <Scissors className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400">Cliente actual</p>
                            <h2 className="text-2xl font-black text-white">
                                {currentAppointment?.client || "Sin cliente"}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="space-y-5 p-6">
                    <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                        <p className="text-sm font-medium text-zinc-500">Servicio</p>
                        <p className="mt-1 text-lg font-bold text-white">
                            {currentAppointment?.service}
                        </p>
                        <p className="mt-2 text-sm text-zinc-400">
                            {currentAppointment?.hour} - {currentAppointment?.duration}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                        <p className="text-sm font-medium text-zinc-500">Contacto</p>
                        <p className="mt-2 inline-flex items-center gap-2 text-base font-bold text-white">
                            <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
                            {currentAppointment?.phone}
                        </p>
                    </div>

                    <div className="rounded-xl bg-[hsl(var(--primary)/0.08)] p-4 ring-1 ring-[hsl(var(--primary)/0.2)]">
                        <p className="text-sm font-medium text-zinc-400">Estado del corte</p>
                        <p className="mt-1 text-lg font-black text-[hsl(var(--primary))]">
                            {statusStyles[appointmentStatus].label}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 font-bold text-red-200 transition hover:bg-red-500/15">
                            <XCircle className="h-5 w-5" />
                            Cancelar cita
                        </button>

                        <button
                            onClick={onServiceAction}
                            disabled={appointmentStatus === "finished"}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 font-black text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/0.25)] transition hover:scale-[1.01] hover:bg-[hsl(var(--primary)/0.9)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CheckCircle2 className="h-5 w-5" />
                            {getButtonText()}
                        </button>
                    </div>
                </div>
            </section>
        </aside>
    )
}
