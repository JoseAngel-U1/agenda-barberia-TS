import { Scissors, Lock, Mail, ArrowRight } from "lucide-react"

export default function Login() {

    function handleMouseEnter(
        e: React.MouseEvent<HTMLButtonElement>
    ): void {
        e.currentTarget.style.boxShadow =
            `0 15px 30px -5px hsl(var(--primary) / 0.45)`
    }

    function handleMouseLeave(
        e: React.MouseEvent<HTMLButtonElement>
    ): void {
        e.currentTarget.style.boxShadow =
            `0 10px 25px -5px hsl(var(--primary) / 0.30)`
    }

    return (
        <div className="relative min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-12 overflow-hidden">

            <div className="relative w-full max-w-md">

                {/* Logo / Encabezado */}
                <div className="mb-8 text-center">
                    <div className="relative mx-auto h-16 w-16">
                        {/* Glow detrás del logo */}
                        <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--primary)/0.50)] blur-xl" />
                        <div
                            className="relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                            style={{
                                backgroundImage: `linear-gradient(
                                    to bottom right,
                                    hsl(var(--primary)),
                                    hsl(var(--accent))
                                )`,
                                boxShadow: `0 10px 25px -5px hsl(var(--primary) / 0.40)`,
                            }}
                        >
                            <Scissors className="h-8 w-8 text-white" strokeWidth={2.5} />
                        </div>
                    </div>

                    <h1 className="mt-4 text-3xl font-black text-white">
                        Iniciar sesión
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Ingresa tus credenciales para acceder al panel
                    </p>
                </div>

                {/* Card con efecto glass */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

                    <form className="space-y-5">

                        {/* Correo */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-zinc-300"
                            >
                                Correo electrónico
                            </label>

                            <div className="group flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 transition 
                                focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.40)]">
                                <Mail className="h-5 w-5 shrink-0 text-zinc-500 transition group-focus-within:text-[hsl(var(--primary))]" />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-zinc-300"
                                >
                                    Contraseña
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[hsl(var(--primary))] transition hover:opacity-80"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            <div className="group flex items-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 transition 
                                focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.40)]">
                                <Lock className="h-5 w-5 shrink-0 text-zinc-500 transition group-focus-within:text-[hsl(var(--primary))]" />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white transition active:scale-[0.98]"
                            style={{
                                backgroundImage: `linear-gradient(
                                    to right,
                                    hsl(var(--primary)),
                                    hsl(var(--accent))
                                )`,
                                boxShadow: `0 10px 25px -5px hsl(var(--primary) / 0.30)`,
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Iniciar sesión
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </span>

                            {/* Brillo en hover */}
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                transition-transform duration-700 group-hover:translate-x-full" />
                        </button>

                    </form>

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-zinc-500">
                    © {new Date().getFullYear()} Agenda Barbería · Todos los derechos reservados
                </p>

            </div>
        </div>
    )
}
