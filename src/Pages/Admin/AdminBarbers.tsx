import { useMemo, useRef, useState } from "react"
import {
    Clock3,
    UserRound,
    Users,
} from "lucide-react"

import MetricCard from "../../components/Shared/MetricCard"
import BarberFormPanel from "../../components/admin/barbers/BarberFormPanel"
import BarbersHeader from "../../components/admin/barbers/BarbersHeader"
import BarbersFilters from "../../components/admin/barbers/BarbersFilters"
import BarbersTable from "../../components/admin/barbers/BarbersTable"

import type { AdminBarber } from "../../types/barber"
import type {
    AdminBarberFormState,
    BarbersStatusFilter,
} from "../../types/ui"

const sampleBarbers: AdminBarber[] = [
    {
        id: 1,
        name: "Juan Perez",
        description: "Especialista en cortes clasicos y degradados.",
        status: "Activo",
        entry: "08:00",
        exit: "18:00",
        breakTime: "14:00",
    },
    {
        id: 2,
        name: "Angel Jose",
        description: "Especialista en cortes clasicos y degradados.",
        status: "Activo",
        entry: "08:00",
        exit: "18:00",
        breakTime: "14:00",
    },
]

export default function AdminBarbers() {
    const [formState, setFormState] = useState<AdminBarberFormState>("empty")
    const formPanelRef = useRef<HTMLDivElement>(null)

    const [createStep, setCreateStep] = useState(1)
    const [barbers, setBarbers] = useState<AdminBarber[]>(sampleBarbers)
    const [selectedBarber, setSelectedBarber] = useState<AdminBarber | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] =
        useState<BarbersStatusFilter>("Todos")

    const emptyBarber: AdminBarber = {
        id: 0,
        name: "",
        description: "",
        image: "",
        status: "Activo",
        entry: "",
        exit: "",
        breakTime: "",
    }

    const [barberForm, setBarberForm] = useState<AdminBarber>(emptyBarber)

    const filteredBarbers = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        return barbers.filter((barber) => {
            const matchesStatus =
                statusFilter === "Todos" ||
                barber.status === statusFilter

            const matchesSearch =
                !normalizedSearch ||
                barber.name.toLowerCase().includes(normalizedSearch) ||
                barber.description.toLowerCase().includes(normalizedSearch)

            return matchesStatus && matchesSearch
        })
    }, [barbers, searchTerm, statusFilter])

    function handleCreateBarber() {
        setBarberForm(emptyBarber)
        setSelectedBarber(null)
        setFormState("create")
        setCreateStep(1)

        setTimeout(() => {
            formPanelRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 0)
    }

    function handleEditBarber(
        barber: AdminBarber
    ) {
        setSelectedBarber(barber)

        setBarberForm(barber)

        setFormState("edit")
    }

    function saveBarber() {
        if (!barberForm.name.trim()) return

        if (formState === "create") {
            const newBarber: AdminBarber = {
                ...barberForm,
                id: Date.now(),
            }

            setBarbers((prev) => [
                ...prev,
                newBarber,
            ])
        }

        if (
            formState === "edit" &&
            selectedBarber
        ) {
            setBarbers((prev) =>
                prev.map((barber) =>
                    barber.id === selectedBarber.id
                        ? barberForm
                        : barber
                )
            )
        }

        setFormState("empty")
        setSelectedBarber(null)
        setBarberForm(emptyBarber)
    }

    function handleExportBarbers() {
        // TODO: Conectar exportacion real cuando exista el modulo de reportes.
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <div className="pointer-events-none absolute left-1/2 top-20 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.08)] blur-[140px]" />
            <div className="pointer-events-none absolute bottom-12 right-12 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.08)] blur-[90px]" />

            <div className="relative mx-auto max-w-7xl p-5 sm:p-6 lg:p-8">
                <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <BarbersHeader onCreateBarber={handleCreateBarber} />
                </header>

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    <MetricCard label="Barberos" value={barbers.length} icon={Users} />
                    <MetricCard label="Activos" value={barbers.filter((barber) => barber.status === "Activo").length} icon={UserRound} />
                    <MetricCard label="Horario base" value="08:00-18:00" icon={Clock3} compact />
                </section>

                <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl lg:flex-row">
                    <BarbersFilters
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        onSearchChange={setSearchTerm}
                        onStatusChange={setStatusFilter}
                        onExport={handleExportBarbers}
                    />
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <div className="border-b border-white/10 bg-white/[0.03] px-5 py-5">
                            <h2 className="text-2xl font-black text-white">Equipo</h2>
                            <p className="mt-1 text-sm text-zinc-500">Lista de barberos registrados.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <BarbersTable
                                barbers={filteredBarbers}
                                onEditBarber={handleEditBarber}
                            />
                       </div>
                    </div>
                    
                    <div ref={formPanelRef}>
                        <BarberFormPanel
                            formState={formState}
                            createStep={createStep}
                            setCreateStep={setCreateStep}
                            selectedBarber={selectedBarber}
                            barberForm={barberForm}
                            setBarberForm={setBarberForm}
                            saveBarber={saveBarber}
                        />
                    </div>

                </section>
            </div>
        </div>
    )
}
