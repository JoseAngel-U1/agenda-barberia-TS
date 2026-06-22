import { CheckCircle2, UserRound } from "lucide-react"

import type { BookingSummaryProps } from "../../types/ui"

export default function BookingSummary({
    clientName,
    selectedService,
    selectedBarber,
    date,
    time,
    success,
    bookingError,
    isValid,
    onClientNameChange,
    onConfirm,
}: BookingSummaryProps) {
    return (
        <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
                <div className="border-b border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]">
                            <UserRound className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-sm text-zinc-400">
                                Resumen
                            </p>

                            <h2 className="text-2xl font-black text-white">
                                Tu cita
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="space-y-5 p-6">
                    <div>
                        <label
                            htmlFor="client-name"
                            className="text-sm font-medium text-zinc-400"
                        >
                            Nombre para la cita
                        </label>

                        <input
                            id="client-name"
                            type="text"
                            value={clientName}
                            onChange={(event) =>
                                onClientNameChange(event.target.value)
                            }
                            placeholder="Ej. Juan Perez"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[hsl(var(--primary)/0.8)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
                        />
                    </div>

                    <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                        <p className="text-sm font-medium text-zinc-500">
                            Servicio
                        </p>

                        <p className="mt-1 text-lg font-bold text-white">
                            {selectedService?.name || "Selecciona un servicio"}
                        </p>

                        {selectedService && (
                            <p className="mt-2 text-sm text-zinc-400">
                                {selectedService.price} - {selectedService.duration}
                            </p>
                        )}
                    </div>

                    <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                        <p className="text-sm font-medium text-zinc-500">
                            Barbero
                        </p>

                        <p className="mt-1 text-lg font-bold text-white">
                            {selectedBarber?.name || "Selecciona un barbero"}
                        </p>

                        {selectedBarber && (
                            <p className="mt-2 text-sm text-zinc-400">
                                {selectedBarber.specialty}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                            <p className="text-sm font-medium text-zinc-500">
                                Fecha
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {date || "Pendiente"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                            <p className="text-sm font-medium text-zinc-500">
                                Hora
                            </p>

                            <p className="mt-1 font-bold text-white">
                                {time || "Pendiente"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={!isValid}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-base font-black transition ${
                            isValid
                                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-black/30 hover:bg-[hsl(var(--primary)/0.9)] hover:scale-[1.01]"
                                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                        }`}
                    >
                        <CheckCircle2 className="h-5 w-5" />

                        {isValid
                            ? "Confirmar cita"
                            : "Completa los datos"}
                    </button>

                    {bookingError && (
                        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-medium text-red-200">
                            {bookingError}
                        </p>
                    )}

                    {success && (
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />

                                <div>
                                    <h3 className="font-bold text-emerald-200">
                                        Cita registrada correctamente
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-emerald-50/80">
                                        {success.clientName} - {success.service} - {success.barberName} - {success.date} - {success.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}
