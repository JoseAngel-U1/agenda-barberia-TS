import type {
    Dispatch,
    HTMLInputTypeAttribute,
    ReactNode,
    RefObject,
    SetStateAction,
} from "react"
import type { LucideIcon } from "lucide-react"

import type { AdminBarber, BarberStatus } from "./barber"
import type { User, UserRole } from "./auth"
import type {
    Appointment,
    AppointmentStatus,
    AppointmentStatusStyle,
    BarberAppointment,
    AppointmentsBySlot,
    WeekDay,
} from "./booking"
import type { Barber } from "./barber"
import type { NavigationLink } from "./site"
import type { AdminService, EditableServiceField, Service } from "./service"

export interface MetricCardProps {
    label: string
    value: string | number
    icon: LucideIcon
    compact?: boolean
    valueClassName?: string
}

export type AdminBarberFormState = "empty" | "create" | "edit"

export interface AdminBarberFormPanelProps {
    formState: AdminBarberFormState
    createStep: number
    setCreateStep: Dispatch<SetStateAction<number>>
    selectedBarber: AdminBarber | null
    barberForm: AdminBarber
    setBarberForm: Dispatch<SetStateAction<AdminBarber>>
    saveBarber: () => void
}

export interface BarbersHeaderProps {
    onCreateBarber: () => void
}

export type BarbersStatusFilter = "Todos" | BarberStatus

export interface BarbersFiltersProps {
    searchTerm: string
    statusFilter: BarbersStatusFilter
    onSearchChange: (value: string) => void
    onStatusChange: (value: BarbersStatusFilter) => void
    onExport: () => void
}

export interface BarbersTableProps {
    barbers: AdminBarber[]
    onEditBarber: (barber: AdminBarber) => void
}

export interface TextFieldProps {
    label: string
    type?: HTMLInputTypeAttribute
    value?: string
    onChange?: (value: string) => void
    refValue?: RefObject<HTMLInputElement | null>
}

export interface TextAreaProps {
    label: string
    value?: string
    onChange?: (value: string) => void
}

export interface SelectFieldProps {
    label: string
    value?: string
    onChange?: (value: string) => void
}

export interface AdminServiceInputProps {
    refValue?: RefObject<HTMLInputElement | null>
    type?: HTMLInputTypeAttribute
    value: string
    placeholder: string
    onChange: (value: string) => void
}

export interface AsideProps {
    title: string
    subtitle: string
    links: NavigationLink[]
    showLogout?: boolean
    onLogout?: () => void
}

export interface DashboardLayoutProps {
    title: string
    subtitle: string
    links: NavigationLink[]
    className: string
}

export interface ProtectedRouteProps {
    user: User | null
    allowedRoles: UserRole[]
    children: ReactNode
}

export interface PublicServiceCardProps {
    service: Service
    variant?: "landing" | "booking"
    selected?: boolean
    onSelect?: (service: Service) => void
}

export interface BookingBarberSelectProps {
    selectedBarberId: string
    onSelect: (barberId: string) => void
}

export interface BookingDateTimeProps {
    date: string
    time: string
    today: string
    isFutureDate: boolean
    selectedBarber?: Barber
    availableHours: string[]
    barberHours: string[]
    onDateChange: (date: string) => void
    onTimeChange: (time: string) => void
}

export interface BookingSummaryProps {
    clientName: string
    selectedService?: Service
    selectedBarber?: Barber
    date: string
    time: string
    success: Appointment | null
    bookingError: string
    isValid: boolean
    onClientNameChange: (value: string) => void
    onConfirm: () => void
}

export interface AdminServiceCardProps {
    service: AdminService
    updateService: (
        id: number,
        field: EditableServiceField,
        value: string
    ) => void
    saveService: (id: number) => void
    editService: (id: number) => void
    deleteService: (id: number) => void
}

export interface BarberScheduleProps {
    appointments: BarberAppointment[]
    currentAppointment?: BarberAppointment
    appointmentStatus: AppointmentStatus
    statusStyles: Record<AppointmentStatus, AppointmentStatusStyle>
}

export interface BarberHeaderProps {
    title: string
    description: string
    rightContent?: ReactNode
}

export interface WeekScheduleProps {
    weekDays: WeekDay[]
    hours: string[]
    todayKey: string
    appointmentsBySlot: AppointmentsBySlot
}

export interface CurrentAppointmentCardProps {
    currentAppointment?: BarberAppointment
    appointmentStatus: AppointmentStatus
    statusStyles: Record<AppointmentStatus, AppointmentStatusStyle>
    onServiceAction: () => void
    getButtonText: () => string
}

export interface StatCard {
    label: string
    value: number | string
    icon: LucideIcon
}

export interface Benefit {
    title: string
    subtitle: string
    description: string
    icon: LucideIcon
    color: "primary" | "accent"
}

export type SuperAdminModuleKey =
    | "appointments"
    | "barbers"
    | "inventory"
    | "reports"
    | "whatsapp"
    | "commissions"

export type SuperAdminModulesState = Record<SuperAdminModuleKey, boolean>

export interface SuperAdminModule {
    key: SuperAdminModuleKey
    name: string
    description: string
    icon: LucideIcon
}
