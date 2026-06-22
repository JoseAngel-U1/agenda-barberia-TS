import { Link } from "react-router-dom"
import { Scissors } from "lucide-react"
import { siteConfig } from "../../config/siteConfig"

export default function Navbar() {
    const showLogoImage = Boolean(siteConfig.logo.image)

    return (
        <nav
            className="sticky top-0 z-50 backdrop-blur-xl bg-[hsl(var(--background)/0.7)]
            border-b border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        >

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/*//* LOGO / BRAND */}
                <Link to="/" className="flex items-center gap-3 group select-none">

                    {/*//** Icon container */}
                    <div
                        className="relative w-10 h-10 rounded-xl bg-[hsl(var(--primary))]
                        flex items-center justify-center overflow-hidden
                        transition-all duration-300 group-hover:rotate-12
                        group-hover:shadow-lg
                        group-hover:shadow-[hsl(var(--primary)/0.35)]"
                    >
                        {showLogoImage ? (
                            <img
                                src={siteConfig.logo.image}
                                alt={siteConfig.logo.alt}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <>
                                {/*//* Glow */}
                                <div
                                    className="absolute inset-0 rounded-xl bg-[hsl(var(--primary))]
                                    opacity-0 blur-xl group-hover:opacity-40 transition"
                                />

                                <Scissors
                                    className="relative text-[hsl(var(--primary-foreground))]
                                    h-5 w-5"
                                />
                            </>
                        )}
                    </div>

                    {/*//* Name */}
                    <span className="font-semibold text-xl tracking-tight text-[hsl(var(--foreground))]">
                        {siteConfig.business.name}
                    </span>
                </Link>

                {/*//* ACTIONS */}
                <div className="flex items-center gap-3">

                    {siteConfig.features.showAdmin && (
                        <Link to={siteConfig.routes.admin}>
                            {/*//? to={siteConfig.routes.login} */}
                            <button
                                className="hidden sm:inline-flex px-4 py-2 rounded-lg
                                text-[hsl(var(--muted-foreground))]
                                hover:text-[hsl(var(--foreground))]
                                hover:bg-white/5 transition-all duration-200"
                            >
                                Panel admin
                            </button>
                        </Link>
                    )}

                    {/* //TODO: Temporal */}
                    {siteConfig.features.showSuperAdmin && (
                        <Link to={siteConfig.routes.superadmin}>
                            {/*//? to={siteConfig.routes.login} */}
                            <button
                                className="hidden sm:inline-flex px-4 py-2 rounded-lg
                                text-[hsl(var(--muted-foreground))]
                                hover:text-[hsl(var(--foreground))]
                                hover:bg-white/5 transition-all duration-200"
                            >
                                Panel SuperAdmin
                            </button>
                        </Link>
                    )}
                    <Link to="/barber">
                        <button
                            className="hidden sm:inline-flex px-4 py-2 rounded-lg
                            text-[hsl(var(--muted-foreground))]
                            hover:text-[hsl(var(--foreground))]
                            hover:bg-white/5 transition-all duration-200"
                        >
                            Panel barber
                        </button>
                    </Link>

                    <Link to={siteConfig.routes.reservar}>
                        <button
                            className="relative px-6 py-2.5 rounded-xl font-medium
                            text-[hsl(var(--primary-foreground))]
                            bg-[hsl(var(--primary))]
                            transition-all duration-300
                            hover:scale-[1.04]
                            hover:shadow-lg
                            hover:shadow-[hsl(var(--primary)/0.35)]
                            active:scale-[0.97]"
                        >
                            {/* Glow hover */}
                            <span
                                className="absolute inset-0 rounded-xl
                                bg-[hsl(var(--primary))]
                                opacity-0 blur-xl transition hover:opacity-40"
                            />

                            <span className="relative z-10">
                                Reservar cita
                            </span>
                        </button>
                    </Link>

                </div>
            </div>
        </nav>
    )
}