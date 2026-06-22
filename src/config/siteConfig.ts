//! config/siteConfig.ts

import {
    Users,
    CalendarDays,
    Scissors,
    Package,
    CreditCard,
    Settings,
} from "lucide-react";

import type { NavigationConfig, SiteConfig } from "../types/site";


//TODO: Configuración general del sitio:
export const siteConfig: SiteConfig = {
    business: {
        name: "Barberia Pro",
        shortName: "A",
        slogan: "Atencion profesional para tu estilo",
    },

    logo: {
        image: "",
        alt: "Logo Barberia Pro",
        icon: true,
    },

    theme: {
        color: "custom", // red | blue | emerald | amber | gold | custom
        //? Se usa cuando color es "custom" :
        primaryHex: "#5FB395", // color principal: botones, marca, acciones //? #5FB395 - (celeste oscuro )---c9a227
        accentHex: "#f973ff",  // color de apoyo: detalles, brillos, contraste   //? #fff316 - (amarillo brillante) - f973ff - (morado claro)---f97316
    },

    routes: {
        home: "/",
        reservar: "/reservar",
        admin: "/admin",
        login: "/login",
        superadmin: "/superadmin",
    },

    features: {
        showAdmin: true,
        showSuperAdmin: true,
        showLandingLinks: true,
    },
};


//TODO: Configuración de navegación para los paneles de Admin y Barbero:
export const navigationConfig: NavigationConfig = {
    barber: {
        title: "Barbero",
        subtitle: "Panel Barbero",

        links: [
            {
                name: "Jornada",
                path: "/barber",
                icon: Users,
            },
            {
                name: "Agenda Semanal",
                path: "/barber/week",
                icon: CalendarDays,
            },
        ],
    },

    admin: {
        title: "Administrador",
        subtitle: "Panel Administrador",

        links: [
            {
                name: "Barberos",
                path: "/admin",
                icon: Users,
            },
            {
                name: "Descansos",
                path: "/admin/admin-rest-days",
                icon: CalendarDays,
            },
            {
                name: "Servicios",
                path: "/admin/services",
                icon: Scissors,
            },
            // {
            //     name: "Reportes",
            //     path: "/admin/reports",
            //     icon: ChartNoAxesCombined,
            // },
        ],
    },

    superAdmin: {
        title: "Super Admin",
        subtitle: "Panel Maestro",

        links: [
            {
                name: "Clientes",
                path: "/superadmin",
                icon: Users,
            },
            {
                name: "Módulos",
                path: "/superadmin/modules",
                icon: Package,
            },
            {
                name: "Pagos",
                path: "/superadmin/payments",
                icon: CreditCard,
            },
            {
                name: "Configuración",
                path: "/superadmin/settings",
                icon: Settings,
            },
        ],
    },
};
