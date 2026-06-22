//! config/branding.ts

import { siteConfig } from "./siteConfig"
import type { Branding } from "../types/site"

const primaryTheme = typeof siteConfig.theme === "string"
    ? siteConfig.theme
    : siteConfig.theme.color

export const branding: Branding = {
    name: siteConfig.business.name,
    shortName: siteConfig.business.shortName,
    theme: {
        primary: primaryTheme,
    },
    routes: siteConfig.routes,
    features: siteConfig.features,
}
