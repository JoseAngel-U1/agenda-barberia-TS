import {
    CheckCircle2,
    Scissors,
    Phone
} from 'lucide-react';
import type { SlotAppointment } from '../../types/booking';

interface AppointmentCardProps {
    appointment: SlotAppointment
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
    return (
        <article className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 shadow-lg shadow-black/10">
            <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-emerald-300">
                    {appointment.clientName}
                </p>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
            </div>

            <p className="flex items-center gap-1.5 text-sm font-black text-emerald-50">
                <Scissors className="h-3.5 w-3.5" />
                {appointment.service}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-50/80">
                <Phone className="h-3.5 w-3.5" />
                {appointment.phone}
            </div>

            <p className="mt-2 text-xs font-bold text-emerald-300">
                {appointment.status}
            </p>
        </article>
    )
}