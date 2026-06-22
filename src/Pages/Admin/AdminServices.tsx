import { useState } from "react"
import {
    DollarSign,
    Pencil,
    Plus,
    Scissors,
    Sparkles,
} from "lucide-react"

import MetricCard from "../../components/Shared/MetricCard"
import ServiceCard_Edit from "../../components/admin/services/ServiceCard_Edit"
import { navigationConfig, siteConfig } from "../../config/siteConfig"
import type {
    AdminService,
    EditableServiceField,
} from "../../types/service"

const initialServices: AdminService[] = [
    {
        id: 1,
        name: "Corte clasico",
        description: "Corte limpio, detallado y hecho al estilo del cliente.",
        price: "25",
        editing: false,
    },
    {
        id: 2,
        name: "Barba premium",
        description: "Perfilado, navaja y acabado fresco para barba.",
        price: "20",
        editing: false,
    },
]

export default function AdminServices() {
    const [services, setServices] = useState<AdminService[]>(initialServices)

    function addService(): void {
        const newService: AdminService = {
            id: Date.now(),
            name: "",
            description: "",
            price: "",
            editing: true,
        }

        setServices((prev) => [newService, ...prev])
    }

    function updateService(
        id: number,
        field: EditableServiceField,
        value: string
    ): void {
        setServices((prev) =>
            prev.map((service) =>
                service.id === id ? { ...service, [field]: value } : service
            )
        )
    }

    function saveService(id: number): void {
        setServices((prev) =>
            prev.map((service) =>
                service.id === id ? { ...service, editing: false } : service
            )
        )
    }

    function editService(id: number): void {
        setServices((prev) =>
            prev.map((service) =>
                service.id === id ? { ...service, editing: true } : service
            )
        )
    }

    function deleteService(id: number): void {
        setServices((prev) => prev.filter((service) => service.id !== id))
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.08)] blur-[140px]" />
            <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.08)] blur-[90px]" />

            <div className="relative mx-auto max-w-7xl p-5 sm:p-6 lg:p-8">
                <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] backdrop-blur-md">
                            <Sparkles className="h-4 w-4" />
                            {navigationConfig.admin.subtitle}
                        </div>
                        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                            Servicios
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                            Administra los servicios que {siteConfig.business.name} ofrece en la agenda publica.
                        </p>
                    </div>

                    <button
                        onClick={addService}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 font-black text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)/0.25)] transition hover:scale-[1.02] hover:bg-[hsl(var(--primary)/0.9)] active:scale-[0.98]"
                    >
                        <Plus className="h-5 w-5" />
                        Agregar servicio
                    </button>
                </header>

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <MetricCard label="Servicios activos" value={services.length} icon={Scissors} />
                    <MetricCard label="Precio promedio" value={`$${getAveragePrice(services)}`} icon={DollarSign} />
                    <MetricCard label="En edicion" value={services.filter((service) => service.editing).length} icon={Pencil} />
                </section>

                {services.length === 0 ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/70 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <Scissors className="mb-4 h-14 w-14 text-zinc-700" />
                        <p className="text-lg font-bold text-zinc-400">Agrega tu primer servicio</p>
                        <p className="mt-2 max-w-md text-sm text-zinc-600">
                            Los servicios creados aqui pueden usarse despues en la experiencia de reserva.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard_Edit
                                key={service.id}
                                service={service}
                                updateService={updateService}
                                saveService={saveService}
                                editService={editService}
                                deleteService={deleteService}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function getAveragePrice(
    services: AdminService[]
): number | string {
    const prices = services
        .map((service) => Number(service.price))
        .filter((price) => !Number.isNaN(price) && price > 0)

    if (prices.length === 0) return "0"

    return Math.round(prices.reduce((total, price) => total + price, 0) / prices.length)
}
