export type BarberSchedule = Partial<Record<number, string[]>>

export type BarberStatus = "Activo" | "Inactivo"

export interface Barber {
    id: string
    name: string
    specialty: string
    schedule: BarberSchedule
    image?: string
}

export interface AdminBarber {
    id: number
    name: string
    description: string
    image?: string
    status: BarberStatus
    entry: string
    exit: string
    breakTime: string
}

export interface BarberRestDay {
    id: number
    name: string
    specialty: string
    restDays: string[]
}

export type RestDaysState = Record<number, string[]>
