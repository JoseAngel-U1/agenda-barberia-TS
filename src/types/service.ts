export type ServiceIcon =
    | "scissors"
    | "zap"
    | "crown"

export interface Service {
    name: string
    price: string
    description: string
    duration: string
    icon: ServiceIcon
    tag: string
}

export interface AdminService {
    id: number
    name: string
    description: string
    price: string
    editing: boolean
}

export type EditableServiceField =
    | "name"
    | "description"
    | "price"
