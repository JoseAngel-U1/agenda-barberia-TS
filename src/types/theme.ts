export interface ThemeColors {
    primary: string
    accent: string
    foreground?: string
}

export interface Theme {
    primary?: string
    text?: string
    logo?: string
    border?: string
    hsl: ThemeColors
}

export interface CustomThemeConfig {
    color: "custom"
    primaryHex: string
    accentHex: string
}

export type ThemeColorName =
    | "red"
    | "blue"
    | "emerald"
    | "amber"
    | "gold"

export interface PresetThemeConfig {
    color: ThemeColorName
    primaryHex?: string
    accentHex?: string
}

export type ThemeConfig =
    | ThemeColorName
    | CustomThemeConfig
    | PresetThemeConfig
