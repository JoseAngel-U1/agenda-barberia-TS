import { Outlet } from "react-router-dom";
import Aside from "../components/ui/Aside";

import type { DashboardLayoutProps } from "../types/ui";

export default function DashboardLayout({
    title,
    subtitle,
    links,
    className,
}: DashboardLayoutProps) {
    return (
        <div className={className}>
            <Aside
                title={title}
                subtitle={subtitle}
                links={links}
            />

            <div>
                <Outlet />
            </div>
        </div>
    );
}
