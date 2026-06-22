import { ChevronLeft, ChevronRight, Pencil } from "lucide-react"
import { useMemo, useState } from "react"

import type { BarbersTableProps } from "../../../types/ui"

const PAGE_SIZE = 5

export default function BarbersTable({
    barbers,
    onEditBarber,
}: BarbersTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(barbers.length / PAGE_SIZE))
    const safeCurrentPage = Math.min(currentPage, totalPages)
    const firstItem = (safeCurrentPage - 1) * PAGE_SIZE
    const lastItem = firstItem + PAGE_SIZE

    const visibleBarbers = useMemo(
        () => barbers.slice(firstItem, lastItem),
        [barbers, firstItem, lastItem],
    )

    const canGoBack = safeCurrentPage > 1
    const canGoNext = safeCurrentPage < totalPages
    const showingFrom = barbers.length === 0 ? 0 : firstItem + 1
    const showingTo = Math.min(lastItem, barbers.length)

    return (
        <>
            <table className="w-full min-w-[680px]">
                <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/70 text-left text-xs uppercase tracking-[0.16em] text-zinc-500">
                        <th className="px-5 py-4">ID</th>
                        <th className="px-5 py-4">Barbero</th>
                        <th className="px-5 py-4">Horario</th>
                        <th className="px-5 py-4">Estado</th>
                        <th className="px-5 py-4">Accion</th>
                    </tr>
                </thead>

                <tbody>
                    {barbers.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-5 py-20 text-center text-zinc-500"
                            >
                                No hay barberos para mostrar.
                            </td>
                        </tr>
                    ) : (
                        visibleBarbers.map((barber) => (
                            <tr
                                key={barber.id}
                                className="border-b border-white/5 last:border-b-0"
                            >
                                <td className="px-5 py-4 font-bold text-zinc-400">
                                    #{barber.id}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] font-black text-[hsl(var(--primary))]">
                                            {barber.name.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-black text-white">
                                                {barber.name}
                                            </p>

                                            <p className="text-sm text-zinc-500">
                                                {barber.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-sm font-semibold text-zinc-300">
                                    {barber.entry} - {barber.exit}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                                        {barber.status}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        type="button"
                                        onClick={() => onEditBarber(barber)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white"
                                        aria-label={`Editar ${barber.name}`}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {barbers.length > PAGE_SIZE && (
                <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-zinc-500">
                        Mostrando {showingFrom}-{showingTo} de {barbers.length}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(safeCurrentPage - 1)}
                            disabled={!canGoBack}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Ver barberos anteriores"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white">
                            {safeCurrentPage} / {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={() => setCurrentPage(safeCurrentPage + 1)}
                            disabled={!canGoNext}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Ver siguientes barberos"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
