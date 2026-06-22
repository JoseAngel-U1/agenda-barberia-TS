import { useEffect, useRef } from "react"
import {
    Pencil,
    Save,
    Scissors,
    Trash2,
    X,
} from "lucide-react"

import type {
    AdminServiceCardProps,
    AdminServiceInputProps,
} from "../../../types/ui"

export default function ServiceCard_Edit({
    service,
    updateService,
    saveService,
    editService,
    deleteService,
}: AdminServiceCardProps) {
    const nameRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (service.editing && nameRef.current) {
            nameRef.current.focus()
        }
    }, [service.editing])

    return (
        <article className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:border-[hsl(var(--primary)/0.3)]">
            {service.editing ? (
                <div className="space-y-4">
                    <Input
                        refValue={nameRef}
                        value={service.name}
                        placeholder="Nombre del servicio"
                        onChange={(value) => updateService(service.id, "name", value)}
                    />
                    <textarea
                        rows={4}
                        value={service.description}
                        placeholder="Descripcion"
                        onChange={(event) => updateService(service.id, "description", event.target.value)}
                        className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[hsl(var(--primary)/0.7)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
                    />
                    <Input
                        type="number"
                        value={service.price}
                        placeholder="Precio"
                        onChange={(value) => updateService(service.id, "price", value)}
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => saveService(service.id)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 font-black text-[hsl(var(--primary-foreground))] transition hover:bg-[hsl(var(--primary)/0.9)]"
                        >
                            <Save className="h-4 w-4" />
                            Guardar
                        </button>
                        <button
                            onClick={() => deleteService(service.id)}
                            className="inline-flex items-center justify-center rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-red-200 transition hover:bg-red-500/15"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                            <Scissors className="h-6 w-6" />
                        </span>
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                            Activo
                        </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-black text-white">{service.name || "Sin nombre"}</h2>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
                        {service.description || "Sin descripcion registrada."}
                    </p>
                    <p className="mt-4 text-3xl font-black text-[hsl(var(--primary))]">
                        ${service.price || "0"}
                    </p>

                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={() => editService(service.id)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 font-bold text-zinc-200 transition hover:border-[hsl(var(--primary)/0.45)] hover:text-white"
                        >
                            <Pencil className="h-4 w-4" />
                            Editar
                        </button>
                        <button
                            onClick={() => deleteService(service.id)}
                            className="inline-flex items-center justify-center rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-red-200 transition hover:bg-red-500/15"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </>
            )}
        </article>
    )
}

function Input({
    refValue,
    type = "text",
    value,
    placeholder,
    onChange,
}: AdminServiceInputProps) {
    return (
        <input
            ref={refValue}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[hsl(var(--primary)/0.7)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.1)]"
        />
    )
}
