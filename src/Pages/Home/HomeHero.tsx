import { Link } from "react-router-dom"
import { ArrowRight, CalendarDays } from "lucide-react"
import { siteConfig } from "../../config/siteConfig"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-16">

            {/*//* GLOW BACKGROUND (DINAMICO) */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-[hsl(var(--primary)/0.08)]" />

            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-[hsl(var(--primary)/0.05)]" />

            {/*//TODO: CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in">

                {/*//* BADGE */}
                <div className="
                    inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    border border-white/10
                    bg-white/5
                    mb-8
                    backdrop-blur-md
                ">
                    <div className="
                        w-2 h-2 rounded-full
                        bg-[hsl(var(--primary))]
                        animate-pulse
                    " />
                    <span className="text-xs text-muted-foreground font-medium">
                        {siteConfig.business.slogan}
                    </span>
                </div>

                {/*//* HEADLINE */}
                <h1 className="
                    text-5xl md:text-7xl
                    font-headline font-bold
                    leading-[1.05]
                    tracking-tight
                    mb-6
                    text-foreground
                ">
                    Tu proximo corte
                    <br />
                    <span className="text-[hsl(var(--primary))]">
                        empieza aqui
                    </span>
                </h1>

                {/*//* SUBTEXT */}
                <p className="
                    text-lg md:text-xl
                    text-muted-foreground
                    max-w-2xl mx-auto
                    mb-10
                    leading-relaxed
                    font-light
                ">
                    Reserva tu cita, llega a tu hora y disfruta una atencion cuidada de principio a fin.
                </p>

                {/*//TODO: CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                    {/*//* BOTON PRINCIPAL */}
                    <Link
                        to={siteConfig.routes.reservar}
                        className="
                        flex items-center gap-2
                        px-8 py-4 rounded-2xl
                        font-semibold text-base

                        bg-[hsl(var(--primary))]
                        text-[hsl(var(--primary-foreground))]

                        shadow-xl
                        shadow-[hsl(var(--primary)/0.25)]

                        transition-all duration-300

                        hover:scale-[1.03]
                        hover:shadow-[hsl(var(--primary)/0.4)]
                        hover:bg-[hsl(var(--primary)/0.9)]
                    "
                    >
                        Reservar mi cita
                        <CalendarDays className="w-4 h-4" />
                    </Link>

                    {/*//* BOTON SECUNDARIO */}
                    <a href="#servicios">
                        <button className="
                            flex items-center gap-2
                            px-8 py-4 rounded-2xl
                            text-base

                            border border-white/10
                            text-muted-foreground

                            backdrop-blur-md

                            transition-all duration-300

                            hover:text-foreground
                            hover:bg-white/5
                        ">
                            Ver servicios
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </a>

                </div>
            </div>
        </section>
    )
}