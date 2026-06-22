//! config/barbers.ts

import type { Barber } from "../types/barber"

export const barbers: Barber[] = [
    {
        id: "alex",
        name: "Alex Ramos",
        specialty: "Cortes clasicos y degradados",
        schedule: {
            1: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM"],
            2: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM"],
            3: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM"],
            4: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM"],
            5: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM"],
            6: ["10:00 AM", "11:00 AM", "12:00 PM"],
        },
    },
    {
        id: "mario",
        name: "Mario Vega",
        specialty: "Barba, perfilado y paquetes",
        schedule: {
            1: ["12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            2: ["12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            3: ["12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            4: ["12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            5: ["12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            6: ["11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM"],
        },
    },
    {
        id: "diego",
        name: "Diego Luna",
        specialty: "Cortes modernos y disenos",
        schedule: {
            2: ["10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            3: ["10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            4: ["10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            5: ["10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
            6: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "4:00 PM"],
        },
    },
]

export function getBarberHours(
    barber: Barber | null | undefined,
    date: string
): string[] {
    if (!barber || !date) return []

    const day = new Date(`${date}T00:00:00`).getDay()

    return barber.schedule[day] ?? []
}
