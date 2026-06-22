import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CalendarDays, Scissors } from "lucide-react"

import BookingBarberSelect from "./BookingBarberSelect"
import BookingDateTime from "./BookingDateTime"
import BookingSummary from "./BookingSummary"

import Footer from "../../components/ui/Footer"
import ServiceCard from "../../components/Booking/ServiceCard"

import { barbers, getBarberHours } from "../../config/barbers"
import { services } from "../../config/services"
import { siteConfig } from "../../config/siteConfig"

import type {
    Appointment,
} from "../../types/booking"
import type { Barber } from "../../types/barber"
import type { Service } from "../../types/service"

const today: string = new Date().toLocaleDateString("en-CA")

export default function Booking() {
    const [service, setService] = useState<string>("")
    const [barberId, setBarberId] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [clientName, setClientName] = useState<string>("")

    const [success, setSuccess] = useState<Appointment | null>(null)
    const [bookingError, setBookingError] = useState<string>("")
    const [appointments, setAppointments] = useState<Appointment[]>(() =>
        JSON.parse(localStorage.getItem("appointments") ?? "[]")
    )

    const selectedService = useMemo<Service | undefined>(
        () => services.find((item) => item.name === service),
        [service],
    )

    const selectedBarber = useMemo<Barber | undefined>(
        () => barbers.find((item) => item.id === barberId),
        [barberId],
    )

    const barberHours = useMemo(
        () => getBarberHours(selectedBarber, date),
        [selectedBarber, date],
    )

    const bookedHours = useMemo(() => {
        return appointments
            .filter(
                (item) =>
                    item.barberId === barberId &&
                    item.date === date
            )
            .map((item) => item.time)
    }, [appointments, barberId, date])

    const availableHours = useMemo(
        () =>
            barberHours.filter(
                (hour) => !bookedHours.includes(hour)
            ),
        [barberHours, bookedHours],
    )

    const isFutureDate = date >= today

    const isValid = Boolean(
        clientName.trim() &&
        service &&
        selectedBarber &&
        date &&
        time &&
        isFutureDate
    )

    const resetSelectedTime = (): void => {
        setTime("")
        setBookingError("")
    }

    const handleBarberSelect = (selectedBarberId: string): void => {
        setBarberId(selectedBarberId)
        resetSelectedTime()
    }

    const handleDateChange = (selectedDate: string): void => {
        setDate(selectedDate)
        resetSelectedTime()
    }

    const handleBooking = (): void => {
        if (!isValid) return

        const current: Appointment[] = JSON.parse(
            localStorage.getItem("appointments") ?? "[]"
        )

        const isSlotTaken = current.some(
            (appointment) =>
                appointment.barberId === barberId &&
                appointment.date === date &&
                appointment.time === time
        )

        if (isSlotTaken) {
            setAppointments(current)
            setTime("")
            setBookingError(
                "Ese horario acaba de ocuparse. Elige otro disponible."
            )
            return
        }

        const newAppointment: Appointment = {
            clientName: clientName.trim(),
            service,
            barberId,
            barberName: selectedBarber!.name,
            date,
            time,
        }

        current.push(newAppointment)

        localStorage.setItem(
            "appointments",
            JSON.stringify(current)
        )

        setAppointments(current)

        setSuccess(newAppointment)
        setBookingError("")

        setClientName("")
        setService("")
        setBarberId("")
        setDate("")
        setTime("")
    }

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] text-white">
            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
                <Link
                    to={siteConfig.routes.home}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio
                </Link>

                <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    {/*//TODO: Pasos para agendar tu cita */}
                    <div className="space-y-8">
                        <div className="max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-sm font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.2)]">
                                <CalendarDays className="h-4 w-4" />
                                Agenda en minutos
                            </div>
                            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                Reserva tu cita
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                                Elige el servicio, aparta un horario disponible y confirma tu visita sin llamadas ni espera.
                            </p>
                        </div>

                        {/*//* Paso 1 */}
                        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/30 sm:p-6">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                                        Paso 1
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold text-white">
                                        Servicio
                                    </h2>
                                </div>
                                <Scissors className="h-6 w-6 text-[hsl(var(--primary))]" />
                            </div>

                            {/*//** Cargar las cards de los serviciós */}
                            <div className="grid gap-3 md:grid-cols-3">
                                {services.map((item) => (
                                    <ServiceCard
                                        key={item.name}
                                        service={item}
                                        variant="booking"
                                        selected={service === item.name}
                                        onSelect={() => setService(item.name)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/*//* Pasos 2 */}
                        <BookingBarberSelect
                            selectedBarberId={barberId}
                            onSelect={handleBarberSelect}
                        />

                        {/*//* Pasos 3 y 4 */}
                        <BookingDateTime
                            date={date}
                            time={time}
                            today={today}
                            isFutureDate={isFutureDate}
                            selectedBarber={selectedBarber}
                            availableHours={availableHours}
                            barberHours={barberHours}
                            onDateChange={handleDateChange}
                            onTimeChange={setTime}
                        />
                    </div>
                    
                    {/*//TODO:  */}
                    <BookingSummary
                        clientName={clientName}
                        selectedService={selectedService}
                        selectedBarber={selectedBarber}
                        date={date}
                        time={time}
                        success={success}
                        bookingError={bookingError}
                        isValid={isValid}
                        onClientNameChange={setClientName}
                        onConfirm={handleBooking}
                    />
                </section>
            </main>

            <Footer />
        </div>
    )
}
