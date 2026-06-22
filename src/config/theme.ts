//! config/theme.ts

import type { Theme, ThemeColorName, ThemeConfig } from "../types/theme";

export const themeMap: Record<ThemeColorName, Theme> = {
    red: {
        primary: "bg-red-600 hover:bg-red-500",
        text: "text-red-600",
        logo: "bg-red-600",
        border: "border-red-600",
        hsl: {
            primary: "350 85% 55%",
            accent: "320 75% 45%",
        },
    },
    blue: {
        primary: "bg-blue-600 hover:bg-blue-500",
        text: "text-blue-600",
        logo: "bg-blue-600",
        border: "border-blue-600",
        hsl: {
            primary: "217 91% 60%",
            accent: "190 95% 45%",
        },
    },
    emerald: {
        primary: "bg-emerald-600 hover:bg-emerald-500",
        text: "text-emerald-600",
        logo: "bg-emerald-600",
        border: "border-emerald-600",
        hsl: {
            primary: "160 84% 39%",
            accent: "142 76% 36%",
        },
    },
    amber: {
        primary: "bg-amber-500 hover:bg-amber-400",
        text: "text-amber-500",
        logo: "bg-amber-500",
        border: "border-amber-500",
        hsl: {
            primary: "38 92% 50%",
            accent: "24 95% 53%",
        },
    },
    gold: {
        primary: "bg-yellow-500 hover:bg-yellow-400 text-black",
        text: "text-yellow-500",
        logo: "bg-yellow-500",
        border: "border-yellow-500",
        hsl: {
            primary: "45 93% 47%",
            accent: "28 85% 52%",
        },
    },
};

function normalizeHex(hex: string): string {
    const cleanHex = hex.replace("#", "");

    return cleanHex.length === 3
        ? cleanHex.split("").map((char) => char + char).join("")
        : cleanHex;
}

function isValidHex(hex: string): boolean {
    return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
}

function hexToHsl(hex: string): string {
    const normalizedHex = normalizeHex(hex);

    const red = parseInt(normalizedHex.slice(0, 2), 16) / 255;
    const green = parseInt(normalizedHex.slice(2, 4), 16) / 255;
    const blue = parseInt(normalizedHex.slice(4, 6), 16) / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);

    const lightness = (max + min) / 2;
    const difference = max - min;

    if (difference === 0) {
        return `0 0% ${Math.round(lightness * 100)}%`;
    }

    const saturation = difference / (1 - Math.abs(2 * lightness - 1));
    let hueSegment: number;

    if (max === red) {
        hueSegment = ((green - blue) / difference) % 6;
    } else if (max === green) {
        hueSegment = (blue - red) / difference + 2;
    } else {
        hueSegment = (red - green) / difference + 4;
    }

    let hue = Math.round(hueSegment * 60);

    if (hue < 0) {
        hue += 360;
    }

    return `${hue} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}

function getReadableForeground(hex: string): string {
    const normalizedHex = normalizeHex(hex);

    const red = parseInt(normalizedHex.slice(0, 2), 16);
    const green = parseInt(normalizedHex.slice(2, 4), 16);
    const blue = parseInt(normalizedHex.slice(4, 6), 16);

    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness > 150
        ? "240 4% 6%"
        : "0 0% 100%";
}

function getTheme(themeConfig: ThemeConfig): Theme {
    if (typeof themeConfig === "string") {
        return themeMap[themeConfig] ?? themeMap.blue;
    }

    if (themeConfig.color === "custom") {
        const primaryHex = isValidHex(themeConfig.primaryHex)
            ? themeConfig.primaryHex
            : "#2563eb";

        const accentHex = isValidHex(themeConfig.accentHex)
            ? themeConfig.accentHex
            : primaryHex;

        return {
            hsl: {
                primary: hexToHsl(primaryHex),
                accent: hexToHsl(accentHex),
                foreground: getReadableForeground(primaryHex),
            },
        };
    }

    return themeMap[themeConfig.color] ?? themeMap.blue;
}

export function applyTheme(themeConfig: ThemeConfig): void {
    const theme = getTheme(themeConfig);
    const root = document.documentElement;

    root.style.setProperty("--primary", theme.hsl.primary);
    root.style.setProperty("--ring", theme.hsl.primary);
    root.style.setProperty("--accent", theme.hsl.accent);

    if (theme.hsl.foreground) {
        root.style.setProperty(
            "--primary-foreground",
            theme.hsl.foreground
        );
    }
}
