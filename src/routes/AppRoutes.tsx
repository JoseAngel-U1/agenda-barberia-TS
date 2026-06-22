import { BrowserRouter } from "react-router-dom"

import AnimatedRoutes from "./AnimatedRoutes"
import ScrollBehavior from "./ScrollBehavior"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            {/* Controla el desplazamiento automático y el scroll suave entre rutas y anclas */}
            <ScrollBehavior />

            {/* Gestiona las rutas de la aplicación y sus animaciones de transición */}
            <AnimatedRoutes />
        </BrowserRouter>
    )
}