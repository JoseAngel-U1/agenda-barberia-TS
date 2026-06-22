import { useMemo, useState } from "react"
import {
    CalendarCheck2,
    Clock3,
    Timer,
} from "lucide-react"

import MetricCard from '../../components/Shared/MetricCard'
import BarberHeader from '../../components/Barber/BarberHeader'
import BarberSchedule from "../../components/Barber/BarberSchedule"
import CurrentAppointmentCard from "../../components/Barber/CurrentAppointmentCard"
import { siteConfig } from "../../config/siteConfig"
import type {
    AppointmentStatus,
    AppointmentStatusStyle,
    BarberAppointment,
} from "../../types/booking"

const appointments: BarberAppointment[] = [
    {
        id: 1,
        hour: "09:00",
        client: "Juan Perez",
        phone: "3111234567",
        service: "Corte clasico",
        duration: "30 min",
        status: "pending",
    },
    {
        id: 2,
        hour: "10:00",
        client: "Carlos Lopez",
        phone: "3115554444",
        service: "Corte + barba",
        duration: "60 min",
        status: "pending",
    },
    {
        id: 3,
        hour: "11:00",
        client: null,
        phone: "",
        service: "",
        duration: "",
        status: "free",
    },
    {
        id: 4,
        hour: "12:00",
        client: "Maria Torres",
        phone: "3117778888",
        service: "Barba premium",
        duration: "20 min",
        status: "pending",
    },
]

const statusStyles: Record<AppointmentStatus, AppointmentStatusStyle> = {
    pending: {
        label: "Pendiente",
        className: "border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]",
    },
    in_progress: {
        label: "En proceso",
        className: "border-amber-400/30 bg-amber-500/10 text-amber-200",
    },
    finished: {
        label: "Finalizado",
        className: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    },
    free: {
        label: "Libre",
        className: "border-white/10 bg-white/[0.03] text-zinc-500",
    },
}

export default function BarberDashboard() {
    const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>("pending")
    const currentAppointment = appointments.find((appointment) => appointment.client)
    const bookedAppointments = appointments.filter((appointment) => appointment.client)
    const freeAppointments = appointments.filter((appointment) => !appointment.client)

    const dashboardStats = useMemo(
        () => [
            {
                label: "Citas de hoy",
                value: bookedAppointments.length,
                icon: CalendarCheck2,
            },
            {
                label: "Espacios libres",
                value: freeAppointments.length,
                icon: Clock3,
            },
            {
                label: "Tiempo estimado",
                value: "1h 50m",
                icon: Timer,
            },
        ], [bookedAppointments.length, freeAppointments.length]
    )

    function handleServiceAction() {
        if (appointmentStatus === "pending") {
            setAppointmentStatus("in_progress")
            return
        }

        if (appointmentStatus === "in_progress") {
            setAppointmentStatus("finished")
        }
    }

    function getButtonText() {
        switch (appointmentStatus) {
            case "pending":
                return "Iniciar corte"
            case "in_progress":
                return "Finalizar corte"
            case "finished":
                return "Corte finalizado"
            default:
                return "Accion"
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <div className="pointer-events-none absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.08)] blur-[140px]" />
            <div className="pointer-events-none absolute bottom-10 right-12 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.08)] blur-[90px]" />

            <div className="relative mx-auto max-w-7xl p-5 sm:p-6 lg:p-8">
                
                {/*//TODO: Header de la vista: */}
                <BarberHeader
                    title={`Mi jornada en ${siteConfig.business.name}`}
                    description="Revisa tus citas del dia, atiende al cliente actual y mantén tu agenda bajo control."
                    rightContent={
                        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
                            <p className="text-sm font-medium text-zinc-500">
                                Estado de la jornada
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-lg font-black text-white">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                                En servicio
                            </div>
                        </div>
                    }
                />

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    {dashboardStats.map((stat) => (
                        <MetricCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))}
                </section>

                <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                    {/*//TODO: Tabla: */}
                    <BarberSchedule
                        appointments={appointments}
                        currentAppointment={currentAppointment}
                        appointmentStatus={appointmentStatus}
                        statusStyles={statusStyles}
                    />

                    <CurrentAppointmentCard
                        currentAppointment={currentAppointment}
                        appointmentStatus={appointmentStatus}
                        statusStyles={statusStyles}
                        onServiceAction={handleServiceAction}
                        getButtonText={getButtonText}
                    />
                </div>
            </div>
        </div>
    )
}
