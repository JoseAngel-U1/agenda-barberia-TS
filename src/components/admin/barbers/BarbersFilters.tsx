import { FileSpreadsheet, Search } from "lucide-react"

import type {
    BarbersFiltersProps,
    BarbersStatusFilter,
} from "../../../types/ui"

export default function BarbersFilters({
    searchTerm,
    statusFilter,
    onSearchChange,
    onStatusChange,
    onExport,
}: BarbersFiltersProps) {
    return (
        <>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar barbero..."
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[hsl(var(--primary)/0.7)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
                />
            </div>

            <select
                value={statusFilter}
                onChange={(event) =>
                    onStatusChange(event.target.value as BarbersStatusFilter)
                }
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[hsl(var(--primary)/0.7)]"
            >
                <option value="Todos">Todos</option>
                <option value="Activo">Activos</option>
                <option value="Inactivo">Inactivos</option>
            </select>

            <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-5 py-3 font-bold text-zinc-200 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white"
            >
                <FileSpreadsheet className="h-5 w-5 text-[hsl(var(--accent))]" />
                Excel
            </button>
        </>
    )
}
