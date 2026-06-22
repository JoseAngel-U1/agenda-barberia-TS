import type { BookingDateTimeProps } from "../../types/ui"

export default function BookingDateTime({
    date,
    time,
    today,
    isFutureDate,
    selectedBarber,
    availableHours,
    barberHours,
    onDateChange,
    onTimeChange,
}: BookingDateTimeProps) {
    const canChooseTime = Boolean(selectedBarber && date && isFutureDate)
    const hasWorkHours = barberHours.length > 0
    const hasAvailableHours = availableHours.length > 0

    return (
        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                    Paso 3
                </p>

                <label
                    htmlFor="booking-date"
                    className="mt-1 block text-2xl font-bold text-white"
                >
                    Fecha
                </label>

                <input
                    id="booking-date"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                    className="mt-5 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none transition [color-scheme:dark] focus:border-[hsl(var(--primary)/0.8)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
                />

                {date && !isFutureDate && (
                    <p className="mt-3 text-sm font-medium text-[hsl(var(--primary))]">
                        Elige una fecha a partir de hoy.
                    </p>
                )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                    Paso 4
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                    Horario
                </h2>

                {!selectedBarber && (
                    <p className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-zinc-500">
                        Primero selecciona un barbero para ver sus horarios.
                    </p>
                )}

                {selectedBarber && !date && (
                    <p className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-zinc-500">
                        Elige una fecha para consultar la disponibilidad de {selectedBarber.name}.
                    </p>
                )}

                {selectedBarber && canChooseTime && !hasWorkHours && (
                    <p className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-zinc-500">
                        {selectedBarber.name} no trabaja ese dia.
                    </p>
                )}

                {selectedBarber && canChooseTime && hasWorkHours && !hasAvailableHours && (
                    <p className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-zinc-500">
                        No quedan horarios disponibles con {selectedBarber.name} para esa fecha.
                    </p>
                )}

                {canChooseTime && hasAvailableHours && (
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {availableHours.map((hour) => (
                            <button
                                key={hour}
                                type="button"
                                onClick={() => onTimeChange(hour)}
                                className={`h-12 rounded-xl text-sm font-bold transition ${
                                    time === hour
                                        ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-black/30"
                                        : "bg-zinc-900 text-zinc-300 ring-1 ring-white/10 hover:bg-zinc-800 hover:text-white"
                                }`}
                            >
                                {hour}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
