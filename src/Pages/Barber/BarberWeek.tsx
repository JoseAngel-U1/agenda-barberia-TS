import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    UserRound,
} from "lucide-react"

import MetricCard from '../../components/Shared/MetricCard'
import BarberHeader from '../../components/Barber/BarberHeader'
import WeekSchedule from '../../components/Barber/WeekSchedule'
import { siteConfig } from "../../config/siteConfig"
import type {
    AppointmentsBySlot,
    WeekAppointment,
    WeekDay,
} from "../../types/booking"
import type { StatCard } from "../../types/ui"

const hours: string[] = Array.from({ length: 11 }, (_, index) => {
    const hour = index + 9
    return `${hour.toString().padStart(2, "0")}:00`
})

const weekDays: WeekDay[] = [
    { key: "lun", weekday: "Lun", day: "09" },
    { key: "mar", weekday: "Mar", day: "10" },
    { key: "mie", weekday: "Mie", day: "11" },
    { key: "jue", weekday: "Jue", day: "12" },
    { key: "vie", weekday: "Vie", day: "13" },
    { key: "sab", weekday: "Sab", day: "14" },
    { key: "dom", weekday: "Dom", day: "15" },
]

const todayKey: string = "lun"

const appointments: WeekAppointment[] = [
    {
        day: 0,
        hour: "09:00",
        client: "Juan Perez",
        phone: "3111234567",
        service: "Corte clasico",
        status: "Confirmada",
    },
    {
        day: 0,
        hour: "11:00",
        client: "Carlos Ruiz",
        phone: "3115554444",
        service: "Corte + barba",
        status: "Confirmada",
    },
    {
        day: 2,
        hour: "10:00",
        client: "Miguel Torres",
        phone: "3117778888",
        service: "Fade",
        status: "Confirmada",
    },
    {
        day: 4,
        hour: "15:00",
        client: "Jose Garcia",
        phone: "3119998888",
        service: "Corte clasico",
        status: "Confirmada",
    },
]

function groupAppointmentsBySlot(): AppointmentsBySlot {
    return appointments.reduce<AppointmentsBySlot>(
        (acc, appointment) => {
            const dayKey = weekDays[appointment.day]?.key

            if (!dayKey) return acc

            const slotKey = `${dayKey}-${appointment.hour}`

            acc[slotKey] ??= []

            acc[slotKey].push({
                clientName: appointment.client,
                phone: appointment.phone,
                service: appointment.service,
                status: appointment.status,
            })

            return acc
        }, {}
    )
}

export default function BarberWeek() {
    const appointmentsBySlot = groupAppointmentsBySlot()
    const bookedCount = appointments.length
    const freeCount = hours.length * weekDays.length - bookedCount
    const todayAppointments = appointments.filter((appointment) =>
        weekDays[appointment.day]?.key === todayKey
    )

    const stats: StatCard[] = [
        {
            label: "Citas semana",
            value: bookedCount,
            icon: CalendarDays,
        },
        {
            label: "Citas hoy",
            value: todayAppointments.length,
            icon: UserRound,
        },
        {
            label: "Espacios libres",
            value: freeCount,
            icon: Clock3,
        },
    ]

    return (
        <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <div className="pointer-events-none absolute left-1/2 top-20 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.08)] blur-[145px]" />
            <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.08)] blur-[90px]" />

            <div className="relative mx-auto max-w-[1800px] p-5 sm:p-6 lg:p-8">
                
                {/*//TODO: Header de la vista: */}
                <BarberHeader
                    title="Agenda semanal"
                    description={`Visualiza la semana de trabajo en ${siteConfig.business.name}, con citas confirmadas y espacios disponibles.`}
                    rightContent={
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-200">
                                <CheckCircle2 className="h-4 w-4" />
                                Confirmada
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-zinc-400">
                                <Clock3 className="h-4 w-4" />
                                Libre
                            </span>
                        </div>
                    }
                />

                <section className="mb-6 grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <MetricCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))}
                </section>
                
                <WeekSchedule
                    weekDays={weekDays}
                    hours={hours}
                    todayKey={todayKey}
                    appointmentsBySlot={appointmentsBySlot}
                />
                
            </div>
        </div>
    )
}
