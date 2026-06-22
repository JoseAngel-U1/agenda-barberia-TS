import { useState } from "react"
import {
    Users,
    Package,
    Calendar,
    BarChart3,
    MessageCircle,
    Wallet,
} from "lucide-react"
import type {
    SuperAdminModule,
    SuperAdminModuleKey,
    SuperAdminModulesState,
} from "../../types/ui"

export default function SuperAdminModules() {
    const [modules, setModules] = useState<SuperAdminModulesState>({
        appointments: true,
        barbers: true,
        inventory: false,
        reports: false,
        whatsapp: false,
        commissions: false,
    })

    function toggleModule(module: SuperAdminModuleKey): void {
        setModules((prev) => ({
            ...prev,
            [module]: !prev[module],
        }))
    }

    const modulesList: SuperAdminModule[] = [
        {
            key: "appointments",
            name: "Agenda",
            description: "Gestión de citas y reservas.",
            icon: Calendar,
        },
        {
            key: "barbers",
            name: "Barberos",
            description: "Alta, edición y administración de barberos.",
            icon: Users,
        },
        {
            key: "inventory",
            name: "Inventario",
            description: "Control de productos y existencias.",
            icon: Package,
        },
        {
            key: "reports",
            name: "Reportes",
            description: "Estadísticas e indicadores del negocio.",
            icon: BarChart3,
        },
        {
            key: "whatsapp",
            name: "WhatsApp",
            description: "Notificaciones automáticas a clientes.",
            icon: MessageCircle,
        },
        {
            key: "commissions",
            name: "Comisiones",
            description: "Control de pagos y ganancias por barbero.",
            icon: Wallet,
        },
    ]

    return (
        <div className="min-h-screen bg-zinc-950 p-6 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Encabezado */}
                <header className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                        Super Admin
                    </p>

                    <h1 className="mt-2 text-4xl font-black">
                        Configuración de módulos
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Selecciona qué funcionalidades estarán disponibles para la barbería.
                    </p>
                </header>

                {/* Grid */}
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {modulesList.map((module) => {
                        const Icon = module.icon

                        return (
                            <div
                                key={module.key}
                                className="
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-zinc-900
                                    p-5
                                    transition
                                "
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[hsl(var(--primary)/0.15)]
                                        ">
                                            <Icon
                                                className="text-[hsl(var(--primary))]"
                                                size={22}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-bold">
                                                {module.name}
                                            </h3>

                                            <p className="text-sm text-zinc-400">
                                                {module.description}
                                            </p>
                                        </div>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={modules[module.key]}
                                        onChange={() =>
                                            toggleModule(module.key)
                                        }
                                        className="
                                            h-5
                                            w-5
                                            cursor-pointer
                                            accent-[hsl(var(--primary))]
                                        "
                                    />
                                </div>
                            </div>
                        )
                    })}
                </section>

                {/* Botón guardar */}
                <div className="mt-8 flex justify-end">
                    <button
                        className="
                            rounded-xl
                            bg-[hsl(var(--primary))]
                            px-6
                            py-3
                            font-bold
                            text-[hsl(var(--primary-foreground))]
                            transition
                            hover:opacity-90
                        "
                    >
                        Guardar cambios
                    </button>
                </div>

            </div>
        </div>
    )
}
