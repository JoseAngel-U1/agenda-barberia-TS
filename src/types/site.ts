import type { LucideIcon } from "lucide-react"
import type { ThemeConfig } from "./theme"

export interface BusinessConfig {
    name: string
    shortName: string
    slogan: string
}

export interface LogoConfig {
    image: string
    alt: string
    icon: boolean
}

export interface RoutesConfig {
    home: string
    reservar: string
    admin: string
    login: string
    superadmin: string
}

export interface FeaturesConfig {
    showAdmin: boolean
    showSuperAdmin: boolean
    showLandingLinks: boolean
}

export interface NavigationLink {
    name: string
    path: string
    icon: LucideIcon
}

export interface NavigationSection {
    title: string
    subtitle: string
    links: NavigationLink[]
}

export interface SiteConfig {
    business: BusinessConfig
    logo: LogoConfig
    theme: ThemeConfig
    routes: RoutesConfig
    features: FeaturesConfig
}

export interface NavigationConfig {
    barber: NavigationSection
    admin: NavigationSection
    superAdmin: NavigationSection
}

export interface Branding {
    name: string
    shortName: string
    theme: {
        primary: string
    }
    routes: RoutesConfig
    features: FeaturesConfig
}
