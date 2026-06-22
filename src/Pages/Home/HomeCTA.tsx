import { siteConfig } from "../../config/siteConfig"

export default function CTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-background">

            <div className="max-w-5xl mx-auto text-center rounded-[3rem] bg-white/5 p-12 sm:p-24 border border-white/10 relative backdrop-blur-xl overflow-hidden">

                {/*//* glow estable */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/10 blur-[80px]" />
                </div>

                <h2 className="text-4xl sm:text-6xl font-bold mb-8 tracking-tight relative z-10">
                    Dale a tu estilo el cuidado que{" "}
                    <span className="text-[hsl(var(--primary))] italic">
                        merece
                    </span>
                </h2>

                <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                    Aparta tu horario y ven por un corte fresco, una barba definida o el servicio completo.
                </p>

                <a
                    href={siteConfig.routes.reservar}
                    className="relative z-10"
                >
                    <button
                        className="
                        rounded-2xl px-12 py-6 text-xl font-bold

                        bg-[hsl(var(--primary))]
                        hover:bg-[hsl(var(--primary))]/90

                        shadow-2xl shadow-[hsl(var(--primary))]/20

                        transition-all
                        active:scale-95
                    "
                    >
                        Reservar ahora
                    </button>
                </a>

            </div>
        </section>
    )
}