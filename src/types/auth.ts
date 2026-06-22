export type UserRole = "admin" | "superadmin" | "barber"

export interface User {
    role: UserRole
}
