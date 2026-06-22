export interface Appointment {
    clientName: string
    service: string
    barberId: string
    barberName: string
    date: string
    time: string
}

export interface WeekDay {
    key: string
    weekday: string
    day: string
}

export type AppointmentStatus =
    | "pending"
    | "in_progress"
    | "finished"
    | "free"

export interface BarberAppointment {
    id: number
    hour: string
    client: string | null
    phone: string
    service: string
    duration: string
    status: AppointmentStatus
}

export interface AppointmentStatusStyle {
    label: string
    className: string
}

export interface WeekAppointment {
    day: number
    hour: string
    client: string
    phone: string
    service: string
    status: string
}

export interface SlotAppointment {
    clientName: string
    phone: string
    service: string
    status: string
}

export type AppointmentsBySlot = Record<string, SlotAppointment[]>
