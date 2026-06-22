import { useLayoutEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import { applyTheme } from "./config/theme";
import { siteConfig } from "./config/siteConfig";

export default function App() {
    useLayoutEffect(() => {
        applyTheme(siteConfig.theme);
    }, []);

    return <AppRoutes />;
}