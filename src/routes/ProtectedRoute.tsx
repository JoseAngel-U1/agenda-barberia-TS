import { Navigate } from "react-router-dom";

import type { ProtectedRouteProps } from "../types/ui";

export default function ProtectedRoute({
    user,
    allowedRoles,
    children,
}: ProtectedRouteProps) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
