import type { ReactElement } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

//! Layouts:
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "./ProtectedRoute"

import DashboardLayout from "../layouts/DashboardLayout"
import { navigationConfig } from "../config/siteConfig";

//! Páginas:
//** Public:
import Home from "../Pages/Home/Home"
import Booking from "../Pages/Booking/Booking"
import SuperAdmin from "../Pages/SuperAdmin/SuperAdmin"
import Login from "../Pages/Login"
import NotFound from "../Pages/NotFound/NotFound"
//** Admin:
import AdminBarbers from "../Pages/Admin/AdminBarbers"
import AdminServices from "../Pages/Admin/AdminServices"
import AdminRestDays from "../Pages/Admin/AdminRestDays"
//** Barber:
import Barber from "../Pages/Barber/BarberDashboard"
import BarberWeek from "../Pages/Barber/BarberWeek"

import type { User } from "../types/auth";

const user: User = {
    role: "admin",
};
const userSup: User = {
    role: "superadmin",
};
const userBarber: User = {
    role: "barber",
};


export default function AnimatedRoutes(): ReactElement {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(12px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
                <Routes location={location}>

                    {/*//TODO: PUBLICAS */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/reservar" element={<Booking />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} /> {/* //? Ruta inexistente (404) */}
                    </Route>

                    {/*//TODO: ADMIN */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute
                                user={user}
                                allowedRoles={["admin"]}
                            >
                                <DashboardLayout
                                    className="Admin-layout"
                                    {...navigationConfig.admin}
                                />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<AdminBarbers />}
                        />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="admin-rest-days" element={<AdminRestDays />} />

                    </Route>

                    {/*//TODO: Barbero */}
                    <Route 
                        path="/barber"
                        element={ 
                            <ProtectedRoute
                                user={userBarber}
                                allowedRoles={["barber"]}
                            >
                                <DashboardLayout
                                    className="Barber-layout"
                                    {...navigationConfig.barber}
                                />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Barber />}
                        />
                        <Route path="week" element={<BarberWeek />} />
                    </Route>

                    {/*//TODO: SUPERADMIN */}
                    <Route
                        path="/superadmin"
                        element={
                            <ProtectedRoute
                                user={userSup}
                                allowedRoles={["superadmin"]}
                            >
                                <DashboardLayout
                                    className="SuperAdmin-layout"
                                    {...navigationConfig.superAdmin}
                                />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<SuperAdmin />}
                        />
                    </Route>
                    
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}
