//! config/services.ts

import type { Service } from "../types/service"

export const services: Service[] = [
    {
        name: "Corte Clasico",
        price: "$25.00",
        description: "Un corte limpio, detallado y hecho a tu estilo para que salgas renovado.",
        duration: "30 min",
        icon: "scissors",
        tag: "Mas pedido",
    },
    {
        name: "Barba Premium",
        price: "$20.00",
        description: "Perfilado preciso, acabado fresco y cuidado para una barba con presencia.",
        duration: "20 min",
        icon: "zap",
        tag: "Relax",
    },
    {
        name: "Paquete Completo",
        price: "$40.00",
        description: "Corte y barba en una sola visita para salir listo, comodo y con confianza.",
        duration: "60 min",
        icon: "crown",
        tag: "Completo",
    },
]

export const hours: string[] = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
]
